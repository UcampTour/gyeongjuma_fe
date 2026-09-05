import ApprovalIcon from "@mui/icons-material/Approval";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import ReorderRoundedIcon from "@mui/icons-material/ReorderRounded";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import dummyImage from "../../assets/default_place_img.png";
import { usePlaceListQuery } from "../../queries/usePlaceListQuery";
import { useAuthStore } from "../../store/useAuthStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const bannerList = [
    {
      id: 1,
      image: dummyImage,
      title: "경주에서 만나는 특별한 여행",
      description: "새로운 경주 여행지를 만나보세요.",
      path: "/places",
    },
    {
      id: 2,
      image: dummyImage,
      title: "경주의 숨겨진 명소",
      description: "아직 발견하지 못한 경주의 이야기를 찾아보세요.",
      path: "/explore",
    },
    {
      id: 3,
      image: dummyImage,
      title: "특별한 경주 여행 코스",
      description: "오늘은 어디로 떠나볼까요?",
      path: "/bookmark",
    },
  ];

  const quickMenuList = [
    {
      label: t("home:quickMenu.placeList"),
      icon: <AutoAwesomeIcon />,
      color: "#B08A55",
      bgColor: "#F8F2E8",
      path: "/places",
    },
    {
      label: t("home:quickMenu.course"),
      icon: <ApprovalIcon />,
      color: "#71806A",
      bgColor: "#F0F4EF",
      path: "/course",
    },
    {
      label: t("home:quickMenu.favorite"),
      icon: <FavoriteIcon />,
      color: "#C05656",
      bgColor: "#FAF1F1",
      path: "/profile/bookmark",
    },
    {
      label: t("home:quickMenu.audio"),
      icon: <HeadphonesIcon />,
      color: "#637F86",
      bgColor: "#EEF4F4",
      path: "/audio",
    },
  ];

  /**
   * 홈 그리팅 메시지
   */
  const nickname = useAuthStore((state) => state.member?.nickname);
  // const { currentLocation, updateCurrentLocation, isGyeongju } =
  //   useCurrentLocation();
  // const [isInGyeongju, setIsInGyeongju] = useState(false);

  /**
   * 인기 관광지 데이터
   */
  const { data: placeData = [] } = usePlaceListQuery({
    latitude: 0,
    longitude: 0,
  });

  // useEffect(() => {
  //   const checkLocation = async () => {
  //     const location = await updateCurrentLocation();

  //     if (!location) {
  //       setIsInGyeongju(false);
  //       return;
  //     }

  //     const result = await isGyeongju(location.lat, location.lng);

  //     setIsInGyeongju(result);
  //   };

  //   checkLocation();
  // }, [updateCurrentLocation, isGyeongju]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        px: 3,
        pt: 2,
        pb: 14,
        bgcolor: "#F9F6EE",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 상단 헤더 */}
      <Box
        sx={{
          position: "relative",
          height: 48,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          mb: 4,
        }}
      >
        {/* 로고 */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            textAlign: "left",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: 900,
              letterSpacing: "-1.5px",
              color: "#333",
            }}
          >
            Gyeongju
            <Box
              component="span"
              sx={{
                color: "#BC9A5D",
              }}
            >
              Ma
            </Box>
          </Typography>
        </Box>
      </Box>

      <Stack
        direction="column"
        sx={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          width: "100%",
          overflowX: "hidden",
          justifyContent: "space-around",
        }}
      >
        {/* 유저 */}
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-1.5px",
              color: "#333",
              mb: 0.5,
            }}
          >
            {t("home:message.greeting", { nickname })}
            <br />
            {t("home:message.greetingQuestion")}
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            {t("home:message.greetingDescription")}
          </Typography>
        </Box>

        {/* 메뉴 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            mb: 2,
          }}
        >
          {quickMenuList.map((menu, idx) => (
            <Card
              elevation={0}
              key={`home-quick-menu-${idx}`}
              onClick={() => navigate(menu.path)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#FFFFFF",
                borderRadius: "16px",
                p: 2.2,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
                border: "1px solid #EFECE6",
                transition: "transform 0.15s ease, border-color 0.15s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  borderColor: "#AC8E61",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    // bgcolor: "#F5F2EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: menu.color,
                    bgcolor: `${menu.color}12`,
                  }}
                >
                  {menu.icon}
                </Box>
                <Box>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}
                  >
                    {menu.label}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>

        {/* 인기 관광지 목록*/}
        <Box sx={{ mb: 3 }}>
          {/* 섹션 헤더 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
              px: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 800,
                color: "#2F2F2F",
                letterSpacing: "-0.5px",
              }}
            >
              {t("home:subTitle.bestPlace")}
            </Typography>

            <IconButton
              onClick={() => navigate("/places")}
              sx={{
                width: 32,
                height: 32,
                color: "#555",
              }}
            >
              <ReorderRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* 관광지 카드 스와이프 */}
          <Swiper
            className="home-place-swiper"
            slidesPerView={2.4}
            // centeredSlides
            spaceBetween={10}
            grabCursor
            loop={placeData.length > 3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            style={{
              // width: "100% !important",
              width: "100%",
              maxWidth: "100%",
              minWidth: 0,
            }}
          >
            {placeData.slice(0, 8).map((place) => (
              <SwiperSlide key={place.placeId}>
                <Card
                  elevation={0}
                  onClick={() => navigate(`/explore/${place.placeId}`)}
                  sx={{
                    bgcolor: "#FFFFFF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: "1px solid #EDE9E1",
                    boxShadow: "0 4px 14px rgba(142,114,73,0.06)",
                    transition: "transform 0.2s ease",

                    "&:hover": {
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  {/* 이미지 */}
                  <Box
                    component="img"
                    src={place.imageUrl || dummyImage}
                    alt={place.placeName}
                    sx={{
                      width: "100%",
                      height: 175,
                      display: "block",
                      objectFit: "cover",
                    }}
                  />

                  {/* 정보 */}
                  <Box
                    sx={{
                      px: 1.2,
                      py: 1.1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#292929",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mb: 0.5,
                      }}
                    >
                      {place.placeName}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.4,
                      }}
                    >
                      <ApprovalIcon
                        sx={{
                          fontSize: 13,
                          color: "#C7A15A",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: "#777",
                          fontWeight: 600,
                        }}
                      >
                        {place?.visitCnt}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* 배너 */}
        <Swiper
          style={{
            width: "100%",
          }}
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={12}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop
        >
          {bannerList.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Box
                key={banner.id}
                onClick={() => navigate(banner.path)}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 120,
                  overflow: "hidden",
                  borderRadius: 3,
                  cursor: "pointer",
                }}
              >
                {/* 이미지 */}
                <Box
                  component="img"
                  src={banner.image}
                  alt={banner.title}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* 어두운 그라데이션 */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.65), rgba(0,0,0,0.05))",
                  }}
                />

                {/* 배너 텍스트 */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                    pr: 7,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 17,
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    {banner.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      opacity: 0.9,
                    }}
                  >
                    {banner.description}
                  </Typography>
                </Box>

                {/* 이동 버튼 */}
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(banner.path);
                  }}
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 40,
                    height: 40,
                    bgcolor: "white",
                    color: "#333",

                    "&:hover": {
                      bgcolor: "white",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 22,
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    ›
                  </Typography>
                </IconButton>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Box>
  );
};

export default HomePage;
