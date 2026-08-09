import { useState } from "react";
import { Box, Typography, Button, Card, CardMedia } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PageHeader from "../../components/common/PageHeader";
import defaultPlaceImg from "../../assets/default_place_img.png";

const MyPage = () => {
  // 탭 상태: 'timeline' (발자취) 또는 'bookmark' (즐겨찾기)
  const [activeTab, setActiveTab] = useState<"timeline" | "bookmark">("timeline");

  // [확장성 개선 포인트] 뱃지가 계속 추가되어도 동적으로 대응할 수 있는 발자취 데이터
  const [timelineData, setTimelineData] = useState([
    {
      id: 1,
      name: "불국사",
      date: "2026.05.01 방문",
      image: defaultPlaceImg,
    },
    {
      id: 2,
      name: "첨성대",
      date: "2026.05.03 방문",
      image: defaultPlaceImg,
    },
    {
      id: 3,
      name: "동궁과 월지",
      date: "2026.05.05 방문",
      image: defaultPlaceImg,
    },
    // 추후 데이터가 늘어나도 아래처럼 아이템만 추가되면 자동으로 길과 뱃지가 이어집니다.
    // {
    //   id: 4,
    //   name: "대릉원",
    //   date: "2026.05.07 방문",
    //   image: defaultPlaceImg,
    // },
  ]);

  // 뱃지 개수에 맞춰 SVG 길의 높이와 곡선(Path)을 동적으로 계산합니다.
  // 뱃지 하나당 약 110px 정도의 수직 공간을 할당하여 개수가 늘어나도 길이 끊기지 않게 합니다.
  const badgeCount = timelineData.length;
  const svgHeight = Math.max(360, badgeCount * 110);

  // 동적 SVG Path 생성 함수 (지그재그 곡선을 아이템 개수에 맞춰 아래로 자연스럽게 연장)
  const generateDynamicPath = (count: number) => {
    if (count <= 1) return "M 80 50 L 80 60";
    
    let path = "M 80 50"; // 첫 번째 뱃지 위치 (좌측)
    let currentY = 50;

    for (let i = 0; i < count - 1; i++) {
      const nextY = currentY + 110;
      const isEvenStep = i % 2 === 0; 
      // 짝수 번째 스텝: 좌측(80) -> 우측(240)으로 굽이치며 이동
      // 홀수 번째 스텝: 우측(240) -> 좌측(80)으로 굽이치며 이동
      const startX = isEvenStep ? 80 : 240;
      const endX = isEvenStep ? 240 : 80;

      path += ` C ${startX} ${currentY + 55}, ${endX} ${nextY - 55}, ${endX} ${nextY}`;
      currentY = nextY;
    }
    return path;
  };

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      {/* 페이지 헤더 */}
      <PageHeader title="프로필" />

      <Box sx={{ px: 2, pt: 1 }}>
        {/* 1. 프로필 카드 영역 */}
        <Card
          elevation={0}
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "16px",
            p: 2.5,
            mb: 2,
            boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              cursor: "pointer",
              color: "#888888",
            }}
          >
            <SettingsIcon sx={{ fontSize: "20px" }} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "#F5F2EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                overflow: "hidden",
                border: "1px solid #E3DCCE",
              }}
            >
              <Typography sx={{ fontSize: "24px" }}>🧑‍💻</Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: "18px", color: "#111111", mb: 0.5 }}
              >
                닉네임
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  height: "26px",
                  borderRadius: "13px",
                  borderColor: "#E3DCCE",
                  color: "#7A7265",
                  fontSize: "11px",
                  textTransform: "none",
                  px: 1.5,
                  "&:hover": { borderColor: "#AC8E61", bgcolor: "#FDFBF7" },
                }}
              >
                내 정보 수정
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              bgcolor: "#FAF8F5",
              borderRadius: "12px",
              py: 1.5,
              border: "1px solid #F0ECE1",
            }}
          >
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography sx={{ fontSize: "12px", color: "#958D80", mb: 0.3 }}>
                누적 포인트
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#AC8E61" }}>
                1,000P
              </Typography>
            </Box>
            <Box sx={{ width: "1px", bgcolor: "#E3DCCE", my: 0.5 }} />
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography sx={{ fontSize: "12px", color: "#958D80", mb: 0.3 }}>
                방문 관광지
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#111111" }}>
                {badgeCount} / 25
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* 2. 여행 진행도 대시보드 카드 */}
        <Card
          elevation={0}
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "16px",
            p: 2.5,
            mb: 3,
            boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
          }}
        >
          <Typography
            sx={{ fontWeight: 800, fontSize: "15px", color: "#111111", mb: 1.5 }}
          >
            ✈️ 나의 여행 진행도
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#F7F5EE",
              p: 2,
              borderRadius: "12px",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "13px", color: "#7A7265", mb: 0.5 }}>
                경주 탐험 달성률
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "20px", color: "#AC8E61" }}>
                {Math.round((badgeCount / 25) * 100)}% 완료
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "#AC8E61",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "14px",
              }}
            >
              {Math.round((badgeCount / 25) * 100)}%
            </Box>
          </Box>
        </Card>

        {/* 3. 탭 메뉴 */}
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #E3DCCE",
            mb: 2.5,
          }}
        >
          <Box
            onClick={() => setActiveTab("timeline")}
            sx={{
              flex: 1,
              textAlign: "center",
              py: 1.5,
              cursor: "pointer",
              fontWeight: activeTab === "timeline" ? 800 : 500,
              fontSize: "15px",
              color: activeTab === "timeline" ? "#AC8E61" : "#958D80",
              borderBottom: activeTab === "timeline" ? "2px solid #AC8E61" : "none",
              transition: "all 0.2s",
            }}
          >
            내 발자취
          </Box>
          <Box
            onClick={() => setActiveTab("bookmark")}
            sx={{
              flex: 1,
              textAlign: "center",
              py: 1.5,
              cursor: "pointer",
              fontWeight: activeTab === "bookmark" ? 800 : 500,
              fontSize: "15px",
              color: activeTab === "bookmark" ? "#AC8E61" : "#958D80",
              borderBottom: activeTab === "bookmark" ? "2px solid #AC8E61" : "none",
              transition: "all 0.2s",
            }}
          >
            즐겨찾기
          </Box>
        </Box>

        {/* 4. 탭 콘텐츠 영역 */}
        {activeTab === "timeline" ? (
          /* [발자취 탭: 뱃지가 추가되어도 동적으로 연장되는 구불구불한 오솔길] */
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              py: 2,
              px: 2,
              minHeight: `${svgHeight}px`,
            }}
          >
            {/* 동적으로 계산되는 SVG 오솔길 */}
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
              {/* 길 바깥 테두리 */}
              <path
                d={generateDynamicPath(badgeCount)}
                stroke="#E3DCCE"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
              />
              {/* 길 안쪽 면 */}
              <path
                d={generateDynamicPath(badgeCount)}
                stroke="#FDFBF7"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* 각 뱃지 아이템 (지그재그 배치 및 동적 간격) */}
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <Box
                  key={item.id}
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: isEven ? "row" : "row-reverse",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    pl: isEven ? "35px" : "0px",
                    pr: isEven ? "0px" : "35px",
                    mb: index === timelineData.length - 1 ? 0 : "46px",
                    alignSelf: isEven ? "flex-start" : "flex-end",
                  }}
                >
                  {/* 원형 뱃지 본체 */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "3px solid #AC8E61",
                      boxShadow: "0 4px 12px rgba(142,114,73,0.15)",
                      bgcolor: "#FFFFFF",
                      flexShrink: 0,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>

                  {/* 뱃지 이름 및 방문일자 텍스트 */}
                  <Box
                    sx={{
                      mx: 2,
                      textAlign: isEven ? "left" : "right",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      maxWidth: "150px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "14px",
                        color: "#111111",
                        mb: 0.2,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        color: "#958D80",
                        fontWeight: 600,
                        letterSpacing: "-0.2px",
                      }}
                    >
                      {item.date}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          /* [즐겨찾기 탭 내용] */
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Card
              elevation={0}
              sx={{
                display: "flex",
                bgcolor: "#FFFFFF",
                borderRadius: "16px",
                p: 1.5,
                boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
              }}
            >
              <Box sx={{ width: 80, height: 80, flexShrink: 0, mr: 1.5 }}>
                <CardMedia
                  component="img"
                  image={defaultPlaceImg}
                  alt="첨성대"
                  sx={{ width: "100%", height: "100%", borderRadius: "12px", objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontSize: "11px", color: "#AC8E61", fontWeight: 600 }}>
                    유적지
                  </Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#111111" }}>
                    첨성대
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "#7A7265", fontSize: "12px" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon sx={{ fontSize: "13px", color: "#B8B0A2", mr: 0.3 }} />
                    1.2km
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FavoriteIcon sx={{ fontSize: "13px", color: "#C05656", mr: 0.3 }} />
                    142
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyPage;