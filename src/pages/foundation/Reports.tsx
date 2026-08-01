import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

export default function Reports() {
  const [dark, setDark] = useState<boolean>(localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches));

  return (
    <main className="grid min-h-screen bg-light-base dark:bg-base dark:border-[#8b693a] shadow-2xl lg:grid-cols-[290px_1fr]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-col">

        <Navbar 
          dark={ dark || false }
          setDark={ setDark }
        />

        <div className="space-y-8 p-6 lg:p-10">
          <section className="mb-8">
            <h1 className="text-5xl font-black text-light-text dark:text-text">
              Zgłoszenia
            </h1>

            <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
              Zgłoszenia przypisane do Twojej fundacji.
            </p>
          </section>

          <div className="rounded-3xl border-2 border-dashed border-light-border bg-light-overlay/30 p-10 text-center dark:border-border dark:bg-overlay/40">
            <h2 className="text-2xl font-black text-light-text dark:text-text">
              Brak zgłoszeń
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}