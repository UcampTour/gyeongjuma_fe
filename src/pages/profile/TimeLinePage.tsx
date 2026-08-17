import { useState } from "react";
import { Box, Typography, CardMedia, Paper } from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import defaultPlaceImg from "../../assets/default_place_img.png";

const TimelinePage = () => {
  // 'summary' (요약 타임라인) 또는 'map' (지도 보기) 탭 상태 관리
  const [activeTab, setActiveTab] = useState<"summary" | "map">("summary");

  const [timelineData] = useState([
    { id: 1, name: "불국사", date: "2026.05.01 방문", image: defaultPlaceImg },
    { id: 2, name: "첨성대", date: "2026.05.03 방문", image: defaultPlaceImg },
    { id: 3, name: "동궁과 월지", date: "2026.05.05 방문", image: defaultPlaceImg },
    { id: 4, name: "대릉원", date: "2026.05.07 방문", image: defaultPlaceImg },
  ]);

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

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", display: "flex", flexDirection: "column", pb: activeTab === "map" ? 0 : 16 }}>
      <PageHeader title="내 발자취 모음" />

      {/* 상단 알약 탭 (칩 스위처) */}
      <Box sx={{ display: "flex", justifyContent: "center", pt: 2.5, px: 3, flexShrink: 0 }}>
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
              boxShadow: activeTab === "summary" ? "0 2px 8px rgba(142,114,73,0.12)" : "none",
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
              boxShadow: activeTab === "map" ? "0 2px 8px rgba(142,114,73,0.12)" : "none",
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
        <Box sx={{ px: 3, pt: 2, display: "flex", justifyContent: "center", flex: 1 }}>
          <Box 
            sx={{ 
              position: "relative", 
              display: "flex", 
              flexDirection: "column", 
              py: 2, 
              width: "100%", 
              maxWidth: "400px",
              minHeight: `${svgHeight}px`,
              alignItems: "center" 
            }}
          >
            <svg
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
              viewBox={`0 0 320 ${svgHeight}`} 
              fill="none" 
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="pathShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#8E7249" floodOpacity="0.08" />
                </filter>
              </defs>
              <path d={generateDynamicPath(badgeCount)} stroke="#E5DEC9" strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#pathShadow)" />
              <path d={generateDynamicPath(badgeCount)} stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d={generateDynamicPath(badgeCount)} stroke="#D3C5B4" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" fill="none" />
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
                    <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#2C251E", mb: 0.5, lineHeight: 1.3, wordBreak: "keep-all" }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: "11px", color: "#8C8273", fontWeight: 500, letterSpacing: "-0.3px" }}>
                      {item.date}
                    </Typography>
                  </Paper>

                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "3px solid #FFFFFF",
                      boxShadow: "0 6px 16px rgba(142,114,73,0.2), 0 2px 4px rgba(0,0,0,0.05)",
                      bgcolor: "#FFFFFF",
                      flexShrink: 0,
                      mx: "auto",
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <CardMedia component="img" image={item.image} alt={item.name} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
            flex: 1,
            mt: 2,
            width: "100%",
            height: "calc(100vh - 120px)", // 헤더와 탭 영역의 높이를 제외한 나머지 전체 화면
            bgcolor: "#EBE5D8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "#8C8273", fontWeight: 600, fontSize: "14px" }}>
            🗺️ 지도 영역
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TimelinePage;