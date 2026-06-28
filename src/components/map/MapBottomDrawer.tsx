import { Box } from "@mui/material";
import React from "react";

export interface MapBottomDrawerProps {
  //
  open?: boolean; // 드로어 열림 상태
  content: React.ReactNode; // 드로어에 표시할 내용
}
const MapBottomDrawer = ({ open, content }: MapBottomDrawerProps) => {
  return (
    <Box
      sx={{
        display: open ? "block" : "none",
        position: "absolute",
        bottom: 0,
        margin: 0,
        padding: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        width: "100%",
        bgcolor: "#F4F0E4",
        boxShadow: "0px -3px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px 20px 0 0",
        p: 2,
      }}
    >
      {content}
    </Box>
  );
};

export default MapBottomDrawer;
