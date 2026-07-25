import LaunchIcon from "@mui/icons-material/Launch";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, IconButton, Stack, Typography } from "@mui/material";

export interface MapSearchItemProps {
  title: string;
  enTitle?: string;
  address: string;
  distance?: number;
  onClick?: () => void;
}

const MapSearchItem = ({
  title,
  enTitle,
  address,
  distance,
  onClick,
}: MapSearchItemProps) => {
  /**
   * 거리를 사용자에게 보여줄 형식으로 변환
   * - 1000m 미만: xxx m
   * - 1000m 이상: x.x km
   */
  const formatDistance = (distance: number) => {
    if (distance < 1000) {
      return `${distance} m`;
    }

    const km = distance / 1000;

    // 소수점 첫째 자리까지 표시 (1.0 -> 1)
    return `${parseFloat(km.toFixed(1))} km`;
  };
  return (
    <Box
      onClick={onClick}
      sx={{
        py: 1,
        px: 0.5,
        borderBottom: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {/* 왼쪽 */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", flex: 1 }}
        >
          {/* 거리 */}
          <Stack
            sx={{
              // width: 64,
              // height: 64,
              px: 0.7,
              py: 1,
              borderRadius: "999px",
              bgcolor: "#F5E9CF",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LocationOnIcon
              sx={{
                color: "#7A7482",
                fontSize: 20,
              }}
            />
            {distance && (
              <Typography
                variant="caption"
                sx={{
                  fontSize: "10px",
                  fontWeight: 500,
                  mt: 0.3,
                }}
                color="text.secondary"
              >
                {formatDistance(distance)}
              </Typography>
            )}
          </Stack>

          {/* 관광지 정보 */}
          <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {title}
              {enTitle && ` ${enTitle}`}
            </Typography>

            <Typography sx={{ fontSize: "0.875rem" }} color="text.secondary">
              {address}
            </Typography>
          </Stack>
        </Stack>

        {/* 이동 아이콘 */}
        <IconButton disableRipple>
          <LaunchIcon sx={{ color: "#7A7A7A" }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default MapSearchItem;
