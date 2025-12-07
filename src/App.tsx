import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/public/Landing";
import Daftar from "./pages/public/Daftar";
import Dashboard from "./pages/admin/Dashboard";
import Pendaftar from "./pages/admin/Pendaftar";
import AdminLayout from "./layouts/AdminLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/daftar" element={<Daftar />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/pendaftar" element={<Pendaftar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
