import { NavLink, useNavigate } from "react-router-dom";

type FoundationSidebarProps = {
  dark: boolean;
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

export default function FoundationSidebar({
  dark,
}: FoundationSidebarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("foundationUser");
    localStorage.removeItem("foundationToken");

    navigate("/foundation/login", {
      replace: true,
    });
  }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r-2 border-light-overlay bg-light-base p-6 dark:border-overlay dark:bg-base">
      <NavLink
        to="/foundation/dashboard"
        className="mb-10 block"
      >
        <img
          src={dark ? "/logo_dark.svg" : "/logo_light.svg"}
          alt="Meowly"
          className="mx-auto w-44"
        />

        <p className="mt-3 text-center text-sm font-bold text-light-subtext dark:text-subtext">
          Panel fundacji
        </p>
      </NavLink>

      <nav className="flex flex-1 flex-col gap-2">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "flex items-center gap-4 rounded-2xl px-5 py-4 font-bold transition",
                isActive
                  ? "bg-light-border text-text dark:bg-border"
                  : "text-light-subtext hover:bg-light-overlay hover:text-light-text dark:text-subtext dark:hover:bg-overlay dark:hover:text-text",
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

            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 flex items-center justify-center gap-3 rounded-2xl border-2 border-light-border px-5 py-4 font-black text-light-border transition hover:bg-light-border hover:text-text dark:border-border dark:text-border dark:hover:bg-border dark:hover:text-text"
      >

        Wyloguj się
      </button>
    </aside>
  );
}