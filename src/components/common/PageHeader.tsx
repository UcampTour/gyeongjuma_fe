import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

export default function PageHeader({ title }: any) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mr: 1, ml: -1, color: "#614101" }}>
        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", color: "#333" }}>
        {title}
      </Typography>
    </Box>
  );
}