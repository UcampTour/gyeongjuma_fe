import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { login as socialLogin, myInfo } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const NaverCallbackPage = () => {
  const navigate = useNavigate();
  const { login, setAccessToken } = useAuthStore();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    // URL의 해시(#) 부분에서 access_token 파싱
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // '#' 제거 후 파싱
    const naverAccessToken = params.get("access_token");

    if (!naverAccessToken) {
      console.error("네이버 Access Token을 찾을 수 없습니다.");
      navigate("/login");
      return;
    }

    // 추출한 진짜 Access Token을 백엔드로 전송
    socialLogin({
      provider: "NAVER",
      idToken: null,
      accessToken: naverAccessToken,
    })
      .then(async (response) => {
        const accessToken = response.accessToken;
        setAccessToken(accessToken);

        if (response.isNewMember) {
          login(
            { memberId: response.memberId, nickname: response.nickname ?? "" },
            true,
            accessToken,
          );
          navigate("/register");
        } else {
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
      })
      .catch((err) => {
        console.error("네이버 로그인 에러:", err);
        navigate("/login");
      });
  }, [navigate, login, setAccessToken]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress />
    </Box>
  );
};

export default NaverCallbackPage;