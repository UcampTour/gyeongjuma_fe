import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { certifyVisit } from "../../api/placeApi";
import { fetchQuizDetail } from "../../api/quizApi";
import defaultPlaceImage from "../../assets/default_place_img.png";
import type { TabItem } from "../../components/common/CommonChipTabs";
import CommonChipTabs from "../../components/common/CommonChipTabs";
import type { LoadingProps } from "../../components/common/CommonLoading";
import CommonLoading from "../../components/common/CommonLoading";
import CommonStamp from "../../components/common/CommonStamp";
import AudioList from "../../components/places/audio/AudioList";
import PlaceInfoTab from "../../components/places/PlaceInfoTab";
import QuizIntro from "../../components/Quiz/QuizList/QuizIntro";
import { queryClient } from "../../config/queryClient";
import { audioPlayer } from "../../hooks/audio/AudioPlayer";
import { useCommonDialog } from "../../hooks/common/useCommonDialog";
import { useCommonLoading } from "../../hooks/common/useCommonLoading";
import { useFavoriteMutation } from "../../hooks/place/useFavoriteMutaion";
import { useQuizList } from "../../hooks/quiz/useQuizList";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { type QuizItem } from "../../models/QuizModel";
import { useAudioQuery } from "../../queries/useAudioQuery";
import { usePlaceListQuery } from "../../queries/usePlaceListQuery";
import { useAudioStore } from "../../store/audioPlayerStore";
import PlaceCommentTab from "../../components/places/PlaceCommentTab";

const PlaceDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { alert, confirm } = useCommonDialog();

  const { updateCurrentLocation } = useCurrentLocation();
  const [loading, setLoading] = useState<LoadingProps>();

  const commonLoading = useCommonLoading(loading);

  const { placeId: paramPlaceId } = useParams<{ placeId: string }>();
  const placeId = Number(paramPlaceId);

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
  const { setShowMiniPlayer, resetAudio } = useAudioStore();

  /**
   * 즐겨찾기 처리
   */
  const { mutate: toggleFavorite, isPending: isFavoritePending } =
    useFavoriteMutation();

  useEffect(() => {
    if (!quizInfo) return;

    fetchAndSetQuizInfo(quizInfo.placeQuizInfoId);
  }, [quizInfo]);

  useEffect(() => {
    // 관광지 상세 페이지 내에서는 미니 플레이어 표시
    setShowMiniPlayer(true);

    return () => {
      // 관광지 상세 페이지를 벗어나면 미니 플레이어 숨김
      setShowMiniPlayer(false);
    };
  }, [setShowMiniPlayer]);

  const fetchAndSetQuizInfo = async (quizInfoId: number) => {
    const data = await fetchQuizDetail(quizInfoId);
    setQuizData(data);
  };

  const TABS: TabItem[] = [
    {
      label: t("places:detail.tabs.info"),
      value: "info",
    },
    {
      label: t("places:detail.tabs.commentary"),
      value: "commentary",
    },
    {
      label: t("places:detail.tabs.audio"),
      value: "audio",
    },
    {
      label: t("places:detail.tabs.quiz"),
      value: "quiz",
    },
  ];

  const handleBack = () => {
    resetAudio();
    audioPlayer.stop();
    navigate(-1);
  };
  const handleClose = () => {
    resetAudio();
    audioPlayer.stop();
    navigate("/explore");
  };

  /**
   * 방문 인증 관리
   */
  const handleClickStamp = async () => {
    if (!place) return;
    if (place?.isVisited) {
      await alert(t("places:message.alreadyVisited"));
      return;
    }

    const ok = await confirm({
      title: t("places:message.confirmVisitTitle"),
      message: t("places:message.confirmVisitMessage"),
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
      loadingMsg: t("places:message.loadingVisitTitle"),
      description: t("places:message.loadingVisitMessgae"),
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
          t("places:message.successVisit", place?.placeName),
          // `방문 인증 완료 🎉\n ${place?.placeName} 스탬프 획득 완료! \n이제 퀴즈에 도전해 포인트를 획득해 보세요.`,
        );

        queryClient.invalidateQueries({
          queryKey: ["places"],
        });
        if (quizInfo) {
          fetchAndSetQuizInfo(quizInfo?.placeQuizInfoId);
        }
      }
    } catch (err) {
      setLoading({
        isLoading: false,
      });
      const error = err as AxiosError<any>;
      alert(error.response?.data.message ?? "SYSTEM ERROR");
    }
  };

  /**
   * 즐겨찾기 처리/해제
   */
  const handleLike = () => {
    if (!place) return;

    toggleFavorite(place.placeId);
  };

  return (
    <>
      <Box>
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
          <Stack direction="row">
            <IconButton onClick={handleLike} disabled={isFavoritePending}>
              {place?.isFavorite ? (
                <FavoriteRoundedIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderRoundedIcon sx={{ color: "inherit" }} />
              )}
            </IconButton>
            <IconButton>
              <CloseIcon onClick={handleClose} />
            </IconButton>
          </Stack>
        </Stack>
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
              {place?.placeName}
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
              {place?.subPlaceName}
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
        {/* 관광지 이미지  */}
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

        {/* 관광지 상세 페이지 > 탭 목록 */}
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
          {/* 정보 탭 */}
          {activeTab === 0 && <PlaceInfoTab place={place} />}

          {/* 해설 탭 */}
          {activeTab === 1 && <PlaceCommentTab place={place} />}

          {/* 오디오 탭 */}
          {activeTab === 2 && <AudioList audioList={audioList} />}

          {/* 퀴즈 탭*/}
          {activeTab === 3 && (
            <>
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
