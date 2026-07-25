import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const PublicRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isPendingRegistration = useAuthStore(
    (state) => state.isPendingRegistration,
  );

  if (isLoggedIn) return <Navigate to="/" replace />;
  if (isPendingRegistration) return <Navigate to="/register" replace />;

  return <Outlet />;
};

export default PublicRoute;
