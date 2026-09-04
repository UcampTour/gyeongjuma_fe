import ApprovalRoundedIcon from "@mui/icons-material/ApprovalRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import defaultPlaceImage from "../../assets/default_place_img.png";
import { useFavoriteMutation } from "../../hooks/place/useFavoriteMutaion";
import { usePlaceDetail } from "../../hooks/place/usePlaceDetail";
import {
  CongestionLevel,
  getCongestionConfig,
  getOperationStatusConfig,
} from "../../models/commonModel";
import type { PlaceListBase } from "../../models/PlaceModel";
import { useAuthStore } from "../../store/useAuthStore";
interface PlaceSummaryProps {
  placeId: number;
}

const PlaceSummaryPage = ({ placeId }: PlaceSummaryProps) => {
  const { t } = useTranslation();
  const { member } = useAuthStore();
  const [place, setPlace] = useState<PlaceListBase>();
  const { getPlaceDetail } = usePlaceDetail();
  console.log("member.난이도", member?.difficulty);

  // 1. 상태 및 혼잡도 설정 추출 (1회 호출)
  const operationConfig = getOperationStatusConfig(place?.operationStatus);
  const congestionConfig = getCongestionConfig(place?.congestion);

  /**
   * 즐겨찾기 처리
   */
  const { mutate: toggleFavorite, isPending: isFavoritePending } =
    useFavoriteMutation();

  useEffect(() => {
    if (!placeId) return;
    const target = getPlaceDetail(placeId);
    setPlace(target);
  }, []);

  // 3. 거리 포맷팅 (km/m 자동 단위 전환 예시)
  const formattedDistance = (() => {
    if (place?.distance === undefined || place?.distance === null)
      return t("common:emptyState.none", "정보 없음");
    const distanceMeters = Math.round(place.distance);

    const formattedValue =
      distanceMeters >= 1000
        ? `${(distanceMeters / 1000).toFixed(1)}km`
        : `${distanceMeters.toLocaleString()}m`;

    return t("places:detail.info.value.distance", {
      distance: formattedValue,
    });
  })();

  /**
   * 즐겨찾기 처리/해제
   */
  const handleLike = () => {
    if (!place) return;

    toggleFavorite(place.placeId);
  };

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
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            {place?.placeName}
          </Typography>
          <IconButton onClick={handleLike} disabled={isFavoritePending}>
            {place?.isFavorite ? (
              <FavoriteRoundedIcon sx={{ color: "red", fontSize: 30 }} />
            ) : (
              <FavoriteBorderRoundedIcon
                sx={{ color: "inherit", fontSize: 30 }}
              />
            )}
          </IconButton>
        </Stack>

        {/* 주소 */}
        <Stack direction={"row"} spacing={2}>
          <LocationOnIcon color="action" />
          <Stack direction={"column"} spacing={1}>
            <Typography>
              {place?.add1} {place?.add2}
            </Typography>
            <Typography>{formattedDistance}</Typography>
          </Stack>
        </Stack>

        {/* 전화번호 */}
        <Stack direction={"row"} spacing={2}>
          <LocalPhoneRoundedIcon color={"action"} />
          <Typography color={place?.tel ? "primary" : "textDisabled"}>
            {place?.tel || t("common:emptyState.none")}
          </Typography>
        </Stack>

        {/* 운영 시간 */}
        <Stack direction={"row"} spacing={2}>
          <ScheduleIcon color="action" />
          <Typography
            color={operationConfig?.color}
            sx={{
              fontWeight: 700,
            }}
          >
            {t(operationConfig?.label)}
          </Typography>
          <Typography>
            {place?.operationHour || t("common:emptyState.none")}
          </Typography>
        </Stack>

        {/* 혼잡도 */}
        <Stack direction={"row"} spacing={2}>
          <GroupsIcon color="action" />
          {place?.congestion !== CongestionLevel.NONE && (
            <Typography
              color={congestionConfig?.color}
              sx={{
                fontWeight: 700,
              }}
            >
              {t(congestionConfig?.label)}
            </Typography>
          )}

          <Typography color={congestionConfig?.color}>
            {t(congestionConfig?.message)}
          </Typography>
        </Stack>

        {/* 방문 여부 */}
        <Stack direction={"row"} spacing={2}>
          <ApprovalRoundedIcon color="action" />
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            {t("places:isVisited.title")}
          </Typography>
          <Typography>
            {place?.isVisited
              ? t("places:isVisited.visited")
              : t("places:isVisited.unvisited")}
          </Typography>
        </Stack>
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
