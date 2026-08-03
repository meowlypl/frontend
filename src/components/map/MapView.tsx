import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle
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
  refresh: number;
  coords: GeolocationCoordinates | undefined;

  refreshMarkers: () => void;
  onAddMarker: (
    lat: number,
    lng: number
  ) => void;
}

export default function MapView({
  markers,
  isAdmin,
  refresh,
  coords,
  refreshMarkers,
  onAddMarker,
}: Props) {
  const center: { [id: string] : number } = {
    latitude: coords?.latitude || 52.2297,
    longitude: coords?.longitude || 21.0122
  }
  return (
    <div className="relative m-4 h-full z-0 rounded-[36px] overflow-hidden">

      <MapContainer
        key={refresh}
        center={[center.latitude, center.longitude]}
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

        {coords?.accuracy && coords.accuracy < 1000 ? (
          <Circle 
            center={{lat: coords.latitude, lng: coords.longitude}}
            fillColor="blue" 
            radius={coords.accuracy}/>
        ) : null}

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
      {/* if (e.detail !== 1) {
    detail = e.detail;
    return;
  }
  if (e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) return;
  var path = getPropagationPath(e);
  if (path.some(function(el) {
      return el instanceof HTMLLabelElement && el.attributes.for;
    }) && !path.some(function(el) {
      return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
    })) return;
  var now = Date.now();
  if (now - last <= delay) {
    detail++;
    if (detail === 2) handler(makeDblclick(e));
  } else detail = 1;
  last = now; */}

      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-[1000] rounded-3xl bg-[#f0e3cca0] dark:bg-[#26180dcd] p-5 pt-4 shadow-2xl">

          <h3 className="text-lg font-black text-light-text dark:text-text">
            Administrator
          </h3>

          <p className="mt-2 max-w-xs text-sm leading-6 text-light-subtext dark:text-subtext">
            Kliknij w dowolne miejsce na mapie,
            aby dodać nowy punkt.
          </p>

        </div>
      )}

    </div>
  );
}