import { Box, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import type { SiteMapMarker } from "../../models/MapModel";

interface SiteSummaryProps {
  site: SiteMapMarker;
}

const SiteSummary = ({ site }: SiteSummaryProps) => {
  return (
    <Stack
      sx={{
        p: 3,
        flex: 1,
        flexDirection: "column",
        gap: 4,
        height: "60%",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={3}>
        {/* 제목 */}
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {site.title}
        </Typography>
        {/* 정보 */}

        <Box sx={{ display: "flex", gap: 2 }}>
          <LocationOnOutlinedIcon sx={{ color: "text.secondary", mt: "2px" }} />

          <Box>
            <Typography variant="body1">
              경북 경주시 불국로 385 불국사
            </Typography>

            <Typography variant="body2" color="text.secondary">
              현위치에서부터 500m
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <WifiTetheringIcon sx={{ color: "text.secondary" }} />

          <Typography variant="body1">혼잡도 정보</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <LocalParkingIcon sx={{ color: "text.secondary" }} />

          <Typography variant="body1">주차 가능</Typography>
        </Box>
      </Stack>

      {/* 이미지 */}
      <Box
        component="img"
        src={site.image}
        alt={site.title}
        sx={{
          mt: "auto",
          width: "100%",
          height: 220,
          borderRadius: 4,
          objectFit: "cover",
        }}
      />
    </Stack>
  );
};

export default SiteSummary;
