import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";
import type { PlaceListBase } from "../../models/PlaceModel";
import PlaceSummaryPage from "./PlaceSummaryPage";
interface SheetProps {
  open: boolean;
  place: PlaceListBase | null;
  onClose: () => void;
}
export interface HandleSheetRef {
  full: () => void; // BottomSheet를 전체화면으로 열기 위한 메서드
  expand: () => void; // BottomSheet를 기본 높이로 열기 위한 메서드
  collapse: () => void; // BottomSheet를 닫기 위한 메서드
  close: () => void; // BottomSheet를 닫기 위한 메서드
}

export enum SheetState {
  CLOSED = 0,
  MINI = 1, // 10%
  SUMMARY = 2, // 60%
  FULL = 3, // 100%
}

export const SNAP_POINTS = [
  0, // CLOSED
  0.1, // MINI
  0.7, // SUMMARY
  1, // FULL
];

const PlaceSummarySheet = forwardRef<HandleSheetRef, SheetProps>(
  ({ open, place, onClose }, ref) => {
    const mountPoint = useMemo(
      () => document.getElementById("sheet-root") ?? undefined,
      [],
    );

    // BottomSheet를 원하는 스냅 위치로 이동시키기 위한 ref
    const sheetRef = useRef<SheetRef>(null);

    // 현재 BottomSheet의 스냅 위치(index)
    const [snapIndex, setSnapIndex] = useState(SheetState.CLOSED); // 기본 스냅 위치는 2 (45%)로 설정

    useImperativeHandle(ref, () => ({
      close: () => sheetRef.current?.snapTo(SheetState.CLOSED),
      collapse: () => sheetRef.current?.snapTo(SheetState.MINI),
      expand: () => sheetRef.current?.snapTo(SheetState.SUMMARY),
      full: () => sheetRef.current?.snapTo(SheetState.FULL),
    }));

    // 전체화면 상태 여부
    const isFull = snapIndex === SheetState.FULL;
    const navigate = useNavigate();

    return (
      <Sheet
        ref={sheetRef}
        isOpen={open}
        mountPoint={snapIndex === SheetState.MINI ? mountPoint : undefined}
        onClose={onClose}
        snapPoints={SNAP_POINTS}
        initialSnap={SheetState.SUMMARY}
        detent="full"
        onSnap={setSnapIndex}
      >
        <Sheet.Container
          style={{
            borderTopLeftRadius: isFull ? 0 : 24,
            borderTopRightRadius: isFull ? 0 : 24,
            transition: "border-radius .2s",
            backgroundColor: "#F4F0E4",
          }}
        >
          <Sheet.Header>
            {isFull ? (
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 1,
                  py: 1,
                }}
              >
                <IconButton
                  onClick={() => sheetRef.current?.snapTo(SheetState.SUMMARY)}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>

                <IconButton
                  onClick={() => {
                    sheetRef.current?.snapTo(SheetState.CLOSED);
                    onClose();
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 5,
                    borderRadius: 999,
                    bgcolor: "#d8cfb5",
                  }}
                />
              </Box>
            )}
          </Sheet.Header>

          <Sheet.Content>
            {place && (
              <>
                {snapIndex === SheetState.MINI && (
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography sx={{ fontWeight: 700 }}>
                      {place.placeName}
                    </Typography>
                  </Box>
                )}

                {snapIndex === SheetState.SUMMARY && (
                  <Box
                    sx={{ height: "100%" }}
                    onClick={() => navigate(`/explore/${place?.placeId}`)}
                    // onClick={() => sheetRef.current?.snapTo(SheetState.FULL)}
                  >
                    <PlaceSummaryPage placeId={place.placeId} />
                  </Box>
                )}
              </>
            )}
          </Sheet.Content>
        </Sheet.Container>

        {/* 지도가 보이도록 Backdrop은 사용하지 않음 */}
      </Sheet>
    );
  },
);

export default PlaceSummarySheet;
