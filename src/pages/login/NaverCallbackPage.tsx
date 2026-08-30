import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { login as socialLogin } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const NaverCallbackPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (!code) {
      navigate("/login");
      return;
    }

    // 백엔드로 인가 코드 및 state 전송 (provider를 NAVER로 지정)
    socialLogin({
      provider: "NAVER",
      idToken: null,
      accessToken: code, // 만약 state를 전달해야 한다면 보통 이 위치나 추가 필드로 보냅니다
    })
      .then((response) => {
        login(
          { memberId: response.memberId, nickname: response.nickname ?? "" },
          response.isNewMember,
          response.accessToken
        );
        navigate(response.isNewMember ? "/register" : "/");
      })
      .catch((err) => {
        console.error("네이버 로그인 에러:", err);
        navigate("/login");
      });
  }, [navigate, login]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress />
    </Box>
  );
};

export default NaverCallbackPage;