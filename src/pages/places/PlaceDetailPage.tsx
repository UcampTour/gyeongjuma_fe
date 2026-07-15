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
import QuizStart from "../../components/Quiz/QuizDetail/QuizStart";
import { quizDetailData } from "../../data/quiz/QuizData";
import PlaceCommentTab from "../../components/places/PlaceCommentTab";
export interface PlaceDetailProps {
  placeId?: number; //number;
}

const dummyPlaceDetail = {
  title: "경주역",
  enTitle: "Gyeongju Station (KTX)",
  imageList: [
    "https://picsum.photos/seed/bulguksa1/400/300",
    "https://picsum.photos/seed/bulguksa2/400/300",
    "https://picsum.photos/seed/bulguksa3/400/300",
  ],
  CongestionLevel: CongestionLevel.HIGH,
  status: "OPEN",
  isVisited: true,
};

const PlaceDetailPage = ({ placeId: propPlaceId }: PlaceDetailProps) => {
  const navigate = useNavigate();
  const { placeId: paramPlaceId } = useParams<{ placeId: string }>();
  const [place, setPlace] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const placeId = propPlaceId || paramPlaceId;

  const [stage, setStage] = useState("start");

  useEffect(() => {
    if (!placeId) return;
    console.log(placeId);
    // placeId를 기반으로 API 호출하여 관광지 상세 정보를 가져오는 로직
    setPlace(dummyPlaceDetail);
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
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          {/* 타이틀 영역 */}
          <Stack sx={{ mb: 2, mt: 5, gap: 1 }}>
            <Typography sx={{ fontSize: "25px", fontWeight: 700 }}>
              {place?.title ?? ""}
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
              {place?.enTitle ?? ""}
            </Typography>
          </Stack>

          {/* 우측 상단 스탬프 */}
          <CommonStamp
            label={place?.isVisited ? "방문 완료" : "미방문"}
            size={80}
          />
        </Stack>

        {activeTab === 0 && place?.imageList?.length > 0 && (
          <Swiper
            spaceBetween={12}
            slidesPerView={place?.imageList.length > 1 ? 1.15 : 0}
            grabCursor
            style={{
              width: "100%",
              height: 220,
            }}
          >
            {place.imageList.map((img: string, index: number) => (
              <SwiperSlide key={index}>
                <Box
                  component="img"
                  src={img}
                  alt={place.title}
                  sx={{
                    width: "100%",
                    height: 220,
                    borderRadius: 3,
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <CommonChipTabs
          tabs={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Box>
          {activeTab === 0 && (
            <>
              <p>관광지 이름: {place?.title ?? ""}</p>
              <p>혼잡도: {place?.CongestionLevel ?? ""}</p>
              <p>운영상태: {place?.status ?? ""}</p>
              <p>방문여부: {place?.isVisited ? "방문 완료" : "미방문"}</p>
            </>
          )}

          {activeTab === 1 && <PlaceCommentTab />}

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
              <QuizStart quiz={quizDetailData} setStage={setStage} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
export default PlaceDetailPage;
