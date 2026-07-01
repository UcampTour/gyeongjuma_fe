import { Box, Card, CardMedia, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { statusBadgeStyles, type PlaceListItem } from "../../../models/PlaceModel";
import StatusBadge from "../../common/StatusBadge";
import CommonStamp from "../../common/CommonStamp";
import { OperationStatus } from "../../../models/MapModel";

interface PlaceCardProps {
  place: PlaceListItem;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
    const currentBadge = place.operationStatus === OperationStatus.OPEN
      ? (statusBadgeStyles[place.congestion] || statusBadgeStyles[OperationStatus.OPEN])
      : statusBadgeStyles[place.operationStatus];

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
          <StatusBadge label={currentBadge.label} bgcolor={currentBadge.bgColor} />
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
          
          {/* 하단 아이콘 정보바  */}
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

            {/* 별점 - 이 기능은 일단 보류 */}
            {/* <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, whiteSpace: "nowrap" }}>
              <StarIcon sx={{ fontSize: "14px", color: "#E0B134", mr: 0.3, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ color: "#7A7265", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", lineHeight: 1.2 }}>
                {place.rating}
                <Box component="span" sx={{ fontSize: "11px", color: "#958D80", ml: 0.2, fontWeight: 400 }}>
                  ({place.reviewCount})
                </Box>
              </Typography>
            </Box> */}

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
          <Box sx={{ position: "absolute", right: "4px", top: "4px", transform: "rotate(15deg)" }} >
            <CommonStamp label="방문완료" /> 
          </Box>
        )}

      </Card>
  )
}

export default PlaceCard;