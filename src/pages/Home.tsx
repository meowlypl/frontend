import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] dark:bg-[#080400] px-4 py-5 md:p-8">
      <section className="mx-auto flex min-h-[calc(100vh-40px)] max-w-7xl overflow-hidden rounded-[36px] bg-white dark:bg-[#0f0f0f] dark:border-2 dark:border-orange-900 shadow-2xl">

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center md:px-14">

          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[30px] bg-orange-500 shadow-xl shadow-orange-200 dark:shadow-orange-900">
            <span className="text-5xl text-white">🐈</span>
          </div>

          <h1 className="text-5xl font-black text-slate-900 md:text-7xl dark:text-[#FFF8F0]">
            Meowly
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 md:text-xl dark:text-[#FFF8F0]">
            Pomagaj kotom w swojej okolicy, zdobywaj doświadczenie,
            wykonuj misje i wspieraj fundacje.
          </p>

          <div className="mt-12 flex w-full max-w-md flex-col gap-4 sm:flex-row">

            <Link
              to="/register"
              className="btn flex h-14 flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 font-black text-white shadow-lg shadow-orange-200 dark:shadow-orange-900"
            >
              Załóż konto
            </Link>

            <Link
              to="/login"
              className="btn flex h-14 flex-1 items-center justify-center rounded-2xl border-2 border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950 font-black text-orange-600 dark:text-orange-50"
            >
              Zaloguj się
            </Link>

          </div>

          <div className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-orange-50 dark:bg-orange-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-5xl">📍</div>

              <h2 className="mt-5 text-xl font-black text-slate-900 dark:text-gray-300">
                Lokalne misje
              </h2>

              <p className="mt-3 leading-7 text-slate-600 dark:text-gray-300">
                Odkrywaj zadania w swojej okolicy i pomagaj kotom.
              </p>
            </div>

            <div className="rounded-3xl bg-orange-50 dark:bg-orange-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-5xl">⭐</div>

              <h2 className="mt-5 text-xl font-black text-slate-900 dark:text-gray-300">
                Zdobywaj XP
              </h2>

              <p className="mt-3 leading-7 text-slate-600 dark:text-gray-300">
                Awansuj na kolejne poziomy i odblokowuj odznaki.
              </p>
            </div>

            <div className="rounded-3xl bg-orange-50 dark:bg-orange-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-5xl">❤️</div>

              <h2 className="mt-5 text-xl font-black text-slate-900 dark:text-gray-300">
                Pomagaj naprawdę
              </h2>

              <p className="mt-3 leading-7 text-slate-600 dark:text-gray-300">
                Każda wykonana misja ma realny wpływ na życie kotów.
              </p>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}