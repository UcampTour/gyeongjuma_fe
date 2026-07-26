import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, IconButton, Stack, Typography } from "@mui/material";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import type { ApiErrorResponse } from "../../api/apiClient";
import { certifyVisit } from "../../api/placeApi";
import { fetchQuizDetail } from "../../api/quizService";
import defaultPlaceImage from "../../assets/default_place_img.png";
import type { TabItem } from "../../components/common/CommonChipTabs";
import CommonChipTabs from "../../components/common/CommonChipTabs";
import type { LoadingProps } from "../../components/common/CommonLoading";
import CommonLoading from "../../components/common/CommonLoading";
import CommonStamp from "../../components/common/CommonStamp";
import AudioList from "../../components/places/audio/AudioList";
import PlaceCommentTab from "../../components/places/PlaceCommentTab";
import PlaceInfoTab from "../../components/places/PlaceInfoTab";
import QuizIntro from "../../components/Quiz/QuizList/QuizIntro";
import { queryClient } from "../../config/queryClient";
import { useCommonDialog } from "../../hooks/common/useCommonDialog";
import { useCommonLoading } from "../../hooks/common/useCommonLoading";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useQuizList } from "../../hooks/useQuizList";
import { QuizStatus, type QuizItem } from "../../models/QuizModel";
import { useAudioQuery } from "../../queries/useAudioQuery";
import { usePlaceListQuery } from "../../queries/usePlaceListQuery";
export interface PlaceDetailProps {
  placeId?: number; //number;
}

const PlaceDetailPage = ({ placeId: propPlaceId }: PlaceDetailProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { alert, confirm } = useCommonDialog();

  const { updateCurrentLocation } = useCurrentLocation();
  const [loading, setLoading] = useState<LoadingProps>();

  const commonLoading = useCommonLoading(loading);

  const { placeId: paramPlaceId } = useParams<{ placeId: string }>();
  const placeId = propPlaceId || Number(paramPlaceId);

  const { data: placeList = [] } = usePlaceListQuery({
    latitude: 0,
    longitude: 0,
  });

  const place = placeList.find((p) => p.placeId === placeId);

  const [activeTab, setActiveTab] = useState(0);

  const { quizInfo } = useQuizList(placeId);
  const [quizData, setQuizData] = useState<QuizItem>();
  const { data: audioList = [], isLoading: isAudioLoading } =
    useAudioQuery(placeId);

  useEffect(() => {
    if (!quizInfo) return;

    fetchAndSetQuizInfo(quizInfo.placeQuizInfoId);
  }, [quizInfo]);

  const fetchAndSetQuizInfo = async (quizInfoId: number) => {
    const data = await fetchQuizDetail(quizInfoId);
    setQuizData(data);
  };

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

  /**
   * 방문 인증 관리
   */
  const handleClickStamp = async () => {
    if (!place) return;
    if (place?.isVisited) {
      await alert("이미 방문완료된 관광지입니다.");
      return;
    }

    const ok = await confirm({
      title: "방문 인증 처리",
      message: "방문인증 처리하시겠습니까?",
    });

    if (!ok) return;

    handleRegistPlace();
  };

  /**
   * 방문인증 처리
   */
  const handleRegistPlace = async () => {
    setLoading({
      isLoading: true,
      loadingMsg: "방문 인증 처리 중",
    });
    if (!place) return;

    const location = await updateCurrentLocation();

    if (!location) return;
    try {
      const response = await certifyVisit(place.placeId, {
        latitude: location.lat ?? 0,
        longitude: location.lng ?? 0,
      });
      if (response) {
        setLoading({
          isLoading: false,
        });
      }
      if (response.status === "SUCCESS") {
        await alert(
          "방문 인증 완료 🎉\n이제 퀴즈에 도전해 포인트를 획득해 보세요.",
        );

        queryClient.invalidateQueries({
          queryKey: ["places"],
        });
      }
    } catch (err) {
      setLoading({
        isLoading: false,
      });
      const error = err as AxiosError<ApiErrorResponse>;
      alert(error.response?.data.message ?? "시스템 에러 발생");
    }
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
          <Stack direction="column" sx={{ mb: 3, mt: 2, gap: 1 }}>
            <Typography sx={{ fontSize: "25px", fontWeight: 700 }}>
              {place?.placeName ?? ""}
            </Typography>

            <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
              {place?.placeName ?? "영어"}
            </Typography>
          </Stack>

          {/* 우측 상단 스탬프 */}
          <CommonStamp
            label={
              place?.isVisited
                ? t("map:label.isVisited")
                : t("map:label.unVisited")
            }
            size={85}
            sx={{
              transform: "rotate(8deg)",
            }}
            onClick={handleClickStamp}
          />
        </Stack>

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
              src={place?.imageUrl ?? defaultPlaceImage}
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

        {/* 관광지 상세 페이지 > 탭 */}
        <CommonChipTabs
          tabs={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <Box
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
            pb: "100px",

            // IE, Edge
            msOverflowStyle: "none",

            // Firefox
            scrollbarWidth: "none",

            // Chrome, Safari
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {activeTab === 0 && <PlaceInfoTab place={place} />}

          {activeTab === 1 && <PlaceCommentTab place={place} />}

          {activeTab === 2 && <AudioList audioList={audioList} />}
          {/* 퀴즈 */}
          {activeTab === 3 && (
            <>
              <Box
                sx={{
                  mt: 1.5,
                  mb: 2,
                  // minHeight: "100%",
                }}
              >
                {
                  // !quizData ? (
                  //   <Alert severity="info">
                  //     아직 준비된 퀴즈가 없어요.
                  //     <br />곧 새로운 퀴즈가 추가될 예정이니 기대해 주세요! 😊
                  //   </Alert>
                  // ) :

                  quizData?.quizStatus === QuizStatus.AVAILABLE ? (
                    <Alert severity="success">
                      퀴즈를 풀고 포인트를 획득해 보세요. 🎉
                    </Alert>
                  ) : quizData?.quizStatus === QuizStatus.LOCKED ? (
                    <Alert severity="warning">
                      스탬프를 클릭해서 방문 인증을 완료해 주세요! 🔒
                    </Alert>
                  ) : quizData?.quizStatus === QuizStatus.COMPLETED ? (
                    <Alert severity="success">
                      이미 퀴즈를 완료했습니다. 👏
                    </Alert>
                  ) : quizData?.quizStatus === QuizStatus.PROGRESS ? (
                    <Alert severity="info">진행 중인 퀴즈가 있습니다. ✍️</Alert>
                  ) : (
                    <></>
                  )
                }
              </Box>
              <QuizIntro quiz={quizData} showImage={false} />
            </>
          )}
        </Box>
      </Box>
      {/* 로딩창 */}
      <CommonLoading loading={commonLoading} />
    </>
  );
};
export default PlaceDetailPage;
