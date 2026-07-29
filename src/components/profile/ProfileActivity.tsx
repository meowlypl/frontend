import { useEffect, useState } from "react";

import Card from "../ui/Card";

interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function ProfileActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Tymczasowe dane — później możesz pobierać je z API
    setActivities([
      {
        id: 1,
        title: "Ukończono misję",
        description: "Dokarmienie kotów wolno żyjących",
        date: "Dzisiaj",
      },
      {
        id: 2,
        title: "Zdobyto odznakę",
        description: "Koci Wolontariusz",
        date: "Wczoraj",
      },
      {
        id: 3,
        title: "Dodano zgłoszenie",
        description: "Zgłoszono kota wymagającego pomocy",
        date: "3 dni temu",
      },
    ]);
  }, []);

  return (
    <Card
      title="Ostatnia aktywność"
      subtitle="Twoje ostatnie działania w Meowly."
    >
      <div className="space-y-4">
        {activities.length == 0 ? (
          <div className="rounded-2xl bg-light-overlay dark:bg-overlay p-6 text-center text-light-subtext dark:text-subtext">
            Brak aktywności.
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-2xl bg-light-overlay dark:bg-overlay p-5 transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-light-text dark:text-text">
                  {activity.title}
                </h3>

                <span className="text-sm font-semibold text-light-subtext dark:text-subtext">
                  {activity.date}
                </span>
              </div>

              <p className="mt-2 text-light-subtext dark:text-subtext">
                {activity.description}
              </p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}