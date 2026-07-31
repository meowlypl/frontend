import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";

import { markerService } from "../services/markerService";

interface Props {
  open: boolean;

  onClose: () => void;

  position: {
    lat: number;
    lng: number;
  } | null;

  onSaved: () => void;
}

type MarkerType =
  | "foundation"
  | "mission"
  | "feeding"
  | "cat_house"
  | "vet"
  | "adoption"
  | "event";

export default function MarkerForm({
  open,
  onClose,
  position,
  onSaved,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [address, setAddress] = useState("");

  const [type, setType] = useState<MarkerType>("foundation");

  const [xp, setXp] = useState(20);

  useEffect(() => {
    if (!open) return;

    setTitle("");
    setDescription("");
    setAddress("");
    setType("foundation");
    setXp(20);

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position?.lat}&lon=${position?.lng}&format=json`)
      .then(_ => _.json())
      .then(add => {
        setTitle(add.type == 'parking' ? `Parking ${add.name.replace(/^Parking /i, '')}`.replace(/ $/i, '') : add.name || '')
        let parts = [add.address.road ? `${add.address.road}${add.address.house_number ? ` ${add.address.house_number}` : ''}`: '', (add.address.city||add.address.town||add.address.village||'') + (!add.address.road&&add.address.house_number?` ${add.address.house_number}`:''), (add.address.country == 'Poland') ? '' : add.address.country].filter(a => a.length>0)
        setAddress(parts.join(', '))
      })
  }, [open]);

  async function saveMarker() {
    if (!position) return;

    setLoading(true);

    try {
      await markerService.createMarker({
        title,
        description,
        address,
        type,
        lat: position.lat,
        lng: position.lng,
        xp,
        active: true,
      });

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Nie udało się zapisać markera.");
    }

    setLoading(false);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Dodaj nowy punkt"
      width="lg"
    >
      <div className="space-y-5">

        <Input
          label="Nazwa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Fundacja Koci Azyl"
        />

        <Input
          label="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Warszawa..."
        />

        <div>

          <label className="mb-2 block font-semibold text-light-subtext dark:text-subtext">
            Typ punktu
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value as MarkerType)}
            className="h-14 w-full rounded-2xl border-2 border-light-overlay dark:border-overlay bg-light-overlay dark:bg-overlay text-light-text dark:text-text px-5 outline-none transition focus:border-light-border dark:focus:border-border"
          >
            <option value="foundation">Fundacja</option>
            <option value="mission">Misja</option>
            <option value="feeding">Punkt dokarmiania</option>
            <option value="cat_house">Budka</option>
            <option value="vet">Weterynarz</option>
            <option value="adoption">Adopcja</option>
            <option value="event">Wydarzenie</option>
          </select>

        </div>

        <div>

          <label className="mb-2 block font-semibold text-light-subtext dark:text-subtext">
            Opis
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="min-h-[10em] w-full rounded-2xl border-2 border-light-overlay dark:border-overlay bg-light-overlay dark:bg-overlay py-3 px-5 text-light-text dark:text-text outline-none transition focus:border-light-border dark:focus:border-border placeholder:text-light-subtext dark:text-subtext"
            placeholder="Opisz to miejsce..."
          />

        </div>

        <Input
          label="XP"
          type="number"
          value={xp}
          onChange={(e) =>
            setXp(Number(e.target.value))
          }
        />

        {position && (
          <div className="rounded-2xl bg-light-overlay dark:bg-overlay p-4">

            <h3 className="font-semibold text-light-text dark:text-text">
              Lokalizacja
            </h3>

            <p className="mt-2 text-sm text-light-subtext dark:text-subtext">
              Lat: {position.lat.toFixed(6)}
            </p>

            <p className="text-sm text-light-subtext dark:text-subtext">
              Lng: {position.lng.toFixed(6)}
            </p>

          </div>
        )}

        <div className="flex gap-4">

          <Button
            variant="secondary"
            fullWidth
            onClick={onClose}
          >
            Anuluj
          </Button>

          <Button
            fullWidth
            loading={loading}
            onClick={saveMarker}
          >
            Zapisz
          </Button>

        </div>

      </div>
    </Modal>
  );
}