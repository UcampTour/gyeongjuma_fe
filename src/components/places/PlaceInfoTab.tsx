import GroupsIcon from "@mui/icons-material/Groups";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  getCongestionConfig,
  getOperationStatusConfig,
} from "../../models/commonModel";
import type { PlaceListBase } from "../../models/PlaceModel";
import InfoBox from "../common/InfoBox";

interface PlaceInfoTabProps {
  place?: PlaceListBase;
}

const PlaceInfoTab = ({ place }: PlaceInfoTabProps) => {
  const { t } = useTranslation();

  // 1. 상태 및 혼잡도 설정 추출 (1회 호출)
  const operationConfig = getOperationStatusConfig(place?.operationStatus);
  const congestionConfig = getCongestionConfig(place?.congestion);

  // 2. 주소 포맷팅 (null/undefined 대응)
  const formattedAddress = [place?.add1, place?.add2].filter(Boolean).join(" ");

  // 3. 거리 포맷팅 (km/m 자동 단위 전환 예시)
  const formattedDistance = (() => {
    if (place?.distance === undefined || place?.distance === null)
      return t("common:emptyState.none", "정보 없음");
    const distanceMeters = Math.round(place.distance);

    const formattedValue =
      distanceMeters >= 1000
        ? `${(distanceMeters / 1000).toFixed(1)}km`
        : `${distanceMeters.toLocaleString()}m`;

    // return t("places:detail.info.value.distance", {
    //   distance: formattedValue,
    // });
    return formattedValue;
  })();

  return (
    <Box sx={{ py: 2 }}>
      <Stack spacing={1}>
        <InfoBox
          icon={<LocationOnIcon />}
          label={t("places:detail.info.menu.address")}
          value={formattedAddress || t("common:emptyState.none")}
          description={
            <Stack direction={"row"} spacing={1} sx={{ ml: 4 }}>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "0.795rem",
                }}
              >
                {t("places:detail.info.value.distance")}{" "}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.795rem",
                }}
              >
                {formattedDistance}
              </Typography>
            </Stack>
          }
          // color="#ffffff5e"
        />
        <InfoBox
          icon={<LocalPhoneRoundedIcon />}
          label={t("places:detail.info.menu.tel")}
          value={place?.tel || t("common:emptyState.none")}
        />

        {/* 운영시간 */}
        <InfoBox
          icon={<ScheduleIcon />}
          label={t("places:detail.info.menu.operationInfo")}
          bgColor={operationConfig.bgColor}
          value={
            <Stack direction={"row"} spacing={1}>
              <Typography
                color={operationConfig.color}
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {t(operationConfig.label)}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                }}
              >
                {place?.operationHour === "상시개방"
                  ? t("places:operation.status.alwaysOpen")
                  : place?.operationHour || t("common:emptyState.none")}
              </Typography>
            </Stack>
          }
        />

        {/* 예상 혼잡도 */}
        <InfoBox
          icon={<GroupsIcon />}
          label={t("places:detail.info.menu.congestion")}
          value={
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
                color={congestionConfig.color}
              >
                {t(congestionConfig?.label)}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                }}
              >
                {t(congestionConfig?.message)}
              </Typography>
            </Stack>
          }
        />

        {/* 주차 여부 */}
        <InfoBox
          icon={<LocalParkingIcon />}
          label={t("places:detail.info.menu.parking")}
          value={
            place?.parking === "NONE"
              ? t("places:parking.none")
              : place?.parking === "AVAILABLE"
                ? t("places:parking.available")
                : t("places:parking.unavailable")
          }
        />
      </Stack>
    </Box>
  );
};

export default PlaceInfoTab;
