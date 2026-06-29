import { Sheet, type SheetRef } from "react-modal-sheet";
import type { SiteMapMarker } from "../../models/MapModel";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SiteDetailPage from "../../pages/sites/SiteDetailPage";
interface SheetProps {
  open: boolean;
  site: SiteMapMarker | null;
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
  COLLAPSED = 1,
  EXPANDED = 2,
  FULL = 3,
}

export const snapPoints = [0, 0.1, 0.45, 1]; // BottomSheet의 스냅 위치

/**
 * BottomSheet의 스냅 위치
 * 0: 닫힘
 * 1: (20%) 마커 선택 후 지도 드래그 이동 시
 * 2: (45%) 기본
 * 3: 전체 화면
 */

const MapBottomSheet = forwardRef<HandleSheetRef, SheetProps>(
  ({ open, site, onClose }, ref) => {
    // BottomSheet를 원하는 스냅 위치로 이동시키기 위한 ref
    const sheetRef = useRef<SheetRef>(null);

    // 현재 BottomSheet의 스냅 위치(index)
    const [snapIndex, setSnapIndex] = useState(SheetState.EXPANDED); // 기본 스냅 위치는 2 (45%)로 설정

    // 전체화면 상태 여부

    useImperativeHandle(ref, () => ({
      collapse() {
        sheetRef.current?.snapTo(SheetState.COLLAPSED);
      },

      expand() {
        sheetRef.current?.snapTo(SheetState.EXPANDED);
      },

      full() {
        sheetRef.current?.snapTo(SheetState.FULL);
      },
      close() {
        sheetRef.current?.snapTo(SheetState.CLOSED);
      },
    }));

    return (
      <Sheet
        ref={sheetRef}
        isOpen={open}
        onClose={onClose}
        // snapPoints={[0, 0.45, 1]}
        snapPoints={snapPoints}
        initialSnap={2}
        detent="full"
        onSnap={setSnapIndex}
      >
        <Sheet.Container
          style={{
            borderTopLeftRadius: snapIndex === SheetState.FULL ? 0 : 24,
            borderTopRightRadius: snapIndex === SheetState.FULL ? 0 : 24,
            transition: "border-radius 0.2s ease",
            backgroundColor: "#F4F0E4",
          }}
        >
          <Sheet.Header>
            {snapIndex === SheetState.FULL ? (
              // 전체화면 :: 뒤로가기 버튼
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  p: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  onClick={() => {
                    sheetRef.current?.snapTo(SheetState.EXPANDED); // 기본(45%) 높이로 다시 내려가기
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    sheetRef.current?.snapTo(SheetState.CLOSED); // 닫기
                    onClose(); // 부모 컴포넌트에 닫기 이벤트 전달
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            ) : (
              // 기본 상태에서는 드래그 핸들만 표시

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
            )}
          </Sheet.Header>

          <Sheet.Content>
            {site && snapIndex === SheetState.COLLAPSED && (
              <div
                style={{
                  padding: "12px 20px",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {site.title}
              </div>
            )}
            {site && snapIndex === SheetState.EXPANDED && (
              // todo. 관광지 상세 정보 컴포넌트로 분리 예정
              <div style={{ padding: 20 }}>
                <h2>{site.title}</h2>

                <p>혼잡도 : {site.congestion}</p>

                <p>운영상태 : {site.status}</p>

                <p>방문여부 : {site.isVisited ? "방문" : "미방문"}</p>
              </div>
            )}
            {site && snapIndex === SheetState.FULL && (
              <SiteDetailPage siteId={site.id} />
            )}
          </Sheet.Content>
        </Sheet.Container>

        {/* 지도가 보이도록 Backdrop은 사용하지 않음 */}
      </Sheet>
    );
  },
);

export default MapBottomSheet;
