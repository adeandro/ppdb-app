import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/public/Landing";
import Daftar from "./pages/public/Daftar";
import Dashboard from "./pages/admin/Dashboard";
import Pendaftar from "./pages/admin/Pendaftar";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/admin/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/pendaftar" element={<Pendaftar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
