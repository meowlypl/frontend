import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import ProfileAvatar from "../../components/profile/ProfileAvatar";
import ProfileAchievements from "../../components/profile/ProfileAchievements";
import ProfileActivity from "../../components/profile/ProfileActivity";
import ProfileSettings from "../../components/profile/ProfileSettings";
import ChangePassword from "../../components/profile/ChangePassword";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  xp: number;
  level: number;
  avatar?: string;
};

function getStoredUser(): User | null {
  try {
    const storedUser = localStorage.getItem("meowlyUser");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem("meowlyUser");
    return null;
  }
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const darkMode =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!token) {
        setLoading(false);

        if (!getStoredUser()) {
          window.location.href = "/login";
        }

        return;
      }

      if (!apiUrl) {
        console.warn(
          "Brak VITE_API_URL. Profil korzysta z danych zapisanych lokalnie.",
        );

        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/profile`, {
          headers: {
            authorization: token,
          },
          signal: controller.signal,
        });

        if (response.status === 401) {
          localStorage.removeItem("meowlyUser");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        if (!response.ok) {
          console.error(
            `Serwer zwrócił nieoczekiwany kod: ${response.status}`,
          );

          setLoading(false);
          return;
        }

        const data = await response.json();
        const fetchedUser = data.user as User;

        localStorage.setItem(
          "meowlyUser",
          JSON.stringify(fetchedUser),
        );

        setUser(fetchedUser);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Nie udało się pobrać profilu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    return () => {
      controller.abort();
    };
  }, []);

  function handleProfileUpdated() {
    const updatedUser = getStoredUser();

    if (updatedUser) {
      setUser(updatedUser);
    }
  }

  function handleAvatarChanged(avatar: string) {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      const updatedUser = {
        ...currentUser,
        avatar,
      };

      localStorage.setItem(
        "meowlyUser",
        JSON.stringify(updatedUser),
      );

      return updatedUser;
    });
  }

  if (loading && !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-light-base text-light-text dark:bg-base dark:text-text">
        <p className="text-lg font-bold">Ładowanie profilu...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-light-base p-6 text-center text-light-text dark:bg-base dark:text-text">
        <h1 className="text-3xl font-black">
          Nie udało się wczytać profilu
        </h1>

        <p className="text-light-subtext dark:text-subtext">
          Zaloguj się ponownie, aby otworzyć swój profil.
        </p>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/login";
          }}
          className="btn rounded-2xl bg-light-border px-6 py-4 font-black text-text dark:bg-border"
        >
          Przejdź do logowania
        </button>
      </main>
    );
  }

  const xp = user.xp ?? 0;
  const level = user.level ?? 1;
  const nextLevel = 100;

  const progress = Math.min(
    100,
    Math.max(0, (xp / nextLevel) * 100),
  );

  return (
    <main className="grid min-h-screen bg-light-base shadow-2xl dark:bg-base lg:grid-cols-[290px_1fr]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-col">
        <Navbar dark={dark} setDark={setDark} />

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <section className="rounded-[36px] bg-light-overlay p-8 text-light-subtext shadow-xl dark:bg-overlay dark:text-subtext">
            <div className="flex flex-wrap items-start gap-6">
              <div>
                <p className="text-sm font-bold opacity-80">
                  PROFIL
                </p>

                <h1 className="mt-2 text-4xl font-black text-light-text dark:text-text lg:text-5xl">
                  {user.name || "Użytkownik"}
                </h1>
              </div>

              <div className="ml-auto">
                <p className="text-sm font-bold opacity-80">
                  Poziom
                </p>

                <p className="mt-2 text-5xl font-semibold text-light-text dark:text-text">
                  {level}
                </p>
              </div>

              <div>
                <p className="text-sm font-bold opacity-80">
                  XP
                </p>

                <p className="mt-2 text-5xl font-semibold text-light-text dark:text-text">
                  {xp}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex justify-between text-sm font-bold">
                <span>{xp} XP</span>
                <span>{nextLevel} XP</span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-white dark:bg-light-text">
                <div
                  className="h-full rounded-full bg-light-text transition-all duration-500 dark:bg-text"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </section>

          <div className="mt-8 grid gap-8 xl:grid-cols-[360px_1fr]">
            <div className="space-y-8">
              <ProfileAvatar
                user={user}
                onAvatarChanged={handleAvatarChanged}
              />

              <ProfileAchievements
                completedMissions={0}
                reports={0}
              />
            </div>

            <div className="space-y-8">
              <ProfileActivity />

              <ProfileSettings
                user={user}
                onUpdated={handleProfileUpdated}
              />

              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}