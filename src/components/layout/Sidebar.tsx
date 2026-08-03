import { Link } from "react-router-dom";

const users = [
  { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { name: "Mapa", path: "/map", icon: "mapa" },
  { name: "Misje", path: "/missions", icon: "misje" },
  { name: "Adopcje", path: "/adoptions", icon: "adopcje" },
  { name: "Fundacje", path: "/foundations", icon: "fundacje" },
  { name: "Ranking", path: "/ranking", icon: "ranking" },
  { name: "Profil", path: "/profile", icon: "profil" },
];
const fundations = [
  { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { name: "Zwierzęta", path: "/animals", icon: "adopcje" },
  { name: "Zgłoszenia", path: "/reports", icon: "fundacje" },
  { name: "Wydarzenia", path: "/events", icon: "fundacje" },
  { name: "Wolontariusze", path: "/volunteers", icon: "profil" },
  { name: "Ustawienia", path: "/settings", icon: "admin" }
];

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  
  const items = user.role == 'foundation'
    ? fundations
    : user.role == 'admin'
      ? [...users, { name: "Admin", path: "/admin", icon: "admin" }]
      : users;

  const dark = localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <aside id="sidebar" className="w-72 h-full overflow-y-scroll border-r border-2 border-light-overlay dark:border-overlay bg-light-base px-8 py-4 dark:bg-base fixed">
      <Link
        to="/dashboard"
      >
        <img
          src={dark ? '/logo_dark.svg' : '/logo_light.svg'}
          width='75%'
          className="mx-auto mb-4 cursor-pointer"
        />
      </Link>


      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.name}
            to={`${user.role == 'foundation' ? '/foundation' : ''}${item.path}`}
            className={`btn flex gap-3 rounded-2xl px-5 py-3 transition hover:text-light-border leading-10 ${window.location.pathname == `${user.role == 'foundation' ? '/foundation' : ''}${item.path}` ? 'bg-[#896a3650] dark:bg-[#c15a15] text-light-text dark:text-sidebar font-bold dark:hover:text-subtext' : 'text-light-subtext dark:text-subtext hover:bg-light-overlay dark:hover:bg-overlay dark:hover:text-border' }`}
          >
            <img 
              src={`/icon_${dark ? 'dark' : 'light'}/${item.icon}.svg`}
              className="w-10"
            />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}