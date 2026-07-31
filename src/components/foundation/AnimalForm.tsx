import { useState, type FormEvent } from "react";
import type {
  Animal,
  AnimalGender,
  AnimalStatus,
} from "../../types/Animal";

interface AnimalFormProps {
  onSubmit: (animal: Omit<Animal, "id" | "createdAt">) => void;
  onCancel: () => void;
}

interface AnimalFormState {
  name: string;
  species: string;
  gender: AnimalGender;
  age: string;
  status: AnimalStatus;
  description: string;
  imageUrl: string;
}

const initialForm: AnimalFormState = {
  name: "",
  species: "Kot",
  gender: "Nieznana",
  age: "",
  status: "Do adopcji",
  description: "",
  imageUrl: "",
};

const inputClasses =
  "w-full rounded-2xl border-2 border-light-overlay bg-light-base px-4 py-3 font-semibold text-light-text outline-none transition focus:border-light-border dark:border-overlay dark:bg-base dark:text-text dark:focus:border-border";

export default function AnimalForm({
  onSubmit,
  onCancel,
}: AnimalFormProps) {
  const [form, setForm] = useState<AnimalFormState>(initialForm);
  const [error, setError] = useState("");

  function updateField<Key extends keyof AnimalFormState>(
    field: Key,
    value: AnimalFormState[Key],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Podaj imię zwierzęcia.");
      return;
    }

    if (!form.species.trim()) {
      setError("Podaj gatunek zwierzęcia.");
      return;
    }

    if (!form.age.trim()) {
      setError("Podaj wiek zwierzęcia.");
      return;
    }

    onSubmit({
      name: form.name.trim(),
      species: form.species.trim(),
      gender: form.gender,
      age: form.age.trim(),
      status: form.status,
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-light-overlay bg-light-base p-6 shadow-2xl dark:border-overlay dark:bg-base sm:p-8">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 className="header text-2xl font-black text-light-text dark:text-text">
              Dodaj zwierzę
            </h2>

            <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
              Wprowadź informacje o zwierzęciu znajdującym się pod opieką
              fundacji.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="btn text-3xl font-bold text-light-subtext dark:text-subtext"
            aria-label="Zamknij formularz"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="font-bold text-light-text dark:text-text">
                Imię *
              </span>

              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  updateField("name", event.target.value)
                }
                className={inputClasses}
                placeholder="Np. Luna"
              />
            </label>

            <label className="space-y-2">
              <span className="font-bold text-light-text dark:text-text">
                Gatunek *
              </span>

              <input
                type="text"
                value={form.species}
                onChange={(event) =>
                  updateField("species", event.target.value)
                }
                className={inputClasses}
                placeholder="Np. Kot"
              />
            </label>

            <label className="space-y-2">
              <span className="font-bold text-light-text dark:text-text">
                Płeć
              </span>

              <select
                value={form.gender}
                onChange={(event) =>
                  updateField(
                    "gender",
                    event.target.value as AnimalGender,
                  )
                }
                className={inputClasses}
              >
                <option value="Nieznana">Nieznana</option>
                <option value="Samica">Samica</option>
                <option value="Samiec">Samiec</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="font-bold text-light-text dark:text-text">
                Wiek *
              </span>

              <input
                type="text"
                value={form.age}
                onChange={(event) =>
                  updateField("age", event.target.value)
                }
                className={inputClasses}
                placeholder="Np. 2 lata"
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="font-bold text-light-text dark:text-text">
                Status
              </span>

              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value as AnimalStatus,
                  )
                }
                className={inputClasses}
              >
                <option value="Do adopcji">Do adopcji</option>
                <option value="W trakcie leczenia">
                  W trakcie leczenia
                </option>
                <option value="Zarezerwowany">Zarezerwowany</option>
                <option value="Adoptowany">Adoptowany</option>
              </select>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="font-bold text-light-text dark:text-text">
              Adres zdjęcia
            </span>

            <input
              type="url"
              value={form.imageUrl}
              onChange={(event) =>
                updateField("imageUrl", event.target.value)
              }
              className={inputClasses}
              placeholder="https://..."
            />
          </label>

          <label className="block space-y-2">
            <span className="font-bold text-light-text dark:text-text">
              Opis
            </span>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              className={`${inputClasses} min-h-32 resize-y`}
              placeholder="Charakter, stan zdrowia, wymagania adopcyjne..."
            />
          </label>

          {error && (
            <p className="rounded-2xl border-2 border-red-500/40 bg-red-500/10 px-4 py-3 font-bold text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="btn rounded-2xl border-2 border-light-border px-6 py-3 font-bold text-light-border dark:border-border dark:text-border"
            >
              Anuluj
            </button>

            <button
              type="submit"
              className="btn rounded-2xl bg-light-border px-6 py-3 font-black text-text dark:bg-border"
            >
              Dodaj zwierzę
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}