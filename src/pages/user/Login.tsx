import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Podaj adres e-mail.");
      return;
    }

    if (!password) {
      setError("Podaj hasło.");
      return;
    }

    const savedUser = localStorage.getItem("registeredUser");

    if (!savedUser) {
      setError("Nie znaleziono konta. Najpierw się zarejestruj.");
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      if (
        user.email?.toLowerCase() !== normalizedEmail ||
        user.password !== password
      ) {
        setError("Nieprawidłowy e-mail lub hasło.");
        return;
      }

      localStorage.setItem(
        "meowlyUser",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          xp: user.xp ?? 0,
          level: user.level ?? 1,
        }),
      );

      localStorage.setItem("token", "local-user-token");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Błąd logowania użytkownika:", error);
      setError("Nie udało się odczytać danych konta.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-light-base p-6 text-light-text dark:bg-base dark:text-text">
      <section className="w-full max-w-md rounded-3xl border-2 border-light-overlay bg-light-overlay/30 p-8 shadow-xl dark:border-overlay dark:bg-overlay/50">
        <div className="text-center">
          <h1 className="header text-3xl font-black">
            Zaloguj się
          </h1>

          <p className="mt-3 font-semibold text-light-subtext dark:text-subtext">
            Zaloguj się do swojego konta Meowly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block space-y-2">
            <span className="font-bold">E-mail</span>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border-2 border-light-overlay bg-light-base px-4 py-3 text-light-text outline-none focus:border-light-border dark:border-overlay dark:bg-base dark:text-text dark:focus:border-border"
              placeholder="maja@example.pl"
              autoComplete="email"
            />
          </label>

          <label className="block space-y-2">
            <span className="font-bold">Hasło</span>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border-2 border-light-overlay bg-light-base px-4 py-3 text-light-text outline-none focus:border-light-border dark:border-overlay dark:bg-base dark:text-text dark:focus:border-border"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="rounded-2xl border-2 border-red-500/40 bg-red-500/10 px-4 py-3 font-bold text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn w-full rounded-2xl bg-light-border px-6 py-4 font-black text-text dark:bg-border"
          >
            Zaloguj się
          </button>
        </form>

        <p className="mt-6 text-center font-semibold text-light-subtext dark:text-subtext">
          Nie masz konta?{" "}
          <Link
            to="/register"
            className="font-black text-light-border dark:text-border"
          >
            Zarejestruj się
          </Link>
        </p>

        <div className="mt-7 border-t-2 border-light-overlay pt-7 text-center dark:border-overlay">
          <p className="font-semibold text-light-subtext dark:text-subtext">
            Reprezentujesz fundację?
          </p>

          <Link
            to="/foundation/login"
            className="btn mt-4 block w-full rounded-2xl border-2 border-light-border px-6 py-4 font-black text-light-border dark:border-border dark:text-border"
          >
            Zaloguj się jako fundacja
          </Link>

          <Link
            to="/foundation/register"
            className="mt-4 block font-bold text-light-subtext underline dark:text-subtext"
          >
            Zarejestruj fundację
          </Link>
        </div>
      </section>
    </main>
  );
}