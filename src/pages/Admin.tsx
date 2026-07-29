import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Mission {
  id: number;
  title: string;
  difficulty: string;
  xp: number;
}

export default function Admin() {
  const admin = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  if(!admin) window.location.href = '/'

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

  async function loadUsers() {
    try {
      const response = await fetch(
        "https://meowly.onrender.com/admin/users"
      );

      const data = await response.json();

      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadMissions() {
    try {
      const response = await fetch(
        "https://meowly.onrender.com/missions"
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
      "https://meowly.onrender.com/missions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    );

    const data = await response.json();

    if (data.success) {
      setTitle("");
      setDescription("");
      loadMissions();
    }
  }

  async function deleteUser(id: number) {
    if (!confirm("Usunąć użytkownika?")) return;

    await fetch(
      `https://meowly.onrender.com/admin/users/${id}`,
      {
        method: "DELETE",
      }
    );

    loadUsers();
  }

  if (admin.role != 'admin') {
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

  return (
    <main className="grid min-h-screen bg-light-base dark:bg-base dark:border-[#8b693a] shadow-2xl lg:grid-cols-[290px_1fr]">

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-col">

        <Navbar />

        <div className="p-6 lg:p-10">

          <h1 className="text-5xl font-black dark:text-white">
            Panel administratora
          </h1>

          <p className="mt-2 font-semibold text-slate-500">
            Zarządzaj użytkownikami, misjami i aplikacją.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-xl">

              <p className="text-sm font-bold text-light-subtext dark:text-subtext">
                Użytkownicy
              </p>

              <h2 className="mt-2 text-4xl font-black text-light-text dark:text-text">
                {users.length}
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
                XP łatwe
              </p>

              <h2 className="mt-2 text-4xl font-black text-light-text dark:text-text">
                10
              </h2>

            </div>

            <div className="rounded-3xl border-2 border-light-overlay dark:border-border p-7 shadow-xl">

              <p className="text-sm font-bold text-light-subtext dark:text-subtext">
                Status
              </p>

              <h2 className="mt-2 text-4xl font-black text-green-600">
                Online
              </h2>

            </div>

          </div>
          <div className="mt-10 grid gap-8 xl:grid-cols-[420px_1fr]">

            <div className="rounded-[36px] border-2 border-light-overlay dark:border-border p-8 shadow-xl">

              <h2 className="text-3xl font-black">
                Dodaj misję
              </h2>

              <p className="mt-2 font-semibold text-slate-500">
                Utwórz nowe zadanie dla użytkowników.
              </p>

              <div className="mt-8 space-y-5">

                <div>
                  <label className="font-black">
                    Nazwa misji
                  </label>

                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none focus:border-orange-500"
                    placeholder="Np. Nakarm kota"
                  />
                </div>

                <div>
                  <label className="font-black">
                    Opis
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-2xl border-2 border-orange-200 p-5 outline-none focus:border-orange-500"
                    placeholder="Opis misji..."
                  />
                </div>

                <div>

                  <label className="font-black">
                    Poziom trudności
                  </label>

                  <div className="mt-3 grid grid-cols-3 gap-3">

                    <button
                      onClick={() => changeDifficulty("easy")}
                      className={`btn rounded-2xl p-4 font-black ${
                        difficulty === "easy"
                          ? "bg-light-border dark:bg-border text-white"
                          : "bg-light-overlay dark:bg-overlay"
                      }`}
                    >
                      Łatwa
                    </button>

                    <button
                      onClick={() => changeDifficulty("medium")}
                      className={`btn rounded-2xl p-4 font-black ${
                        difficulty === "medium"
                          ? "bg-light-border dark:bg-border text-white"
                          : "bg-light-overlay dark:bg-overlay"
                      }`}
                    >
                      Średnia
                    </button>

                    <button
                      onClick={() => changeDifficulty("hard")}
                      className={`btn rounded-2xl p-4 font-black ${
                        difficulty === "hard"
                          ? "bg-light-border dark:bg-border text-white"
                          : "bg-light-overlay dark:bg-overlay"
                      }`}
                    >
                      Trudna
                    </button>

                  </div>

                </div>

                <div className="rounded-2xl bg-light-overlay dark:bg-overlay p-5">

                  <p className="font-bold text-orange-600">
                    Nagroda
                  </p>

                  <h3 className="mt-2 text-4xl font-black">
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

                  <h2 className="text-3xl font-black">
                    Użytkownicy
                  </h2>

                  <p className="mt-2 font-semibold text-slate-500">
                    Zarządzaj kontami.
                  </p>

                </div>

                <button
                  onClick={loadUsers}
                  className="btn rounded-2xl bg-light-border dark:bg-border px-6 py-3 font-black text-white"
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

                        <h3 className="text-lg font-black">
                          {user.name}
                        </h3>

                        <p className="font-semibold text-slate-500">
                          {user.email}
                        </p>

                        <span className="mt-2 inline-block rounded-full border-2 border-light-overlay dark:border-border px-4 py-1 text-sm font-bold capitalize">
                          {user.role}
                        </span>

                      </div>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn rounded-2xl bg-red-500 px-5 py-3 font-black text-white"
                      >
                        Usuń
                      </button>

                    </div>
                  ))}

              </div>

            </div>

          </div>
          <div className="mt-10 rounded-[36px] border-2 border-light-overlay dark:border-border p-8 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-black">
                  Wszystkie misje
                </h2>

                <p className="mt-2 font-semibold text-slate-500">
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
                      onClick={() => alert(`usun ${mission.title}`)}
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