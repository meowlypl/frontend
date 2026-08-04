import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { startAuthentication } from "@simplewebauthn/browser";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

function getInitialTheme() {
  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export default function Login() {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  if(user) window.location.href = '/dashboard'

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.theme = dark ? "dark" : "light";
  }, [dark]);

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
      document.requestStorageAccess().then(
        () => {
          console.log("cookie access granted");
        },
        () => {
          console.log("cookie access denied");
        },
      )
      const response = await fetch(
        `${API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (data.code == 200) {
        localStorage.setItem(
          "meowlyUser",
          JSON.stringify(data.user)
        )
        return window.location.href = data.user.role == 'foundation' ? "/foundation/dashboard" : "/dashboard";
      }

      const messages = {
        401: 'Niepoprawny email lub hasło.',
        403: 'Najpierw potwierdź adres email.'
      }

      setMessage(
        messages[data.code as keyof typeof messages] || "Nie udało się zalogować."
      );
    } catch (error) {
      console.error(error);
      setMessage("Nie można połączyć się z serwerem.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-light-base text-light-text selection:bg-light-border selection:text-white dark:bg-base dark:text-text dark:selection:bg-border">
      <style>{`
        @keyframes login-content-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .login-reveal {
          animation: login-content-fade 320ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .login-reveal {
            animation: none;
          }
        }
      `}</style>
      <header>
        <nav
          aria-label="Nawigacja logowania"
          className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-7 lg:px-10"
        >
          <Link
            to="/"
            aria-label="Wróć na stronę główną"
            className="btn inline-flex h-9 items-center gap-2 rounded-lg px-2 text-sm font-bold text-light-subtext hover:bg-light-overlay hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border dark:text-subtext dark:hover:bg-overlay dark:hover:text-text dark:focus-visible:outline-border"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Strona główna</span>
          </Link>

          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              aria-label={dark ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
              aria-pressed={dark}
              className="btn grid size-9 place-items-center rounded-lg text-light-subtext hover:bg-light-overlay hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border dark:text-subtext dark:hover:bg-overlay dark:hover:text-text dark:focus-visible:outline-border"
            >
              {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      <main className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center px-4 py-8 sm:px-7 sm:py-12">
        <section
          aria-labelledby="login-heading"
          className="login-reveal w-full max-w-[400px] rounded-[26px] border border-light-border/35 bg-light-base px-5 py-7 sm:px-8 sm:py-8 dark:border-border/40 dark:bg-base"
        >
            <Link
              to="/"
              aria-label="Meowly — strona główna"
              className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:focus-visible:outline-border"
            >
              <img
                src="/logo-marketing.png"
                alt="Meowly"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <h1
              id="login-heading"
              className="mt-7 text-[2rem] font-black leading-none tracking-[-0.04em]"
            >
              Zaloguj się
            </h1>

            <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <div>
              <label htmlFor="login-email" className="text-sm font-bold">
                Email
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="twoj@email.com"
                className="mt-1.5 h-[52px] w-full rounded-xl border border-light-border/45 bg-light-overlay/25 px-4 text-light-text outline-none transition-colors placeholder:text-light-subtext/65 focus:border-[#c15a15] focus:ring-2 focus:ring-[#c15a15]/20 dark:border-border/45 dark:bg-overlay/25 dark:text-text dark:placeholder:text-subtext/65"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="text-sm font-bold">
                Hasło
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-1.5 h-[52px] w-full rounded-xl border border-light-border/45 bg-light-overlay/25 px-4 text-light-text outline-none transition-colors placeholder:text-light-subtext/65 focus:border-[#c15a15] focus:ring-2 focus:ring-[#c15a15]/20 dark:border-border/45 dark:bg-overlay/25 dark:text-text dark:placeholder:text-subtext/65"
              />
            </div>

            <div className="flex items-center justify-between gap-3 py-0.5 text-[13px] max-[350px]:flex-col max-[350px]:items-start">
              <label className="flex min-w-0 items-center gap-2.5 text-light-subtext dark:text-subtext">
                <input
                  type="checkbox"
                  className="size-4 shrink-0 rounded border-light-border accent-[#c15a15] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c15a15] dark:border-border"
                />
                <span>Zapamiętaj mnie</span>
              </label>
              <button
                type="button"
                className="shrink-0 rounded-md font-bold text-light-subtext hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border dark:text-subtext dark:hover:text-text dark:focus-visible:outline-border"
              >
                Nie pamiętasz hasła?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn mt-3 h-[52px] w-full rounded-xl bg-light-border dark:bg-border font-semibold text-white hover:brightness-110"
            >
              {loading ? "Logowanie..." : "Zaloguj się"}
            </button>

            {message && (
              <div
                role="alert"
                className="rounded-xl border border-red-300/70 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 dark:border-red-900/80 dark:bg-red-950/30 dark:text-red-300"
              >
                {message}
              </div>
            )}
            </form>

            <button
              className="btn mt-3 h-[52px] w-full rounded-xl bg-light-border dark:bg-border font-semibold text-white hover:brightness-110"
              onClick={async () => {
                const API = `${import.meta.env.VITE_API_URL}/passkey`
                try {
                  const opt = await (fetch(`${API}/opt/login`).then(r => r.json()))
                  const credential = await startAuthentication({ optionsJSON: opt.options })

                  const res = await (fetch(`${API}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ credential, token: opt.token }),
                  })).then(r => r.json())

                  if (res.verified) {
                    localStorage.setItem(
                      "meowlyUser",
                      JSON.stringify(res.user)
                    )
                    return window.location.href = res.user.role == 'foundation' ? "/foundation/dashboard" : "/dashboard";
                  } else alert('Logowanie nie powiodło')
                } catch (e) {
                  console.error(e)
                  alert('Coś poszło nie tak')
                }
              }}
            >
              Użyj klucza dostępu
            </button>

            <p className="mt-6 border-t border-light-border/25 pt-5 text-center text-sm text-light-subtext dark:border-border/30 dark:text-subtext">
              Nie masz jeszcze konta?{" "}
              <Link
                to="/register"
                className="rounded-md font-bold text-[#a94d11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border dark:text-[#e27a31] dark:focus-visible:outline-border"
              >
                Załóż konto
              </Link>
            </p>
        </section>
      </main>
    </div>
  );
}
