import Input from "../ui/Input";
import Button from "../ui/Button";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  selectedType: string;
  setSelectedType: (value: string) => void;
}

const filters = [
  { value: "all", label: "Wszystkie" },
  { value: "foundation", label: "Fundacje" },
  { value: "mission", label: "Misje" },
  { value: "feeding", label: "Dokarmianie" },
  { value: "cat_house", label: "Budki" },
  { value: "vet", label: "Weterynarze" },
  { value: "adoption", label: "Adopcje" },
  { value: "event", label: "Wydarzenia" },
];

export default function MarkerFilters({
  search,
  setSearch,
  selectedType,
  setSelectedType,
}: Props) {
  return (
    <div className="border-b border-orange-100 bg-white p-6">

      <h2 className="mb-4 text-3xl font-black text-slate-900">
        Mapa Meowly
      </h2>

      <Input
        placeholder="Szukaj miejsca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-6 flex flex-wrap gap-2">

        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={
              selectedType === filter.value
                ? "primary"
                : "secondary"
            }
            onClick={() =>
              setSelectedType(filter.value)
            }
          >
            {filter.label}
          </Button>
        ))}

      </div>

    </div>
  );
}