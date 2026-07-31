import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import MediaPreview from "../../components/foundation/MediaPreview";

import type {
  Animal,
  AnimalFormData,
  AnimalGender,
  AnimalMedia,
  AnimalStatus,
} from "../../types/Animal";

type AnimalFormProps = {
  animal?: Animal | null;
  onSubmit: (data: AnimalFormData) => Promise<void> | void;
  onCancel: () => void;
};

const emptyForm: AnimalFormData = {
  name: "",
  breed: "",
  gender: "Nieznana",
  age: "",
  status: "Do adopcji",
  description: "",
  healthInformation: "",
  requirements: "",
  media: [],
};

const inputClasses =
  "w-full rounded-2xl border-2 border-light-overlay bg-light-base px-4 py-3 font-semibold text-light-text outline-none transition focus:border-light-border dark:border-overlay dark:bg-base dark:text-text dark:focus:border-border";

export default function AnimalForm({
  animal,
  onSubmit,
  onCancel,
}: AnimalFormProps) {
  const [form, setForm] =
    useState<AnimalFormData>(emptyForm);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!animal) {
      setForm(emptyForm);
      return;
    }

    setForm({
      name: animal.name,
      breed: animal.breed,
      gender: animal.gender,
      age: animal.age,
      status: animal.status,
      description: animal.description,
      healthInformation: animal.healthInformation,
      requirements: animal.requirements,
      media: animal.media ?? [],
    });
  }, [animal]);

  function updateField<Key extends keyof AnimalFormData>(
    field: Key,
    value: AnimalFormData[Key],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleMediaChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFiles = Array.from(
      event.target.files ?? [],
    );

    if (selectedFiles.length === 0) {
      return;
    }

    setError("");

    const acceptedMedia: AnimalMedia[] = [];

    for (const file of selectedFiles) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        setError(
          `Plik „${file.name}” nie jest zdjęciem ani filmem.`,
        );
        continue;
      }

      const maximumSize = isImage
        ? 8 * 1024 * 1024
        : 50 * 1024 * 1024;

      if (file.size > maximumSize) {
        setError(
          isImage
            ? `Zdjęcie „${file.name}” przekracza 8 MB.`
            : `Film „${file.name}” przekracza 50 MB.`,
        );

        continue;
      }

      acceptedMedia.push({
        id: crypto.randomUUID(),
        type: isImage ? "image" : "video",
        name: file.name,
        blob: file,
      });
    }

    if (form.media.length + acceptedMedia.length > 10) {
      setError(
        "Do jednego zwierzęcia możesz dodać maksymalnie 10 plików.",
      );
      return;
    }

    updateField("media", [
      ...form.media,
      ...acceptedMedia,
    ]);

    event.target.value = "";
  }

  function removeMedia(mediaId: string) {
    updateField(
      "media",
      form.media.filter((item) => item.id !== mediaId),
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Podaj imię zwierzęcia.");
      return;
    }


    if (!form.age.trim()) {
      setError("Podaj wiek zwierzęcia.");
      return;
    }

    if (!form.description.trim()) {
      setError("Dodaj opis zwierzęcia.");
      return;
    }

    try {
      setSaving(true);

      await onSubmit({
        ...form,
        name: form.name.trim(),
        breed: form.breed.trim(),
        age: form.age.trim(),
        description: form.description.trim(),
        healthInformation:
          form.healthInformation.trim(),
        requirements: form.requirements.trim(),
      });
    } catch (submitError) {
      console.error(submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Nie udało się zapisać zwierzęcia.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
      <section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border-2 border-light-overlay bg-light-base p-6 shadow-2xl dark:border-overlay dark:bg-base sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-light-text dark:text-text">
              {animal
                ? "Edytuj zwierzę"
                : "Dodaj zwierzę"}
            </h2>

            <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
              Dodaj opis, zdjęcia i filmy zwierzęcia.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="text-3xl font-bold text-light-subtext dark:text-subtext"
            aria-label="Zamknij formularz"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="font-bold text-light-text dark:text-text">
                Imię *
              </span>

              <input
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
                Rasa
              </span>

              <input
                value={form.breed}
                onChange={(event) =>
                  updateField("breed", event.target.value)
                }
                className={inputClasses}
                placeholder="Np. Europejski krótkowłosy"
              />
            </label>

            <label className="space-y-2">
              <span className="font-bold text-light-text dark:text-text">
                Wiek *
              </span>

              <input
                value={form.age}
                onChange={(event) =>
                  updateField("age", event.target.value)
                }
                className={inputClasses}
                placeholder="Np. około 2 lata"
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
                <option value="Do adopcji">
                  Do adopcji
                </option>

                <option value="W trakcie leczenia">
                  W trakcie leczenia
                </option>

                <option value="Zarezerwowany">
                  Zarezerwowany
                </option>

                <option value="Adoptowany">
                  Adoptowany
                </option>
              </select>
            </label>
          </div>

          <div className="space-y-3">
            <div>
              <p className="font-bold text-light-text dark:text-text">
                Zdjęcia i filmy
              </p>

              <p className="mt-1 text-sm font-semibold text-light-subtext dark:text-subtext">
                Maksymalnie 10 plików. Zdjęcie do 8 MB,
                film do 50 MB.
              </p>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-light-border bg-light-overlay/30 p-8 text-center dark:border-border dark:bg-overlay/40">
              <span className="text-4xl">📷</span>

              <span className="mt-3 font-black text-light-text dark:text-text">
                Dodaj zdjęcia lub filmy
              </span>

              <span className="mt-2 text-sm font-semibold text-light-subtext dark:text-subtext">
                Możesz zaznaczyć kilka plików jednocześnie
              </span>

              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaChange}
                className="hidden"
              />
            </label>

            {form.media.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {form.media.map((media) => (
                  <article
                    key={media.id}
                    className="overflow-hidden rounded-2xl border-2 border-light-overlay bg-light-base dark:border-overlay dark:bg-base"
                  >
                    <MediaPreview
                      media={media}
                      className="aspect-video w-full object-cover"
                    />

                    <div className="p-3">
                      <p
                        className="truncate text-sm font-bold text-light-text dark:text-text"
                        title={media.name}
                      >
                        {media.name}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeMedia(media.id)
                        }
                        className="mt-3 w-full rounded-xl border-2 border-red-500/50 px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400"
                      >
                        Usuń plik
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <label className="block space-y-2">
            <span className="font-bold text-light-text dark:text-text">
              Opis *
            </span>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value,
                )
              }
              className={`${inputClasses} min-h-36 resize-y`}
              placeholder="Opisz charakter, zachowanie i historię zwierzęcia."
            />
          </label>

          <label className="block space-y-2">
            <span className="font-bold text-light-text dark:text-text">
              Informacje zdrowotne
            </span>

            <textarea
              value={form.healthInformation}
              onChange={(event) =>
                updateField(
                  "healthInformation",
                  event.target.value,
                )
              }
              className={`${inputClasses} min-h-28 resize-y`}
              placeholder="Szczepienia, kastracja, choroby, leczenie..."
            />
          </label>

          <label className="block space-y-2">
            <span className="font-bold text-light-text dark:text-text">
              Wymagania adopcyjne
            </span>

            <textarea
              value={form.requirements}
              onChange={(event) =>
                updateField(
                  "requirements",
                  event.target.value,
                )
              }
              className={`${inputClasses} min-h-28 resize-y`}
              placeholder="Np. dom bez innych zwierząt, zabezpieczony balkon..."
            />
          </label>

          {error && (
            <p className="rounded-2xl border-2 border-red-500/40 bg-red-500/10 px-4 py-3 font-bold text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="rounded-2xl border-2 border-light-border px-6 py-3 font-bold text-light-border disabled:opacity-50 dark:border-border dark:text-border"
            >
              Anuluj
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-light-border px-6 py-3 font-black text-text disabled:cursor-not-allowed disabled:opacity-50 dark:bg-border"
            >
              {saving
                ? "Zapisywanie..."
                : animal
                  ? "Zapisz zmiany"
                  : "Dodaj zwierzę"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}