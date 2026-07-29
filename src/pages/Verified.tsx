import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";

import catImage from "../assets/register-cat.jpg";

export default function Verified() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f0] p-6">

      <div className="w-full max-w-3xl overflow-hidden rounded-[40px] bg-white shadow-2xl">

        <div className="relative h-72 overflow-hidden">

          <img
            src={catImage}
            alt="Kot"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        </div>

        <div className="p-10 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">

            <span className="text-5xl">🎉</span>

          </div>

          <h1 className="mt-8 text-5xl font-black text-slate-900">
            Konto aktywowane!
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Twój adres e-mail został pomyślnie potwierdzony.
            Możesz już korzystać ze wszystkich funkcji Meowly,
            wykonywać misje, zdobywać XP i pomagać kotom.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">

            <div className="rounded-3xl bg-orange-50 p-6">

              <div className="text-4xl">🐾</div>

              <h3 className="mt-4 text-lg font-black">
                Wykonuj misje
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Pomagaj kotom w swojej okolicy.
              </p>

            </div>

            <div className="rounded-3xl bg-orange-50 p-6">

              <div className="text-4xl">⭐</div>

              <h3 className="mt-4 text-lg font-black">
                Zdobywaj XP
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Awansuj na kolejne poziomy.
              </p>

            </div>

            <div className="rounded-3xl bg-orange-50 p-6">

              <div className="text-4xl">❤️</div>

              <h3 className="mt-4 text-lg font-black">
                Ratuj życie
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Każda Twoja akcja ma znaczenie.
              </p>

            </div>

          </div>

          <Button
            fullWidth
            className="mt-10 h-14"
            onClick={() => navigate("/login")}
          >
            Przejdź do logowania
          </Button>

        </div>

      </div>

    </main>
  );
}