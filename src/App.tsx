import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import MapPage from "./pages/user/Map";
import Verified from "./pages/user/Verified";
import Admin from "./pages/user/Admin";
import Missions from "./pages/user/Missions";
import Construction from "./pages/user/Construction";
import FoundationPanel from "./pages/user/FoundationPanel";

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

        <Route path="/foundations" element={<FoundationPanel />} />
        
        <Route path="/adoptions" element={<Construction />} />
        <Route path="/ranking" element={<Construction />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
