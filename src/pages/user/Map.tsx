import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import MarkerFilters from "../../components/map/MarkerFilters";
import MapView from "../../components/map/MapView";
import MarkerForm from "../../components/map/MarkerForm";

import type { Marker } from "../../types/Marker";

export default function MapPage() {
  const user = JSON.parse(
    localStorage.getItem("meowlyUser") || "null"
  );

  const isAdmin = user?.role == 'admin';

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
    fetch(`${import.meta.env.VITE_API_URL}/markers`)
      .then(async r => {
        const res = await r.json()
        if(r.status == 200) return setMarkers(res)
        console.error(`Server responded with an unexpected code: ${r.status}\n${res}`)
      })
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

  const [dark, setDark] = useState<boolean>();
  useEffect(() => {
    setDark(localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches));
  }, [])

  return (
    <main className="grid min-h-screen bg-light-base dark:bg-base dark:border-[#8b693a] shadow-2xl lg:grid-cols-[290px_1fr]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-col">

        <Navbar 
          dark={ dark || false }
          setDark={ setDark }
        />

        <MarkerFilters
          search={search}
          setSearch={setSearch}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <MapView
          markers={visibleMarkers}
          isAdmin={isAdmin}
          onAddMarker={(lat, lng) => {
            setSelectedPosition({ lat, lng });
            setModalOpen(true);
          }}
          refreshMarkers={loadMarkers}
        />

        <MarkerForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          position={selectedPosition}
          onSaved={loadMarkers}
        />

      </div>

    </main>
  );
}