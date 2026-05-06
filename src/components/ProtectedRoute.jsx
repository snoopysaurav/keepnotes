import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading....</p>;
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}
