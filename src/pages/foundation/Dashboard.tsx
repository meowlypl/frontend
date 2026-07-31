import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { animalService } from "../../components/services/animalService";
import type { Animal } from "../../types/Animal";

export default function FoundationDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    setAnimals(animalService.getAll());
  }, []);

  const availableForAdoption = animals.filter(
    (animal) => animal.status === "Do adopcji",
  ).length;

  const animalsInTreatment = animals.filter(
    (animal) => animal.status === "W trakcie leczenia",
  ).length;

  return (
    <section className="space-y-8">
      <div>
        <h1 className="header text-3xl font-black text-light-text dark:text-text">
          Dashboard fundacji
        </h1>

        <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
          Podsumowanie danych dodanych przez Twoją fundację.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Link
          to="/foundation/animals"
          className="card-hover rounded-3xl border-2 border-light-overlay bg-light-overlay/40 p-6 dark:border-overlay dark:bg-overlay/60"
        >
          <p className="font-bold text-light-subtext dark:text-subtext">
            Wszystkie zwierzęta
          </p>

          <p className="mt-3 text-4xl font-black text-light-text dark:text-text">
            {animals.length}
          </p>
        </Link>

        <Link
          to="/foundation/animals"
          className="card-hover rounded-3xl border-2 border-light-overlay bg-light-overlay/40 p-6 dark:border-overlay dark:bg-overlay/60"
        >
          <p className="font-bold text-light-subtext dark:text-subtext">
            Do adopcji
          </p>

          <p className="mt-3 text-4xl font-black text-light-text dark:text-text">
            {availableForAdoption}
          </p>
        </Link>

        <Link
          to="/foundation/animals"
          className="card-hover rounded-3xl border-2 border-light-overlay bg-light-overlay/40 p-6 dark:border-overlay dark:bg-overlay/60"
        >
          <p className="font-bold text-light-subtext dark:text-subtext">
            W trakcie leczenia
          </p>

          <p className="mt-3 text-4xl font-black text-light-text dark:text-text">
            {animalsInTreatment}
          </p>
        </Link>
      </div>

      {animals.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-light-border bg-light-overlay/30 p-10 text-center dark:border-border dark:bg-overlay/40">
          <h2 className="text-2xl font-black text-light-text dark:text-text">
            Brak danych do wyświetlenia
          </h2>

          <p className="mx-auto mt-3 max-w-xl font-semibold text-light-subtext dark:text-subtext">
            Dashboard jest pusty, ponieważ fundacja nie dodała jeszcze
            żadnych zwierząt.
          </p>

          <Link
            to="/foundation/animals"
            className="btn mt-7 inline-block rounded-2xl bg-light-border px-6 py-4 font-black text-text dark:bg-border"
          >
            Dodaj pierwsze zwierzę
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-light-overlay bg-light-overlay/30 p-6 dark:border-overlay dark:bg-overlay/50">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-black text-light-text dark:text-text">
              Ostatnio dodane
            </h2>

            <Link
              to="/foundation/animals"
              className="font-bold text-light-border dark:text-border"
            >
              Zobacz wszystkie
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {animals.slice(0, 5).map((animal) => (
              <article
                key={animal.id}
                className="flex flex-col justify-between gap-3 rounded-2xl border-2 border-light-overlay bg-light-base p-4 dark:border-overlay dark:bg-base sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-black text-light-text dark:text-text">
                    {animal.name}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-light-subtext dark:text-subtext">
                    {animal.species} · {animal.age}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-light-border/20 px-3 py-1 text-sm font-bold text-light-text dark:bg-border/30 dark:text-text">
                  {animal.status}
                </span>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}