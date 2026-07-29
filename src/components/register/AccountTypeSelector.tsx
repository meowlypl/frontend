import Button from "../ui/Button";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AccountTypeSelector({
  value,
  onChange,
}: Props) {
  return (
    <div>

      <label className="mb-3 block text-lg font-black text-slate-900">
        Typ konta
      </label>

      <div className="grid grid-cols-2 gap-4">

        <Button
          variant={value === "user" ? "primary" : "secondary"}
          className="h-14"
          onClick={() => onChange("user")}
        >
          👤 Użytkownik
        </Button>

        <Button
          variant={value === "foundation" ? "primary" : "secondary"}
          className="h-14"
          onClick={() => onChange("foundation")}
        >
          🏠 Fundacja
        </Button>

      </div>

      <div className="mt-4 rounded-2xl bg-orange-50 p-4">

        {value === "user" ? (
          <p className="text-sm leading-6 text-slate-600">
            Załóż konto użytkownika, wykonuj misje, zdobywaj XP,
            pomagaj kotom i rozwijaj swój profil.
          </p>
        ) : (
          <p className="text-sm leading-6 text-slate-600">
            Konto fundacji umożliwia publikowanie misji, zarządzanie
            wydarzeniami, dodawanie punktów na mapie oraz kontakt z
            wolontariuszami.
          </p>
        )}

      </div>

    </div>
  );
}