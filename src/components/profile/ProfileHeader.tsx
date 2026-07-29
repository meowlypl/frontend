import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";

interface Props {
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
}

export default function ProfileHeader({
  name,
  level,
  xp,
  nextLevelXp,
}: Props) {
  const progress = Math.min(
    (xp / nextLevelXp) * 100,
    100
  );

  return (
    <Card className="overflow-hidden">

      <div className="rounded-3xl bg-gradient-to-r from-orange-400 to-orange-600 p-8 text-white">

        <p className="text-sm font-semibold uppercase tracking-widest opacity-90">
          Profil użytkownika
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Witaj, {name}! 👋
        </h1>

        <p className="mt-3 text-orange-100">
          Kontynuuj pomaganie kotom i zdobywaj kolejne poziomy.
        </p>

      </div>

      <div className="p-8">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-black text-slate-900">
              Poziom {level}
            </h2>

            <p className="mt-2 text-slate-500">
              {xp} / {nextLevelXp} XP
            </p>

          </div>

          <div className="rounded-3xl bg-orange-50 px-6 py-4">

            <p className="text-center text-3xl font-black text-orange-500">
              ⭐ {level}
            </p>

          </div>

        </div>

        <div className="mt-6">

          <ProgressBar
            value={progress}
            max={100}
          />

        </div>

      </div>

    </Card>
  );
}