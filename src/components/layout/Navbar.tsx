import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "../../layout/MobileMenu";

interface NavbarParams {
  dark: boolean;
  setDark: any;
}

export default function Navbar({ dark, setDark } : NavbarParams) {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  if(!user) return window.location.href = '/'
  const [ menu, setMenu ] = useState<boolean>()

  const navigate = useNavigate()
  const avatar = user.avatar;
  return (
    <header className="flex items-center bg-light-base dark:bg-base px-8 sm:px-10 pt-4 sm:pt-8">
      <MobileMenu
        visible={menu || false}
      />
      <div>
        <img
          src={dark ? '/logo_dark.svg' : '/logo_light.svg'}
          className="h-15 cursor-pointer sm:hidden"
        />

        <h2 className="text-3xl font-black text-light-text dark:text-text header hidden sm:block">
          Dzień dobry, {user.name || "Maja"} 👋
        </h2>

        <p className="mt-2 font-semibold text-light-subtext dark:text-subtext hidden sm:block">
          Miło Cię znowu widzieć.
        </p>
      </div>

      <div className="flex items-center gap-5 ml-auto">

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
        <button 
          style={{ fontFamily: 'Material Symbols Outlined' }}
          className="sm:hidden btn inline text-3xl text-light-subtext dark:text-subtext mt-2"
          onClick={() => {
            setMenu(!menu)
          }}
        >
          menu
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