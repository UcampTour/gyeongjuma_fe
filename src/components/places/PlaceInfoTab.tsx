import { Box, Chip, Stack, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

const PlaceInfoTab = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Stack spacing={2}>
        {/* 예상 혼잡도 */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <GroupsIcon sx={{ color: "#BC9A5D" }} />

          <Stack spacing={0.3}>
            <Typography variant="caption" color="text.secondary">
              예상 혼잡도
            </Typography>

            <Chip
              label="보통"
              size="small"
              color="warning"
              sx={{ width: "fit-content" }}
            />
          </Stack>
        </Stack>

        {/* 운영 상태 */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <ScheduleIcon sx={{ color: "#BC9A5D" }} />

          <Stack spacing={0.3}>
            <Typography variant="caption" color="text.secondary">
              운영 상태
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              운영 중 (09:00 ~ 18:00)
            </Typography>
          </Stack>
        </Stack>

        {/* 주소 */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <LocationOnIcon sx={{ color: "#BC9A5D" }} />

          <Stack spacing={0.3}>
            <Typography variant="caption" color="text.secondary">
              주소
            </Typography>

            <Typography variant="body2">
              경상북도 경주시 건천읍 신경주역로 80
            </Typography>
          </Stack>
        </Stack>

        {/* 주차 정보 */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <LocalParkingIcon sx={{ color: "#BC9A5D" }} />

          <Stack spacing={0.3}>
            <Typography variant="caption" color="text.secondary">
              주차 정보
            </Typography>

            <Typography variant="body2">주차 가능 (무료)</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PlaceInfoTab;
