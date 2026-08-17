import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {

  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F4F3EF" }}>

      {/* 1. 공통 사이드바 영역 */}
      <Box
        sx={{
          width: "260px",
          bgcolor: "#2C2A29",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 3,
          flexShrink: 0,
        }}
      >
        <Box>

          {/* 어드민 타이틀 */}
          <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                bgcolor: "#AC8E61",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "16px",
              }}
            >
              A
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: "15px", lineHeight: 1.2 }}>
                Gyeongjuma Admin
              </Typography>
            </Box>
          </Box>

          {/* 사이드바 메뉴 네비게이션 */}
          <AdminSidebar />

        </Box>

        {/* 하단 로그아웃 버튼 */}
        <Button
          startIcon={<LogoutIcon />}
          onClick={() => navigate("/")}
          sx={{
            justifyContent: "flex-start",
            color: "#A8A29E",
            borderRadius: "10px",
            py: 1,
            px: 2,
            textTransform: "none",
            "&:hover": { color: "#FF6B6B", bgcolor: "rgba(255,107,107,0.08)" },
          }}
        >
          로그아웃
        </Button>
      </Box>

      {/* 2. 메인 컨텐츠 영역 */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 4, overflowX: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;