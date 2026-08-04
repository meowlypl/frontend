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

      <h2 className="text-2xl font-black text-light-text dark:text-text">
        Osiągnięcia
      </h2>

      <p className="mt-2 text-light-subtext dark:text-subtext">
        Twoje postępy w Meowly
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-3xl bg-light-overlay dark:bg-overlay p-5 text-center">

          <div className="text-4xl">🐾</div>

          <h3 className="mt-3 text-3xl font-black text-light-text dark:text-text">
            {completedMissions}
          </h3>

          <p className="mt-2 text-sm font-semibold text-light-subtext dark:text-subtext">
            {completedMissions == 1 
              ? 'Misja'
              : completedMissions.toString().match(/(^|0|[2-9])[2-4]$/i)
                ? 'Misje'
                : 'Misji'
            }
          </p>

        </div>

        <div className="rounded-3xl bg-light-overlay dark:bg-overlay p-5 text-center">

          <div className="text-4xl">📍</div>

          <h3 className="mt-3 text-3xl font-black text-light-text dark:text-text">
            {reports}
          </h3>

          <p className="mt-2 text-sm font-semibold text-light-subtext dark:text-subtext">
            {reports == 1 
              ? 'Zgłoszenie'
              : reports.toString().match(/(^|0|[2-9])[2-4]$/i)
                ? 'Zgłoszenia'
                : 'Zgłoszeń'
            }
          </p>

        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-4 text-xl font-semibold text-light-text dark:text-text">
          Zdobyte odznaki
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-3xl bg-light-overlay dark:bg-overlay p-5 text-center">
            <div className="text-4xl">🥉</div>
            <h4 className="mt-3 font-semibold text-light-text dark:text-text">
              Pierwsza misja
            </h4>
          </div>

          <div className="rounded-3xl bg-light-overlay dark:bg-overlay p-5 text-center">
            <div className="text-4xl">❤️</div>
            <h4 className="mt-3 font-semibold text-light-text dark:text-text">
              Opiekun kotów
            </h4>
          </div>

          <div className="rounded-3xl bg-light-overlay dark:bg-overlay p-5 text-center">
            <div className="text-4xl">🏆</div>
            <h4 className="mt-3 font-semibold text-light-text dark:text-text">
              100 XP
            </h4>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-light-border dark:border-border bg-light-overlay dark:bg-overlay p-5 text-center opacity-60">
            <div className="text-4xl">🔒</div>
            <h4 className="mt-3 font-semibold text-light-text dark:text-text">
              Wkrótce
            </h4>
          </div>

        </div>

      </div>

    </Card>
  );
}