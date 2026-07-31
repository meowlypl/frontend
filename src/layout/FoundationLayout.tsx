import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import FoundationSidebar from "./FoundationSidebar";
import FoundationNavbar from "./FoundationNavbar";

export default function FoundationLayout() {
  const [dark, setDark] = useState(false);

  const foundationToken = localStorage.getItem(
    "foundationToken",
  );

  useEffect(() => {
    const darkMode =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches);

    setDark(darkMode);

    document.documentElement.classList.toggle(
      "dark",
      darkMode,
    );
  }, []);

  if (!foundationToken) {
    return (
      <Navigate
        to="/foundation/login"
        replace
      />
    );
  }

  return (
    <main className="min-h-screen bg-light-base text-light-text dark:bg-base dark:text-text lg:grid lg:grid-cols-[288px_1fr]">
      <div className="hidden lg:block">
        <FoundationSidebar dark={dark} />
      </div>

      <div className="min-w-0">
        <FoundationNavbar
          dark={dark}
          setDark={setDark}
        />

        <div className="p-5 sm:p-8 lg:p-10">
          <Outlet />
        </div>
      </div>
    </main>
  );
}