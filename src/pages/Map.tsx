import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import MarkerFilters from "../components/map/MarkerFilters";
import MarkerList from "../components/map/MarkerList";
import MapView from "../components/map/MapView";
import MarkerForm from "../components/map/MarkerForm";

import { markerService } from "../components/services/markerService";
import type { Marker } from "../types/Marker";

export default function MapPage() {
  const user = JSON.parse(
    localStorage.getItem("meowlyUser") || "null"
  );

  const isAdmin =
    user?.email === "maja.wronowska@interia.pl";

  const [markers, setMarkers] = useState<Marker[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedPosition, setSelectedPosition] =
    useState<{
      lat: number;
      lng: number;
    } | null>(null);

  async function loadMarkers() {
    const data = await markerService.getMarkers();
    setMarkers(data);
  }

  useEffect(() => {
    loadMarkers();
  }, []);

  const visibleMarkers = markers.filter((marker) => {

    const matchesType =
      selectedType === "all" ||
      marker.type === selectedType;

    const matchesSearch =
      marker.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      marker.description
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <main className="h-screen bg-[#fff8f0] p-4">

      <div className="grid h-full overflow-hidden rounded-[36px] bg-white shadow-2xl lg:grid-cols-[290px_420px_1fr]">

        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex flex-col border-r border-orange-100">

          <Navbar />

          <MarkerFilters
            search={search}
            setSearch={setSearch}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />

          <MarkerList
            markers={visibleMarkers}
          />

        </div>

        <MapView
          markers={visibleMarkers}
          isAdmin={isAdmin}
          onAddMarker={(lat, lng) => {
            setSelectedPosition({ lat, lng });
            setModalOpen(true);
          }}
          refreshMarkers={loadMarkers}
        />

      </div>

      <MarkerForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        position={selectedPosition}
        onSaved={loadMarkers}
      />

    </main>
  );
}