import Card from "../ui/Card";

interface Props {
  completedMissions: number;
  reports: number;
}

export default function ProfileAchievements({
  completedMissions,
  reports,
}: Props) {
  return (
    <Card>

      <h2 className="text-2xl font-black text-slate-900">
        Osiągnięcia
      </h2>

      <p className="mt-2 text-slate-500">
        Twoje postępy w Meowly
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-3xl bg-orange-50 p-5 text-center">

          <div className="text-4xl">🐾</div>

          <h3 className="mt-3 text-3xl font-black text-orange-500">
            {completedMissions}
          </h3>

          <p className="mt-2 text-sm font-semibold text-slate-500">
            Misje
          </p>

        </div>

        <div className="rounded-3xl bg-orange-50 p-5 text-center">

          <div className="text-4xl">📍</div>

          <h3 className="mt-3 text-3xl font-black text-orange-500">
            {reports}
          </h3>

          <p className="mt-2 text-sm font-semibold text-slate-500">
            Zgłoszenia
          </p>

        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-4 text-xl font-black text-slate-900">
          Zdobyte odznaki
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5 text-center">
            <div className="text-4xl">🥉</div>
            <h4 className="mt-3 font-black">
              Pierwsza misja
            </h4>
          </div>

          <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5 text-center">
            <div className="text-4xl">❤️</div>
            <h4 className="mt-3 font-black">
              Opiekun kotów
            </h4>
          </div>

          <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5 text-center">
            <div className="text-4xl">🏆</div>
            <h4 className="mt-3 font-black">
              100 XP
            </h4>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center opacity-60">
            <div className="text-4xl">🔒</div>
            <h4 className="mt-3 font-black">
              Wkrótce
            </h4>
          </div>

        </div>

      </div>

    </Card>
  );
}