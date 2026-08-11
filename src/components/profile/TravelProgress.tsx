import { Box, Card, LinearProgress, Typography } from "@mui/material"

interface TravelProgressProps {
  visitCount: number;
  quizCount: number;
  courseCount: number;
  distance: number;
} 

const TravelProgress = ({
  visitCount,
  quizCount,
  courseCount,
  distance
}: TravelProgressProps) => {

  const totalActions = visitCount + quizCount + courseCount;
  const currentLevel = Math.floor(totalActions / 5) + 1;
  const nextLevelMax = currentLevel * 5;
  const levelPercent = Math.min(Math.round((totalActions / nextLevelMax) * 100), 100);

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters} m`;
  };
  
  return (
      <Card
          elevation={0}
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "20px",
            p: 2.5,
            mb: 3,
            boxShadow: "0 8px 24px rgba(142,114,73,0.06)",
            border: "1px solid #EFECE6",
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111", mb: 2 }}>
            ✈️ 나의 여행 진행도
          </Typography>

          <Box sx={{ bgcolor: "#F7F5EE", p: 2, borderRadius: "16px", border: "1px solid #EFECE6", mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
              <Typography sx={{ fontWeight: 800, fontSize: "14px", color: "#AC8E61" }}>
                Lv.{currentLevel} 초보 탐험가
              </Typography>
              <Typography sx={{ fontSize: "11px", color: "#7A7265", fontWeight: 700 }}>
                달성률 {levelPercent}%
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={levelPercent} 
              sx={{
                height: 8, 
                borderRadius: 4, 
                bgcolor: "#E3DCCE",
                "& .MuiLinearProgress-bar": { bgcolor: "#AC8E61", borderRadius: 4 }
              }} 
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
              <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>방문한 장소</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#111111" }}>{visitCount}곳</Typography>
            </Box>

            <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
              <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>완료한 퀴즈</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#4A709C" }}>{quizCount}개</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
              <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>완주한 코스</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#C05656" }}>{courseCount}개</Typography>
            </Box>

             <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
              <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>총 이동거리</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 800, color: "#AC8E61" }}>{formatDistance(distance)}</Typography>
            </Box>
          </Box>
        </Card>
  )
}

export default TravelProgress;