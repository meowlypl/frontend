import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import CookieConsent from "react-cookie-consent";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MapPage from "./pages/Map";
import Verified from "./pages/Verified";
import Admin from "./pages/Admin";
import Missions from "./pages/Missions";
import Construction from "./pages/Construction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/map" element={<MapPage />} />

        <Route path="/verified" element={<Verified />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/missions" element={<Missions />} />

        <Route path="/adoptions" element={<Construction />} />
        <Route path="/foundations" element={<Construction />} />
        <Route path="/ranking" element={<Construction />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <CookieConsent
        location="bottom"
        buttonText="OK"
        style={localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? 
          { background: 'var(--color-overlay)', color: 'var(--color-text)', padding: '0 2vw', borderTop: 'solid 2px var(--color-base)' } :
          { background: 'var(--color-light-overlay)', color: 'var(--color-light-text)', padding: '0 2vw', borderTop: 'solid 2px var(--color-light-base)' }}
        buttonClasses="btn mt-8 w-full font-semibold"
        buttonStyle={{ borderRadius: 'var(--radius-xl)', background: 'var(--color-orange-500)', color: 'var(--color-white)' }}
        expires={150}
      >
        Ta strona używa plików cookie.
      </CookieConsent> */}
    </BrowserRouter>
  );
}