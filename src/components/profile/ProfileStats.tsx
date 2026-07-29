import Card from "../ui/Card";

interface Props {
  level: number;
  xp: number;
  completedMissions: number;
  reports: number;
  badges: number;
  adoptedCats: number;
}

export default function ProfileStats({
  level,
  xp,
  completedMissions,
  reports,
  badges,
  adoptedCats,
}: Props) {
  return (
    <Card>

      <h2 className="text-2xl font-black text-slate-900">
        Statystyki
      </h2>

      <p className="mt-2 text-slate-500">
        Twój postęp w społeczności Meowly.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-3xl bg-orange-50 p-5 text-center">
          <p className="text-4xl font-black text-orange-500">
            {level}
          </p>
          <span className="mt-2 block text-sm font-semibold text-slate-500">
            Poziom
          </span>
        </div>

        <div className="rounded-3xl bg-orange-50 p-5 text-center">
          <p className="text-4xl font-black text-orange-500">
            {xp}
          </p>
          <span className="mt-2 block text-sm font-semibold text-slate-500">
            XP
          </span>
        </div>

        <div className="rounded-3xl bg-orange-50 p-5 text-center">
          <p className="text-4xl font-black text-orange-500">
            {completedMissions}
          </p>
          <span className="mt-2 block text-sm font-semibold text-slate-500">
            Misje
          </span>
        </div>

        <div className="rounded-3xl bg-orange-50 p-5 text-center">
          <p className="text-4xl font-black text-orange-500">
            {reports}
          </p>
          <span className="mt-2 block text-sm font-semibold text-slate-500">
            Zgłoszenia
          </span>
        </div>

        <div className="rounded-3xl bg-orange-50 p-5 text-center">
          <p className="text-4xl font-black text-orange-500">
            {badges}
          </p>
          <span className="mt-2 block text-sm font-semibold text-slate-500">
            Odznaki
          </span>
        </div>

        <div className="rounded-3xl bg-orange-50 p-5 text-center">
          <p className="text-4xl font-black text-orange-500">
            {adoptedCats}
          </p>
          <span className="mt-2 block text-sm font-semibold text-slate-500">
            Adopcje
          </span>
        </div>

      </div>

    </Card>
  );
}