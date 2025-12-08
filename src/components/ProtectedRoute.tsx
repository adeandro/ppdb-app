import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <h1 className="text-5xl text-gray-800 font-bold uppercase">
          Mengambil data
        </h1>
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  return children;
}
