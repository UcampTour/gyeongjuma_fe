import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import QuizIcon from "@mui/icons-material/Quiz";
import RouteIcon from "@mui/icons-material/Route";
import PlaceIcon from "@mui/icons-material/Place";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const AdminSidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const menuItems = [
    { path: "/admin/users", label: "회원 관리", icon: <PeopleAltIcon /> },
    { path: "/admin/places", label: "관광지 관리", icon: <PlaceIcon /> },
    { path: "/admin/courses", label: "코스 관리", icon: <RouteIcon /> },
    { path: "/admin/quizzes", label: "퀴즈 관리", icon: <QuizIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
    {menuItems.map((item) => {
      const isActive = currentPath.includes(item.path);
      return (
        <Button
          key={item.path}
          onClick={() => navigate(item.path)}
          startIcon={item.icon}
          sx={{
            justifyContent: "flex-start",
            color: isActive ? "#FFFFFF" : "#A8A29E",
            bgcolor: isActive ? "rgba(172,142,97,0.2)" : "transparent",
            fontWeight: isActive ? 700 : 500,
            borderRadius: "10px",
            py: 1.2,
            px: 2,
            textTransform: "none",
            "&:hover": { bgcolor: "rgba(172,142,97,0.1)", color: "#FFFFFF" },
          }}
        >
          {item.label}
        </Button>
      );
    })}
    </Box>
  )
}

export default AdminSidebar;