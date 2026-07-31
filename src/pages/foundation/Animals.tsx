import { useEffect, useState } from "react";
import AnimalForm from "../../components/foundation/AnimalForm";
import { animalService } from "../../components/services/animalService";
import type { Animal } from "../../types/Animal";

export default function Animals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    setAnimals(animalService.getAll());
  }, []);

  function handleAddAnimal(
    animalData: Omit<Animal, "id" | "createdAt">,
  ) {
    const createdAnimal = animalService.create(animalData);

    setAnimals((currentAnimals) => [
      createdAnimal,
      ...currentAnimals,
    ]);

    setFormOpen(false);
  }

  function handleDeleteAnimal(animal: Animal) {
    const confirmed = window.confirm(
      `Czy na pewno chcesz usunąć zwierzę „${animal.name}”?`,
    );

    if (!confirmed) {
      return;
    }

    animalService.delete(animal.id);

    setAnimals((currentAnimals) =>
      currentAnimals.filter(
        (currentAnimal) => currentAnimal.id !== animal.id,
      ),
    );
  }

  return (
    <>
      {formOpen && (
        <AnimalForm
          onSubmit={handleAddAnimal}
          onCancel={() => setFormOpen(false)}
        />
      )}

      <section className="space-y-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="header text-3xl font-black text-light-text dark:text-text">
              Zwierzęta
            </h1>

            <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
              Zwierzęta dodane przez Twoją fundację.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="btn rounded-2xl bg-light-border px-6 py-4 font-black text-text dark:bg-border"
          >
            + Dodaj zwierzę
          </button>
        </div>

        {animals.length === 0 ? (
          <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-light-border bg-light-overlay/30 p-8 text-center dark:border-border dark:bg-overlay/40">
            <div className="text-6xl" aria-hidden="true">
              🐾
            </div>

            <h2 className="mt-5 text-2xl font-black text-light-text dark:text-text">
              Nie dodano jeszcze żadnych zwierząt
            </h2>

            <p className="mt-3 max-w-md font-semibold text-light-subtext dark:text-subtext">
              Lista jest pusta. Dodaj pierwsze zwierzę znajdujące się
              pod opieką fundacji.
            </p>

            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="btn mt-7 rounded-2xl bg-light-border px-6 py-4 font-black text-text dark:bg-border"
            >
              Dodaj pierwsze zwierzę
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {animals.map((animal) => (
              <article
                key={animal.id}
                className="overflow-hidden rounded-3xl border-2 border-light-overlay bg-light-overlay/30 dark:border-overlay dark:bg-overlay/50"
              >
                <div className="aspect-[16/10] bg-light-overlay dark:bg-overlay">
                  {animal.imageUrl ? (
                    <img
                      src={animal.imageUrl}
                      alt={animal.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl">
                      🐱
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-black text-light-text dark:text-text">
                        {animal.name}
                      </h2>

                      <p className="mt-1 font-semibold text-light-subtext dark:text-subtext">
                        {animal.species} · {animal.gender}
                      </p>
                    </div>

                    <span className="rounded-full bg-light-border/20 px-3 py-1 text-sm font-bold text-light-text dark:bg-border/30 dark:text-text">
                      {animal.status}
                    </span>
                  </div>

                  <p className="mt-4 font-bold text-light-text dark:text-text">
                    Wiek: {animal.age}
                  </p>

                  {animal.description && (
                    <p className="mt-3 line-clamp-3 font-semibold text-light-subtext dark:text-subtext">
                      {animal.description}
                    </p>
                  )}

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      className="btn flex-1 rounded-2xl border-2 border-light-border px-4 py-3 font-bold text-light-border dark:border-border dark:text-border"
                    >
                      Edytuj
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAnimal(animal)}
                      className="btn rounded-2xl border-2 border-red-500/50 px-4 py-3 font-bold text-red-600 dark:text-red-400"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}