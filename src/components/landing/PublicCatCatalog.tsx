import { useEffect, useMemo, useRef, useState } from "react";
import { Cat, RotateCcw, X } from "lucide-react";
import type { Animal, AnimalStatus } from "../../types/Animal";
import PublicAnimalMedia from "./PublicAnimalMedia";
import { readPublicAnimals } from "./readPublicAnimals";

type Filter = "Wszystkie" | Extract<AnimalStatus, "Do adopcji" | "W trakcie leczenia">;

const FILTERS: Filter[] = ["Wszystkie", "Do adopcji", "W trakcie leczenia"];

function statusStyles(status: AnimalStatus) {
  if (status === "Do adopcji") return "bg-[#c15a15]/10 text-[#9f470d] dark:bg-[#d56b24]/15 dark:text-[#f09350]";
  if (status === "W trakcie leczenia") return "bg-amber-500/15 text-amber-800 dark:text-amber-300";
  return "bg-light-overlay text-light-subtext dark:bg-overlay dark:text-subtext";
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-3 xl:grid-cols-4" aria-label="Ładowanie kotów" aria-busy="true">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="animate-pulse">
          <div className="aspect-[4/5] rounded-2xl bg-light-overlay dark:bg-overlay" />
          <div className="mt-3 h-4 w-2/5 rounded bg-light-overlay dark:bg-overlay" />
          <div className="mt-2 h-3 w-3/4 rounded bg-light-overlay dark:bg-overlay" />
        </div>
      ))}
    </div>
  );
}

type AnimalDialogProps = {
  animal: Animal;
  onClose: () => void;
};

function AnimalDialog({ animal, onClose }: AnimalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="public-animal-dialog-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(44rem,calc(100%-2rem))] overflow-y-auto rounded-[28px] border border-light-border/40 bg-light-base p-0 text-light-text shadow-2xl backdrop:bg-black/55 dark:border-border/40 dark:bg-base dark:text-text"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative">
        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label={`Zamknij profil kota ${animal.name}`}
          className="btn absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-xl bg-light-base/95 text-light-text shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c15a15] dark:bg-base/95 dark:text-text"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {animal.media?.[0] ? (
          <PublicAnimalMedia
            media={animal.media[0]}
            alt={`${animal.name} — zdjęcie profilowe`}
            controls={animal.media[0].type === "video"}
            className="max-h-[60dvh] w-full object-cover"
          />
        ) : (
          <div className="grid aspect-[4/3] place-items-center bg-light-overlay dark:bg-overlay">
            <Cat size={54} className="text-light-subtext dark:text-subtext" aria-hidden="true" />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 id="public-animal-dialog-title" className="text-3xl font-black tracking-[-0.035em] sm:text-4xl">{animal.name}</h3>
            <span className={`rounded-lg px-2.5 py-1 text-xs font-black ${statusStyles(animal.status)}`}>{animal.status}</span>
          </div>
          <p className="mt-2 font-bold text-light-subtext dark:text-subtext">
            {[animal.breed, animal.gender, animal.age].filter(Boolean).join(" · ")}
          </p>

          {animal.description && <p className="mt-6 whitespace-pre-line leading-7">{animal.description}</p>}

          <div className="mt-7 grid gap-6 border-t border-light-border/35 pt-7 sm:grid-cols-2 dark:border-border/35">
            {animal.healthInformation && (
              <section>
                <h4 className="text-sm font-black uppercase tracking-[0.08em] text-light-subtext dark:text-subtext">Zdrowie</h4>
                <p className="mt-2 whitespace-pre-line leading-7">{animal.healthInformation}</p>
              </section>
            )}
            {animal.requirements && (
              <section>
                <h4 className="text-sm font-black uppercase tracking-[0.08em] text-light-subtext dark:text-subtext">Czego potrzebuje</h4>
                <p className="mt-2 whitespace-pre-line leading-7">{animal.requirements}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function PublicCatCatalog() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("Wszystkie");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);

    readPublicAnimals()
      .then((result) => {
        if (active) setAnimals(result);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const availableFilterCount = FILTERS.slice(1).filter((status) =>
    animals.some((animal) => animal.status === status),
  ).length;
  const showFilters = animals.length >= 3 && availableFilterCount > 1;

  const visibleAnimals = useMemo(
    () => filter === "Wszystkie" ? animals : animals.filter((animal) => animal.status === filter),
    [animals, filter],
  );

  return (
    <section id="koty" aria-labelledby="public-cats-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-12">
        <div className="rounded-[28px] border border-light-border/35 bg-light-overlay/55 px-4 py-5 sm:px-7 sm:py-7 lg:px-9 lg:py-9 dark:border-border/35 dark:bg-overlay/45">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 id="public-cats-heading" className="py-1 text-2xl font-black leading-none tracking-[-0.035em] sm:text-3xl">
            Koty
          </h2>

          {showFilters && (
            <div aria-label="Filtruj koty według statusu" className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-light-border/35 p-1 dark:border-border/35">
              {FILTERS.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                  className={`btn shrink-0 rounded-lg px-3 py-2 text-sm font-black focus-visible:outline-2 focus-visible:outline-[#c15a15] ${filter === item ? "bg-[#c15a15] text-white dark:bg-[#d56b24]" : "text-light-subtext hover:bg-light-overlay dark:text-subtext dark:hover:bg-overlay"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8">
          {loading ? (
            <CatalogSkeleton />
          ) : error ? (
            <div className="flex min-h-40 flex-col items-start justify-center rounded-2xl border border-light-border/35 bg-light-base/70 px-5 py-8 dark:border-border/35 dark:bg-base/45">
              <p className="font-black">Nie udało się wczytać kotów.</p>
              <button
                type="button"
                onClick={() => setReloadKey((current) => current + 1)}
                className="btn mt-4 inline-flex items-center gap-2 rounded-xl border border-light-border/50 px-4 py-2.5 text-sm font-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c15a15] dark:border-border/50"
              >
                <RotateCcw size={16} aria-hidden="true" /> Spróbuj ponownie
              </button>
            </div>
          ) : animals.length === 0 ? (
            <div className="flex min-h-40 flex-col items-start justify-center rounded-2xl border border-light-border/35 bg-light-base/70 px-5 py-8 dark:border-border/35 dark:bg-base/45">
              <Cat size={24} className="text-[#c15a15] dark:text-[#d56b24]" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-black tracking-[-0.025em]">Na razie jest tu pusto.</h3>
              <p className="mt-1.5 text-sm font-semibold text-light-subtext dark:text-subtext">Pierwsze koty pojawią się wkrótce.</p>
            </div>
          ) : visibleAnimals.length === 0 ? (
            <p className="rounded-2xl border border-light-border/35 bg-light-base/70 px-5 py-8 font-semibold text-light-subtext dark:border-border/35 dark:bg-base/45 dark:text-subtext">Brak kotów z tym statusem.</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-3 xl:grid-cols-4">
              {visibleAnimals.map((animal) => {
                const media = animal.media?.[0];
                return (
                  <article key={animal.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedAnimal(animal)}
                      aria-label={`Obejrzyj profil kota ${animal.name}`}
                      className="group block w-full rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c15a15]"
                    >
                      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-light-base dark:bg-base">
                        {media ? (
                          <PublicAnimalMedia
                            media={media}
                            alt={`${animal.name} — zdjęcie profilowe`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                          />
                        ) : (
                          <div className="grid h-full place-items-center">
                            <Cat size={44} className="text-light-subtext dark:text-subtext" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      <div className="pt-3">
                        <h3 className="truncate text-base font-black tracking-[-0.02em] sm:text-lg">{animal.name}</h3>
                        <p className="mt-0.5 truncate text-xs font-semibold text-light-subtext sm:text-sm dark:text-subtext">
                          {[animal.breed, animal.gender, animal.age].filter(Boolean).join(" · ")}
                        </p>
                        <span className={`mt-2 inline-flex rounded-lg px-2 py-1 text-[10px] font-black sm:text-[11px] ${statusStyles(animal.status)}`}>{animal.status}</span>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
        </div>
      </div>

      {selectedAnimal && <AnimalDialog animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />}
    </section>
  );
}
