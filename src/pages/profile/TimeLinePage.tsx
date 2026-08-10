import { useState } from "react";
import { Box, Typography, CardMedia } from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import defaultPlaceImg from "../../assets/default_place_img.png";

const TimelinePage = () => {
  const [timelineData] = useState([
    { id: 1, name: "불국사", date: "2026.05.01 방문", image: defaultPlaceImg },
    { id: 2, name: "첨성대", date: "2026.05.03 방문", image: defaultPlaceImg },
    { id: 3, name: "동궁과 월지", date: "2026.05.05 방문", image: defaultPlaceImg },
    { id: 4, name: "대릉원", date: "2026.05.07 방문", image: defaultPlaceImg },
  ]);

  const badgeCount = timelineData.length;
  const svgHeight = Math.max(360, badgeCount * 110);

  const generateDynamicPath = (count: number) => {
    if (count <= 1) return "M 80 50 L 80 60";
    let path = "M 80 50";
    let currentY = 50;

    for (let i = 0; i < count - 1; i++) {
      const nextY = currentY + 110;
      const isEvenStep = i % 2 === 0; 
      const startX = isEvenStep ? 80 : 240;
      const endX = isEvenStep ? 240 : 80;

      path += ` C ${startX} ${currentY + 55}, ${endX} ${nextY - 55}, ${endX} ${nextY}`;
      currentY = nextY;
    }
    return path;
  };

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      {/* 뒤로가기 기능이 포함된 헤더 */}
      <PageHeader title="내 발자취 모음" />

      <Box sx={{ px: 2, pt: 2 }}>
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", py: 2, px: 2, minHeight: `${svgHeight}px` }}>
          <svg
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
            viewBox={`0 0 320 ${svgHeight}`} fill="none" preserveAspectRatio="none"
          >
            <defs>
              <filter id="pathShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#8E7249" floodOpacity="0.12" />
              </filter>
            </defs>
            <path d={generateDynamicPath(badgeCount)} stroke="#D8D0C1" strokeWidth="16" strokeLinecap="round" fill="none" filter="url(#pathShadow)" />
            <path d={generateDynamicPath(badgeCount)} stroke="#FDFBF7" strokeWidth="9" strokeLinecap="round" fill="none" />
            <path d={generateDynamicPath(badgeCount)} stroke="#EADBCA" strokeWidth="2" strokeDasharray="4 8" strokeLinecap="round" fill="none" />
          </svg>

          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <Box
                key={item.id}
                sx={{
                  position: "relative", zIndex: 1, display: "flex",
                  flexDirection: isEven ? "row" : "row-reverse",
                  alignItems: "center", justifyContent: "flex-start",
                  pl: isEven ? "35px" : "0px", pr: isEven ? "0px" : "35px",
                  mb: index === timelineData.length - 1 ? 0 : "46px",
                  alignSelf: isEven ? "flex-start" : "flex-end",
                }}
              >
                <Box
                  sx={{
                    width: 68, height: 68, borderRadius: "50%", overflow: "hidden",
                    border: "3.5px solid #AC8E61", 
                    boxShadow: "0 8px 20px rgba(142,114,73,0.25), inset 0 2px 4px rgba(255,255,255,0.6)",
                    bgcolor: "#FFFFFF", flexShrink: 0,
                  }}
                >
                  <CardMedia component="img" image={item.image} alt={item.name} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>

                <Box 
                  sx={{ 
                    mx: 2, textAlign: isEven ? "left" : "right", display: "flex", 
                    flexDirection: "column", justifyContent: "center", maxWidth: "150px",
                    bgcolor: "rgba(255, 255, 255, 0.75)", p: 1, borderRadius: "12px",
                    backdropFilter: "blur(4px)", border: "1px solid rgba(239, 236, 230, 0.8)",
                    boxShadow: "0 2px 8px rgba(142,114,73,0.03)"
                  }}
                >
                  <Typography sx={{ fontWeight: 800, fontSize: "14px", color: "#111111", mb: 0.2, lineHeight: 1.2 }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: "10px", color: "#958D80", fontWeight: 600, letterSpacing: "-0.2px" }}>
                    {item.date}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default TimelinePage;