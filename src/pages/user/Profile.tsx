import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import ProfileAvatar from "../../components/profile/ProfileAvatar";
import ProfileAchievements from "../../components/profile/ProfileAchievements";
import ProfileActivity from "../../components/profile/ProfileActivity";
import ProfileSettings from "../../components/profile/ProfileSettings";
import ChangePassword from "../../components/profile/ChangePassword";
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

export default function Profile() {
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

  const { xp, level } = user || localUser;
  const nextLevel = 100;

  const activities = [
    {
      id: 1,
      title: "Ukończono misję",
      description: "Sprawdzenie budki dla kotów",
      date: "Dzisiaj • 18:30",
      xp: 50,
    },
    {
      id: 2,
      title: "Dodano zgłoszenie",
      description: "Kot potrzebujący pomocy",
      date: "Wczoraj • 11:20",
      xp: 20,
    },
    {
      id: 3,
      title: "Zdobyto odznakę",
      description: "Pierwsza misja",
      date: "3 dni temu",
    },
  ];

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
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="rounded-[36px] bg-light-overlay dark:bg-overlay p-8 text-light-subtext dark:text-subtext shadow-xl card-hover">

            <div className="flex flex-wrap gap-6">
              
              <div>

                <p className="text-sm opacity-80">
                  PROFIL
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

              <div className="h-4 overflow-hidden rounded-full bg-white dark:bg-light-text">

                <div
                  className="h-full rounded-full bg-light-text dark:bg-text transition-all duration-500"
                  style={{
                    width: `${(Math.max(1,xp) / nextLevel) * 100}%`,
                  }}
                />

              </div>

            </div>

          </div>

            <div className="mt-8 grid gap-8 xl:grid-cols-[360px_1fr]">

              <div className="space-y-8">

                <ProfileAvatar
                  user={(user || localUser)}
                />

                <ProfileAchievements
                  completedMissions={12}
                  reports={5}
                />
              </div>

              <div className="space-y-8">

                {(() => {
                  const Activity: any = ProfileActivity;
                  return <Activity activities={activities} />;
                })()}

                <ProfileSettings
                  user={(user || localUser)}
                />

                <ChangePassword />

              </div>

            </div>

          </div>

        </div>

    </main>
  );
}
