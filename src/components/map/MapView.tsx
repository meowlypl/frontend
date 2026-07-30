import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle
} from "react-leaflet";
import { useEffect, useState } from "react";

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
  let [coords, setCoords] = useState<GeolocationCoordinates>()
  let localCoords = {
    latitude: 52.2297,
    longitude: 21.0122
  }
  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords)
      })
    }
  }, [])
  return (
    <div className="relative m-4 h-full z-0 rounded-[36px] overflow-hidden">

      <MapContainer
        key={coords?.latitude}
        center={coords ? [coords.latitude, coords.longitude] : [localCoords.latitude, localCoords.longitude]}
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

      {isAdmin && (
        <div className="fixed top-34 right-6 z-[1000] rounded-3xl bg-light-overlay dark:bg-overlay p-5 pt-4 shadow-2xl">

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