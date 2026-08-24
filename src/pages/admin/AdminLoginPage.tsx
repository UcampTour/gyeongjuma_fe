import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 간단한 프론트엔드 유효성 검사 (실제 API 연동 시 백엔드로 전송)
    if (!adminId || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 로그인 성공 가정 (토큰 저장 및 어드민 메인으로 이동)
    alert("관리자 로그인 성공!");
    navigate("/admin/quizzes"); // 또는 대시보드 경로
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F9FAFB", // 기존 어드민 배경 톤
        p: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleLogin}
        elevation={0}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          border: "1px solid #E0E0E0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          bgcolor: "#FFFFFF",
        }}
      >
        {/* 상단 아이콘 및 타이틀 */}
        <Box
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            bgcolor: "#FAF7F2",
            color: "#AC8E61",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: -1,
          }}
        >
          <LockOutlinedIcon />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
            경주마 관리자 시스템
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            관리자 계정으로 로그인해 주세요.
          </Typography>
        </Box>

        {/* 입력 필드 그룹 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          <TextField
            label="관리자 아이디"
            size="small"
            fullWidth
            placeholder="admin_id"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />

          <TextField
            label="비밀번호"
            type="password"
            size="small"
            fullWidth
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            py: 1.2,
            bgcolor: "#AC8E61",
            color: "#FFFFFF",
            fontWeight: 700,
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#8f734a",
              boxShadow: "none",
            },
          }}
        >
          로그인
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminLoginPage;