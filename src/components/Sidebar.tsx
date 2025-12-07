import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 min-h-screen text-white p-4">
      <h2 className="text-xl font-bold mb-6">PPDB Admin</h2>
      <nav className="flex flex-col gap-3">
        <Link
          to="/admin/dashboard"
          className="hover:bg-gray-700 px-3 py-2 rounded"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/pendaftar"
          className="hover:bg-gray-700 px-3 py-2 rounded"
        >
          Pendaftar
        </Link>
      </nav>
    </aside>
  );
}
