import { useEffect, useState } from "react";

import AnimalForm from "../../components/foundation/AnimalForm";
import MediaPreview from "../../components/foundation/MediaPreview";
import { animalService } from "../../components/services/animalService";

import type {
  Animal,
  AnimalFormData,
} from "../../types/Animal";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

export default function Animals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editedAnimal, setEditedAnimal] =
    useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dark, setDark] = useState<boolean>(localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches));

  useEffect(() => {
    let active = true;

    async function loadAnimals() {
      try {
        setLoading(true);
        setError("");

        const savedAnimals = await animalService.getAll();

        if (active) {
          setAnimals(savedAnimals);
        }
      } catch (loadError) {
        console.error(
          "Nie udało się pobrać zwierząt:",
          loadError,
        );

        if (active) {
          setError("Nie udało się pobrać zwierząt.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAnimals();

    return () => {
      active = false;
    };
  }, []);

  function openCreateForm() {
    setEditedAnimal(null);
    setFormOpen(true);
  }

  function openEditForm(animal: Animal) {
    setEditedAnimal(animal);
    setFormOpen(true);
  }

  function closeForm() {
    setEditedAnimal(null);
    setFormOpen(false);
  }

  async function handleSubmit(data: AnimalFormData) {
    setError("");

    try {
      if (editedAnimal) {
        const updatedAnimal = await animalService.update(
          editedAnimal.id,
          data,
        );

        if (!updatedAnimal) {
          setError("Nie znaleziono zwierzęcia do edycji.");
          return;
        }

        setAnimals((currentAnimals) =>
          currentAnimals.map((animal) =>
            animal.id === updatedAnimal.id
              ? updatedAnimal
              : animal,
          ),
        );
      } else {
        const createdAnimal =
          await animalService.create(data);

        setAnimals((currentAnimals) => [
          createdAnimal,
          ...currentAnimals,
        ]);
      }

      closeForm();
    } catch (submitError) {
      console.error(
        "Nie udało się zapisać zwierzęcia:",
        submitError,
      );

      const message =
        submitError instanceof Error
          ? submitError.message
          : "Nie udało się zapisać zwierzęcia.";

      setError(message);
      throw submitError;
    }
  }

  async function handleDeleteAnimal(animal: Animal) {
    const confirmed = window.confirm(
      `Czy na pewno chcesz usunąć zwierzę „${animal.name}”?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await animalService.delete(animal.id);

      setAnimals((currentAnimals) =>
        currentAnimals.filter(
          (currentAnimal) =>
            currentAnimal.id !== animal.id,
        ),
      );
    } catch (deleteError) {
      console.error(
        "Nie udało się usunąć zwierzęcia:",
        deleteError,
      );

      setError("Nie udało się usunąć zwierzęcia.");
    }
  }

  if (loading) {
    return (
      <section className="flex min-h-96 items-center justify-center">
        <p className="font-bold text-light-subtext dark:text-subtext">
          Ładowanie zwierząt...
        </p>
      </section>
    );
  }
  
  return (
    <>
      {formOpen && (
        <AnimalForm
          animal={editedAnimal}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

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
          <div className="flex items-center">
            <section>
              <h1 className="text-5xl font-black text-light-text dark:text-text">
                Zwierzęta
              </h1>

              <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
                Zwierzęta dodane przez Twoją fundację
              </p>
            </section>

            <button
              type="button"
              onClick={openCreateForm}
              className="btn rounded-2xl bg-light-border px-6 py-4 font-black text-text dark:bg-border ml-auto h-[fit-content]"
            >
              + Dodaj zwierzę
            </button>
          </div>

        {error && (
          <p className="rounded-2xl border-2 border-red-500/40 bg-red-500/10 px-4 py-3 font-bold text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {animals.length === 0 ? (
          <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-light-border bg-light-overlay/30 p-8 text-center dark:border-border dark:bg-overlay/40">
            <div
              className="text-6xl"
              aria-hidden="true"
            >
              🐾
            </div>

            <h2 className="mt-5 text-2xl font-black text-light-text dark:text-text">
              Nie dodano jeszcze żadnych zwierząt
            </h2>

            <p className="mt-3 max-w-md font-semibold text-light-subtext dark:text-subtext">
              Lista jest pusta. Dodaj pierwsze zwierzę
              znajdujące się pod opieką fundacji.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
              className="btn mt-7 rounded-2xl bg-light-border px-6 py-4 font-black text-text dark:bg-border"
            >
              Dodaj pierwsze zwierzę
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {animals.map((animal) => {
              const firstMedia = animal.media?.[0];

              return (
                <article
                  key={animal.id}
                  className="overflow-hidden rounded-3xl border-2 border-light-overlay bg-light-overlay/30 dark:border-overlay dark:bg-overlay/50"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-light-overlay dark:bg-overlay">
                    {firstMedia ? (
                      <MediaPreview
                        media={firstMedia}
                        className="h-full w-full object-cover"
                        controls={
                          firstMedia.type === "video"
                        }
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
                          {animal.breed
                            ? ` · ${animal.breed}`
                            : ""}
                        </p>
                      </div>

                      <span className="rounded-full bg-light-border/20 px-3 py-1 text-sm font-bold text-light-text dark:bg-border/30 dark:text-text">
                        {animal.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-light-overlay px-3 py-2 text-sm font-bold text-light-subtext dark:bg-overlay dark:text-subtext">
                        {animal.gender}
                      </span>

                      <span className="rounded-full bg-light-overlay px-3 py-2 text-sm font-bold text-light-subtext dark:bg-overlay dark:text-subtext">
                        {animal.age}
                      </span>
                    </div>

                    {animal.description && (
                      <p className="mt-4 line-clamp-3 whitespace-pre-line font-semibold text-light-subtext dark:text-subtext">
                        {animal.description}
                      </p>
                    )}

                    {animal.media?.length > 0 && (
                      <p className="mt-4 text-sm font-bold text-light-subtext dark:text-subtext">
                        Zdjęcia i filmy:{" "}
                        {animal.media.length}
                      </p>
                    )}

                    {animal.healthInformation && (
                      <div className="mt-4">
                        <h3 className="font-black text-light-text dark:text-text">
                          Zdrowie
                        </h3>

                        <p className="mt-1 line-clamp-2 whitespace-pre-line text-sm font-semibold text-light-subtext dark:text-subtext">
                          {animal.healthInformation}
                        </p>
                      </div>
                    )}

                    {animal.requirements && (
                      <div className="mt-4">
                        <h3 className="font-black text-light-text dark:text-text">
                          Wymagania adopcyjne
                        </h3>

                        <p className="mt-1 line-clamp-2 whitespace-pre-line text-sm font-semibold text-light-subtext dark:text-subtext">
                          {animal.requirements}
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(animal)
                        }
                        className="btn flex-1 rounded-2xl border-2 border-light-border px-4 py-3 font-bold text-light-border dark:border-border dark:text-border"
                      >
                        Edytuj
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteAnimal(animal)
                        }
                        className="btn rounded-2xl border-2 border-red-500/50 px-4 py-3 font-bold text-red-600 dark:text-red-400"
                      >
                        Usuń
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        </div>
      </div>
      </main>
    </>
  );
}