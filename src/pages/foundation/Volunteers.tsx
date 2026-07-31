export default function Volunteers() {
  return (
    <section>
      <h1 className="text-3xl font-black text-light-text dark:text-text">
        Wolontariusze
      </h1>

      <p className="mt-3 font-semibold text-light-subtext dark:text-subtext">
        Osoby współpracujące z fundacją.
      </p>

      <div className="mt-8 rounded-3xl border-2 border-dashed border-light-border p-10 text-center dark:border-border">
        <p className="font-bold text-light-subtext dark:text-subtext">
          Nie dodano jeszcze żadnych wolontariuszy.
        </p>
      </div>
    </section>
  );
}