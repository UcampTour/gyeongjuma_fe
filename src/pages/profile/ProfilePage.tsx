import { Box, Typography, Card, Chip, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MapIcon from "@mui/icons-material/Map";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import PageHeader from "../../components/common/PageHeader";

const ProfilePage = () => {
  const navigate = useNavigate();
  
  // 실제 DB 데이터 매핑 예시
  const nickname = "경주마스터99";
  const profileImgUrl = null; // 프로필 이미지 URL (null일 경우 기본 아바타)
  const difficulty = "NORMAL"; // 선호하는 난이도 (difficulty: EASY / NORMAL / HARD)
  const locale = "KO"; // 사용자 언어/지역 설정 (locale)
  const distance = 12500; // 총 이동 거리 (distance, 미터 단위 가정 예시: 12.5km)

  const point = 1000;         // 보유 포인트 (point)
  const totalPoint = 3500;    // 누적 포인트
  const visitCount = 4;
  const quizCount = 3;
  const courseCount = 1;

  const totalActions = visitCount + quizCount + courseCount;
  const currentLevel = Math.floor(totalActions / 5) + 1;
  const nextLevelMax = currentLevel * 5;
  const levelPercent = Math.min(Math.round((totalActions / nextLevelMax) * 100), 100);

  // 난이도 라벨 변환 함수
  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case "EASY": return "쉬움";
      case "HARD": return "어려움";
      case "NORMAL":
      default: return "보통";
    }
  };

  // 미터(m) 단위를 보기 쉽게 km로 변환하는 함수
  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters} m`;
  };

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      <PageHeader title="프로필" />

      <Box sx={{ px: 2, pt: 1 }}>
        
        {/* 1. 기본 프로필 정보 카드 */}
        <Card
          elevation={0}
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "20px",
            p: 2.5,
            mb: 2,
            boxShadow: "0 8px 24px rgba(142,114,73,0.06)",
            border: "1px solid #EFECE6",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
            <Box
              sx={{
                width: 60, height: 60, borderRadius: "50%", bgcolor: "#F5F2EB",
                display: "flex", alignItems: "center", justifyContent: "center", mr: 2,
                overflow: "hidden", border: "2px solid #E3DCCE",
                flexShrink: 0
              }}
            >
              {profileImgUrl ? (
                <img src={profileImgUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Typography sx={{ fontSize: "24px" }}>🧑‍💻</Typography>
              )}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* 난이도 및 로케일 정보 표시 영역 (닉네임 위) */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.8, flexWrap: "wrap" }}>
                <Chip 
                  label={`난이도: ${getDifficultyLabel(difficulty)}`} 
                  size="small" 
                  sx={{ height: 18, fontSize: "10px", fontWeight: 700, bgcolor: "#FAF8F5", color: "#AC8E61", border: "1px solid #E3DCCE" }} 
                />
                <Chip 
                  label={`언어: ${locale}`} 
                  size="small" 
                  sx={{ height: 18, fontSize: "10px", fontWeight: 700, bgcolor: "#FAF8F5", color: "#958D80", border: "1px solid #E3DCCE" }} 
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Typography sx={{ fontWeight: 800, fontSize: "18px", color: "#111111" }}>
                  {nickname}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 보유 포인트 & 누적 포인트 분리형 박스 */}
          <Box
            sx={{
              display: "flex", bgcolor: "#FAF8F5", borderRadius: "14px", py: 1.5,
              border: "1px solid #F0ECE1",
            }}
          >
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography sx={{ fontSize: "12px", color: "#958D80", mb: 0.3 }}>보유 포인트</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#AC8E61" }}>1,000P</Typography>
            </Box>
            <Box sx={{ width: "1px", bgcolor: "#E3DCCE", my: 0.5 }} />
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography sx={{ fontSize: "12px", color: "#958D80", mb: 0.3 }}>누적 포인트</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#111111" }}>3,500P</Typography>
            </Box>
          </Box>
        </Card>

        {/* 2. 나의 여행 진행도 & 3대 활동 요약 카드 (총 이동 거리 추가) */}
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

          {/* 여행 레벨 및 단일 진행 바 영역 (퍼센티지 문구 적용) */}
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

          {/* 활동 요약 뱃지 (총 이동 거리 포함 4분할 또는 배치) */}
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
              <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>방문 장소</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#111111" }}>{visitCount}곳</Typography>
            </Box>

            <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
              <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>맞춘 퀴즈</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#4A709C" }}>{quizCount}개</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
              <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>완주 코스</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#C05656" }}>{courseCount}개</Typography>
            </Box>

             <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
              <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>총 이동거리</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 800, color: "#AC8E61" }}>{formatDistance(distance)}</Typography>
            </Box>
          </Box>
        </Card>

        {/* 3. 상세 페이지 이동 내비게이션 카드들 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Card
            elevation={0}
            onClick={() => navigate("/profile/timeline")}
            sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              bgcolor: "#FFFFFF", borderRadius: "16px", p: 2.2, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(142,114,73,0.04)", border: "1px solid #EFECE6",
              transition: "transform 0.15s ease, border-color 0.15s ease",
              "&:hover": { transform: "translateY(-2px)", borderColor: "#AC8E61" }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: "12px", bgcolor: "#F5F2EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#AC8E61" }}>
                <MapIcon />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}>내 발자취 모음</Typography>
                <Typography sx={{ fontSize: "12px", color: "#958D80" }}>구불구불한 오솔길 위 탐험 기록 보기</Typography>
              </Box>
            </Box>
            <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
          </Card>

          <Card
            elevation={0}
            onClick={() => navigate("/profile/bookmark")}
            sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              bgcolor: "#FFFFFF", borderRadius: "16px", p: 2.2, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(142,114,73,0.04)", border: "1px solid #EFECE6",
              transition: "transform 0.15s ease, border-color 0.15s ease",
              "&:hover": { transform: "translateY(-2px)", borderColor: "#AC8E61" }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: "12px", bgcolor: "#FAF1F1", display: "flex", alignItems: "center", justifyContent: "center", color: "#C05656" }}>
                <BookmarkIcon />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}>즐겨찾기 장소</Typography>
                <Typography sx={{ fontSize: "12px", color: "#958D80" }}>내가 찜한 관광지 리스트 확인</Typography>
              </Box>
            </Box>
            <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
          </Card>

          <Card
            elevation={0}
            onClick={() => navigate("/profile/exchange")}
            sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              bgcolor: "#FFFFFF", borderRadius: "16px", p: 2.2, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(142,114,73,0.04)", border: "1px solid #EFECE6",
              transition: "transform 0.15s ease, border-color 0.15s ease",
              "&:hover": { transform: "translateY(-2px)", borderColor: "#AC8E61" }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: "12px", bgcolor: "#FDF8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4A373" }}>
                <CardGiftcardIcon />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}>포인트 교환소</Typography>
                <Typography sx={{ fontSize: "12px", color: "#958D80" }}>모은 포인트로 상품 및 쿠폰 교환</Typography>
              </Box>
            </Box>
            <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
          </Card>

          <Card
            elevation={0}
            onClick={() => navigate("/profile/edit")}
            sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              bgcolor: "#FFFFFF", borderRadius: "16px", p: 2.2, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(142,114,73,0.04)", border: "1px solid #EFECE6",
              transition: "transform 0.15s ease, border-color 0.15s ease",
              "&:hover": { transform: "translateY(-2px)", borderColor: "#AC8E61" }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: "12px", bgcolor: "#F0F4F8", display: "flex", alignItems: "center", justifyContent: "center", color: "#4A709C" }}>
                <EditIcon />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}>내 정보 수정</Typography>
                <Typography sx={{ fontSize: "12px", color: "#958D80" }}>닉네임 및 프로필 이미지 변경</Typography>
              </Box>
            </Box>
            <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
          </Card>

          <Card
            elevation={0}
            onClick={() => navigate("/settings")}
            sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              bgcolor: "#FFFFFF", borderRadius: "16px", p: 2.2, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(142,114,73,0.04)", border: "1px solid #EFECE6",
              transition: "transform 0.15s ease, border-color 0.15s ease",
              "&:hover": { transform: "translateY(-2px)", borderColor: "#AC8E61" }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: "12px", bgcolor: "#F3F3F3", display: "flex", alignItems: "center", justifyContent: "center", color: "#666666" }}>
                <SettingsIcon />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}>앱 설정</Typography>
                <Typography sx={{ fontSize: "12px", color: "#958D80" }}>알림, 공지사항 및 환경 설정</Typography>
              </Box>
            </Box>
            <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;