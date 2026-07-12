import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// LoginPage.jsx
const LoginPage = () => {

  const navigate = useNavigate();
  
  const handleLogin = (provider: string) => {
    console.log(`${provider} 로그인 버튼 클릭됨!`);
  };

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("구글 성공! 토큰:", credentialResponse.credential);

    try {
      const response = await axios.post("http://localhost:8080/api/members/login", {
        provider: "GOOGLE",
        idToken: credentialResponse.credential,
      });

      const {accessToken, refreshToken, isNewMember } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if(isNewMember) {
        navigate("/register");
      } else {
        navigate("/");
      }

      console.log("백엔드 응답 결과:", response.data);
    } catch(error) {
      console.log("백엔드 로그인 요청 실패:", error);
    }
  };

  const onError = () => {
      console.log("구글 로그인 실패");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', marginTop: '50px' }}>
      <h1>경주마 로그인</h1>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
      <button onClick={() => handleLogin('KAKAO')}>카카오로 로그인</button>
      <button onClick={() => handleLogin('NAVER')}>네이버로 로그인</button>
    </div>
  );
};

export default LoginPage;