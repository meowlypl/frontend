import MarkerCard from "./MarkerCard.tsx";
import type { Marker } from "../../types/Marker";

interface Props {
  markers: Marker[];
}

export default function MarkerList({
  markers,
}: Props) {
  if (markers.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">

        <div className="text-center">

          <h2 className="text-2xl font-black text-slate-800">
            Brak wyników
          </h2>

          <p className="mt-3 text-slate-500">
            Nie znaleziono żadnych punktów.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">

      <div className="space-y-4">

        {markers.map((marker) => (
          <MarkerCard
            key={marker.id}
            marker={marker}
          />
        ))}

      </div>

    </div>
  );
}