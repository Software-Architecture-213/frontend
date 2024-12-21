import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const ProtectedRoutes = () => {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  if (!profile) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
