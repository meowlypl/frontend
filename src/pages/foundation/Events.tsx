export default function Events() {
  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-black text-light-text dark:text-text">
            Wydarzenia
          </h1>

          <p className="mt-3 font-semibold text-light-subtext dark:text-subtext">
            Wydarzenia dodane przez fundację.
          </p>
        </div>

        <button
          type="button"
          className="rounded-2xl bg-light-border px-6 py-4 font-black text-text dark:bg-border"
        >
          + Dodaj wydarzenie
        </button>
      </div>

      <div className="mt-8 rounded-3xl border-2 border-dashed border-light-border p-10 text-center dark:border-border">
        <p className="font-bold text-light-subtext dark:text-subtext">
          Nie dodano jeszcze żadnych wydarzeń.
        </p>
      </div>
    </section>
  );
}