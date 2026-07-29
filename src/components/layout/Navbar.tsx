export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  if(!user) return window.location.href = '/'
  const avatar = user.avatar;
  return (
    <header className="flex items-center justify-between bg-light-base dark:bg-base px-10 pt-8">
      <div>
        <h2 className="text-3xl font-black text-light-text dark:text-text header">
          Dzień dobry, {user.name || "Maja"} 👋
        </h2>

        <p className="mt-2 font-semibold text-light-subtext dark:text-subtext">
          Miło Cię znowu widzieć.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button
            onClick={() => {
                localStorage.removeItem('meowlyUser');
                window.location.href = "/";
            }}
            className="btn rounded-2xl bg-light-overlay dark:bg-orange-950 px-4 py-3 font-black text-orange-600 dark:text-text"
        >
            Wyloguj
        </button>
        
        <span className="text-2xl">🔔</span>

        <button
          className="material-symbols-outlined btn text-2xl"
          onClick={ () => { localStorage.theme = (localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? 'light' : 'dark'); location.reload() } }
        >
          {localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? '☀️' : '🌙' /* 'light_mode' : 'dark_mode'*/}
        </button>

        <a href="/profile" className="btn flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#f38434] font-black text-white">
            {avatar ? (
                 <img
                    src={avatar}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                />
            ) : (
                (user.name || "M").charAt(0)
            )}
        </a>
      </div>
    </header>
  );
}