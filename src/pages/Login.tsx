import { useState } from "react";
import { Link } from "react-router-dom";
import catImage from "../assets/register-cat.jpg";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

export default function Login() {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  if(user) window.location.href = '/dashboard'
  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const form = event.currentTarget;

    const user = {
      email: (
        form.elements.namedItem("email") as HTMLInputElement
      ).value,
      password: (
        form.elements.namedItem("password") as HTMLInputElement
      ).value,
    };

    try {
      console.log("Łączę się z:", `${API_URL}/login`);
      const response = await fetch(
        `${API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (data.code == 200) {
        localStorage.setItem(
          "meowlyUser",
          JSON.stringify(data.user)
        )
        localStorage.token = data.user.token
        return window.location.href = "/dashboard";
      }

      const messages = {
        401: 'Niepoprawny email lub hasło.'
      }

      setMessage(
        messages[data.code as keyof typeof messages] || "Nie udało się zalogować."
      );
    } catch (error) {
      console.error(error);
      alert(String(error));
      setMessage("Nie można połączyć się z serwerem.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#fff8f0] p-4 lg:p-6">

      <section className="grid min-h-[calc(100vh-40px)] overflow-hidden rounded-[36px] bg-white shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">

        <div
          className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12"
          style={{
            backgroundImage: `linear-gradient(rgba(255,248,240,.15),rgba(255,248,240,.3)), url(${catImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div>

            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500 shadow-xl">

              <span className="text-3xl text-white">
                🐈
              </span>

            </div>

          </div>

          <div>

            <h1 className="max-w-lg text-6xl font-black leading-tight text-white">

              Witaj ponownie w

              <span className="text-orange-500 ml-[.25em]">
                Meowly
              </span>

            </h1>

            <p className="mt-6 max-w-lg text-xl leading-9 text-white/90">

              Pomagaj kotom,
              wykonuj misje,
              zdobywaj poziomy
              i zmieniaj świat
              na lepszy.

            </p>

          </div>

          <div className="rounded-[28px] bg-white/85 p-6 backdrop-blur">

            <h2 className="text-2xl font-black">
              🐾 Razem pomagamy kotom
            </h2>

            <p className="mt-3 leading-7 text-slate-600">

              Każde zgłoszenie,
              każda misja
              i każda adopcja
              naprawdę ma znaczenie.

            </p>

          </div>

        </div>

        <div className="flex items-center justify-center p-6 lg:p-10">

          <div className="w-full max-w-md">

            <div className="mb-10 text-center lg:hidden">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-orange-500 shadow-xl shadow-orange-200">

                <span className="text-4xl text-white">
                  🐈
                </span>

              </div>

              <h1 className="mt-6 text-5xl font-black">
                Meowly
              </h1>

            </div>

            <h2 className="text-center text-5xl font-black text-slate-900">

              Zaloguj się

            </h2>

            <p className="mt-3 text-center text-lg font-semibold text-slate-500">

              Wróć do swoich misji.

            </p>

            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-6"
            >
                          <div>

                <label className="font-black text-slate-800">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="twoj@email.com"
                  className="mt-2 h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none transition-all duration-200 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-100"
                />

              </div>

              <div>

                <label className="font-black text-slate-800">
                  Hasło
                </label>

                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="mt-2 h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none transition-all duration-200 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-100"
                />

              </div>

              <div className="flex items-center justify-between">

                <label className="flex items-center gap-3 text-sm font-semibold text-slate-600">

                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded accent-orange-500"
                  />

                  Zapamiętaj mnie

                </label>

                <button
                  type="button"
                  className="font-bold text-orange-500 transition hover:text-orange-600"
                >
                  Nie pamiętasz hasła?
                </button>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn h-14 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 font-black text-white shadow-lg shadow-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Logowanie..." : "Zaloguj się"}
              </button>

              {message && (
                <div className="rounded-2xl bg-red-50 p-4 text-center font-bold text-red-600">
                  {message}
                </div>
              )}

            </form>

            <div className="mt-8 text-center">

              <p className="font-semibold text-slate-500">

                Nie masz jeszcze konta?

              </p>

              <Link
                to="/register"
                className="btn mt-5 inline-flex h-14 items-center justify-center rounded-2xl border-2 border-orange-200 px-8 font-black text-orange-600 transition hover:bg-orange-50"
              >
                Załóż konto
              </Link>

            </div>

            <div className="mt-10 rounded-3xl bg-orange-50 p-6">

              <h3 className="text-lg font-black text-slate-900">
                Dlaczego warto dołączyć?
              </h3>

              <ul className="mt-4 space-y-3 font-semibold text-slate-600">

                <li>🐾 Wykonuj misje w swojej okolicy</li>

                <li>⭐ Zdobywaj XP i odznaki</li>

                <li>🏆 Rywalizuj w rankingu</li>

                <li>❤️ Pomagaj kotom i fundacjom</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}