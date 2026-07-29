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
        {activities.length === 0 ? (
          <div className="rounded-2xl bg-orange-50 p-6 text-center text-slate-500">
            Brak aktywności.
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-2xl border border-orange-100 bg-orange-50 p-5 transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900">
                  {activity.title}
                </h3>

                <span className="text-sm font-semibold text-slate-400">
                  {activity.date}
                </span>
              </div>

              <p className="mt-2 text-slate-600">
                {activity.description}
              </p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}