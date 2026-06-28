import { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment, 
  Card, 
  Select, 
  MenuItem, 
  FormControl,
  CardMedia
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";

// 🌸 경주 맞춤형 고정 카테고리 가데이터
const initialDummySites = [
  {
    id: 1,
    category: "유적지",
    title: "동궁과 월지",
    description: "달빛이 비치는 신라 태자의 별궁과 아름다운 야경...",
    distance: "222.41km",
    rating: "4.9",
    reviewCount: 4820,
    likes: 5210,
    image: "https://picsum.photos/200",
    visited: true,
    congestion: "혼잡" 
  },
  {
    id: 2,
    category: "관광지",
    title: "황남고택 금별",
    description: "황리단길 골목 안, 100년의 시간을 품은 아늑한 한옥...",
    distance: "1.15km",
    rating: "4.7",
    reviewCount: 310,
    likes: 840,
    image: "https://picsum.photos/200",
    visited: false,
    congestion: "보통"
  },
  {
    id: 3,
    category: "관광지",
    title: "황리단길 한복체험",
    description: "전통 한복을 입고 능 가로수길을 거니는 특별한 하루...",
    distance: "0.85km",
    rating: "4.8",
    reviewCount: 1250,
    likes: 1980,
    image: "https://picsum.photos/200",
    visited: true,
    congestion: "여유"
  },
  {
    id: 4,
    category: "기타",
    title: "경주 보문단지 열기구",
    description: "보문호수와 경주월드가 한눈에 내려다보이는 하늘 위 비행...",
    distance: "12.52km",
    rating: "4.5",
    reviewCount: 94,
    likes: 150,
    image: "https://picsum.photos/200",
    visited: false,
    congestion: "보통"
  }
];

const congestionStyles: Record<string, { label: string; color: string; bgColor: string }> = {
  혼잡: { label: "혼잡", color: "#C05656", bgColor: "#FDF2F2" }, 
  보통: { label: "보통", color: "#D9822B", bgColor: "#FEF7EE" }, 
  여유: { label: "여유", color: "#3F8E72", bgColor: "#F0F8F5" }  
};

function SiteListPage() {
  const [sites, setSites] = useState(initialDummySites);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const categories = ["전체", "관광지", "유적지", "기타"];

  return (
    <Box sx={{ p: 2, bgcolor: "#F7F5EE", minHeight: "100vh", pb: 12 }}>
      
      {/* 타이틀 영역 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, mt: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "22px", color: "#111111" }}>
          경주의 관광지 둘러보기
        </Typography>
        
        {/* 정렬 셀렉트 */}
        <FormControl size="small" sx={{ minWidth: 85 }}>
          <Select
            value="default"
            displayEmpty
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "8px",
              height: "36px",
              fontSize: "13px",
              color: "#555555",
              "& .MuiOutlinedInput-notchedOutline": { border: "1px solid #E3DCCE" },
              fontWeight: 500,
            }}
          >
            <MenuItem value="default">선택</MenuItem>
            <MenuItem value="distance">거리순</MenuItem>
            <MenuItem value="likes">인기순</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 카테고리 가로 스크롤 칩 */}
      <Box 
        sx={{ 
          display: "flex", 
          gap: 1, 
          overflowX: "auto", 
          whiteSpace: "nowrap",
          mb: 3,
          pb: 1,
          "::-webkit-scrollbar": { display: "none" } 
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <Box
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              sx={{
                px: 2.2,
                py: 0.8,
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                border: "1px solid",
                borderColor: isSelected ? "#8E7249" : "#E3DCCE", 
                bgcolor: isSelected ? "#8E7249" : "#FFFFFF",
                color: isSelected ? "#FFFFFF" : "#7A7265",
                boxShadow: isSelected ? "0 2px 8px rgba(142,114,73,0.25)" : "none",
                transition: "all 0.2s"
              }}
            >
              {cat}
            </Box>
          );
        })}
      </Box>

      {/* 검색창 */}
      <TextField
        fullWidth
        placeholder="관광지를 검색해보세요"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#8E8576" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            bgcolor: "#FFFFFF",
            borderRadius: "24px",
            height: "46px",
            "& fieldset": { border: "none" },
            boxShadow: "0 2px 6px rgba(142,114,73,0.06)"
          }
        }}
      />

      {/* 관광지 리스트 영역 */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sites.map((site) => {
          const conStyle = congestionStyles[site.congestion] || congestionStyles["여유"];

          return (
            <Card 
              key={site.id} 
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
              {/* 이미지 영역 */}
              <CardMedia
                component="img"
                image={site.image}
                alt={site.title}
                sx={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: "12px", 
                  objectFit: "cover",
                  flexShrink: 0,
                  bgcolor: "#F5F2EB"
                }}
              />

              {/* 정보 텍스트 영역 */}
              <Box sx={{ flex: 1, pl: 1.5, pr: 5, display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 1, minWidth: 0 }}>
                {/* 카테고리 */}
                <Typography sx={{ color: "#AC8E61", fontSize: "13px", fontWeight: 600, mb: 0.2 }}>
                  {site.category}
                </Typography>
                
                {/* 제목 */}
                <Typography sx={{ fontWeight: 800, fontSize: "18px", color: "#111111", mb: 0.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {site.title}
                </Typography>
                
                {/* 설명 */}
                <Typography sx={{ color: "#958D80", fontSize: "13px", mb: 0.8, width: "100%", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
                  {site.description}
                </Typography>
                
                {/* 🛠️ 세로선 완전 고정 + 대용량 데이터 공간 확보 하이브리드 레이아웃 */}
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    color: "#666666", 
                    width: "100%",
                    justifyContent: "space-between", // 💡 확보한 고정 방들을 가로로 균등 배치
                    mt: 0.2
                  }}
                >
                  {/* 1. 혼잡도 배지 영역 (무조건 38px 고정라인) */}
                  <Box sx={{ width: "38px", flexShrink: 0, display: "flex" }}>
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 0.3, 
                      px: 0.6, 
                      py: 0.2, 
                      borderRadius: "5px", 
                      bgcolor: conStyle.bgColor,
                      color: conStyle.color,
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "-0.5px",
                    }}>
                      <Box sx={{ width: 3.5, height: 3.5, borderRadius: "50%", bgcolor: conStyle.color }} />
                      {conStyle.label}
                    </Box>
                  </Box>

                  {/* 2. 거리 영역 (현지 이동거리를 완벽히 수용하는 58px 고정라인) */}
                  <Box sx={{ display: "flex", alignItems: "center", width: "68px", flexShrink: 0 }}>
                    <LocationOnIcon sx={{ fontSize: "13px", color: "#B8B0A2", mr: 0.2 }} />
                    <Typography variant="body2" sx={{ color: "#7A7265", fontSize: "11.5px", whiteSpace: "nowrap" }}>
                      {site.distance}
                    </Typography>
                  </Box>

                  {/* 3. 별점 영역 (네 자리 리뷰 카운트까지 서로 침범하지 않게 72px 고정라인 확보) */}
                  <Box sx={{ display: "flex", alignItems: "center", width: "72px", flexShrink: 0 }}>
                    <StarIcon sx={{ fontSize: "13px", color: "#E0B134", mr: 0.2 }} />
                    <Typography variant="body2" sx={{ color: "#7A7265", fontSize: "11.5px", fontWeight: "bold", whiteSpace: "nowrap" }}>
                      {site.rating}
                      <Typography component="span" sx={{ fontSize: "11px", color: "#958D80", fontWeight: "normal", ml: 0.1 }}>
                        ({site.reviewCount})
                      </Typography>
                    </Typography>
                  </Box>

                  {/* 4. 찜 (하트) 영역 (남은 공간을 유연하게 사용하여 마감 처리) */}
                  <Box sx={{ display: "flex", alignItems: "center", minWidth: 0, flex: 1, pl: 0.5 }}>
                    <FavoriteIcon sx={{ fontSize: "12px", color: "#C05656", mr: 0.2 }} />
                    <Typography variant="body2" sx={{ color: "#7A7265", fontSize: "11.5px", whiteSpace: "nowrap" }}>
                      {site.likes}
                    </Typography>
                  </Box>
                </Box>
                
              </Box>

              {/* 우측 상단 '방문완료' 도장 */}
              {site.visited && (
                <Box
                  sx={{
                    position: "absolute",
                    right: "12px",
                    top: "12px", 
                    transform: "rotate(15deg)", 
                    width: "54px",  
                    height: "54px", 
                    borderRadius: "50%",
                    border: "1.5px dashed #8E7249",   
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.95,                  
                    pointerEvents: "none",         
                    backgroundColor: "rgba(255, 255, 255, 0.9)", 
                    outline: "2px solid rgba(142, 114, 73, 0.1)",
                    boxShadow: "inset 0 0 0 1px #8E7249", 
                    zIndex: 2,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M0 0h10v1H0zm0 4h10v1H0z' fill='%238E7249' fill-opacity='0.04'/%3E%3C/svg%3E")`,
                  }}
                >
                  <Box 
                    sx={{ 
                      border: "1px solid rgba(142, 114, 73, 0.25)", 
                      borderRadius: "50%", 
                      width: "42px", 
                      height: "42px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}
                  >
                    <Typography 
                      sx={{ 
                        fontSize: "9.5px", 
                        fontWeight: 900, 
                        color: "#8E7249", 
                        letterSpacing: "0.2px",
                        textShadow: "0.3px 0.3px 0px rgba(142, 114, 73, 0.3)",
                      }}
                    >
                      방문완료
                    </Typography>
                  </Box>
                </Box>
              )}

            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default SiteListPage;