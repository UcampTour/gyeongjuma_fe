import { useNavigate } from "react-router-dom";
import { authService } from "../../api/authService"
import { useAuthStore } from "../../store/useAuthStore";

const ProfilePage = () => {

  const navigate = useNavigate();
  const { isLoggedIn, logout} = useAuthStore();

  const handleLogout = async () => {

    if(!isLoggedIn) return;

    try {
      await authService.logout();
      alert("로그아웃 완료");
      logout();
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleWithdraw = async () => {

    if(!isLoggedIn) return;

    try {
      await authService.withdraw();
      alert("탈퇴 완료");
      logout();
      navigate("/login");
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