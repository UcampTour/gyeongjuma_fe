import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";
import { useNavigate, useParams } from "react-router-dom";
import { useKakaoMap } from "../../hooks/map/useKakaoMap";

interface CoursePlace {
  courseSeqNo: number;
  placeId: number;
  placeName: string;
  mapX: number;
  mapY: number;
  image?: string;

  // 이전 관광지 → 현재 관광지
  travelDistance: number;
  travelMinutes: number;

  // 해당 관광지 평균 체류 시간
  stayMinutes: number;
}

interface CourseDetail {
  courseId: number;
  title: string;
  description: string;
  image: string;
  type: "WALK" | "TRANSIT" | "DRIVE";
  duration: number;
  courseList: CoursePlace[];
}

const courseDetailDummy: CourseDetail = {
  courseId: 1,
  title: "신라의 천년을 걷다",
  description: "경주의 대표적인 신라 문화유산을 따라 걷는 코스",
  image:
    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
  type: "WALK",
  duration: 240,

  courseList: [
    {
      courseSeqNo: 1,
      placeId: 1,
      placeName: "대릉원",
      mapX: 129.2116,
      mapY: 35.8397,
      travelDistance: 0,
      travelMinutes: 0,
      stayMinutes: 40,
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    },
    {
      courseSeqNo: 2,
      placeId: 2,
      placeName: "첨성대",
      mapX: 129.219,
      mapY: 35.8347,
      travelDistance: 700,
      travelMinutes: 10,
      stayMinutes: 30,
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    },
    {
      courseSeqNo: 3,
      placeId: 3,
      placeName: "동궁과 월지",
      mapX: 129.226,
      mapY: 35.8283,
      travelDistance: 900,
      travelMinutes: 12,
      stayMinutes: 50,
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    },
    {
      courseSeqNo: 4,
      placeId: 4,
      placeName: "월정교",
      mapX: 129.2194,
      mapY: 35.8298,
      travelDistance: 1000,
      travelMinutes: 15,
      stayMinutes: 40,
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

enum CourseSheetState {
  CLOSED = 0,
  MINI = 1,
  SUMMARY = 2,
  FULL = 3,
}

const COURSE_SNAP_POINTS = [
  0, // CLOSED
  0.1, // MINI
  0.6, // SUMMARY
  1, // FULL
];

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const mapRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<SheetRef>(null);

  /**
   * 기존 PlaceSummarySheet와 동일하게
   * sheet-root를 mountPoint로 사용
   */
  const mountPoint = useMemo(
    () => document.getElementById("sheet-root") ?? undefined,
    [],
  );

  const [snapIndex, setSnapIndex] = useState(CourseSheetState.SUMMARY);

  const { map } = useKakaoMap(mapRef);

  /**
   * 코스 순서대로 정렬
   */
  const courseList = useMemo(() => {
    return [...courseDetailDummy.courseList].sort(
      (a, b) => a.courseSeqNo - b.courseSeqNo,
    );
  }, []);

  /**
   * 전체 화면 여부
   */
  const isFull = snapIndex === CourseSheetState.FULL;

  /**
   * 지도에 코스 마커 + Polyline 표시
   */
  useEffect(() => {
    if (!map || courseList.length === 0) return;

    const kakao = window.kakao;

    // 관광지 좌표
    const positions = courseList.map(
      (place) => new kakao.maps.LatLng(place.mapY, place.mapX),
    );

    // 코스 Polyline
    const polyline = new kakao.maps.Polyline({
      path: positions,
      strokeWeight: 5,
      strokeColor: "#BC9A5D",
      strokeOpacity: 0.9,
      strokeStyle: "solid",
    });

    polyline.setMap(map);

    // 번호 마커
    const overlays = courseList.map((place, index) => {
      const position = positions[index];

      const content = document.createElement("div");

      content.innerHTML = `
        <div
          style="
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #BC9A5D;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            font-weight: 700;
          "
        >
          ${place.courseSeqNo}
        </div>
      `;

      const overlay = new kakao.maps.CustomOverlay({
        position,
        content,
        yAnchor: 0.5,
        xAnchor: 0.5,
        zIndex: 10,
      });

      overlay.setMap(map);

      return overlay;
    });

    // 모든 관광지가 보이도록 지도 영역 조정
    const bounds = new kakao.maps.LatLngBounds();

    positions.forEach((position) => {
      bounds.extend(position);
    });

    map.setBounds(bounds, 50, 50, 570, 50);

    // 정리
    return () => {
      polyline.setMap(null);

      overlays.forEach((overlay) => {
        overlay.setMap(null);
      });
    };
  }, [map, courseList]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        bgcolor: "#F7F5EE",
      }}
    >
      {/* =========================
          지도
      ========================= */}
      <Box
        ref={mapRef}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* =========================
          뒤로가기 버튼
      ========================= */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 20,

          width: 44,
          height: 44,

          bgcolor: "rgba(255, 255, 255, 0.95)",
          color: "#333",

          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",

          "&:hover": {
            bgcolor: "white",
          },
        }}
      >
        <ArrowBackIosNewIcon
          sx={{
            fontSize: 18,
          }}
        />
      </IconButton>

      {/* =========================
          코스 상세 Bottom Sheet
      ========================= */}
      <Sheet
        ref={sheetRef}
        isOpen={true}
        mountPoint={mountPoint}
        onClose={() => navigate(-1)}
        snapPoints={COURSE_SNAP_POINTS}
        initialSnap={CourseSheetState.SUMMARY}
        detent="full"
        onSnap={setSnapIndex}
      >
        <Sheet.Container
          style={{
            borderTopLeftRadius: isFull ? 0 : 24,
            borderTopRightRadius: isFull ? 0 : 24,
            transition: "border-radius .2s",
            backgroundColor: "#F7F5EE",
            boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.12)",
          }}
        >
          {/* =========================
              Sheet Header
          ========================= */}
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
                {/* 전체 → 요약 */}
                <IconButton
                  onClick={() =>
                    sheetRef.current?.snapTo(CourseSheetState.SUMMARY)
                  }
                >
                  <ArrowBackIosNewIcon />
                </IconButton>

                {/* 닫기 */}
                <IconButton onClick={() => navigate(-1)}>
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
                    bgcolor: "#D8CFB5",
                  }}
                />
              </Box>
            )}
          </Sheet.Header>

          {/* =========================
              Sheet Content
          ========================= */}
          <Sheet.Content>
            <Box
              sx={{
                px: 3,
                pb: 12,
              }}
            >
              {/* 코스 기본 정보 */}
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 700,
                  mb: 0.8,
                }}
              >
                {courseDetailDummy.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  color: "#777",
                  mb: 2,
                }}
              >
                {courseDetailDummy.description}
              </Typography>

              {/* =========================
                  코스 요약 정보
              ========================= */}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mb: 3,
                  overflowX: "auto",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    px: 1.5,
                    py: 0.8,
                    borderRadius: 2,
                    bgcolor: "#EFE7D8",
                    color: "#8F723F",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  🚶 도보
                </Box>

                <Box
                  sx={{
                    flexShrink: 0,
                    px: 1.5,
                    py: 0.8,
                    borderRadius: 2,
                    bgcolor: "#EFE7D8",
                    color: "#8F723F",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  ⏱ 약 {courseDetailDummy.duration}분
                </Box>

                <Box
                  sx={{
                    flexShrink: 0,
                    px: 1.5,
                    py: 0.8,
                    borderRadius: 2,
                    bgcolor: "#EFE7D8",
                    color: "#8F723F",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  📍 {courseList.length}곳
                </Box>
              </Stack>

              {/* =========================
                  관광지 Stepper
              ========================= */}
              <Stack spacing={0}>
                {courseList.map((place, index) => {
                  const isLast = index === courseList.length - 1;

                  return (
                    <Box
                      key={place.placeId}
                      sx={{
                        display: "flex",
                        minHeight: isLast ? 55 : 85,
                      }}
                    >
                      {/* Stepper 왼쪽 */}
                      <Box
                        sx={{
                          position: "relative",
                          width: 30,
                          flexShrink: 0,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {/* 연결선 */}
                        {!isLast && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 30,
                              bottom: 0,
                              width: 2,
                              bgcolor: "#DCCFB9",
                            }}
                          />
                        )}

                        {/* 번호 */}
                        <Box
                          sx={{
                            position: "relative",
                            zIndex: 1,
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            bgcolor: "#BC9A5D",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {place.courseSeqNo}
                        </Box>
                      </Box>

                      {/* 관광지 정보 */}
                      {/* 관광지 정보 */}
                      <Box
                        sx={{
                          flex: 1,
                          pl: 1.5,
                          pb: isLast ? 0 : 2,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                          minWidth: 0,
                        }}
                      >
                        {/* 관광지 텍스트 */}
                        <Box
                          sx={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 15,
                              fontWeight: 700,
                              lineHeight: "30px",
                            }}
                          >
                            {place.placeName}
                          </Typography>

                          {!isLast && (
                            <Typography
                              sx={{
                                mt: 0.5,
                                fontSize: 11,
                                color: "#999",
                              }}
                            >
                              다음 장소까지 {place.travelDistance}m ·{" "}
                              {place.travelMinutes}분
                            </Typography>
                          )}

                          {/* 체류 시간 */}
                          <Typography
                            sx={{
                              mt: 0.3,
                              fontSize: 11,
                              color: "#AAA",
                            }}
                          >
                            평균 체류 {place.stayMinutes}분
                          </Typography>
                        </Box>

                        {/* 관광지 이미지 */}
                        {place.image && (
                          <Box
                            component="img"
                            src={place.image}
                            alt={place.placeName}
                            onClick={(event) => {
                              event.stopPropagation();
                              navigate(`/explore/${place.placeId}`);
                            }}
                            sx={{
                              width: 50,
                              height: 50,
                              flexShrink: 0,
                              borderRadius: 2,
                              objectFit: "cover",
                              cursor: "pointer",
                              // boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                              transition: "transform 0.15s ease",

                              "&:hover": {
                                transform: "scale(1.03)",
                              },
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Sheet.Content>
        </Sheet.Container>

        {/* Backdrop 사용 안 함 */}
      </Sheet>
    </Box>
  );
};

export default CourseDetailPage;
