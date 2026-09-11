import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import defaultPlaceImg from "../../../assets/default_place_img.png";
import { CongestionLevel, OperationStatus } from "../../../models/commonModel";
import { type PlaceListBase } from "../../../models/PlaceModel";
import CommonStamp from "../../common/CommonStamp";
import StatusBadge from "../../common/StatusBadge";
import { useAuthStore } from "../../../store/useAuthStore";

interface PlaceCardProps {
  place: PlaceListBase;
  onClick: () => void;
}

const PlaceCard = ({ place, onClick }: PlaceCardProps) => {
  const { t } = useTranslation("places");

  const difficulty = useAuthStore((state) => state.member?.difficulty) || "normal";
  const lowerDifficulty = difficulty.toLowerCase() as keyof typeof place.description;
  const currentDescription = place.description?.[lowerDifficulty] || place.description?.normal || "";

  // 현재 json 구조(congestion.status 및 status)에 맞게 번역 경로 수정
  const badgeConfig: Record<
    CongestionLevel | OperationStatus,
    { translationKey: string; bgColor: string }
  > = {
    [CongestionLevel.HIGH]: { translationKey: "congestion.status.high", bgColor: "#C05656" },
    [CongestionLevel.MEDIUM]: { translationKey: "congestion.status.medium", bgColor: "#E0A928" },
    [CongestionLevel.LOW]: { translationKey: "congestion.status.low", bgColor: "#3F8E72" },
    [CongestionLevel.NONE]: { translationKey: "congestion.status.none", bgColor: "#d8d8d8" },
    [OperationStatus.CLOSED]: { translationKey: "status.closed", bgColor: "#757575" },
    [OperationStatus.BREAK_TIME]: { translationKey: "status.breakTime", bgColor: "#E2723B" },
    [OperationStatus.OPEN]: { translationKey: "status.open", bgColor: "#3F8E72" },
  };

  const currentConfig =
    place.operationStatus === OperationStatus.OPEN &&
    place.congestion !== CongestionLevel.NONE
      ? badgeConfig[place.congestion]
      : badgeConfig[place.operationStatus] || badgeConfig[OperationStatus.NONE];

  return (
    <Card
      key={place.placeId}
      elevation={0}
      onClick={onClick}
      sx={{
        display: "flex",
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        p: 1.5,
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
        transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
        overflow: "hidden",
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      {/* 이미지 및 상태 배지 래퍼 */}
      <Box
        sx={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}
      >
        <CardMedia
          component="img"
          image={place.imageUrl ?? defaultPlaceImg}
          alt={place.placeName}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            objectFit: "cover",
            bgcolor: "#F5F2EB",
          }}
        />
        <StatusBadge
          label={t(currentConfig.translationKey)}
          bgcolor={currentConfig.bgColor}
        />
      </Box>

      {/* 우측 정보 텍스트 영역 */}
      <Box
        sx={{
          flex: 1,
          pl: 1.5,
          pr: 0.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* 상단 타이틀 부분 */}
        <Box>
          {/* <Typography
            sx={{
              color: "#AC8E61",
              fontSize: "12px",
              fontWeight: 600,
              mb: 0.1,
            }}
          >
            {place.category}
          </Typography> */}

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "17px",
              color: "#111111",
              mb: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {place.placeName}
          </Typography>

          <Typography
            sx={{
              color: "#958D80",
              fontSize: "12.5px",
              lineHeight: 1.3,
              mt: "8px",
              mb: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {currentDescription}
          </Typography>
        </Box>

        {/* 하단 아이콘 정보바  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#666666",
            width: "100%",
            columnGap: 2.5,
            rowGap: 0.4,
            flexWrap: "wrap",
            overflow: "hidden",
          }}
        >
          {/* 거리 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <LocationOnIcon
              sx={{
                fontSize: "14px",
                color: "#B8B0A2",
                mr: 0.3,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#7A7265",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              {place.distance !== null
                ? `${place.distance.toFixed(1)}km`
                : "계산중"}
            </Typography>
          </Box>

          {/* 찜 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <FavoriteIcon
              sx={{
                fontSize: "13px",
                color: "#C05656",
                mr: 0.3,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#7A7265",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              {place.totalFavorite}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 방문 완료 도장 */}
      {place.isVisited && (
        <Box
          sx={{
            position: "absolute",
            right: "4px",
            top: "4px",
            transform: "rotate(15deg)",
          }}
        >
          <CommonStamp label={t("visitcomplete")} />
        </Box>
      )}
    </Card>
  );
};

export default memo(PlaceCard);