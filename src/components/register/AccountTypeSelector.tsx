interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AccountTypeSelector({
  value,
  onChange,
}: Props) {
  return (
    <fieldset>
      <legend className="text-sm font-bold">Typ konta</legend>
      <div
        role="radiogroup"
        aria-label="Typ konta"
        className="mt-1.5 grid grid-cols-2 rounded-xl border border-light-border/45 bg-light-overlay/25 p-1 dark:border-border/45 dark:bg-overlay/25"
      >
        <button
          type="button"
          role="radio"
          aria-checked={value === "user"}
          onClick={() => onChange("user")}
          className={`btn h-10 rounded-lg px-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c15a15] ${
            value === "user"
              ? "bg-[#c15a15] text-white dark:bg-[#d56b24]"
              : "text-light-subtext hover:bg-light-overlay hover:text-light-text dark:text-subtext dark:hover:bg-overlay dark:hover:text-text"
          }`}
        >
          Mieszkaniec
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={value === "foundation"}
          onClick={() => onChange("foundation")}
          className={`btn h-10 rounded-lg px-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c15a15] ${
            value === "foundation"
              ? "bg-[#c15a15] text-white dark:bg-[#d56b24]"
              : "text-light-subtext hover:bg-light-overlay hover:text-light-text dark:text-subtext dark:hover:bg-overlay dark:hover:text-text"
          }`}
        >
          Fundacja
        </button>
      </div>
    </fieldset>
  );
}
