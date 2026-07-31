import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FoundationRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Podaj nazwę fundacji.");
      return;
    }

    if (!email.trim()) {
      setError("Podaj adres e-mail.");
      return;
    }

    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Hasła nie są takie same.");
      return;
    }

    const foundation = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "registeredFoundation",
      JSON.stringify(foundation),
    );

    navigate("/foundation/login", {
      replace: true,
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-light-base p-6 text-light-text dark:bg-base dark:text-text">
      <section className="w-full max-w-lg rounded-3xl border-2 border-light-overlay bg-light-overlay/30 p-8 shadow-xl dark:border-overlay dark:bg-overlay/50">
        <div className="text-center">
          <h1 className="header text-3xl font-black">
            Rejestracja fundacji
          </h1>

          <p className="mt-3 font-semibold text-light-subtext dark:text-subtext">
            Utwórz lokalne konto testowe fundacji.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block space-y-2">
            <span className="font-bold">Nazwa fundacji</span>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border-2 border-light-overlay bg-light-base px-4 py-3 outline-none focus:border-light-border dark:border-overlay dark:bg-base dark:focus:border-border"
              placeholder="Np. Fundacja Koci Azyl"
            />
          </label>

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
              placeholder="Minimum 6 znaków"
            />
          </label>

          <label className="block space-y-2">
            <span className="font-bold">Powtórz hasło</span>

            <input
              type="password"
              value={repeatPassword}
              onChange={(event) =>
                setRepeatPassword(event.target.value)
              }
              className="w-full rounded-2xl border-2 border-light-overlay bg-light-base px-4 py-3 outline-none focus:border-light-border dark:border-overlay dark:bg-base dark:focus:border-border"
              placeholder="Powtórz hasło"
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
            Zarejestruj fundację
          </button>
        </form>

        <p className="mt-6 text-center font-semibold text-light-subtext dark:text-subtext">
          Masz już konto?{" "}
          <Link
            to="/foundation/login"
            className="font-black text-light-border dark:text-border"
          >
            Zaloguj się
          </Link>
        </p>
      </section>
    </main>
  );
}