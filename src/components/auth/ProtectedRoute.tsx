import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore"

const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isPendingRegistration = useAuthStore((state) => state.isPendingRegistration);

  if (isPendingRegistration) return <Navigate to="/register" replace />;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;