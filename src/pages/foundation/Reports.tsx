export default function Reports() {
  return (
    <section>
      <h1 className="text-3xl font-black text-light-text dark:text-text">
        Zgłoszenia
      </h1>

      <p className="mt-3 font-semibold text-light-subtext dark:text-subtext">
        Tutaj pojawią się zgłoszenia przypisane do fundacji.
      </p>

      <div className="mt-8 rounded-3xl border-2 border-dashed border-light-border p-10 text-center dark:border-border">
        <p className="font-bold text-light-subtext dark:text-subtext">
          Brak zgłoszeń.
        </p>
      </div>
    </section>
  );
}