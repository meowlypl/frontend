import { useState } from "react";
import FoundationMobileMenu from "./FoundationMobileMenu";

interface FoundationNavbarProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FoundationNavbar({
  dark,
  setDark,
}: FoundationNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const foundation = JSON.parse(
    localStorage.getItem("foundationUser") || "null",
  );

  const foundationName = foundation?.name || "Fundacja Meowly";
  const avatar = foundation?.avatar;

  function toggleTheme() {
    const newDarkMode = !dark;

    localStorage.theme = newDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newDarkMode);

    setDark(newDarkMode);
  }

  return (
    <>
      <FoundationMobileMenu
        visible={menuOpen}
        dark={dark}
        closeMenu={() => setMenuOpen(false)}
      />

      <header className="flex items-center bg-light-base px-5 pt-5 dark:bg-base sm:px-10 sm:pt-8">
        <div>
          <img
            src={dark ? "/logo_dark.svg" : "/logo_light.svg"}
            alt="Meowly"
            className="h-14 sm:hidden"
          />

          <h1 className="header hidden text-3xl font-black text-light-text dark:text-text sm:block">
            Dzień dobry, {foundationName} 👋
          </h1>

          <p className="mt-2 hidden font-semibold text-light-subtext dark:text-subtext sm:block">
            Zarządzaj zwierzętami, zgłoszeniami i wolontariuszami.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            className="btn flex h-12 w-12 items-center justify-center rounded-full bg-light-overlay text-2xl dark:bg-overlay"
            onClick={toggleTheme}
            aria-label="Zmień motyw"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            className="btn flex h-12 w-12 items-center justify-center rounded-full bg-light-border font-black text-text dark:bg-border"
            aria-label="Profil fundacji"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar fundacji"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              foundationName.charAt(0).toUpperCase()
            )}
          </button>

          <button
            type="button"
            className="btn text-3xl text-light-subtext dark:text-subtext lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Otwórz menu"
            style={{ fontFamily: "Material Symbols Outlined" }}
          >
            menu
          </button>
        </div>
      </header>
    </>
  );
}