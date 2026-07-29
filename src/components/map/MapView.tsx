import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import AddMarkerMap from "./AddMarkerMap";
import MarkerPopup from "./MarkerPopup";

import type { Marker as MarkerType } from "../../types/Marker";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  markers: MarkerType[];

  isAdmin: boolean;

  refreshMarkers: () => void;

  onAddMarker: (
    lat: number,
    lng: number
  ) => void;
}

export default function MapView({
  markers,
  isAdmin,
  refreshMarkers,
  onAddMarker,
}: Props) {
  return (
    <div className="relative h-full">

      <MapContainer
        center={[52.2297, 21.0122]}
        zoom={12}
        scrollWheelZoom
        className="h-full w-full"
      >

        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <AddMarkerMap
          isAdmin={isAdmin}
          onAddMarker={onAddMarker}
        />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[
              marker.lat,
              marker.lng,
            ]}
          >

            <Popup>

              <MarkerPopup
                marker={marker}
                isAdmin={isAdmin}
                refreshMarkers={refreshMarkers}
              />

            </Popup>

          </Marker>
        ))}
      </MapContainer>

      {isAdmin && (
        <div className="absolute bottom-6 right-6 z-[1000] rounded-3xl bg-white p-4 shadow-2xl">

          <h3 className="text-lg font-black text-slate-900">
            Administrator
          </h3>

          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
            Kliknij w dowolne miejsce na mapie,
            aby dodać nowy punkt.
          </p>

        </div>
      )}

    </div>
  );
}