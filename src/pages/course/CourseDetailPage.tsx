import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";
import { useNavigate, useParams } from "react-router-dom";
import { useKakaoMap } from "../../hooks/map/useKakaoMap";
import { courseFilters, type CourseFilter } from "./CourseListPage";

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
  0, // 사용 안 함
  0.1, // MINI
  0.6, // SUMMARY
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

  const [snapIndex, setSnapIndex] = useState(CourseSheetState.SUMMARY);

  const { map } = useKakaoMap(mapRef);

  const [courseData, setCourseData] = useState<CourseDetail>(courseDetailDummy);

  /**
   * 코스 순서대로 정렬
   */
  const courseList = useMemo(() => {
    return [...courseData.courseList].sort(
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
  // useEffect(() => {
  //   if (!map || courseList.length === 0) return;

  //   const kakao = window.kakao;

  //   // 관광지 좌표
  //   const positions = courseList.map(
  //     (place) => new kakao.maps.LatLng(place.mapY, place.mapX),
  //   );

  //   // 코스 Polyline
  //   const polyline = new kakao.maps.Polyline({
  //     path: positions,
  //     strokeWeight: 5,
  //     strokeColor: "#BC9A5D",
  //     strokeOpacity: 0.9,
  //     strokeStyle: "solid",
  //   });

  //   polyline.setMap(map);

  //   // 번호 마커
  //   const overlays = courseList.map((place, index) => {
  //     const position = positions[index];

  //     const content = document.createElement("div");

  //     content.innerHTML = `
  //       <div
  //         style="
  //           width: 32px;
  //           height: 32px;
  //           border-radius: 50%;
  //           background: #BC9A5D;
  //           border: 3px solid white;
  //           box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  //           display: flex;
  //           align-items: center;
  //           justify-content: center;
  //           color: white;
  //           font-size: 14px;
  //           font-weight: 700;
  //         "
  //       >
  //         ${place.courseSeqNo}
  //       </div>
  //     `;

  //     const overlay = new kakao.maps.CustomOverlay({
  //       position,
  //       content,
  //       yAnchor: 0.5,
  //       xAnchor: 0.5,
  //       zIndex: 10,
  //     });

  //     overlay.setMap(map);

  //     return overlay;
  //   });

  //   // 모든 관광지가 보이도록 지도 영역 조정
  //   const bounds = new kakao.maps.LatLngBounds();

  //   positions.forEach((position) => {
  //     bounds.extend(position);
  //   });

  //   map.setBounds(bounds, 50, 50, 570, 50);

  //   // 정리
  //   return () => {
  //     polyline.setMap(null);

  //     overlays.forEach((overlay) => {
  //       overlay.setMap(null);
  //     });
  //   };
  // }, [map, courseList]);

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

    // Overlay 관리
    const markerOverlays: any[] = [];
    const infoOverlays: any[] = [];

    // 마커 생성
    courseList.forEach((place, index) => {
      const position = positions[index];

      // 번호 마커
      const markerContent = document.createElement("div");

      markerContent.innerHTML = `
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
          cursor: pointer;
        "
      >
        ${place.courseSeqNo}
      </div>
    `;

      const markerOverlay = new kakao.maps.CustomOverlay({
        position,
        content: markerContent,
        yAnchor: 0.5,
        xAnchor: 0.5,
        zIndex: 10,
      });

      markerOverlay.setMap(map);
      markerOverlays.push(markerOverlay);

      // 관광지 정보 말풍선
      const infoContent = document.createElement("div");

      infoContent.innerHTML = `
      <div
        style="
          min-width: 140px;
          padding: 10px 12px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.18);
        "
      >
        <div
          style="
            font-size: 13px;
            font-weight: 700;
            color: #333;
          "
        >
          ${place.courseSeqNo}. ${place.placeName}
        </div>
      </div>
    `;

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

    map.setBounds(bounds, 50, 50, 570, 50);

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
   * 코스 총 시간 계산 함수
   * @param minutes
   * @returns #시간#분
   */
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}분`;
    }

    if (remainingMinutes === 0) {
      return `${hours}시간`;
    }

    return `${hours}시간 ${remainingMinutes}분`;
  };

  /**
   * 코스 타입
   */
  const getCourseType = (type: CourseFilter["type"]) => {
    const courseType = courseFilters.find((item) => item.type === type);

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
                  {getCourseType(courseData?.type)}
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
                  ⏱ 약 {formatDuration(courseData?.duration)}
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
      </Sheet>
    </Box>
  );
};

export default CourseDetailPage;
