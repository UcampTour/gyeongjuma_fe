import { Box, Card, TextField, Typography, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/common/PageHeader";
import { checkNickname, updateMyInfo } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const ProfileEditPage = () => {
  const { t } = useTranslation("profile");
  const navigate = useNavigate();
  const { member, setMemberInfo } = useAuthStore();

  const [nickname, setNickname] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [locale, setLocale] = useState("ko");

  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState(t("defaultNicknameRule"));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // store에 저장된 member 정보를 초기값으로 설정
  useEffect(() => {
    if (member) {
      setNickname(member.nickname || "");
      if (member.difficulty) setDifficulty(member.difficulty);
      if (member.locale) setLocale(member.locale); 
    }
  }, [member]);

  // 닉네임 중복 확인 API 연동
  const handleCheckDuplicate = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) return;

    const specialCharRegex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/;

    if (specialCharRegex.test(trimmed)) {
      setIsAvailable(false);
      setErrorMessage(t("errorSpecialChar"));
      return;
    }

    if (trimmed.length < 2) {
      setIsAvailable(false);
      setErrorMessage(t("errorMinLength"));
      return;
    }

    try {
      const response = await checkNickname({ nickname: trimmed });
      if (response.available) {
        setIsAvailable(true);
        setErrorMessage(t("successAvailable"));
      } else {
        setIsAvailable(false);
        setErrorMessage(t("errorDuplicated"));
      }
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
      setErrorMessage(t("errorApiFail"));
    }
  };

  // 회원 정보 수정 API 연동
  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (nickname !== member?.nickname && isAvailable !== true) {
      alert(t("alertCheckNickname"));
      return;
    }

    try {
      setIsSubmitting(true);
      await updateMyInfo({
        nickname,
        difficulty,
        locale,
      });

      setMemberInfo({ nickname, difficulty, locale });

      alert(t("alertUpdateSuccess"));
      navigate("/profile");
    } catch (error) {
      console.error("회원 정보 수정 실패:", error);
      alert(t("alertUpdateFail"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const languages = [
    { code: "ko", label: "한국어" },
    { code: "en", label: "English" },
    { code: "ja", label: "日本語" },
    { code: "zh", label: "中文" },
];

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      <PageHeader title={t("pageTitle")} />

      <Box sx={{ px: 2, pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        
        {/* 1. 닉네임 변경 카드 */}
        <Card
          elevation={0}
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "20px",
            p: 2.5,
            boxShadow: "0 8px 24px rgba(142,114,73,0.06)",
            border: "1px solid #EFECE6",
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111", mb: 1.5 }}>
            {t("nicknameSectionTitle")}
          </Typography>
          
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <TextField
              fullWidth
              value={nickname}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10) {
                  setNickname(value);
                  setIsAvailable(null);
                  setErrorMessage(t("defaultNicknameRule"));
                }
              }}
              placeholder={t("nicknamePlaceholder")}
              size="small"
              slotProps={{
                htmlInput: {
                  maxLength: 10,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "#FAF8F5",
                  "& fieldset": { borderColor: "#E3DCCE" },
                  "&.Mui-focused fieldset": { borderColor: "#AC8E61" },
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111111",
                }
              }}
            />
            <Button
              variant="outlined"
              onClick={handleCheckDuplicate}
              sx={{
                minWidth: "84px",
                borderRadius: "12px",
                borderColor: "#AC8E61",
                color: "#AC8E61",
                fontWeight: 700,
                fontSize: "13px",
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "#9A7D52",
                  bgcolor: "#FAF8F5",
                }
              }}
            >
              {t("btnCheckDuplicate")}
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", px: 0.5 }}>
            <Typography 
              sx={{ 
                fontSize: "11px", 
                fontWeight: 600, 
                color: isAvailable === null ? "#958D80" : isAvailable ? "#2E7D32" : "#D32F2F" 
              }}
            >
              {errorMessage}
            </Typography>
            <Typography sx={{ fontSize: "11px", color: "#958D80", fontWeight: 600 }}>
              {nickname.length}/10{t("charUnit")}
            </Typography>
          </Box>
        </Card>

        {/* 2. 탐험 난이도 설정 카드 */}
        <Card
          elevation={0}
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "20px",
            p: 2.5,
            boxShadow: "0 8px 24px rgba(142,114,73,0.06)",
            border: "1px solid #EFECE6",
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111", mb: 1.5 }}>
            {t("difficultySectionTitle")}
          </Typography>
          <RadioGroup
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            {[
              { level: "EASY", label: t("diffEasyLabel"), desc: t("diffEasyDesc") },
              { level: "NORMAL", label: t("diffNormalLabel"), desc: t("diffNormalDesc") },
              { level: "HARD", label: t("diffHardLabel"), desc: t("diffHardDesc") },
            ].map(({ level, label, desc }) => (
              <FormControlLabel
                key={level}
                value={level}
                control={
                  <Radio 
                    sx={{
                      color: "#E3DCCE",
                      "&.Mui-checked": { color: "#AC8E61" },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#111111" }}>
                      {label}
                    </Typography>
                    <Typography sx={{ fontSize: "11px", color: "#958D80", fontWeight: 500 }}>
                      {desc}
                    </Typography>
                  </Box>
                }
                sx={{
                  bgcolor: "#FAF8F5",
                  border: "1px solid #F0ECE1",
                  borderRadius: "12px",
                  m: 0,
                  px: 2,
                  py: 1,
                  alignItems: "center",
                  transition: "border-color 0.15s ease",
                  "&:hover": { borderColor: "#AC8E61" }
                }}
              />
            ))}
          </RadioGroup>
        </Card>

        {/* 3. 언어 설정 카드 */}
        <Card
          elevation={0}
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "20px",
            p: 2.5,
            boxShadow: "0 8px 24px rgba(142,114,73,0.06)",
            border: "1px solid #EFECE6",
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111", mb: 1.5 }}>
            {t("localeSectionTitle")}
          </Typography>
          <RadioGroup
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
              gap: 1,
            }}
          >
            {languages.map(({ code, label }) => (
              <FormControlLabel
                key={code}
                value={code}
                control={
                  <Radio 
                    sx={{
                      color: "#E3DCCE",
                      "&.Mui-checked": { color: "#AC8E61" },
                    }}
                  />
                }
                label={
                  <Typography 
                    noWrap 
                    sx={{ fontSize: "13px", fontWeight: 700, color: "#111111" }}
                  >
                    {label}
                  </Typography>
                }
                sx={{
                  bgcolor: "#FAF8F5",
                  border: "1px solid #F0ECE1",
                  borderRadius: "12px",
                  m: 0,
                  px: 1.5,
                  py: 0.5,
                  transition: "border-color 0.15s ease",
                  "&:hover": { borderColor: "#AC8E61" }
                }}
              />
            ))}
          </RadioGroup>
        </Card>

        {/* 하단 저장 버튼 */}
        <Box sx={{ pt: 2 }}>
          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{
              bgcolor: "#AC8E61",
              color: "#FFFFFF",
              borderRadius: "16px",
              py: 1.8,
              fontWeight: 800,
              fontSize: "15px",
              boxShadow: "0 4px 12px rgba(172,142,97,0.3)",
              "&:hover": {
                bgcolor: "#9A7D52",
              },
              "&:disabled": {
                bgcolor: "#D3C5B4",
                color: "#FFFFFF"
              }
            }}
          >
            {isSubmitting ? t("btnSubmitting") : t("btnSubmit")}
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default ProfileEditPage;