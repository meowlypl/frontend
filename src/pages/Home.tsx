import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, PawPrint, Sun } from "lucide-react";
import PublicCatCatalog from "../components/landing/PublicCatCatalog";
import ReportInfoDialog from "../components/landing/ReportInfoDialog";

function getInitialTheme() {
  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export default function Home() {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      ".meowly-landing .meowly-landing-logo, .meowly-landing h1, .meowly-landing h2",
    );
    const revealAll = () => {
      targets.forEach((target) =>
        target.classList.add("meowly-landing-revealed"),
      );
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("meowly-landing-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="meowly-landing min-h-screen overflow-x-hidden bg-light-base text-light-text selection:bg-light-border selection:text-white dark:bg-base dark:text-text dark:selection:bg-border">
      <style>{`
        @keyframes meowly-landing-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .meowly-landing-logo,
        .meowly-landing h1,
        .meowly-landing h2 {
          opacity: 0;
        }

        .meowly-landing-logo.meowly-landing-revealed,
        .meowly-landing h1.meowly-landing-revealed,
        .meowly-landing h2.meowly-landing-revealed {
          animation: meowly-landing-fade-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .meowly-landing h1 {
          animation-duration: 700ms;
          animation-delay: 80ms;
        }

        .meowly-landing h2 {
          animation-delay: 40ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .meowly-landing-logo,
          .meowly-landing h1,
          .meowly-landing h2 {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
      <header className="sticky top-0 z-50 border-b border-light-border/25 bg-light-base dark:border-border/30 dark:bg-base">
        <nav
          aria-label="Główna nawigacja"
          className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-7 lg:px-10"
        >
          <a href="#start" aria-label="Meowly — strona główna" className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:focus-visible:outline-border">
            <img src="/logo-marketing.png" alt="Meowly" className="meowly-landing-logo h-8 w-auto object-contain sm:h-9" />
          </a>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              aria-label={dark ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
              aria-pressed={dark}
              className="btn grid size-9 place-items-center rounded-lg text-light-subtext hover:bg-light-overlay hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border dark:text-subtext dark:hover:bg-overlay dark:hover:text-text dark:focus-visible:outline-border"
            >
              {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
            </button>
            <Link
              to="/login"
              className="btn hidden h-9 items-center rounded-lg px-3 text-sm font-bold text-light-subtext hover:bg-light-overlay hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border sm:flex dark:text-subtext dark:hover:bg-overlay dark:hover:text-text dark:focus-visible:outline-border"
            >
              Zaloguj się
            </Link>
            <Link
              to="/register"
              className="btn flex h-9 items-center rounded-lg bg-[#c15a15] px-3.5 text-sm font-bold text-white hover:bg-[#a94d11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border sm:px-4 dark:bg-[#d56b24] dark:hover:bg-[#e27a31] dark:focus-visible:outline-border"
            >
              Załóż konto
            </Link>
          </div>
        </nav>
      </header>

      <main id="start">
        <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl flex-col items-center justify-center px-5 py-20 text-center sm:px-7 sm:py-24 lg:px-10">
          <h1 className="header max-w-5xl text-[clamp(3rem,8vw,7.5rem)] leading-[0.98] text-light-text dark:text-text">
            Pomóż kotom w swojej okolicy.
          </h1>
          <div className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <a
              href="#koty"
              className="btn inline-flex h-14 items-center justify-center rounded-2xl bg-[#c15a15] px-7 font-black text-white shadow-[0_8px_0_rgba(90,48,16,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:shadow-[0_8px_0_rgba(0,0,0,0.35)] dark:focus-visible:outline-border"
            >
              Zobacz koty
            </a>
            <Link
              to="/register"
              className="btn inline-flex h-14 items-center justify-center rounded-2xl border border-light-border/55 px-7 font-black text-light-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:border-border/55 dark:text-text dark:focus-visible:outline-border"
            >
              Załóż konto
            </Link>
          </div>
        </section>

        <PublicCatCatalog />

        <section className="border-t border-light-border/30 px-5 py-24 text-center sm:px-7 sm:py-32 dark:border-border/30">
          <PawPrint className="mx-auto text-[#c15a15]" size={32} strokeWidth={1.8} aria-hidden="true" />
          <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.045em] sm:text-6xl">Możesz zrobić więcej.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-light-subtext dark:text-subtext">Załóż konto i pomóż kotom w swojej okolicy.</p>
          <Link to="/register" className="btn mt-9 inline-flex h-14 items-center justify-center rounded-2xl bg-[#c15a15] px-7 font-black text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:focus-visible:outline-border">
            Załóż konto
          </Link>
        </section>
      </main>

      <footer className="border-t border-light-border/30 dark:border-border/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-light-subtext sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10 dark:text-subtext">
          <div className="flex items-center gap-3">
            <a
              href="#start"
              aria-label="Meowly — wróć na początek strony"
              className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:focus-visible:outline-border"
            >
              <img src="/logo-marketing.png" alt="Meowly" className="h-8 w-auto object-contain" />
            </a>
            <span>Koty w Twojej okolicy.</span>
          </div>
          <div className="flex items-center gap-5 font-bold">
            <Link className="hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:hover:text-text dark:focus-visible:outline-border" to="/login">Logowanie</Link>
            <Link className="hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:hover:text-text dark:focus-visible:outline-border" to="/register">Rejestracja</Link>
          </div>
        </div>
      </footer>

      <ReportInfoDialog />
    </div>
  );
}
