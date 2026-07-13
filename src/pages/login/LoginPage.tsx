import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { login as googleLogin } from "../../api/authService";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore(); //이렇게 구독 하는거 별로니까 나중에 수정하자
  const [isLoading, setIsLoading] = useState(false);
  
  const onSuccess = async (credentialResponse: CredentialResponse) => {
    if(isLoading) return;
    
    setIsLoading(true);
    const idToken = credentialResponse.credential;
    
    if (!idToken) return;

    try {
      const response = await googleLogin({ provider: "GOOGLE", idToken:idToken, accessToken:null});
      const { accessToken, refreshToken, memberId, nickname, isNewMember } = response;

      login(accessToken, refreshToken, { memberId, nickname });

      if (isNewMember) {
        // 신규 회원은 스토어에 토큰을 저장하면 PublicRoute가 즉시 홈으로 리다이렉트하므로, 
        // 로그인 처리를 미루고 데이터만 넘겨 가입 페이지로 이동해야 함.
        navigate("/register");
      } else {
        navigate("/");
      } 

    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
        setIsLoading(false);
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