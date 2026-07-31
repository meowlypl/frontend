import { NavLink } from "react-router-dom";

interface FoundationMobileMenuProps {
  visible: boolean;
  dark: boolean;
  closeMenu: () => void;
}

const items = [
  { name: "Dashboard", path: "/foundation/dashboard" },
  { name: "Zwierzęta", path: "/foundation/animals" },
  { name: "Zgłoszenia", path: "/foundation/reports" },
  { name: "Wydarzenia", path: "/foundation/events" },
  { name: "Wolontariusze", path: "/foundation/volunteers" },
  { name: "Ustawienia", path: "/foundation/settings" },
];

export default function FoundationMobileMenu({
  visible,
  dark,
  closeMenu,
}: FoundationMobileMenuProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[1000] lg:hidden">
      <button
        type="button"
        aria-label="Zamknij menu"
        className="absolute inset-0 bg-black/50"
        onClick={closeMenu}
      />

      <aside className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-light-base p-6 shadow-2xl dark:bg-base">
        <div className="mb-8 flex items-center justify-between">
          <img
            src={dark ? "/logo_dark.svg" : "/logo_light.svg"}
            alt="Meowly"
            className="h-14"
          />

          <button
            type="button"
            className="btn text-3xl text-light-text dark:text-text"
            onClick={closeMenu}
            style={{ fontFamily: "Material Symbols Outlined" }}
          >
            close
          </button>
        </div>

        <nav className="space-y-3">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                [
                  "block rounded-2xl px-5 py-4 font-bold",
                  isActive
                    ? "bg-[#896a3650] text-light-text dark:bg-border dark:text-sidebar"
                    : "text-light-subtext hover:bg-light-overlay dark:text-subtext dark:hover:bg-overlay",
                ].join(" ")
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}