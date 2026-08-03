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
    <div className="absolute top-34 left-84 z-100" style={{ maxWidth: 'calc(100vw - var(--spacing) * 95)' }}>
      
      <Input
        placeholder="Szukaj miejsca..."
        className="shadow-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-2 rounded-2xl flex gap-2 overflow-scroll" style={{ maxWidth: 'calc(100vw - var(--spacing) * 95)' }}>

        {filters.map((filter) => (
          <Button
            key={filter.value}
            className="shadow-none"
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