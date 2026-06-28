import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import BottomNavigationBar from "../components/common/BottomNavigationBar";

function MainLayout() {
  return (
    <Container
      maxWidth="xs"
      disableGutters
      sx={{
        bgcolor: "#F9F6EE",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box sx={{ flex: 1, pb: "90px" }}>
        <Outlet />
      </Box>

      <BottomNavigationBar />
    </Container>
  );
}

export default MainLayout;
