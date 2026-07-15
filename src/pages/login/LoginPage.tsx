import { GoogleLogin } from "@react-oauth/google";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { login as googleLogin } from "../../api/authService";
import { useState } from "react";
import kakaoIcon from "../../assets/login/kakaoLoginIcon.png";
import naverIcon from "../../assets/login/naverLoginIcon.png";
import logo from "../../assets/gyeongjuma_logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // 구글 로그인(카카오, 네이버는 추후 구현)
  const onSuccess = async (credentialResponse: any) => {
    if (isLoading) return;
    setIsLoading(true);

    const idToken = credentialResponse.credential;
    if (!idToken) return;

    try {
      const response = await googleLogin({
        provider: "GOOGLE",
        idToken,
        accessToken: null,
      });
      login(
        response.accessToken,
        response.refreshToken,
        { memberId: response.memberId, nickname: response.nickname },
        response.isNewMember,
      );
      navigate(response.isNewMember ? "/register" : "/");
    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        pb: 4,
      }}
    >
      {/* 로고 영역 */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="로고"
          sx={{ maxWidth: "280px", width: "80%", height: "auto" }}
        />
      </Box>

      {/* 로그인 버튼 영역*/}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1, px: 2 }}>
          <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(0,0,0,0.1)" }} />
          <Typography
            sx={{
              mx: 2,
              color: "text.secondary",
              fontSize: "0.8rem",
              fontWeight: 500,
            }}
          >
            간편하게 시작하기
          </Typography>
          <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(0,0,0,0.1)" }} />
        </Box>

        {/* 구글 로그인 */}
        <Box sx={{ position: "relative", width: "100%", height: "52px" }}>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={() => console.log("구글 로그인 실패")}
            useOneTap
            containerProps={{
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
                zIndex: 1,
              },
            }}
          />
          <Button
            fullWidth
            sx={{
              height: "52px",
              borderRadius: 2,
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 600,
              border: "1px solid #e0e0e0",
              color: "#1f1f1f",
              bgcolor: "white",
              justifyContent: "center",
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 48 48"
              sx={{ width: 24, height: 24, mr: 1 }}
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </Box>
            Google 로그인
          </Button>
        </Box>

        {/* 카카오 로그인*/}
        <Button
          fullWidth
          sx={{
            height: "52px",
            borderRadius: 2,
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            bgcolor: "#FEE500",
            color: "#000",
            "&:hover": { bgcolor: "#FEE500" },
          }}
        >
          <Box
            component="img"
            src={kakaoIcon}
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          카카오 로그인
        </Button>

        {/* 네이버 로그인*/}
        <Button
          fullWidth
          sx={{
            height: "52px",
            borderRadius: 2,
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            bgcolor: "#03C75A",
            color: "#fff",
            "&:hover": { bgcolor: "#03C75A" },
          }}
        >
          <Box
            component="img"
            src={naverIcon}
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          네이버 로그인
        </Button>

        {/* 이용약관 */}
        <Typography
          sx={{
            textAlign: "center",
            mt: 2,
            color: "text.secondary",
            fontSize: "0.75rem",
            px: 2,
          }}
        >
          로그인시{" "}
          <Typography
            component="span"
            sx={{
              textDecoration: "underline",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            개인정보 처리방침
          </Typography>{" "}
          및{" "}
          <Typography
            component="span"
            sx={{
              textDecoration: "underline",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            서비스 이용약관
          </Typography>
          에 동의합니다.
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
