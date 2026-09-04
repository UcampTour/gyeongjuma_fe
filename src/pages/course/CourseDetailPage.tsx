import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseDetail } from "../../api/placeApi";
import { useKakaoMap } from "../../hooks/map/useKakaoMap";
import type { CourseDetail } from "../../models/CourseModel";
import { courseFilters } from "./courseConstants";

enum CourseSheetState {
  CLOSED = 0,
  MINI = 1,
  FULL = 2,
}

const COURSE_SNAP_POINTS = [
  0, // 사용 안 함
  0.3, // MINI
  1, // FULL
];

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>(); // 코스 아이디
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

  const [snapIndex, setSnapIndex] = useState(CourseSheetState.MINI);

  const { map } = useKakaoMap(mapRef);

  const [courseData, setCourseData] = useState<CourseDetail>();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await getCourseDetail(Number(courseId));
        setCourseData(response);
      } catch (error) {
        console.error("Failed to fetch course detail:", error);
      }
    };

    if (courseId) {
      fetchCourseDetail();
    }
  }, [courseId]);
  /**
   * 코스 순서대로 정렬
   */
  const courseList = useMemo(() => {
    return [...(courseData?.courseList || [])].sort(
      (a, b) => a.courseSeqNo - b.courseSeqNo,
    );
  }, [courseData]);

  /**
   * 전체 화면 여부
   */
  const isFull = snapIndex === CourseSheetState.FULL;

  useEffect(() => {
    if (!map || courseList.length === 0) return;

    const kakao = window.kakao;

    // 관광지 좌표
    const positions = courseList.map(
      (place) => new kakao.maps.LatLng(place.latitude, place.longitude),
    );

    // 코스 Polyline
    const polyline = new kakao.maps.Polyline({
      path: positions,
      strokeWeight: 5,
      strokeColor: "#614101",
      strokeOpacity: 0.9,
      strokeStyle: "solid",
    });

    polyline.setMap(map);

    // Overlay 관리
    const markerOverlays: any[] = [];
    const infoOverlays: any[] = [];

    // 마커 생성
    courseList.forEach((place, index) => {
      const position = positions[index];

      const markerContent = document.createElement("div");

      // 스타일 설정
      markerContent.style.position = "relative";
      markerContent.style.display = "flex";
      markerContent.style.flexDirection = "column";
      markerContent.style.alignItems = "center";
      markerContent.style.gap = "6px";
      markerContent.style.cursor = "pointer";

      const badge = document.createElement("div");
      badge.textContent = String(place.courseSeqNo);
      Object.assign(badge.style, {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "#614101",
        border: "3px solid white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "16px",
        fontWeight: "700",
        lineHeight: "16px",
        marginTop: "30px",
      } satisfies Partial<CSSStyleDeclaration>);

      const label = document.createElement("div");
      label.textContent = place.placeName;
      Object.assign(label.style, {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "120px",
        padding: "5px 10px",
        background: "rgba(255,255,255,0.96)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "999px",
        color: "#1F2937",
        fontSize: "11px",
        fontWeight: "700",
        lineHeight: "1.1",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        transform: "translateY(2px)",
        pointerEvents: "none",
        userSelect: "none",
      } satisfies Partial<CSSStyleDeclaration>);

      markerContent.appendChild(badge);
      markerContent.appendChild(label);

      const markerOverlay = new kakao.maps.CustomOverlay({
        position,
        content: markerContent,
        yAnchor: 0.5,
        xAnchor: 0.5,
        zIndex: 10,
      });

      markerOverlay.setMap(map);
      markerOverlays.push(markerOverlay);

      // markerContent.addEventListener("click", () => {
      //   navigate(`/explore/${place.placeId}`);
      // });

      // 관광지 정보 말풍선
      const infoContent = document.createElement("div");

      const infoOverlay = new kakao.maps.CustomOverlay({
        position,
        content: infoContent,
        yAnchor: 1.4,
        xAnchor: 0.5,
        zIndex: 20,
      });

      // 처음에는 숨김
      infoOverlay.setMap(null);

      infoOverlays.push(infoOverlay);

      // 마커 클릭
      markerContent.addEventListener("click", () => {
        // 모든 정보 말풍선 닫기
        infoOverlays.forEach((overlay) => {
          overlay.setMap(null);
        });

        // 현재 관광지 말풍선 열기
        infoOverlay.setMap(map);
      });
    });

    // 지도 빈 공간 클릭 시 관광지 정보 닫기
    const handleMapClick = () => {
      infoOverlays.forEach((overlay) => {
        overlay.setMap(null);
      });
    };

    // 지도 드래그 시작 시 관광지 정보 닫기
    const handleMapDragStart = () => {
      infoOverlays.forEach((overlay) => {
        overlay.setMap(null);
      });
    };
    kakao.maps.event.addListener(map, "click", handleMapClick);
    kakao.maps.event.addListener(map, "dragstart", handleMapDragStart);

    // 모든 관광지가 보이도록 지도 영역 조정
    const bounds = new kakao.maps.LatLngBounds();

    positions.forEach((position) => {
      bounds.extend(position);
    });

    map.setBounds(bounds, 50, 50, 200, 50);

    /**
     * 클린업
     */
    return () => {
      polyline.setMap(null);

      markerOverlays.forEach((overlay) => {
        overlay.setMap(null);
      });

      infoOverlays.forEach((overlay) => {
        overlay.setMap(null);
      });

      kakao.maps.event.removeListener(map, "click", handleMapClick);
      kakao.maps.event.removeListener(map, "dragstart", handleMapDragStart);
    };
  }, [map, courseList]);
  /**
   * 코스 상세 시트 접기 > CLOSE 제거, 최소 사이즈는 MINI
   */
  const handleSheetClose = () => {
    sheetRef.current?.snapTo(CourseSheetState.MINI);
  };

  /**
   * 코스 타입
   */
  const getCourseType = (type: string) => {
    const courseType = courseFilters.find((item: any) => item.type === type);
    return courseType ? `${courseType.emoji} ${courseType.label}` : "";
  };

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
      <Box
        ref={mapRef}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

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

      {/* 코스 상세 시트 */}
      <Sheet
        ref={sheetRef}
        isOpen={true}
        mountPoint={mountPoint}
        onClose={handleSheetClose}
        snapPoints={COURSE_SNAP_POINTS}
        initialSnap={CourseSheetState.MINI}
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
          onClick={() => {
            console.log("isFull", isFull);
            if (!isFull) {
              sheetRef.current?.snapTo(CourseSheetState.FULL);
            }
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
                {/* 전체 → 요약 */}
                <IconButton onClick={handleSheetClose}>
                  <ArrowBackIosNewIcon />
                </IconButton>

                {/* 닫기 */}
                <IconButton onClick={handleSheetClose}>
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

          <Sheet.Content>
            <Box
              sx={{
                px: 3,
                pb: 12,
                pt: 2,
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
                {courseData?.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  color: "#777",
                  mb: 2,
                }}
              >
                {courseData?.description}
              </Typography>

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
                  {courseData?.type && getCourseType(courseData.type)}
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
                  📍 {courseData?.courseList?.length}곳
                </Box>
              </Stack>

              {/* 관광지 Stepper */}
              {isFull && (
                <Box
                  sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    pr: 1,
                  }}
                >
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
                                  width: 3,
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
                          <Box
                            sx={{
                              flex: 1,
                              pl: 1.5,
                              pb: isLast ? 0 : 2,
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 4.5,
                              minWidth: 0,
                            }}
                          >
                            <Box
                              sx={{
                                flex: 1,
                                minWidth: 0,
                              }}
                            >
                              {/* 관광지명 */}
                              <Typography
                                sx={{
                                  fontSize: 15,
                                  fontWeight: 700,
                                  lineHeight: "30px",
                                }}
                              >
                                {place.placeName}
                              </Typography>
                              <Stack
                                direction="row"
                                spacing={0.5}
                                sx={{ alignItems: "flex-start" }}
                              >
                                <LocationOnOutlinedIcon
                                  sx={{
                                    fontSize: 15,
                                    color: "#8F723F",
                                    mt: "1px",
                                    flexShrink: 0,
                                  }}
                                />

                                <Typography
                                  sx={{
                                    fontSize: 12,
                                    color: "#52443e",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {place.address}
                                </Typography>
                              </Stack>
                            </Box>

                            {/* 관광지 이미지 */}
                            {place.image && (
                              <Box
                                component="img"
                                src={place.image}
                                alt={place.placeName}
                                onClick={(event: any) => {
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
              )}
            </Box>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </Box>
  );
};

export default CourseDetailPage;
