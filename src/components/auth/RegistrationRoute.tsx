import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const RegistrationRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isPendingRegistration = useAuthStore(
    (state) => state.isPendingRegistration,
  );

  if (isPendingRegistration) return <Outlet />;

  return isLoggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RegistrationRoute;
