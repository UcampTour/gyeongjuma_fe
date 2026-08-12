import { Box, Card, TextField, Typography, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";

const ProfileEditPage = () => {
  const [nickname, setNickname] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("특수문자 제외 2~10자로 입력해주세요.");

  const handleCheckDuplicate = () => {
    const trimmed = nickname.trim();
    if (!trimmed) return;

    // 특수문자 포함 여부 확인 정규식 (한글, 영문, 숫자만 허용)
    const specialCharRegex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/;

    if (specialCharRegex.test(trimmed)) {
      setIsAvailable(false);
      setErrorMessage("닉네임에는 특수문자를 사용할 수 없습니다.");
      return;
    }

    if (trimmed.length < 2) {
      setIsAvailable(false);
      setErrorMessage("2자 이상으로 입력해주세요.");
      return;
    }

    // 임시 중복 확인 로직 (예: "admin"이면 사용 불가, 나머지 가능)
    if (trimmed === "admin") {
      setIsAvailable(false);
      setErrorMessage("이미 사용 중인 닉네임입니다.");
    } else {
      setIsAvailable(true);
      setErrorMessage("사용 가능한 닉네임입니다.");
    }
  };

  const languages = [
    "한국어", "English", "日本語", "中文 (간체)", "中文 (번체)",
    "Deutsch", "Français", "Español", "Русский"
  ];

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      <PageHeader title="내 정보 수정" />

      <Box sx={{ px: 2, pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        
        {/* 1. 닉네임 변경 카드 (중복확인 및 상태 메시지 추가) */}
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
            ✏️ 닉네임 변경
          </Typography>
          
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <TextField
              fullWidth
              value={nickname}
              onChange={(e) => {
                const value = e.target.value;
                // 10자까지만 입력되도록 제한
                if (value.length <= 10) {
                  setNickname(value);
                  setIsAvailable(null); // 입력 변경 시 검증 초기화
                  setErrorMessage("특수문자 제외 2~10자로 입력해주세요.");
                }
              }}
              placeholder="사용하실 닉네임을 입력해주세요"
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
              중복확인
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
              {nickname.length}/10자
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
            🧭 탐험 난이도
          </Typography>
          <RadioGroup
            defaultValue="Easy"
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            {[
              { level: "Easy", desc: "초보 탐험가 코스" },
              { level: "Normal", desc: "일반 탐험가 코스" },
              { level: "Hard", desc: "심화 코스 및 퀴즈" },
            ].map(({ level, desc }) => (
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
                      {level}
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
            🌐 서비스 언어 (Language)
          </Typography>
          <RadioGroup
            defaultValue="한국어"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
              gap: 1,
            }}
          >
            {languages.map((lang) => (
              <FormControlLabel
                key={lang}
                value={lang}
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
                    {lang}
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
              }
            }}
          >
            변경사항 저장하기
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default ProfileEditPage;