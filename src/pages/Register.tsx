import { useNavigate } from "react-router-dom";

import RegisterHero from "../components/register/RegisterHero";
import RegisterForm from "../components/register/RegisterForm";

export default function Register() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#fff8f0] p-4 lg:p-6">

      <div className="overflow-hidden rounded-[36px] bg-white shadow-2xl lg:grid lg:min-h-[calc(100vh-48px)] lg:grid-cols-[1.1fr_0.9fr]">

        {/* Lewa strona */}
        <RegisterHero />

        {/* Prawa strona */}
        <div className="flex items-center justify-center p-8 lg:p-12">

          <div className="w-full max-w-md">

            <RegisterForm
              onSuccess={() => {
                setTimeout(() => {
                  navigate("/login");
                }, 1500);
              }}
            />

            <div className="mt-8 text-center">

              <p className="text-slate-500">
                Masz już konto?
              </p>

              <button
                onClick={() => navigate("/login")}
                className="mt-3 font-black text-orange-500 transition hover:text-orange-600"
              >
                Zaloguj się
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}