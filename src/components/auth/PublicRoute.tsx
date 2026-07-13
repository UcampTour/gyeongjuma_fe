import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore"

const PublicRoute = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? <Navigate to="/" replace={true} /> : <Outlet />;
}

export default PublicRoute;