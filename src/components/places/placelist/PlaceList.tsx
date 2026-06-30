import { Box, Card, CardMedia, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CongestionLevel, OperationStatus } from "../../../models/MapModel";
import type { PlaceListItem } from "../../../models/placesModel";

interface PlaceListProps {
  placeList: PlaceListItem[];
}

const statusStyles: Record<CongestionLevel | OperationStatus, { label: string; bgColor: string }> = {
  [CongestionLevel.HIGH]: { label: "혼잡", bgColor: "#C05656" }, 
  [CongestionLevel.MEDIUM]: { label: "보통", bgColor: "#E0A928" },
  [CongestionLevel.LOW]: { label: "여유", bgColor: "#3F8E72" },
  [OperationStatus.CLOSED]: { label: "종료", bgColor: "#757575" },
  [OperationStatus.BREAK_TIME]: { label: "준비중", bgColor: "#E2723B" },
  [OperationStatus.OPEN]: { label: "영업중", bgColor: "#3F8E72" }, 
};

const PlaceList = ({ placeList }: PlaceListProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {placeList.map((place) => {
        const currentBadge = place.operationStatus === OperationStatus.OPEN
          ? (statusStyles[place.congestion] || statusStyles[OperationStatus.OPEN])
          : statusStyles[place.operationStatus];

        return (
          <Card 
            key={place.id} 
            elevation={0} 
            sx={{ 
              display: "flex", 
              bgcolor: "#FFFFFF",      
              borderRadius: "16px",     
              p: 1.5,                   
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(142,114,73,0.04)", 
              transition: "transform 0.2s, box-shadow 0.2s",
              position: "relative", 
              overflow: "hidden",   
              "&:hover": { transform: "translateY(-2px)" }
            }}
          >
            {/* 이미지 및 상태 배지 래퍼 */}
            <Box sx={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
              <CardMedia
                component="img"
                image={place.imageUrl}
                alt={place.name}
                sx={{ 
                  width: "100%", 
                  height: "100%", 
                  borderRadius: "12px", 
                  objectFit: "cover",
                  bgcolor: "#F5F2EB",
                }}
              />
              <Box sx={{ 
                position: "absolute",
                top: "6px",
                left: "6px",
                bgcolor: currentBadge.bgColor,
                color: "#FFFFFF",
                px: 0.8,
                py: 0.3,
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 800,
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                letterSpacing: "-0.3px",
                lineHeight: 1
              }}>
                {currentBadge.label}
              </Box>
            </Box>

            {/* 우측 정보 텍스트 영역 */}
            <Box sx={{ flex: 1, pl: 1.5, pr: 0.5, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0, overflow: "hidden" }}>
              
              {/* 상단 타이틀 부분 */}
              <Box>
                <Typography sx={{ color: "#AC8E61", fontSize: "12px", fontWeight: 600, mb: 0.1 }}>
                  {place.category}
                </Typography>
                
                <Typography sx={{ fontWeight: 800, fontSize: "17px", color: "#111111", mb: 0.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {place.name}
                </Typography>
                
                <Typography sx={{ 
                  color: "#958D80", 
                  fontSize: "12.5px", 
                  lineHeight: 1.3,
                  overflow: "hidden", 
                  textOverflow: "ellipsis", 
                  display: "-webkit-box", 
                  WebkitLineClamp: 2, 
                  WebkitBoxOrient: "vertical" 
                }}>
                  {place.description}
                </Typography>
              </Box>
              
              {/* 🛠️ 하단 아이콘 정보바  */}
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                color: "#666666", 
                width: "100%", 
                columnGap: 2.5, 
                rowGap: 0.4,    
                mt: 0.8,
                flexWrap: "wrap", 
                overflow: "hidden"
                }}>
                
                {/* 거리 */}
                <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, whiteSpace: "nowrap" }}>
                  <LocationOnIcon sx={{ fontSize: "14px", color: "#B8B0A2", mr: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: "#7A7265", fontSize: "12px", fontWeight: 500, lineHeight: 1.2 }}>
                    {place.distance !== null ? `${place.distance.toFixed(1)}km` : "계산중"}
                  </Typography>
                </Box>

                {/* 별점 */}
                <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, whiteSpace: "nowrap" }}>
                  <StarIcon sx={{ fontSize: "14px", color: "#E0B134", mr: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: "#7A7265", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", lineHeight: 1.2 }}>
                    {place.rating}
                    <Box component="span" sx={{ fontSize: "11px", color: "#958D80", ml: 0.2, fontWeight: 400 }}>
                      ({place.reviewCount})
                    </Box>
                  </Typography>
                </Box>

                {/* 찜 */}
                <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, whiteSpace: "nowrap" }}>
                  <FavoriteIcon sx={{ fontSize: "13px", color: "#C05656", mr: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: "#7A7265", fontSize: "12px", fontWeight: 500, lineHeight: 1.2 }}>
                    {place.likes}
                  </Typography>
                </Box>
                
              </Box>
            </Box>

            {/* 방문 완료 도장 */}
            {place.isVisited && (
              <Box
                sx={{
                  position: "absolute",
                  right: "4px",  
                  top: "4px",    
                  transform: "rotate(15deg)", 
                  width: "50px",  
                  height: "50px", 
                  borderRadius: "50%",
                  border: "1.5px dashed #8E7249",   
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",         
                  backgroundColor: "rgba(255, 255, 255, 0.85)", 
                  boxShadow: "inset 0 0 0 1px #8E7249", 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M0 0h10v1H0zm0 4h10v1H0z' fill='%238E7249' fill-opacity='0.04'/%3E%3C/svg%3E")`,
                }}
              >
                <Box 
                  sx={{ 
                    border: "1px solid rgba(142, 114, 73, 0.25)", 
                    borderRadius: "50%", 
                    width: "38px", 
                    height: "38px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}
                >
                  <Typography sx={{ fontSize: "9px", fontWeight: 900, color: "#8E7249", letterSpacing: "0.1px" }}>
                    방문완료
                  </Typography>
                </Box>
              </Box>
            )}

          </Card>
        );
      })}
    </Box>
  )
}

export default PlaceList;