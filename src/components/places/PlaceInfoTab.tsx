import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StarIcon from "@mui/icons-material/Star";
import TourIcon from "@mui/icons-material/Tour";
import { Box, Chip, Stack } from "@mui/material";
import type { PlaceListBase } from "../../models/PlaceModel";
import InfoRow from "../common/InfoRow";
interface PlaceInfoTabProps {
  place?: PlaceListBase;
}

const PlaceInfoTab = ({ place }: PlaceInfoTabProps) => {
  return (
    <Box sx={{ py: 2 }}>
      <Stack spacing={3}>
        <InfoRow
          icon={<LocationOnIcon />}
          label="주소"
          // value={`${place?.add1 ?? ""} ${place?.add2 ?? ""}`.trim()}
          value={`${place?.add1}\n ${place?.add2}`}
        />
        <InfoRow
          icon={<ScheduleIcon />}
          label="운영 상태"
          value={
            <Chip
              label={place?.operationStatus ?? "정보 없음"}
              size="small"
              color="default"
            />
          }
        />
        <InfoRow
          icon={<RouteOutlinedIcon />}
          label="현재 위치"
          value={`${Math.round(place?.distance ?? 0).toLocaleString()}m`}
        />
        <InfoRow
          icon={<CategoryOutlinedIcon />}
          label="카테고리"
          value={place?.category}
        />
        <InfoRow
          icon={<GroupsIcon />}
          label="예상 혼잡도"
          value={
            <Chip
              label={place?.congestion ?? "정보 없음"}
              size="small"
              color="default"
            />
          }
        />

        <InfoRow
          icon={<StarIcon />}
          label="평점"
          value={place?.rating ? `${place?.rating?.toFixed(1)} 점` : "0.0점"}
        />
        <InfoRow
          icon={<ReviewsOutlinedIcon />}
          label="리뷰"
          value={`${place?.reviewCount ?? 0}개`}
        />
        <InfoRow
          icon={<FavoriteBorderIcon />}
          label="좋아요"
          value={`${place?.likes ?? 0}개`}
        />
        <InfoRow
          icon={<TourIcon />}
          label="방문 여부"
          value={
            <Chip
              label={place?.isVisited ? "방문 완료" : "미방문"}
              size="small"
              color={place?.isVisited ? "info" : "default"}
            />
          }
        />
      </Stack>
    </Box>
  );
};

export default PlaceInfoTab;
