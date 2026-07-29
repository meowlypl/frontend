import { Link } from "react-router-dom";
import logo_light from "../../assets/meowly_light.png"

const normalItems = [
  { name: "Dashboard", path: "/dashboard", icon: "🏠" },
  { name: "Mapa", path: "/map", icon: "🗺️" },
  { name: "Misje", path: "/missions", icon: "🎯" },
  { name: "Adopcje", path: "/adoptions", icon: "🐱" },
  { name: "Fundacje", path: "/foundations", icon: "❤️" },
  { name: "Ranking", path: "/ranking", icon: "🏆" },
  { name: "Profil", path: "/profile", icon: "👤" },
];

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  const admins = [ "maja.wronowska@interia.pl", "antoniswiderek@gmail.com" ];
  
  const items =
    admins.includes(user?.email)
      ? [...normalItems, { name: "Admin", path: "/admin", icon: "🛠️" }]
      : normalItems;

  return (
    <aside className="w-72 bg-overlay-base p-8 dark:bg-base" style={{ height: '100%', borderRight: `2px solid var(--color-${localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? 'overlay' : 'light-overlay'})` }}>
      <Link
        to="/dashboard"
      >
        <img
          src={localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? '/logo_dark.svg' : '/logo_light.svg'}
          width='75%'
          className="mx-auto mb-8 cursor-pointer"
        />
      </Link>


      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`btn flex gap-3 rounded-2xl px-5 py-4 transition hover:text-light-border dark:hover:text-border ${window.location.pathname == item.path ? 'bg-[#896a3650] dark:bg-[#c15a15] text-light-text dark:text-sidebar font-bold' : 'text-light-subtext dark:text-subtext hover:bg-light-overlay dark:hover:bg-overlay' }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}