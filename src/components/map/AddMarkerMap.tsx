import { useMapEvents } from "react-leaflet";

interface AddMarkerMapProps {
  isAdmin: boolean;
  onAddMarker: (lat: number, lng: number) => void;
}

export default function AddMarkerMap({
  isAdmin,
  onAddMarker,
}: AddMarkerMapProps) {
  useMapEvents({
    click(event) {
      if (!isAdmin) return;

      onAddMarker(
        event.latlng.lat,
        event.latlng.lng
      );
    },
  });

  return null;
}