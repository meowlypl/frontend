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

          <label className="mb-2 block font-black text-slate-800">
            Typ punktu
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value as MarkerType)}
            className="h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none transition focus:border-orange-500"
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

          <label className="mb-2 block font-black text-slate-800">
            Opis
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-2xl border-2 border-orange-200 p-5 outline-none transition focus:border-orange-500"
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
          <div className="rounded-2xl bg-orange-50 p-4">

            <h3 className="font-black">
              Lokalizacja
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Lat: {position.lat.toFixed(6)}
            </p>

            <p className="text-sm text-slate-600">
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