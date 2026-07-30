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

interface MenuParams {
  visible: boolean;
}

export default function MobileMenu({ visible } : MenuParams) {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  
  const items =
    user.role == 'admin'
      ? [...normalItems, { name: "Admin", path: "/admin", icon: "admin" }]
      : normalItems;
  const dark = localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <aside className={`z-1000 w-72 h-full border-l border-light-overlay dark:border-overlay bg-light-base p-8 dark:bg-base fixed right-0 top-20 ${visible ? 'sm:hidden' : 'hidden'}`}>
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