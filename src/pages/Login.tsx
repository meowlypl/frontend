import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FoundationLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Podaj adres e-mail.");
      return;
    }

    if (!password.trim()) {
      setError("Podaj hasło.");
      return;
    }

    const registeredFoundation = localStorage.getItem(
      "registeredFoundation",
    );

    if (!registeredFoundation) {
      setError("Nie znaleziono konta fundacji. Najpierw się zarejestruj.");
      return;
    }

    try {
      const foundation = JSON.parse(registeredFoundation);

      if (
        foundation.email !== email.trim() ||
        foundation.password !== password
      ) {
        setError("Nieprawidłowy e-mail lub hasło.");
        return;
      }

      localStorage.setItem(
        "foundationUser",
        JSON.stringify({
          id: foundation.id,
          name: foundation.name,
          email: foundation.email,
        }),
      );

      localStorage.setItem("foundationToken", "local-demo-token");

      navigate("/foundation/dashboard", {
        replace: true,
      });
    } catch {
      setError("Dane konta są uszkodzone. Zarejestruj konto ponownie.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-light-base p-6 text-light-text dark:bg-base dark:text-text">
      <section className="w-full max-w-md rounded-3xl border-2 border-light-overlay bg-light-overlay/30 p-8 shadow-xl dark:border-overlay dark:bg-overlay/50">
        <div className="text-center">
          <h1 className="header text-3xl font-black">
            Logowanie fundacji
          </h1>

          <p className="mt-3 font-semibold text-light-subtext dark:text-subtext">
            Zaloguj się do panelu fundacji.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block space-y-2">
            <span className="font-bold">E-mail</span>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border-2 border-light-overlay bg-light-base px-4 py-3 outline-none focus:border-light-border dark:border-overlay dark:bg-base dark:focus:border-border"
              placeholder="fundacja@example.pl"
            />
          </label>

          <label className="block space-y-2">
            <span className="font-bold">Hasło</span>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border-2 border-light-overlay bg-light-base px-4 py-3 outline-none focus:border-light-border dark:border-overlay dark:bg-base dark:focus:border-border"
              placeholder="••••••••"
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
            to="/foundation/register"
            className="font-black text-light-border dark:text-border"
          >
            Zarejestruj fundację
          </Link>
        </p>
      </section>
    </main>
  );
}