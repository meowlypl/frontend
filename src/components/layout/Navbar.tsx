import { useNavigate } from "react-router-dom";

interface NavbarParams {
  dark: boolean;
  setDark: any;
}

export default function Navbar({ dark, setDark } : NavbarParams) {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  if(!user) return window.location.href = '/'

  const navigate = useNavigate()
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
          className="btn text-2xl"
          onClick={ () => {
            localStorage.theme = (dark ? 'light' : 'dark');
            document.documentElement.classList.toggle(
              'dark',
              !dark
            )
            setDark(!dark)
          } }
        >
          {dark ? '☀️' : '🌙' /* 'light_mode' : 'dark_mode'*/}
        </button>

        <div onClick={() => navigate('/profile')} className="btn flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-light-border dark:bg-border font-black text-text">
            {avatar ? (
                 <img
                    src={avatar}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                />
            ) : (
                (user.name || "M").charAt(0)
            )}
        </div>
      </div>
    </header>
  );
}