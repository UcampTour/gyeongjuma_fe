import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore"

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();

  return !isLoggedIn ? <Navigate to="/login" replace={true} /> : <Outlet />;
}

export default ProtectedRoute;