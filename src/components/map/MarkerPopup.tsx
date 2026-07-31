import Button from "../ui/Button";
import { markerService } from "../services/markerService";
import type { Marker } from "../../types/Marker";

interface Props {
  marker: Marker;
  isAdmin: boolean;
  refreshMarkers: () => void;
}

const types: { [id: string] : string } = {
  foundation: 'Fundacja',
  mission: 'Misja',
  feeding: 'Punkt dokarmiania',
  cat_house: 'Budka',
  vet: 'Weterynarz',
  adoption: 'Adopcja',
  event: 'Wydarzenie'
}

export default function MarkerPopup({
  marker,
  isAdmin,
  refreshMarkers,
}: Props) {
  async function deleteMarker() {
    if (!confirm("Czy na pewno chcesz usunąć ten punkt?")) return;

    try {
      await markerService.deleteMarker(marker.id);
      refreshMarkers();
    } catch (err) {
      console.error(err);
      alert("Nie udało się usunąć markera.");
    }
  }

  return (
    <div className="w-72">

      {marker.image && (
        <img
          src={'/icon_light/fundacje.svg'}
          alt={marker.title}
          className="mb-4 h-40 w-full rounded-[2xl] object-cover"
        />
      )}

      <h2 className="text-xl font-black text-light-text dark:text-text mt-8 mb-0">
        {marker.title}
      </h2>

      <p className="mt-0 text-sm leading-6 text-light-subtext">
        {marker.description}
      </p>

      {marker.address && (
        <p className="mt-12 text-sm font-semibold text-orange-500">
          📍 {marker.address}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between">

        <span className="rounded-full bg-light-border dark:bg-border px-3 py-1 text-sm font-black text-white">
          +{marker.xp} XP
        </span>

        <span className="rounded-full bg-light-overlay dark:bg-overlay px-3 py-1 text-sm font-semibold text-light-subtext dark:text-subtext">
          {types[marker.type] || marker.type}
        </span>

      </div>

      <Button
        fullWidth
        className="mt-5 text-[.9rem]"
      >
        Rozpocznij misję
      </Button>

      <Button
        variant="secondary"
        fullWidth
        className="mt-3 text-[.9rem]"
        onClick={() =>
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${marker.lat},${marker.lng}`,
            "_blank"
          )
        }
      >
        Nawiguj
      </Button>

      {isAdmin && (
        <div className="mt-3 flex gap-2 text-[.9rem]">

          <Button
            variant="secondary"
            fullWidth
            onClick={() => {
              alert("Edycja będzie dodana w następnym kroku.");
            }}
          >
            Edytuj
          </Button>

          <Button
            variant="danger"
            fullWidth
            onClick={deleteMarker}
          >
            Usuń
          </Button>

        </div>
      )}

    </div>
  );
}