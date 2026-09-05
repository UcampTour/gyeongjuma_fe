import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { login as socialLogin, myInfo } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const { login, setAccessToken } = useAuthStore();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      navigate("/login");
      return;
    }

    const getKakaoAccessTokenAndLogin = async (authCode: string) => {
      try {
        const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
        const REDIRECT_URI = `${window.location.origin}/auth/kakao/callback`;

        // 1. 카카오 토큰 서버에 POST 요청으로 Access Token 요청
        const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: authCode,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
          throw new Error("카카오 Access Token 발급 실패");
        }

        const kakaoAccessToken = tokenData.access_token;

        // 2. 발급받은 카카오 Access Token을 백엔드 서버로 전송
        const response = await socialLogin({
          provider: "KAKAO",
          idToken: null,
          accessToken: kakaoAccessToken,
        });

        const accessToken = response.accessToken;

        // 3. API 인증 헤더를 위해 액세스 토큰 세팅
        setAccessToken(accessToken);

        if (response.isNewMember) {
          login(
            { memberId: response.memberId, nickname: response.nickname ?? "" },
            true,
            accessToken,
          );
          navigate("/register");
        } else {
          // 기존 회원인 경우 로그인 직후 내 정보 조회
          const userInfo = await myInfo();

          login(
            {
              memberId: userInfo.memberId,
              nickname: userInfo.nickname,
              difficulty: userInfo.difficulty,
              locale: userInfo.locale,
            },
            false,
            accessToken,
          );

          navigate("/");
        }
      } catch (error) {
        console.error("카카오 로그인 에러:", error);
        navigate("/login");
      }
    };

    getKakaoAccessTokenAndLogin(code);
  }, [navigate, login, setAccessToken]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress />
    </Box>
  );
};

export default KakaoCallbackPage;