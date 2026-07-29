import Card from "../ui/Card";

const benefits = [
  {
    icon: "📍",
    title: "Pomagaj lokalnie",
    description:
      "Wykonuj misje i wspieraj fundacje oraz schroniska w swojej okolicy.",
  },
  {
    icon: "⭐",
    title: "Zdobywaj XP",
    description:
      "Awansuj na kolejne poziomy, zdobywaj odznaki i rywalizuj z innymi.",
  },
  {
    icon: "❤️",
    title: "Ratuj koty",
    description:
      "Każde zgłoszenie i każda misja pomagają realnie poprawić los zwierząt.",
  },
];

export default function RegisterBenefits() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {benefits.map((benefit) => (
        <Card
          key={benefit.title}
          className="border border-orange-100 bg-white/80 backdrop-blur"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
            {benefit.icon}
          </div>

          <h3 className="text-lg font-black text-slate-900">
            {benefit.title}
          </h3>

          <p className="mt-3 leading-7 text-slate-500">
            {benefit.description}
          </p>
        </Card>
      ))}
    </div>
  );
}