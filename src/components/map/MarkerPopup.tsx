import Button from "../ui/Button";
import { markerService } from "../services/markerService";
import type { Marker } from "../../types/Marker";

interface Props {
  marker: Marker;
  isAdmin: boolean;
  refreshMarkers: () => void;
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
          src={marker.image}
          alt={marker.title}
          className="mb-4 h-40 w-full rounded-2xl object-cover"
        />
      )}

      <h2 className="text-xl font-black text-slate-900">
        {marker.title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {marker.description}
      </p>

      {marker.address && (
        <p className="mt-4 text-sm font-semibold text-orange-500">
          📍 {marker.address}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between">

        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-black text-orange-600">
          +{marker.xp} XP
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
          {marker.type}
        </span>

      </div>

      <Button
        fullWidth
        className="mt-5"
      >
        Rozpocznij misję
      </Button>

      <Button
        variant="secondary"
        fullWidth
        className="mt-3"
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
        <div className="mt-3 flex gap-2">

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