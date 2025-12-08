import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase";

export default function Sidebar() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <aside className="w-64 bg-gray-800 min-h-screen text-white p-4 flex flex-col justify-between">
      <div>
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
      </div>
      <div>
        <button
          className="w-full bg-gray-700 py-2 rounded hover:bg-gray-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
