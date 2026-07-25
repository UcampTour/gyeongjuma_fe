import { Sheet, type SheetRef } from "react-modal-sheet";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Box, Stack, Typography } from "@mui/material";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import type { PlaceListBase } from "../../models/PlaceModel";
import { nearbyPlaceList } from "../../data/map/nearbyPlaceList";
import defaultPlaceImage from "../../assets/default_place_img.png";
import { CongestionLevel, OperationStatus } from "../../models/commonModel";
interface SheetProps {
  open: boolean;
  onClose: () => void;
  initialSnap: SheetState;
  placeList?: PlaceListBase[]; // 관광지 목록 데이터
  currentAddress: string | null;
}

export interface HandleInfoSheetRef {
  summary: () => void;
  expand: () => void; // BottomSheet를 기본 높이로 열기 위한 메서드
  close: () => void; // BottomSheet를 닫기 위한 메서드
}
export enum SheetState {
  CLOSED,
  MINI,
  DEFAULT,
  EXPANDED,
  FULL,
}
export const SHEET_SNAP_POINTS = {
  CLOSED: 0,
  MINI: 0.1,
  DEFAULT: 0.3,
  EXPANDED: 0.7,
  FULL: 1,
} as const;
export const snapPoints = Object.values(SHEET_SNAP_POINTS);

/**
 * BottomSheet Snap Points
 *
 * CLOSED   : 0%
 * MINI     : 10%
 * DEFAULT  : 30%
 * EXPANDED : 60%
 * FULL     : 100%
 */

const STATUS_LABEL = {
  [OperationStatus.OPEN]: "운영 중",
  [OperationStatus.CLOSED]: "운영 종료",
  [OperationStatus.BREAK_TIME]: "브레이크 타임",
  [OperationStatus.NONE]: "정보 없음",
} as const;

const CONGESTION_LABEL = {
  [CongestionLevel.LOW]: "여유로운 시간대",
  [CongestionLevel.MEDIUM]: "일반적으로 붐비는 정도가 보통인 시간대",
  [CongestionLevel.HIGH]: "현재 많은 방문객이 몰려 혼잡한 시간대",
  [CongestionLevel.NONE]: "현재 혼잡도 정보 알 수 없음",
} as const;

const MapCommonInfoSheet = forwardRef<HandleInfoSheetRef, SheetProps>(
  (
    {
      open,
      onClose,
      initialSnap = SheetState.DEFAULT,
      placeList,
      currentAddress,
    },
    ref,
  ) => {
    const navigate = useNavigate();
    // const mountPoint = document.getElementById("sheet-root"); //  BottomSheet를 지도의 하단에 렌더링하기 위해 mountPoint를 지정
    // const [mountPoint, setMountPoint] = useState<HTMLElement | null>(null);
    const mountPoint = document.getElementById("sheet-root");

    // BottomSheet를 원하는 스냅 위치로 이동시키기 위한 ref
    const sheetRef = useRef<SheetRef>(null);

    // 현재 BottomSheet의 스냅 위치(index)
    const [snapIndex, setSnapIndex] = useState(initialSnap); // 기본 스냅 위치는 2 (45%)로 설정

    // useEffect(() => {
    //   setMountPoint(document.getElementById("sheet-root"));
    // }, []);

    useEffect(() => {
      if (open) {
        sheetRef.current?.snapTo(initialSnap);
        setSnapIndex(initialSnap);
      }
    }, [open, initialSnap]);

    // 전체화면 상태 여부

    useImperativeHandle(ref, () => ({
      summary() {
        sheetRef.current?.snapTo(SheetState.MINI);
      },

      expand() {
        sheetRef.current?.snapTo(SheetState.EXPANDED);
      },

      close() {
        sheetRef.current?.snapTo(SheetState.CLOSED);
      },
    }));

    const handleGoToPlace = (placeId: number) => {
      navigate(`/explore/${placeId}`);
    };

    return (
      <Sheet
        ref={sheetRef}
        isOpen={open}
        // onClose={() => sheetRef.current?.snapTo(SheetState.CLOSED)}
        onClose={onClose}
        mountPoint={mountPoint ?? undefined}
        // snapPoints={[0, 0.45, 1]}
        snapPoints={snapPoints}
        initialSnap={initialSnap}
        detent="content"
        onSnap={setSnapIndex}
        style={{
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
            <Box sx={{ p: 2 }}>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: "center", mb: 2 }}
              >
                <PersonPinCircleIcon
                  sx={{
                    color: "text.secondary",
                    fontSize: 20,
                  }}
                />

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 500, fontSize: "0.785rem" }}
                  color="text.secondary"
                >
                  {currentAddress ?? "현재 위치를 확인 중..."}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mb: 3 }}
              >
                <Typography variant="subtitle1">내 주변 인기 장소</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#BC9A5D" }}
                >
                  TOP {nearbyPlaceList.length}
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
                  {placeList?.map((place) => (
                    <SwiperSlide key={place.placeId}>
                      <Box
                        onClick={() => handleGoToPlace(place?.placeId)}
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 270,
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        {/* 1. 이미지 */}
                        <Box
                          component="img"
                          src={place.imageUrl || defaultPlaceImage}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />

                        {/* 2. 이미지 위에 얹을 텍스트 레이어 */}
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            padding: 2,

                            // 글씨가 잘 보이도록 아래쪽에만 반투명한 검은 그라데이션 추가
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                            color: "#fff", // 글자색 흰색 고정
                          }}
                        >
                          <Box sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                            {place.placeName ?? "장소 이름"}
                          </Box>
                          <Box sx={{ fontSize: "0.7rem" }}>
                            {STATUS_LABEL[place.operationStatus] ?? "정보 없음"}
                          </Box>
                          <Box
                            sx={{ fontSize: "0.65rem", opacity: 0.8, mt: 0.5 }}
                          >
                            {CONGESTION_LABEL[place.congestion] ??
                              "혼잡도 정보 알 수 없음"}
                          </Box>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  ))}
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

export default MapCommonInfoSheet;
