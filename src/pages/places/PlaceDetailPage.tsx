import { useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type { TabItem } from "../../components/common/CommonChipTabs";
import CommonChipTabs from "../../components/common/CommonChipTabs";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import { CongestionLevel } from "../../models/commonModel";
import CommonStamp from "../../components/common/CommonStamp";
import PlaceCommentTab from "../../components/places/PlaceCommentTab";
import PlaceInfoTab from "../../components/places/PlaceInfoTab";
import { usePlaceDetail } from "../../hooks/place/usePlaceDetail";
import type { PlaceListBase } from "../../models/PlaceModel";
import { useTranslation } from "react-i18next";
export interface PlaceDetailProps {
  placeId?: number; //number;
}

const PlaceDetailPage = ({ placeId: propPlaceId }: PlaceDetailProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { placeId: paramPlaceId } = useParams<{ placeId: string }>();
  const [place, setPlace] = useState<PlaceListBase>();
  const [activeTab, setActiveTab] = useState(0);
  const placeId = propPlaceId || Number(paramPlaceId);

  const [stage, setStage] = useState("start");
  const { getPlaceDetail } = usePlaceDetail();

  useEffect(() => {
    if (!placeId) return;
    // placeId를 기반으로 API 호출하여 관광지 상세 정보를 가져오는 로직
    const target = getPlaceDetail(placeId);
    setPlace(target);
  }, [placeId]);

  const TABS: TabItem[] = [
    {
      label: "정보",
      value: "info",
    },
    {
      label: "해설",
      value: "commentary",
    },
    {
      label: "오디오",
      value: "audio",
    },
    {
      label: "퀴즈",
      value: "quiz",
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };
  const handleClose = () => {
    navigate("/explore");
  };
  return (
    <>
      <Box>
        {!propPlaceId && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              p: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={handleBack}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton>
              <CloseIcon onClick={handleClose} />
            </IconButton>
          </Stack>
        )}
      </Box>

      <Box
        sx={{
          position: "relative",
          px: 3,
          py: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            pr: 1,
          }}
        >
          {/* 타이틀 영역 */}
          <Stack sx={{ mb: 3, mt: 5, gap: 1 }}>
            <Typography sx={{ fontSize: "25px", fontWeight: 700 }}>
              {place?.placeName ?? ""}
            </Typography>

            {/* <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
              {place?.enPlaceName ?? ""}
            </Typography> */}
          </Stack>

          {/* 우측 상단 스탬프 */}
          <CommonStamp
            label={
              place?.isVisited
                ? t("map:label.isVisited")
                : t("map:label.unVisited")
            }
            size={80}
            sx={{
              transform: "rotate(8deg)",
            }}
          />
        </Stack>
        {/* // activeTab === 0 &&  */}
        {place?.imageUrl && (
          <Swiper
            spaceBetween={12}
            slidesPerView={0}
            grabCursor
            style={{
              width: "100%",
              height: 220,
            }}
          >
            <SwiperSlide key={place?.placeId}>
              <Box
                component="img"
                src={place?.imageUrl}
                alt={place?.placeName}
                sx={{
                  width: "100%",
                  height: 220,
                  borderRadius: 3,
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          </Swiper>
        )}

        {/* 관광지 상세 페이지 > 탭 */}
        <CommonChipTabs
          tabs={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <Box>
          {activeTab === 0 && <PlaceInfoTab place={place} />}

          {activeTab === 1 && <PlaceCommentTab place={place} />}

          {activeTab === 2 && <Box>오디오 영역</Box>}
          {activeTab === 3 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: "100%",
                pb: 11,
              }}
            >
              {/* <QuizStart quiz={quizDetailData} setStage={setStage} /> */}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
export default PlaceDetailPage;
