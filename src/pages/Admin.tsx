import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  login_token: string;
  verification_token: string;
  verified: boolean;
}

interface Mission {
  id: number;
  title: string;
  difficulty: string;
  xp: number;
}

export default function Admin() {
  const [admin, setUser] = useState<User>();
  const localAdmin = JSON.parse(localStorage.getItem("meowlyUser") || "null")
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

  if(!admin && !localAdmin) window.location.href = '/'

  const [users, setUsers] = useState<User[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [difficulty, setDifficulty] = useState("easy");
  const [xp, setXp] = useState(10);

  useEffect(() => {
    loadUsers();
    loadMissions();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL

  async function loadUsers() {
    try {
      const response = await fetch(
        `${API_URL}/admin/users`,
        {
          headers: {
            authorization: localStorage.token
          }
        }
      );

      const data = await response.json();

      setUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadMissions() {
    try {
      const response = await fetch(
        `${API_URL}/missions`
      );

      const data = await response.json();

      setMissions(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  function changeDifficulty(value: string) {
    setDifficulty(value);

    if (value === "easy") setXp(10);

    if (value === "medium") setXp(15);

    if (value === "hard") setXp(20);
  }

  async function createMission() {
    const response = await fetch(
      `${API_URL}/admin/mission`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.token
        },
        body: JSON.stringify({
          title,
          description,
          category: "inne",
          difficulty,
          xp,
          location: "Warszawa",
        }),
      }
    )

    if (response.status == 200) {
      setTitle("");
      setDescription("");
      loadMissions();
    }
  }

  async function deleteMission(id: number) {
    if (!confirm(`Usunąć misję?`)) return

    await fetch(
      `${API_URL}/admin/mission/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: localStorage.token
        }
      }
    )

    loadMissions()
  }

  async function deleteUser(id: number) {
    if (!confirm("Usunąć użytkownika?")) return;

    await fetch(
      `${API_URL}/admin/user/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: localStorage.token
        }
      }
    );

    loadUsers();
  }

  async function logoutUser(id: number) {
    if (!confirm("Wylogować użytkownika?")) return;

    await fetch(
      `${API_URL}/admin/session/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: localStorage.token
        }
      }
    );

    loadUsers();
  }

  async function verifyUser(token: string) {
    if (!confirm("Zweryfikować użytkownika?")) return;

    const res = await fetch(`${API_URL}/verify/${token}`)
    if(res.status != 200) alert(`Error: ${res.status}`)
    loadUsers()
  }

  if ((admin || localAdmin).role != 'admin') {
    return (
      <main className="min-h-screen bg-light-base dark:bg-base flex items-center justify-center">

        <div className="rounded-3xl bg-light-overlay dark:bg-overlay p-12 shadow-xl">

          <h1 className="text-4xl font-black text-light-text dark:text-text">
            Brak dostępu
          </h1>

          <p className="mt-4 text-light-subtext dark:text-subtext">
            Ten panel jest dostępny wyłącznie dla administratora.
          </p>

        </div>

      </main>
    );
  }

  const [dark, setDark] = useState<boolean>();
  useEffect(() => {
    setDark(localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches));
  })

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

        <div className="p-6 lg:p-10">

          <h1 className="text-5xl font-black text-light-text dark:text-text">
            Panel administratora
          </h1>

          <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
            Zarządzaj użytkownikami, misjami i aplikacją.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-xl">

              <p className="text-sm font-bold text-light-subtext dark:text-subtext">
                Fundacje
              </p>

              <h2 className="mt-2 text-4xl font-black text-light-text dark:text-text">
                {users.filter(u => u.role == 'foundation').length}
              </h2>

            </div>

            <div className="rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-xl">

              <p className="text-sm font-bold text-light-subtext dark:text-subtext">
                Użytkownicy
              </p>

              <h2 className="mt-2 text-4xl font-black text-light-text dark:text-text">
                {users.filter(u => u.role != 'foundation').length}
              </h2>

            </div>

            <div className="rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-xl">

              <p className="text-sm font-bold text-light-subtext dark:text-subtext">
                Misje
              </p>

              <h2 className="mt-2 text-4xl font-black text-light-text dark:text-text">
                {missions.length}
              </h2>

            </div>

            <div className="rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-xl">

              <p className="text-sm font-bold text-light-subtext dark:text-subtext">
                Status
              </p>

              { admin ? (
                <h2 className="mt-2 text-4xl font-black text-[#12a149]">
                  Online
                </h2>
              ) : (
                <h2 className="mt-2 text-4xl font-black text-[#e61923]">
                  Offline
                </h2>
              ) }

            </div>

          </div>
          <div className="mt-10 grid gap-8 xl:grid-cols-[420px_1fr]">

            <div className="rounded-[36px] border-2 border-light-overlay dark:border-border p-8 shadow-xl">

              <h2 className="text-3xl font-black text-light-text dark:text-text">
                Dodaj misję
              </h2>

              <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
                Utwórz nowe zadanie dla użytkowników.
              </p>

              <div className="mt-8 space-y-5">

                <div>
                  <label className="font-semibold text-light-subtext dark:text-subtext">
                    Nazwa misji
                  </label>

                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 h-14 w-full rounded-2xl border-2 border-light-overlay dark:border-overlay bg-light-overlay dark:bg-overlay px-5 text-light-text dark:text-text outline-none transition focus:border-light-border dark:focus:border-border placeholder:text-light-subtext dark:text-subtext"
                    placeholder="Np. Nakarm kota"
                  />
                </div>

                <div>
                  <label className="font-semibold text-light-subtext dark:text-subtext">
                    Opis
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="mt-2 min-h-[10em] w-full rounded-2xl border-2 border-light-overlay dark:border-overlay bg-light-overlay dark:bg-overlay py-3 px-5 text-light-text dark:text-text outline-none transition focus:border-light-border dark:focus:border-border placeholder:text-light-subtext dark:text-subtext"
                    placeholder="Opis misji..."
                  />
                </div>

                <div>

                  <label className="font-semibold text-light-subtext dark:text-subtext">
                    Poziom trudności
                  </label>

                  <div className="mt-3 grid grid-cols-3 gap-3">

                    <button
                      onClick={() => changeDifficulty("easy")}
                      className={`btn rounded-2xl p-4 font-semibold ${
                        difficulty === "easy"
                          ? "bg-light-border dark:bg-border text-white"
                          : "bg-light-overlay dark:bg-overlay text-light-subtext dark:text-subtext"
                      }`}
                    >
                      Łatwa
                    </button>

                    <button
                      onClick={() => changeDifficulty("medium")}
                      className={`btn rounded-2xl p-4 font-semibold ${
                        difficulty === "medium"
                          ? "bg-light-border dark:bg-border text-white"
                          : "bg-light-overlay dark:bg-overlay text-light-subtext dark:text-subtext"
                      }`}
                    >
                      Średnia
                    </button>

                    <button
                      onClick={() => changeDifficulty("hard")}
                      className={`btn rounded-2xl p-4 font-semibold ${
                        difficulty === "hard"
                          ? "bg-light-border dark:bg-border text-white"
                          : "bg-light-overlay dark:bg-overlay text-light-subtext dark:text-subtext"
                      }`}
                    >
                      Trudna
                    </button>

                  </div>

                </div>

                <div className="rounded-2xl bg-light-overlay dark:bg-overlay p-5">

                  <p className="font-bold text-light-border dark:text-border">
                    Nagroda
                  </p>

                  <h3 className="mt-2 text-4xl font-black text-light-text dark:text-text">
                    {xp} XP
                  </h3>

                </div>

                <button
                  onClick={createMission}
                  className="btn h-14 w-full rounded-2xl bg-light-border dark:bg-border font-black text-white"
                >
                  Dodaj misję
                </button>

              </div>

            </div>

            <div className="rounded-[36px] border-2 border-light-overlay dark:border-border p-8 shadow-xl">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-black text-light-text dark:text-text">
                    Użytkownicy
                  </h2>

                  <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
                    Zarządzaj kontami.
                  </p>

                </div>

                <button
                  onClick={loadUsers}
                  className="btn rounded-2xl bg-light-border dark:bg-border px-6 py-3 font-semibold text-white"
                >
                  Odśwież
                </button>

              </div>

              <div className="mt-8 space-y-4">

                {loading && (
                  <p>Ładowanie...</p>
                )}

                {!loading &&
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between rounded-3xl bg-light-overlay dark:bg-overlay p-5 transition hover:shadow-lg"
                    >

                      <div>

                        <h2 className="text-lg font-bold text-light-text dark:text-text">
                          {user.name}
                        </h2>

                        <p className="font-semibold text-light-subtext dark:text-subtext">
                          {user.email}
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-light-border dark:bg-border text-white px-4 py-1.5 text-xs font-semibold capitalize">
                          {user.role}
                        </span>

                      </div>

                      <div>
                        {!user?.verified ? (
                          <button
                            onClick={() => verifyUser(user.verification_token)}
                            style={{ background: 'hsl(143, 80.37%, 35%)' }}
                            className="btn rounded-2xl bg-green-500 px-5 py-3 font-semibold text-white mr-4"
                          >
                            Zweryfikuj
                          </button>
                        ) : user?.login_token ? (
                          <button
                            onClick={() => logoutUser(user.id)}
                            style={{ background: 'hsl(44, 80.37%, 42%)' }}
                            className="btn rounded-2xl bg-yellow-500 px-5 py-3 font-semibold text-white mr-4"
                          >
                            Wyloguj
                          </button>
                        ) : null}

                        <button
                          onClick={() => deleteUser(user.id)}
                            style={{ background: 'hsl(357, 80.37%, 50%)' }}
                          className="btn rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white"
                        >
                          Usuń
                        </button>
                      </div>

                    </div>
                  ))}

              </div>

            </div>

          </div>
          <div className="mt-10 rounded-[36px] border-2 border-light-overlay dark:border-border p-8 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-black text-light-text dark:text-text">
                  Wszystkie misje
                </h2>

                <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
                  Aktualnie dodane zadania.
                </p>

              </div>

              <button
                onClick={loadMissions}
                className="btn rounded-2xl bg-light-border dark:bg-border px-6 py-3 font-black text-white"
              >
                Odśwież
              </button>

            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {missions.map((mission) => (

                <div
                  key={mission.id}
                  className="rounded-3xl bg-light-overlay dark:bg-overlay p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <p className="text-sm font-bold uppercase tracking-wider text-orange-500">
                    {mission.difficulty}
                  </p>

                  <h3 className="mt-3 text-2xl font-black text-slate-900">
                    {mission.title}
                  </h3>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="rounded-full border-2 border-light-overlay dark:border-border px-4 py-2 font-black">
                      {mission.xp} XP
                    </span>

                    <button
                      onClick={() => deleteMission(mission.id)}
                      className="btn rounded-xl bg-red-500 px-4 py-2 font-bold text-white"
                    >
                      Usuń
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}