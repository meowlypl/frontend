import { NavLink, useNavigate } from "react-router-dom";

type FoundationMobileMenuProps = {
  visible: boolean;
  dark: boolean;
  closeMenu: () => void;
};

const navigation = [
  {
    label: "Dashboard",
    path: "/foundation/dashboard",
   
  },
  {
    label: "Zwierzęta",
    path: "/foundation/animals",
  },
  {
    label: "Zgłoszenia",
    path: "/foundation/reports",
  
  },
  {
    label: "Wydarzenia",
    path: "/foundation/events",
    
  },
  {
    label: "Wolontariusze",
    path: "/foundation/volunteers",

  },
  {
    label: "Ustawienia",
    path: "/foundation/settings",
  
  },
];

export default function FoundationMobileMenu({
  visible,
  dark,
  closeMenu,
}: FoundationMobileMenuProps) {
  const navigate = useNavigate();

  if (!visible) {
    return null;
  }

  function handleLogout() {
    localStorage.removeItem("foundationUser");
    localStorage.removeItem("foundationToken");

    closeMenu();

    navigate("/foundation/login", {
      replace: true,
    });
  }

  return (
    <div className="fixed inset-0 z-[1000] lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={closeMenu}
        aria-label="Zamknij menu"
      />

      <aside className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-light-base p-6 shadow-2xl dark:bg-base">
        <div className="mb-8 flex items-center justify-between">
          <img
            src={dark ? "/logo_darks.svg" : "/logo_light.svg"}
            alt="Meowly"
            className="h-12"
          />

          <button
            type="button"
            onClick={closeMenu}
            className="text-3xl text-light-text dark:text-text"
            aria-label="Zamknij menu"
            style={{
              fontFamily: "Material Symbols Outlined",
            }}
          >
            close
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                [
                  "flex items-center gap-4 rounded-2xl px-5 py-4 font-bold",
                  isActive
                    ? "bg-light-border text-text dark:bg-border"
                    : "text-light-subtext hover:bg-light-overlay dark:text-subtext dark:hover:bg-overlay",
                ].join(" ")
              }
            >
              <span
                className="text-2xl"
                style={{
                  fontFamily: "Material Symbols Outlined",
                }}
              >
              </span>

              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-2xl border-2 border-light-border px-5 py-4 font-black text-light-border dark:border-border dark:text-border"
        >
          Wyloguj się
        </button>
      </aside>
    </div>
  );
}