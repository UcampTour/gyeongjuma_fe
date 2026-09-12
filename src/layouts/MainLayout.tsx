import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import BottomNavigationBar from "../components/common/BottomNavigationBar";
import AudioMiniPlayer from "../pages/places/AudioMiniPlayer";
import { useBottomNavStore } from "../store/useBottomNavStore";

const MainLayout = () => {
  const { isVisible } = useBottomNavStore();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        bgcolor: "#EFECE2",
      }}
    >
      {/* 모바일 앱 영역 */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 444,
          height: "100dvh",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          bgcolor: "#F9F6EE",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 페이지 */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
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

        {/* Audio Mini Player */}
        <Box
          sx={{
            position: "absolute",
            bottom: 56,
            left: 0,
            width: "100%",
            zIndex: 1200,
          }}
        >
          <AudioMiniPlayer />
        </Box>

        {/* Bottom Navigation */}
        {isVisible && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: 1200,
            }}
          >
            <BottomNavigationBar />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MainLayout;
