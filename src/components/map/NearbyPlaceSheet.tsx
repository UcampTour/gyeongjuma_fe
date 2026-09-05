import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import { Box, Stack, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sheet, type SheetRef } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import defaultPlaceImage from "../../assets/default_place_img.png";
import {
  getCongestionConfig,
  getOperationStatusConfig,
} from "../../models/commonModel";
import type { PlaceListBase } from "../../models/PlaceModel";
import type { Weather } from "../../pages/map/MapMainPage";
interface SheetProps {
  open: boolean;
  onClose: () => void;
  placeList?: PlaceListBase[]; // 관광지 목록 데이터
  currentAddress: string | null;
  weather?: Weather;
}

export interface HandleInfoSheetRef {
  minimize: () => void;
  expand: () => void; // BottomSheet를 기본 높이로 열기 위한 메서드
  close: () => void; // BottomSheet를 닫기 위한 메서드
}
export enum SheetState {
  CLOSED = 0,
  MINI = 1,
  EXPANDED = 2,
}

export const snapPoints = [0, 0.2, 1];

/**
 * 관광지 상세 정보 BottomSheet
 */
const NearbyPlaceSheet = forwardRef<HandleInfoSheetRef, SheetProps>(
  ({ open, onClose, placeList, currentAddress, weather }, ref) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // const mountPoint = document.getElementById("sheet-root"); //  BottomSheet를 지도의 하단에 렌더링하기 위해 mountPoint를 지정
    // const [mountPoint, setMountPoint] = useState<HTMLElement | null>(null);
    const mountPoint = document.getElementById("sheet-root");

    // BottomSheet를 원하는 스냅 위치로 이동시키기 위한 ref
    const sheetRef = useRef<SheetRef>(null);

    // 현재 BottomSheet의 스냅 위치(index)
    const [snapIndex, setSnapIndex] = useState(SheetState.EXPANDED);

    useImperativeHandle(ref, () => ({
      close() {
        sheetRef.current?.snapTo(SheetState.CLOSED);
      },

      minimize() {
        sheetRef.current?.snapTo(SheetState.MINI);
      },

      expand() {
        sheetRef.current?.snapTo(SheetState.EXPANDED);
      },
    }));

    /**
     * 관광지 상세 화면으로 이동
     * @param placeId
     */
    const handleGoToPlace = (placeId: number) => {
      navigate(`/explore/${placeId}`);
    };

    /**
     * 시트 클릭 시 관광지 목록 화면으로 이동
     */
    const handleGoToPlaceList = () => {
      if (snapIndex === SheetState.EXPANDED) {
        navigate("/places");
      }
    };

    return (
      <Sheet
        ref={sheetRef}
        isOpen={open}
        onClose={onClose}
        mountPoint={mountPoint ?? undefined}
        snapPoints={snapPoints}
        initialSnap={SheetState.EXPANDED}
        detent="content"
        onSnap={setSnapIndex}
        style={{
          paddingBottom: "27px",
          bottom: 80,
        }}
      >
        <Sheet.Container
          style={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            transition: "border-radius 0.2s ease",
            backgroundColor: "#F4F0E4",
          }}
        >
          <Sheet.Header>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 12,
                paddingBottom: 8,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 5,
                  borderRadius: 999,
                  background: "#d8cfb5",
                }}
              />
            </div>
          </Sheet.Header>

          <Sheet.Content>
            <Box sx={{ p: 2 }} onClick={handleGoToPlaceList}>
              {/*  상단 : 현재위치, 날씨 */}
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  bgColor: "#ffffff",
                }}
              >
                {/* 현재 위치 */}
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{
                    alignItems: "center",
                    minWidth: 0,
                  }}
                >
                  <PersonPinCircleIcon
                    sx={{
                      color: "text.secondary",
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  />

                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      fontSize: "0.785rem",
                      color: "text.secondary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {currentAddress ?? "현재 위치를 확인 중..."}
                  </Typography>
                </Stack>

                {/* 날씨 */}
                {weather && (
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{
                      alignItems: "center",
                      flexShrink: 0,
                      bgColor: "#ffffff",
                    }}
                  >
                    <Box
                      component="img"
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt={weather.description}
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />

                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "text.primary",
                      }}
                    >
                      {Math.round(weather.temperature)}°C
                    </Typography>
                  </Stack>
                )}
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mb: 3 }}
              >
                <Typography variant="subtitle1">
                  {t("map:title.nearbyPlace")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#BC9A5D" }}
                >
                  TOP {placeList?.length}
                </Typography>
              </Stack>
              {placeList && placeList?.length > 0 && (
                <Swiper
                  spaceBetween={12}
                  slidesPerView={1.6}
                  grabCursor
                  style={{
                    width: "100%",
                    height: 270,
                  }}
                >
                  {placeList?.map((place) => {
                    const operationConfig = getOperationStatusConfig(
                      place?.operationStatus,
                    );

                    const congestionConfig = getCongestionConfig(
                      place?.congestion,
                    );

                    return (
                      <SwiperSlide key={place.placeId}>
                        <Box
                          onClick={() => handleGoToPlace(place.placeId)}
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: 270,
                            borderRadius: 3,
                            overflow: "hidden",
                          }}
                        >
                          {/* 이미지 */}
                          <Box
                            component="img"
                            src={place.imageUrl || defaultPlaceImage}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />

                          {/* 텍스트 */}
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "100%",
                              p: 2,
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                              color: "#fff",
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                              }}
                            >
                              {place.placeName ?? "장소 이름"}
                            </Box>

                            {/* 운영 상태 */}
                            <Box
                              sx={{
                                display: "inline-flex",
                                mt: 0.5,
                                px: 1,
                                py: 0.3,
                                borderRadius: "999px",
                                backgroundColor: operationConfig.bgColor,
                                color: operationConfig.iconColor,
                                fontSize: "0.7rem",
                                fontWeight: 600,
                              }}
                            >
                              {operationConfig.label}
                            </Box>

                            {/* 혼잡도 */}
                            <Box
                              sx={{
                                display: "inline-flex",
                                ml: 0.5,
                                px: 1,
                                py: 0.3,
                                borderRadius: "999px",
                                backgroundColor: congestionConfig.bgColor,
                                color: congestionConfig.iconColor,
                                fontSize: "0.65rem",
                                fontWeight: 500,
                              }}
                            >
                              {t(congestionConfig.label)}
                            </Box>
                          </Box>
                        </Box>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </Box>
          </Sheet.Content>
        </Sheet.Container>

        {/* 지도가 보이도록 Backdrop은 사용하지 않음 */}
      </Sheet>
    );
  },
);

export default NearbyPlaceSheet;
