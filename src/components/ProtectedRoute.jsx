import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  requirePasswordRecovery = false,
}) {
  const { user, loading, isPasswordRecovery } = useAuth();

  if (loading) return <p>Loading....</p>;

  if (requirePasswordRecovery) {
    if (!isPasswordRecovery) return <Navigate to="/" replace />;
    return <>{children}</>;
  }

  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}
