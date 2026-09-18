import { Box, CardMedia, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fetchTimeline } from "../../api/profileApi";
import defaultPlaceImg from "../../assets/default_place_img.png";
import PageHeader from "../../components/common/PageHeader";
import TimeLinePage from "../../components/profile/TimeLineMap";

const TimelinePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // 'summary' (요약 타임라인) 또는 'map' (지도 보기) 탭 상태 관리
  const [activeTab, setActiveTab] = useState<"summary" | "map">("summary");
  const [timelineData, setTimelineData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTimeline();
        const visits = data.visits || [];

        const mappedData = visits.map((item: any) => {
          let formattedDate = "";
          if (item.visitedAt) {
            const datePart = item.visitedAt.split(" ")[0].split("T")[0];
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
            rawDate: item.visitedAt || "",
            date: formattedDate,
            image: item.imageUrl || defaultPlaceImg,
            lat: item.lat,
            lng: item.lng,
          };
        });

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
      <PageHeader title={t("profile:timelineMenuTitle")} />
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
          {t("common:message.visitedMessage", { count: badgeCount })}{" "}
        </Typography>
        <Typography
          sx={{ mt: 0.3, fontSize: "12px", color: "#8C8273", fontWeight: 500 }}
        >
          {t("common:message.visitedSubMessage")}{" "}
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
              {t("common:label.summary")}
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
              {t("common:label.mapView")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 탭 내용 전환 영역 */}
      {activeTab === "summary" ? (
        <Box
          sx={{
            px: 3,
            pt: 3,
            display: "flex",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {badgeCount === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 10,
                color: "#8C8273",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              아직 방문한 장소가 없습니다.
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "400px",
                alignItems: "center",
                pb: 4,
              }}
            >
              {timelineData.map((item, index) => {
                const isEven = index % 2 === 0;
                const isLast = index === timelineData.length - 1;

                return (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {/* 카드와 중앙 아이콘 영역 */}
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        width: "100%",
                        flexDirection: isEven ? "row" : "row-reverse",
                        alignItems: "center",
                        justifyContent: "space-between",
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
                          zIndex: 2,
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

                    {/* 💡 핵심: 마지막 아이템이 아닐 때만 아래로 이어지는 연결선 렌더링 */}
                    {!isLast && (
                      <Box
                        sx={{
                          width: "12px",
                          height: "48px",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                          my: 0.5,
                        }}
                      >
                        {/* 배경 두꺼운 흰색 선 */}
                        <Box
                          sx={{
                            position: "absolute",
                            width: "10px",
                            height: "100%",
                            bgcolor: "#FFFFFF",
                            borderRadius: "4px",
                            boxShadow: "0 2px 4px rgba(142,114,73,0.06)",
                          }}
                        />
                        {/* 중앙 점선 */}
                        <Box
                          sx={{
                            position: "absolute",
                            width: "2px",
                            height: "100%",
                            borderLeft: "2px dashed #D3C5B4",
                            zIndex: 1,
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          )}
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