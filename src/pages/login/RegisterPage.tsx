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
import { useTranslation } from "react-i18next"; // 💡 i18n 훅 추가
import { useNavigate } from "react-router-dom";
import { checkNickname, registerExtraInfo } from "../../api/authApi";
import logo from "../../assets/gyeongjuma_logo.png";
import { useAuthStore } from "../../store/useAuthStore";

const RegisterPage = () => {
  const { t } = useTranslation("login"); // 💡 t 함수 선언
  const [nickname, setNickname] = useState("");
  const [difficulty, setDifficulty] = useState("NORMAL");
  const [locale, setLocale] = useState("KO");
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
      console.error(t("register.errorCheckFail"), error);
      setIsAvailable(false);
    }
  };

  const handleRegister = async () => {
    if (isAvailable !== true) {
      alert(t("register.alertCheckNickname"));
      return;
    }
    try {
      const response = await registerExtraInfo({ nickname, difficulty, locale });
      completeRegistration({
        memberId: response.memberId,
        nickname: response.nickname,
        difficulty: difficulty,
        locale: locale,
      });
      navigate("/");
    } catch (error) {
      alert(t("register.alertRegisterFail"));
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
          {t("register.title")}
        </Typography>

        {/* 닉네임 입력 및 중복 확인 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#333" }}
          >
            {t("register.nickname")}
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
              placeholder={t("register.nicknamePlaceholder")}
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
              {t("register.nicknameCheck")}
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
                ? t("register.nicknameHelperInUse")
                : t("register.nicknameHelperAvailable")}
            </FormHelperText>
          </Box>
        </Box>

        {/* 난이도 설정 선택 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#333" }}
          >
            {t("register.difficulty")}
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              sx={{ borderRadius: 3, height: "40px" }}
            >
              <MenuItem value="EASY">{t("register.difficultyEasy")}</MenuItem>
              <MenuItem value="NORMAL">{t("register.difficultyNormal")}</MenuItem>
              <MenuItem value="HARD">{t("register.difficultyHard")}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* 언어 선택 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#333" }}
          >
            {t("register.locale")}
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              sx={{ borderRadius: 3, height: "40px" }}
            >
              <MenuItem value="ko">{t("register.localeKo")}</MenuItem>
              <MenuItem value="en">{t("register.localeEn")}</MenuItem>
              <MenuItem value="ja">{t("register.localeJa")}</MenuItem>
              <MenuItem value="zh">{t("register.localeZh")}</MenuItem>
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
          {t("register.submit")}
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;