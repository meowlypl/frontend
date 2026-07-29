import catImage from "../../assets/register-cat.jpg";

import RegisterBenefits from "./RegisterBenefits";

export default function RegisterHero() {
  return (
    <section
      className="relative flex flex-col justify-between overflow-hidden bg-orange-50 p-10"
      style={{
        backgroundImage: `linear-gradient(rgba(255,248,240,.20), rgba(255,248,240,.35)), url(${catImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10">

        <div className="inline-flex items-center rounded-full bg-white/90 px-5 py-3 shadow-lg backdrop-blur">

          <span className="text-2xl">🐾</span>

          <span className="ml-3 text-lg font-black text-slate-900">
            Meowly
          </span>

        </div>

      </div>

      <div className="relative z-10 max-w-xl">

        <h1 className="text-6xl font-black leading-tight text-slate-900">

          Razem zmieniamy
          <br />

          los

          <span className="text-orange-500">
            {" "}kotów.
          </span>

        </h1>

        <p className="mt-8 max-w-lg text-xl leading-9 text-slate-800">

          Dołącz do społeczności Meowly,
          wykonuj misje, zdobywaj doświadczenie
          i pomagaj kotom w swojej okolicy.

        </p>

      </div>

      <div className="relative z-10 mt-10">

        <RegisterBenefits />

      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent" />

    </section>
  );
}