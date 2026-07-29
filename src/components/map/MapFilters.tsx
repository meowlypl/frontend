import Input from "../ui/Input";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function MapFilters({
  search,
  setSearch,
}: Props) {
  return (
    <div className="border-b border-orange-100 bg-white p-5">
      <Input
        placeholder="Szukaj miejsca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}