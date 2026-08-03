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

  let [coords, setCoords] = useState<GeolocationCoordinates>()
  let [refresh, setRefresh] = useState<number>(0)
  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords)
        setRefresh(refresh+1)
      })
    }
  }, [])
  const [dark, setDark] = useState<boolean>(localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches));

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

        {coords ? (
          <button
            style={{ fontFamily: 'Material Symbols Outlined' }}
            className="z-1000 btn rounded-[12px] fixed bottom-30.5 left-80.5 bg-light-overlay dark:bg-overlay text-light-subtext dark:text-subtext font-black text-xl w-10 h-10"
            onClick={() => {
              setRefresh((refresh||0)+1)
            }}
          >
            location_on
          </button>
        ) : ''}

        <MapView
          markers={visibleMarkers}
          isAdmin={isAdmin}
          refresh={refresh}
          coords={coords}
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
