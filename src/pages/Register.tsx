import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun } from "lucide-react";

import RegisterForm from "../components/register/RegisterForm";
import catImage from "../assets/register-cat.jpg";

function getInitialTheme() {
  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

function shouldShowInitialSkeleton() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function EditorialSkeleton() {
  const block = "register-skeleton-pulse rounded-lg bg-light-overlay/70 dark:bg-overlay/70";

  return (
    <aside
      aria-hidden="true"
      className="order-2 w-full overflow-hidden rounded-[26px] border border-light-border/35 bg-light-base min-[900px]:order-1 dark:border-border/40 dark:bg-base"
    >
      <div className={`${block} relative h-[260px] w-full rounded-none min-[900px]:h-[390px]`}>
        <img src={catImage} alt="" className="absolute inset-0 size-full opacity-0" />
      </div>
      <div className="px-5 py-7 sm:px-7 sm:py-8">
        <div className={`${block} h-8 w-56 max-w-full`} />
        <div className={`${block} mt-5 h-4 w-full`} />
        <div className={`${block} mt-2 h-4 w-11/12`} />
        <div className={`${block} mt-2 h-4 w-3/5`} />

        <div className="mt-7 border-t border-light-border/25 pt-5 dark:border-border/30">
          <div className={`${block} h-4 w-full`} />
          <div className={`${block} mt-2 h-4 w-3/4`} />
        </div>
      </div>
    </aside>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(getInitialTheme);
  const [initialLoading, setInitialLoading] = useState(shouldShowInitialSkeleton);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    if (!initialLoading) return;

    const timer = window.setTimeout(() => setInitialLoading(false), 0);
    return () => window.clearTimeout(timer);
  }, [initialLoading]);

  return (
    <div className="min-h-screen bg-light-base text-light-text selection:bg-light-border selection:text-white dark:bg-base dark:text-text dark:selection:bg-border">
      <style>{`
        @keyframes register-skeleton-pulse {
          0%, 100% { opacity: 0.48; }
          50% { opacity: 0.82; }
        }

        @keyframes register-content-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .register-skeleton-pulse {
          animation: register-skeleton-pulse 900ms ease-in-out infinite;
        }

        .register-reveal {
          animation: register-content-fade 320ms ease-out both;
        }

        .register-reveal-heading {
          animation-delay: 35ms;
        }

        .register-reveal-form {
          animation-delay: 70ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .register-skeleton-pulse,
          .register-reveal,
          .register-reveal-heading,
          .register-reveal-form {
            animation: none;
          }
        }
      `}</style>
      <header>
        <nav
          aria-label="Nawigacja rejestracji"
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

          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
            aria-pressed={dark}
            className="btn ml-auto grid size-9 place-items-center rounded-lg text-light-subtext hover:bg-light-overlay hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border dark:text-subtext dark:hover:bg-overlay dark:hover:text-text dark:focus-visible:outline-border"
          >
            {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      <main className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center px-4 py-8 sm:px-7 sm:py-12 min-[900px]:px-1">
        <div className="grid w-full max-w-[440px] items-center gap-[18px] min-[900px]:max-w-[888px] min-[900px]:grid-cols-[430px_440px]">
          <section
            aria-labelledby="register-heading"
            className="register-reveal order-1 w-full rounded-[26px] border border-light-border/35 bg-light-base px-5 py-7 sm:px-8 sm:py-8 min-[900px]:order-2 dark:border-border/40 dark:bg-base"
          >
            <Link
              to="/"
              aria-label="Meowly — strona główna"
              className="register-reveal inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:focus-visible:outline-border"
            >
              <img
                src="/logo-marketing.png"
                alt="Meowly"
                className="h-7 w-auto object-contain"
              />
            </Link>

            <div className="register-reveal register-reveal-form">
              <RegisterForm
                onSuccess={() => {
                  setTimeout(() => {
                    navigate("/login");
                  }, 1500);
                }}
              />
            </div>

            <p className="register-reveal register-reveal-form mt-6 border-t border-light-border/25 pt-5 text-center text-sm text-light-subtext dark:border-border/30 dark:text-subtext">
              Masz już konto?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-md font-bold text-[#a94d11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border dark:text-[#e27a31] dark:focus-visible:outline-border"
              >
                Zaloguj się
              </button>
            </p>
          </section>

          {initialLoading ? (
            <>
              <span role="status" className="sr-only">
                Ładowanie informacji o Meowly
              </span>
              <EditorialSkeleton />
            </>
          ) : (
            <aside
              aria-labelledby="register-editorial-heading"
              className="register-reveal register-reveal-form order-2 w-full overflow-hidden rounded-[26px] border border-light-border/35 bg-light-base min-[900px]:order-1 dark:border-border/40 dark:bg-base"
            >
              <img
                src={catImage}
                alt="Rudy kot odpoczywający w słońcu"
                className="h-[260px] w-full object-cover object-center min-[900px]:h-[390px]"
              />
              <div className="px-5 py-7 sm:px-7 sm:py-8">
                <h2
                  id="register-editorial-heading"
                  className="text-[2rem] font-black leading-none tracking-[-0.04em]"
                >
                  Pomagaj po swojemu.
                </h2>
                <p className="mt-5 text-sm leading-6 text-light-text dark:text-text">
                  Zgłoś kota, którego spotkasz, albo sprawdź, gdzie ktoś w Twojej okolicy potrzebuje wsparcia.
                </p>
                <p className="mt-7 border-t border-light-border/25 pt-5 text-sm leading-6 text-light-subtext dark:border-border/30 dark:text-subtext">
                  Meowly łączy mieszkańców i fundacje w jednym miejscu.
                </p>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
