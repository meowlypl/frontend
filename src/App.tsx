import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/public/Home";
import Verified from "./pages/public/Verified";
import Construction from "./pages/public/Construction";

import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import MapPage from "./pages/user/Map";
import Missions from "./pages/user/Missions";

import Admin from "./pages/admin/Admin";

import FoundationLogin from "./pages/foundation/Login";
import FoundationRegister from "./pages/foundation/Register";
import FoundationDashboard from "./pages/foundation/Dashboard";
import Animals from "./pages/foundation/Animals";
import Reports from "./pages/foundation/Reports";
import Events from "./pages/foundation/Events";
import Volunteers from "./pages/foundation/Volunteers";
import Settings from "./pages/foundation/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Strony publiczne */}
        <Route path="/" element={<Home />} />
        <Route path="/verified" element={<Verified />} />

        {/* Użytkownik */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/missions" element={<Missions />} />

        {/* Fundacja */}
        <Route
          path="/foundation/login"
          element={<FoundationLogin />}
        />

        <Route
          path="/foundation/register"
          element={<FoundationRegister />}
        />

        <Route
          path="/foundation/dashboard"
          element={<FoundationDashboard />}
        />

        <Route
          path="/foundation/animals"
          element={<Animals />}
        />

        <Route
          path="/foundation/reports"
          element={<Reports />}
        />

        <Route
          path="/foundation/events"
          element={<Events />}
        />

        <Route
          path="/foundation/volunteers"
          element={<Volunteers />}
        />

        <Route
          path="/foundation/settings"
          element={<Settings />}
        />

        {/* Strony w budowie */}
        <Route
          path="/adoptions"
          element={<Construction />}
        />

        <Route
          path="/ranking"
          element={<Construction />}
        />

        {/* Administrator */}
        <Route path="/admin" element={<Admin />} />

        {/* Nieistniejąca strona */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}