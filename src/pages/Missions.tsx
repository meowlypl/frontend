import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import {
  MapPin,
  Trophy,
  Clock,
  AlertCircle,
} from "lucide-react";

type Mission = {
  id: number;
  title: string;
  description?: string;
  location?: string;
  distance?: string;
  difficulty?: string;
  xp?: number;
  status?: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export default function Construction() {
  return (
    <main className="grid min-h-screen bg-light-base dark:bg-base dark:border-[#8b693a] shadow-2xl lg:grid-cols-[290px_1fr]">
      <div className="hidden lg:block">
          <Sidebar />
      </div>

      <div className="flex flex-col">
          <Navbar />

          <div className="space-y-8 p-6 lg:p-10">
            <MissionTab />
          </div>
      </div>
    </main>
  )
}

export function MissionTab() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMissions() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/missions`);

        if (!response.ok) {
          throw new Error("Nie udało się pobrać misji.");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setMissions(data);
        } else if (Array.isArray(data.missions)) {
          setMissions(data.missions);
        } else {
          setMissions([]);
        }
      } catch (err) {
        console.error(err);
        setError("Nie udało się wczytać misji. Spróbuj ponownie później.");
      } finally {
        setLoading(false);
      }
    }

    loadMissions();
  }, []);

  function getDifficultyLabel(difficulty?: string) {
    switch (difficulty?.toLowerCase()) {
      case "łatwa":
      case "easy":
        return "Łatwa";

      case "średnia":
      case "medium":
        return "Średnia";

      case "trudna":
      case "hard":
        return "Trudna";

      default:
        return difficulty || "Łatwa";
    }
  }

  if(error) console.log(error)
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-light-border">
            Pomagaj kotom w swojej okolicy
          </p>
          <h1 className="text-5xl font-black dark:text-white">
            Dostępne misje
          </h1>

          <p className="mt-2 font-semibold text-slate-500">
            Wybierz zadanie, zdobądź punkty XP i realnie pomóż bezdomnym
            kotom.
          </p>
        </section>
        
        {loading ? (
          // Ładowanie
          <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="flex flex-col rounded-3xl border-2 border-orange-100 dark:border-orange-900 p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900"></div>
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 text-light-border" />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 text-light-border" />
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-orange-600">
                  <Trophy className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-6 w-full rounded-2xl bg-light-border px-4 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"></div>
            </article>
            <article className="flex flex-col rounded-3xl border-2 border-orange-100 dark:border-orange-900 p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900"></div>
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 text-light-border" />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 text-light-border" />
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-orange-600">
                  <Trophy className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-6 w-full rounded-2xl bg-light-border px-4 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"></div>
            </article>
            <article className="flex flex-col rounded-3xl border-2 border-orange-100 dark:border-orange-900 p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900"></div>
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 text-light-border" />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 text-light-border" />
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-orange-600">
                  <Trophy className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-6 w-full rounded-2xl bg-light-border px-4 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"></div>
            </article>
          </main>
        ) : error ? (
          // Error
          <div className="rounded-[36px] bg-red-500 px-6 py-16 text-center shadow-sm text-white">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>

            <h2 className="text-xl font-bold">
              Coś poszło nie tak
            </h2>
          </div>
        ) : missions.length == 0 ? (
          // Brak misji
          <div className="rounded-[36px] bg-light-border px-6 py-16 text-center shadow-sm text-white">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <MapPin className="h-8 w-8 text-gray-500" />
            </div>

            <h2 className="text-xl font-bold">
              Brak aktywnych misji
            </h2>

            <p className="font-semibold opacity-90">
              Nowe zadania pojawią się tutaj, gdy fundacje je dodadzą.
            </p>
          </div>
        ) : (
          // Misje
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission) => (
              <div
                id={mission.id.toString()}
                className="flex flex-col rounded-3xl border-2 border-light-overlay dark:border-border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-light-border dark:bg-orange-900">
                    <MapPin className="h-6 w-6 text-light-base dark:text-orange-300" />
                  </div>

                  <span className="rounded-full bg-green-100 dark:bg-green-900 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-300">
                    {getDifficultyLabel(mission.difficulty)}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-300">
                  {mission.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {mission.description ||
                    "Pomóż fundacji wykonać tę misję i wesprzyj koty w potrzebie."}
                </p>

                <div className="mt-6 space-y-3 border-t border-light-border pt-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 text-light-border" />

                    <span>{mission.location || "Warszawa"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 text-light-border" />

                    <span>{mission.distance || "W pobliżu"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-light-border">
                    <Trophy className="h-4 w-4" />

                    <span>+{mission.xp ?? 50} XP</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-6 w-full rounded-2xl bg-light-border px-4 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
                  onClick={() => {
                    window.alert(`Wybrano misję: ${mission.title}`);
                  }}
                >
                  Zobacz misję
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}