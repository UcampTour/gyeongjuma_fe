import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkNickname, registerExtraInfo } from "../../api/authService";
import logo from "../../assets/gyeongjuma_logo.png";
import { useAuthStore } from "../../store/useAuthStore";

const RegisterPage = () => {
  const [nickname, setNickname] = useState("");
  const [difficulty, setDifficulty] = useState("NORMAL");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const completeRegistration = useAuthStore(
    (state) => state.completeRegistration,
  );

  const handleCheckNickname = async () => {
    if (!nickname.trim()) return;
    try {
      const response = await checkNickname({ nickname });
      setIsAvailable(response.available);
    } catch (error) {
      console.error("중복 확인 실패", error);
      setIsAvailable(false);
    }
  };

  const handleRegister = async () => {
    if (isAvailable !== true) {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }
    try {
      const response = await registerExtraInfo({ nickname, difficulty });
      completeRegistration({
        memberId: response.memberId,
        nickname: response.nickname,
      });
      navigate("/");
    } catch (error) {
      alert("등록 실패");
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

      {/* 회원가입 폼 영역 */}
      <Box
        sx={{
          p: 4,
          bgcolor: "#fff",
          borderRadius: 5,
          boxShadow: "0px 8px 30px rgba(181, 153, 114, 0.15)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#B59972",
            textAlign: "center",
            mb: 1,
          }}
        >
          추가 정보 등록
        </Typography>

        {/* 닉네임 입력 및 중복 확인 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#333" }}
          >
            닉네임
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsAvailable(null);
              }}
              placeholder="2~12자 입력"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 3, height: "40px" },
              }}
            />
            <Button
              onClick={handleCheckNickname}
              disabled={!nickname.trim()}
              sx={{
                bgcolor: "#B59972",
                color: "white",
                borderRadius: 3,
                px: 2,
                height: "40px",
                "&:hover": { bgcolor: "#9a8361" },
                "&.Mui-disabled": { bgcolor: "#e0e0e0" },
              }}
            >
              확인
            </Button>
          </Box>
          <Box
            sx={{ minHeight: "24px", display: "flex", alignItems: "center" }}
          >
            <FormHelperText
              sx={{
                color: isAvailable === false ? "#d32f2f" : "#2e7d32",
                ml: 1,
                fontWeight: 500,
                visibility: isAvailable === null ? "hidden" : "visible",
              }}
            >
              {isAvailable === false
                ? "이미 사용 중인 닉네임입니다."
                : "사용 가능한 닉네임입니다."}
            </FormHelperText>
          </Box>
        </Box>

        {/* 난이도 설정 선택 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#333" }}
          >
            난이도 선택
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              sx={{ borderRadius: 3, height: "40px" }}
            >
              <MenuItem value="NORMAL">NORMAL</MenuItem>
              <MenuItem value="HARD">HARD</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* 회원가입 완료 버튼 */}
        <Button
          fullWidth
          onClick={handleRegister}
          sx={{
            mt: 2,
            height: "50px",
            bgcolor: "#B59972",
            color: "white",
            borderRadius: 3,
            fontSize: "16px",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#9a8361" },
          }}
        >
          회원가입 완료
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
