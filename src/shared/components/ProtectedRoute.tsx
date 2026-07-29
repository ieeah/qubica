import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/shared/context/AuthContext";

export default function ProtectedRoute() {
  const { isLogged } = useAuthContext();

  return isLogged ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
