import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { authService } from "../../api/authService"; 
import { useAuthStore } from "../../store/useAuthStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const onSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    
    if (!idToken) return;

    try {
      const response = await authService.login("GOOGLE", idToken);

      const { accessToken, isNewMember } = response.data.data;
    
      login(accessToken);

      if (isNewMember) {
        navigate("/register");
      } else {
        navigate("/");
      }

      console.log("로그인 성공:", response.data);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const onError = () => {
    console.log("구글 로그인 실패");
  };

  // 카카오/네이버는 추후 구현 예정
  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} 로그인 준비중...`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', marginTop: '50px' }}>
      <h1>경주마 로그인</h1>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
      <button onClick={() => handleSocialLogin('KAKAO')}>카카오로 로그인</button>
      <button onClick={() => handleSocialLogin('NAVER')}>네이버로 로그인</button>
    </div>
  );
};

export default LoginPage;