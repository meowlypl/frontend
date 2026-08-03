import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verified from "./pages/Verified";
import Construction from "./pages/Construction";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import MapPage from "./pages/user/Map";
import Admin from "./pages/user/Admin";
import Missions from "./pages/user/Missions";
import FoundationPanel from "./pages/user/FoundationPanel";

import FoundationDashboard from "./pages/foundation/Dashboard";
import Animals from "./pages/foundation/Animals";
import Reports from "./pages/foundation/Reports";
import Events from "./pages/foundation/Events";
import Volunteers from "./pages/foundation/Volunteers";
import Settings from "./pages/foundation/Settings";
import CookieConsent from "react-cookie-consent";
import { privacyPolicyDisabled } from "./config/features";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/polityka-prywatnosci"
          element={privacyPolicyDisabled ? <Navigate to="/" replace /> : <PrivacyPolicy />}
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/verified" element={<Verified />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/foundations" element={<FoundationPanel />} />
        <Route path="/adoptions" element={<Construction />} />
        <Route path="/ranking" element={<Construction />} />

        <Route path="/foundation" element={<Navigate to="/foundation/dashboard" replace />} />
        <Route path="/foundation/dashboard" element={<FoundationDashboard />} />
        <Route path="/foundation/animals" element={<Animals />} />
        <Route path="/foundation/reports" element={<Reports />} />
        <Route path="/foundation/events" element={<Events />} />
        <Route path="/foundation/volunteers" element={<Volunteers />} />
        <Route path="/foundation/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <CookieConsent
        location="bottom"
        buttonText="OK"
        style={localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? 
          { background: 'var(--color-overlay)', color: 'var(--color-text)', padding: '0 30px', borderTop: 'solid 2px var(--color-base)' } :
          { background: 'var(--color-light-overlay)', color: 'var(--color-light-text)', padding: '0 2vw', borderTop: 'solid 2px var(--color-light-base)' }}
        buttonClasses="btn mt-8 w-full font-semibold"
        buttonStyle={{ borderRadius: 'var(--radius-xl)', background: 'var(--color-orange-500)', color: 'var(--color-white)', margin: '0', padding: '5px calc(var(--spacing) * 5)' }}
        expires={150}
      >
        Ta strona używa plików cookie.
      </CookieConsent>
    </BrowserRouter>
  );
}
