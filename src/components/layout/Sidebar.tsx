import { Link } from "react-router-dom";

const normalItems = [
  { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { name: "Mapa", path: "/map", icon: "mapa" },
  { name: "Misje", path: "/missions", icon: "misje" },
  { name: "Adopcje", path: "/adoptions", icon: "adopcje" },
  { name: "Fundacje", path: "/foundations", icon: "fundacje" },
  { name: "Ranking", path: "/ranking", icon: "ranking" },
  { name: "Profil", path: "/profile", icon: "profil" },
];

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  const admins = [ "maja.wronowska@interia.pl", "antoniswiderek@gmail.com" ];
  
  const items =
    admins.includes(user?.email)
      ? [...normalItems, { name: "Admin", path: "/admin", icon: "admin" }]
      : normalItems;
  const dark = localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <aside className="w-72 bg-overlay-base p-8 dark:bg-base" style={{ height: '100%', borderRight: `2px solid var(--color-${dark ? 'overlay' : 'light-overlay'})` }}>
      <Link
        to="/dashboard"
      >
        <img
          src={dark ? '/logo_dark.svg' : '/logo_light.svg'}
          width='75%'
          className="mx-auto mb-8 cursor-pointer"
        />
      </Link>


      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`btn flex gap-3 rounded-2xl px-5 py-3 transition hover:text-light-border leading-10 ${window.location.pathname == item.path ? 'bg-[#896a3650] dark:bg-[#c15a15] text-light-text dark:text-sidebar font-bold dark:hover:text-subtext' : 'text-light-subtext dark:text-subtext hover:bg-light-overlay dark:hover:bg-overlay dark:hover:text-border' }`}
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