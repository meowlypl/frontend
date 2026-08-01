import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  xp: number;
  level: number;
  avatar: null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>()

  const localUser = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  useEffect(() => {
    async function fetchUser() {
      fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        headers: {
          authorization: localStorage.token
        }
      }).then(async r => {
        const res = await r.json()
        if(r.status == 401) {
          localStorage.removeItem('meowlyUser');
          return window.location.href = "/login";
        }
        if(r.status == 200) {
          localStorage.meowlyUser = JSON.stringify(res.user)
          return setUser(res.user)
        }
        console.error(`Server responded with an unexpected code: ${r.status}\n${res}`)
      })
    }

    fetchUser();
  }, []);

  const { xp, level } = (user || localUser);
  const nextLevel = 100;

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

        <div className="space-y-8 p-6 lg:p-10">

          <div className="rounded-[36px] bg-light-overlay dark:bg-overlay p-8 text-light-subtext dark:text-subtext shadow-xl">

            <div className="flex flex-wrap gap-6">
              
              <div>

                <p className="text-sm opacity-80">
                  STATYSTYKI
                </p>

                <h2 className="mt-2 text-4xl font-black lg:text-5xl">
                  {(user || localUser)?.name || 'Użytkownik'}
                </h2>

              </div>
              <div className="ml-auto">

                <p className="text-sm opacity-80">
                  Poziom
                </p>

                <h2 className="mt-2 text-5xl font-semibold">
                  {level}
                </h2>

              </div>

              <div>

                <p className="text-sm opacity-80">
                  XP
                </p>

                <h2 className="mt-2 text-5xl font-semibold">
                  {xp}
                </h2>

              </div>

            </div>

            <div className="mt-8">

              <div className="mb-2 flex justify-between text-sm font-bold">

                <span>{xp} XP</span>

                <span>{nextLevel} XP</span>

              </div>

              <div className="h-4 overflow-hidden rounded-full bg-light-base dark:bg-light-text">

                <div
                  className="h-full rounded-full bg-light-text dark:bg-text transition-all duration-500"
                  style={{
                    width: `${(Math.max(1,xp) / nextLevel) * 100}%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <div className="card-hover rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-lg">

              <p className="font-bold text-light-border dark:text-border">
                Misje
              </p>

              <h2 className="mt-3 text-5xl font-semibold dark:text-text">
                0
              </h2>

              <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
                ukończone
              </p>

            </div>

            <div className="card-hover rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-lg">

              <p className="font-bold text-light-border dark:text-border">
                Zgłoszenia
              </p>

              <h2 className="mt-3 text-5xl font-semibold dark:text-text">
                0
              </h2>

              <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
                wysłane
              </p>

            </div>

            <div className="card-hover rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-lg">

              <p className="font-bold text-light-border dark:text-border">
                Odznaki
              </p>

              <h2 className="mt-3 text-5xl font-semibold dark:text-text">
                0
              </h2>

              <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
                zdobyte
              </p>

            </div>

            <div className="card-hover rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-lg">

              <p className="font-bold text-light-border dark:text-border">
                Ranking
              </p>

              <h2 className="mt-3 text-5xl font-semibold dark:text-text">
                --
              </h2>

              <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
                brak pozycji
              </p>

            </div>

          </div>
          <div className="grid gap-8">

            <div className="rounded-[36px] border-2 border-light-overlay dark:border-border p-8 shadow-xl">

              <p className="font-semibold text-light-border dark:text-border">
                Najbliższa misja
              </p>

              <h2 className="mt-3 text-4xl font-black text-light-text dark:text-text">
                Sprawdź budkę dla kotów
              </h2>

              <p className="mt-5 text-lg leading-8 text-light-text dark:text-subtext">
                Zweryfikuj, czy budka jest czysta,
                sucha i bezpieczna. Dodaj zdjęcie
                po zakończeniu zadania.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <span className="rounded-full bg-subtext dark:bg-border px-5 py-2 font-semibold text-light-text dark:text-text">
                  +50 XP
                </span>

                <span className="rounded-full bg-light-overlay dark:bg-overlay px-5 py-2 font-semibold text-light-text dark:text-subtext">
                  300 m
                </span>

                <span className="rounded-full bg-light-overlay dark:bg-overlay px-5 py-2 font-semibold text-light-text dark:text-subtext">
                  Łatwa
                </span>

              </div>

              <button
                onClick={() => navigate("/map")}
                className="btn mt-8 h-14 w-full rounded-2xl bg-light-border dark:bg-border font-semibold text-white"
              >
                Rozpocznij misję
              </button>

            </div>
            
          </div>

          <div className="rounded-[36px] bg-light-overlay dark:bg-overlay p-8 text-light-subtext dark:text-subtext shadow-xl">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <p className="font-semibold opacity-90">
                  Cel tygodnia
                </p>

                <h2 className="mt-2 text-4xl font-black">
                  Wykonaj 5 misji
                </h2>

                <p className="mt-4 max-w-xl leading-8 opacity-90">
                  Wykonuj misje w swojej okolicy i zdobywaj dodatkowe
                  doświadczenie oraz unikalne odznaki.
                </p>

              </div>

              <div className="w-full max-w-sm">

                <div className="mb-3 flex justify-between font-bold">

                  <span>1 / 5</span>

                  <span>20%</span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-white dark:bg-light-text">

                  <div
                    className="h-full rounded-full bg-light-text dark:bg-text transition-all duration-500"
                    style={{ width: "20%" }}
                  />

                </div>

                <button
                  onClick={() => navigate("/map")}
                  className="btn mt-8 h-14 w-full rounded-2xl bg-white dark:bg-light-text font-semibold text-light-text dark:text-text shadow-lg"
                >
                  Znajdź misję
                </button>

              </div>

            </div>

          </div>

          <div className="grid gap-8 xl:grid-cols-2">

            <div className="rounded-[36px] border-2 border-light-overlay dark:border-border p-8 shadow-xl">

              <h2 className="text-3xl font-black text-light-text dark:text-text">
                Ostatnia aktywność
              </h2>

              <div className="mt-8 space-y-5">

                <div className="rounded-2xl bg-light-overlay dark:bg-overlay p-5">

                  <p className="font-semibold text-light-text dark:text-text">
                    Brak wykonanych misji
                  </p>

                  <p className="mt-2 text-light-subtext dark:text-subtext">
                    Zacznij pomagać kotom, aby zobaczyć historię aktywności.
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-[36px] border-2 border-light-overlay dark:border-border p-8 shadow-xl">

              <h2 className="text-3xl font-black text-light-text dark:text-text">
                Ostatnie odznaki
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-light-overlay dark:bg-overlay p-5 text-center">

                  <div className="text-5xl">
                    🐾
                  </div>

                  <h3 className="mt-4 font-semibold text-light-text dark:text-text">
                    Brak
                  </h3>

                </div>

                <div className="rounded-2xl bg-light-overlay dark:bg-overlay p-5 text-center">

                  <div className="text-5xl">
                    ⭐
                  </div>

                  <h3 className="mt-4 font-semibold text-light-text dark:text-text">
                    Brak
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}