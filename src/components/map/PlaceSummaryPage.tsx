import { Box, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import type { PlaceSummary } from "../../models/MapModel";
import { useEffect, useState } from "react";
import { dummyPlaceSummaryList } from "../../data/map/placeSummaryList";

interface PlaceSummaryProps {
  placeId: number;
}

const PlaceSummaryPage = ({ placeId }: PlaceSummaryProps) => {
  const [place, setPlace] = useState<PlaceSummary>();

  useEffect(() => {
    if (!placeId) return;
    fetchAndSetPlaceSummary();
  }, []);

  const fetchAndSetPlaceSummary = () => {
    const target = dummyPlaceSummaryList.find(
      (item: PlaceSummary) => item.placeId === placeId,
    );
    if (!target) return;
    setPlace(target);
  };
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
        <Typography sx={{ fontSize: "1.15rem", fontWeight: 700 }}>
          {place?.placeName}
        </Typography>
        {/* 정보 */}

        <Box sx={{ display: "flex", gap: 2 }}>
          <LocationOnOutlinedIcon sx={{ color: "text.secondary", mt: "2px" }} />

          <Box>
            <Typography variant="body1">{place?.address}</Typography>

            <Typography variant="body2" color="text.secondary">
              현위치에서부터 {place?.distance}m
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <WifiTetheringIcon sx={{ color: "text.secondary" }} />

          <Typography variant="body1">혼잡도 정보</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <LocalParkingIcon sx={{ color: "text.secondary" }} />

          <Typography variant="body1">
            {place?.parkingYn ? "주차 가능" : "주차 공간 없음"}
          </Typography>
        </Box>
      </Stack>

      {/* 이미지 */}
      <Box
        component="img"
        src={place?.imageUrl}
        alt={place?.placeName}
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

export default PlaceSummaryPage;
