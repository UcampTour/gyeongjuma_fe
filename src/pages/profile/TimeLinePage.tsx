import { Box, CardMedia, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTimeline } from "../../api/profileApi";
import defaultPlaceImg from "../../assets/default_place_img.png";
import PageHeader from "../../components/common/PageHeader";
import TimeLinePage from "../../components/profile/TimeLineMap";

const TimelinePage = () => {
  const navigate = useNavigate();
  // 'summary' (요약 타임라인) 또는 'map' (지도 보기) 탭 상태 관리
  const [activeTab, setActiveTab] = useState<"summary" | "map">("summary");
  const [timelineData, setTimelineData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTimeline();
        const visits = data.visits || [];

        const mappedData = visits.map((item: any) => {
          // 날짜 문자열("2026-07-28 05:01:07" 또는 "2026-07-28T...")에서 일까지만 추출
          let formattedDate = "";
          if (item.visitedAt) {
            const datePart = item.visitedAt.split(" ")[0].split("T")[0]; // "2026-07-28"
            const parts = datePart.split("-");
            if (parts.length === 3) {
              formattedDate = `${parts[0]}.${parts[1]}.${parts[2]} 방문`;
            } else {
              formattedDate = `${datePart} 방문`;
            }
          }

          return {
            id: item.visitId,
            name: item.placeName,
            // 원본 방문 일시(오래된 순 정렬용 raw 값 보관)
            rawDate: item.visitedAt || "",
            date: formattedDate,
            image: item.imageUrl || defaultPlaceImg,
            lat: item.lat,
            lng: item.lng,
          };
        });

        // 날짜 기준 오름차순(오래된 순) 정렬
        mappedData.sort((a: any, b: any) => {
          return new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime();
        });

        setTimelineData(mappedData);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const badgeCount = timelineData.length;
  const itemHeight = 130;
  const svgHeight = Math.max(400, badgeCount * itemHeight + 50);

  const generateDynamicPath = (count: number) => {
    if (count <= 1) return "M 160 40 L 160 80";
    let path = "M 160 40";
    let currentY = 40;

    for (let i = 0; i < count - 1; i++) {
      const nextY = currentY + itemHeight;
      const isEvenStep = i % 2 === 0;
      const startX = isEvenStep ? 160 : 160;
      const endX = isEvenStep ? 160 : 160;
      const cp1X = isEvenStep ? 160 : 160;
      const cp2X = isEvenStep ? 160 : 160;

      path += ` C ${cp1X} ${currentY + itemHeight / 2}, ${cp2X} ${nextY - itemHeight / 2}, ${endX} ${nextY}`;
      currentY = nextY;
    }
    return path;
  };

  const handleClick = (placeId: string) => {
    navigate(`/explore/${placeId}`);
  };

  return (
    <Box
      sx={{
        bgcolor: "#F7F5EE",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        pb: activeTab === "map" ? 0 : 16,
      }}
    >
      <PageHeader title="내 발자취 모음" />
      <Box
        sx={{
          px: 3,
          pt: 2,
          pb: 0.5,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#2C251E",
            lineHeight: 1.5,
          }}
        >
          🏆 지금까지{" "}
          <Box
            component="span"
            sx={{
              color: "#BC9A5D",
              fontWeight: 800,
            }}
          >
            {badgeCount}곳
          </Box>{" "}
          의 관광지를 방문했어요!
        </Typography>

        <Typography
          sx={{
            mt: 0.3,
            fontSize: "12px",
            color: "#8C8273",
            fontWeight: 500,
          }}
        >
          경주의 추억을 차곡차곡 모으고 있어요 ✨
        </Typography>
      </Box>

      {/* 상단 알약 탭 (칩 스위처) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 2.5,
          px: 3,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            bgcolor: "#EBE5D8",
            borderRadius: "999px",
            p: "4px",
            width: "100%",
            maxWidth: "320px",
            boxShadow: "inset 0 2px 4px rgba(142,114,73,0.06)",
          }}
        >
          <Box
            onClick={() => setActiveTab("summary")}
            sx={{
              flex: 1,
              py: "8px",
              textAlign: "center",
              borderRadius: "999px",
              cursor: "pointer",
              bgcolor: activeTab === "summary" ? "#FFFFFF" : "transparent",
              boxShadow:
                activeTab === "summary"
                  ? "0 2px 8px rgba(142,114,73,0.12)"
                  : "none",
              transition: "all 0.2s ease-in-out",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: activeTab === "summary" ? 700 : 500,
                color: activeTab === "summary" ? "#2C251E" : "#8C8273",
              }}
            >
              요약 보기
            </Typography>
          </Box>

          <Box
            onClick={() => setActiveTab("map")}
            sx={{
              flex: 1,
              py: "8px",
              textAlign: "center",
              borderRadius: "999px",
              cursor: "pointer",
              bgcolor: activeTab === "map" ? "#FFFFFF" : "transparent",
              boxShadow:
                activeTab === "map"
                  ? "0 2px 8px rgba(142,114,73,0.12)"
                  : "none",
              transition: "all 0.2s ease-in-out",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: activeTab === "map" ? 700 : 500,
                color: activeTab === "map" ? "#2C251E" : "#8C8273",
              }}
            >
              지도 보기
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 탭 내용 전환 영역 */}
      {activeTab === "summary" ? (
        /* 기존 요약 타임라인 뷰 */
        <Box
          sx={{
            px: 3,
            pt: 2,
            display: "flex",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              py: 2,
              width: "100%",
              maxWidth: "400px",
              minHeight: `${svgHeight}px`,
              alignItems: "center",
            }}
          >
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
              }}
              viewBox={`0 0 320 ${svgHeight}`}
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <filter
                  id="pathShadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="4"
                    floodColor="#8E7249"
                    floodOpacity="0.08"
                  />
                </filter>
              </defs>
              <path
                d={generateDynamicPath(badgeCount)}
                stroke="#E5DEC9"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                filter="url(#pathShadow)"
              />
              <path
                d={generateDynamicPath(badgeCount)}
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={generateDynamicPath(badgeCount)}
                stroke="#D3C5B4"
                strokeWidth="2"
                strokeDasharray="4 6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <Box
                  key={item.id}
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    width: "100%",
                    flexDirection: isEven ? "row" : "row-reverse",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: index === timelineData.length - 1 ? 0 : "36px",
                    px: 2,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      width: "125px",
                      p: "12px 14px",
                      borderRadius: "16px",
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(227, 218, 203, 0.6)",
                      boxShadow: "0 4px 16px rgba(142,114,73,0.06)",
                      textAlign: isEven ? "left" : "right",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#2C251E",
                        mb: 0.5,
                        lineHeight: 1.3,
                        wordBreak: "keep-all",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: "#8C8273",
                        fontWeight: 500,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {item.date}
                    </Typography>
                  </Paper>

                  <Box
                    sx={{
                      cursor: "pointer",
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "3px solid #FFFFFF",
                      boxShadow:
                        "0 6px 16px rgba(142,114,73,0.2), 0 2px 4px rgba(0,0,0,0.05)",
                      bgcolor: "#FFFFFF",
                      flexShrink: 0,
                      mx: "auto",
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                    onClick={() => handleClick(item.id)}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>

                  <Box sx={{ width: "125px" }} />
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        /* 지도 보기 탭 영역 (풀 화면) */
        <Box
          sx={{
            mt: 2,
            width: "100%",
            height: "calc(100vh - 150px)",
            overflow: "hidden",
          }}
        >
          <TimeLinePage
            places={timelineData.map((item) => ({
              id: item.id,
              name: item.name,
              lat: item.lat,
              lng: item.lng,
              image: item.image,
            }))}
          />
        </Box>
      )}
    </Box>
  );
};

export default TimelinePage;
