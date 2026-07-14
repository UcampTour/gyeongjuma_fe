import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import BottomNavigationBar from "../components/common/BottomNavigationBar";

const MainLayout = () => {
  return (
    <Container maxWidth="xs" disableGutters sx={{ bgcolor: "#F9F6EE", height: "100dvh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </Box>
      <BottomNavigationBar />
    </Container>
  );
}

export default MainLayout;