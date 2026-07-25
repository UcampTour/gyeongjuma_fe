import { Box, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { useEffect, useState } from "react";
import defaultPlaceImage from "../../assets/default_place_img.png";
import { usePlaceDetail } from "../../hooks/place/usePlaceDetail";
import type { PlaceListBase } from "../../models/PlaceModel";
import InfoRow from "../common/InfoRow";

interface PlaceSummaryProps {
  placeId: number;
}

const PlaceSummaryPage = ({ placeId }: PlaceSummaryProps) => {
  const [place, setPlace] = useState<PlaceListBase>();
  const { getPlaceDetail } = usePlaceDetail();

  useEffect(() => {
    if (!placeId) return;
    const target = getPlaceDetail(placeId);
    setPlace(target);
  }, [placeId]);

  return (
    <Stack
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minHeight: "100%",
      }}
    >
      <Stack spacing={3}>
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
          {place?.placeName}
        </Typography>

        <InfoRow
          icon={<LocationOnOutlinedIcon color="action" />}
          label="주소"
          value={
            <>
              {place?.add1}
              {place?.add2 && (
                <>
                  <br />
                  {place.add2}
                </>
              )}
            </>
          }
        />

        <InfoRow
          icon={<WifiTetheringIcon color="action" />}
          label="혼잡도"
          value={place?.congestion}
        />

        <InfoRow
          icon={<LocalParkingIcon color="action" />}
          label="평점"
          value={
            place?.reviewCount
              ? `${place.rating} (${place.reviewCount}개)`
              : "리뷰 없음"
          }
        />

        <InfoRow
          icon={<LocationOnOutlinedIcon color="action" />}
          label="거리"
          value={`현재 위치로부터 ${place?.distance ?? "-"} m`}
        />

        <InfoRow
          icon={<LocationOnOutlinedIcon color="action" />}
          label="운영"
          value={place?.operationStatus}
        />
      </Stack>

      {/* 이미지 */}
      <Box
        component="img"
        src={place?.imageUrl || defaultPlaceImage}
        alt={place?.placeName}
        sx={{
          width: "100%",
          height: 210,
          borderRadius: 3,
          objectFit: "cover",
        }}
      />
    </Stack>
  );
};

export default PlaceSummaryPage;
