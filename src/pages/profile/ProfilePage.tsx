import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { logout as apiLogout, withdraw as apiWithdraw } from "../../api/authService";

const ProfilePage = () => {

  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {

    if(!isLoggedIn) return;

    try {
      await apiLogout();
      alert("로그아웃 완료");
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleWithdraw = async () => {

    if(!isLoggedIn) return;

    try {
      await apiWithdraw();
      alert("탈퇴 완료");
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("탈퇴 실패:", error);
    }
  };

  return (
    <>
      <h1>Profile Page</h1>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleWithdraw}>탈퇴</button>
    </>
  )
}

export default ProfilePage