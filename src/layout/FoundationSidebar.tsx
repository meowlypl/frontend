import { NavLink } from "react-router-dom";

interface FoundationSidebarProps {
  dark: boolean;
}

const items = [
  {
    name: "Dashboard",
    path: "/foundation/dashboard",
    icon: "dashboard",
  },
  {
    name: "Zwierzęta",
    path: "/foundation/animals",
    icon: "adopcje",
  },
  {
    name: "Zgłoszenia",
    path: "/foundation/reports",
    icon: "mapa",
  },
  {
    name: "Wydarzenia",
    path: "/foundation/events",
    icon: "misje",
  },
  {
    name: "Wolontariusze",
    path: "/foundation/volunteers",
    icon: "fundacje",
  },
  {
    name: "Ustawienia",
    path: "/foundation/settings",
    icon: "profil",
  },
];

export default function FoundationSidebar({
  dark,
}: FoundationSidebarProps) {
  return (
    <aside className="fixed h-screen w-72 overflow-y-auto border-r-2 border-light-overlay bg-light-base p-8 dark:border-overlay dark:bg-base">
      <NavLink to="/foundation/dashboard">
        <img
          src={dark ? "/logo_dark.svg" : "/logo_light.svg"}
          alt="Meowly"
          className="mx-auto mb-4 w-3/4 cursor-pointer"
        />
      </NavLink>

      <p className="mb-8 text-center text-sm font-bold text-light-subtext dark:text-subtext">
        Panel fundacji
      </p>

      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "btn flex items-center gap-3 rounded-2xl px-5 py-3 font-semibold leading-10",
                isActive
                  ? "bg-[#896a3650] text-light-text dark:bg-border dark:text-sidebar"
                  : "text-light-subtext hover:bg-light-overlay hover:text-light-border dark:text-subtext dark:hover:bg-overlay dark:hover:text-border",
              ].join(" ")
            }
          >
            <img
              src={`/icon_${dark ? "dark" : "light"}/${item.icon}.svg`}
              alt=""
              className="h-10 w-10"
            />

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="btn mt-10 w-full rounded-2xl border-2 border-light-border px-5 py-3 font-bold text-light-border dark:border-border dark:text-border"
        onClick={() => {
          localStorage.removeItem("foundationUser");
          window.location.href = "/foundation/login";
        }}
      >
        Wyloguj się
      </button>
    </aside>
  );
}