import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/public/Home";
import Verified from "./pages/public/Verified";


import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import MapPage from "./pages/user/Map";
import Missions from "./pages/user/Missions";

import Admin from "./pages/admin/Admin";

import FoundationLayout from "./layout/FoundationLayout"
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
          path="/foundation"
          element={<FoundationLayout />}
        >
          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<FoundationDashboard />}
          />

          <Route
            path="animals"
            element={<Animals />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

          <Route
            path="events"
            element={<Events />}
          />

          <Route
            path="volunteers"
            element={<Volunteers />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>

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