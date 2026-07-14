import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import BottomNavigationBar from "../components/common/BottomNavigationBar";

const MainLayout = () => {
  return (
    <Container
      maxWidth="xs"
      disableGutters
      sx={{
        bgcolor: "#F9F6EE",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </Box>

      {/* Sheet가 렌더링될 위치 */}
      <Box
        id="sheet-root"
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1100,
        }}
      />

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          maxWidth: 444,
          zIndex: 1200,
        }}
      >
        <BottomNavigationBar />
      </Box>
    </Container>
  );
};

export default MainLayout;
