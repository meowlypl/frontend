import Card from "../ui/Card";
import Button from "../ui/Button";

import type { Marker } from "../../types/Marker";

interface Props {
  marker: Marker;
}

export default function MarkerCard({ marker }: Props) {
  return (
    <Card className="overflow-hidden">

      {marker.image && (
        <img
          src={marker.image}
          alt={marker.title}
          className="h-40 w-full object-cover"
        />
      )}

      <div className="p-5">

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-xl font-black text-slate-900">
              {marker.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {marker.description}
            </p>

          </div>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-600">
            {marker.type}
          </span>

        </div>

        {marker.address && (
          <p className="mt-4 text-sm text-slate-500">
            📍 {marker.address}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">

          <span className="font-black text-orange-500">
            +{marker.xp} XP
          </span>

          <Button>
            Zobacz
          </Button>

        </div>

      </div>

    </Card>
  );
}