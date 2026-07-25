import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import type { ApiErrorResponse } from "../../api/apiClient";
import { certifyVisit } from "../../api/placeApi";
import type { TabItem } from "../../components/common/CommonChipTabs";
import CommonChipTabs from "../../components/common/CommonChipTabs";
import type { LoadingProps } from "../../components/common/CommonLoading";
import CommonLoading from "../../components/common/CommonLoading";
import CommonStamp from "../../components/common/CommonStamp";
import PlaceCommentTab from "../../components/places/PlaceCommentTab";
import PlaceInfoTab from "../../components/places/PlaceInfoTab";
import { queryClient } from "../../config/queryClient";
import { useCommonDialog } from "../../hooks/common/useCommonDialog";
import { useCommonLoading } from "../../hooks/common/useCommonLoading";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { usePlaceListQuery } from "../../queries/usePlaceListQuery";
export interface PlaceDetailProps {
  placeId?: number; //number;
}

const PlaceDetailPage = ({ placeId: propPlaceId }: PlaceDetailProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { alert, confirm } = useCommonDialog();

  const { currentLocation, updateCurrentLocation } = useCurrentLocation();
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
    //
    console.log("handle click stamp");
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
    //
    console.log("handleRegistPlace");
    if (!place) return;

    const location = await updateCurrentLocation();

    if (!location) return;
    try {
      const response = await certifyVisit(place.placeId, {
        latitude: 35.83052237,
        longitude: 129.22839984,
        // latitude: location.lat ?? 0,
        // longitude: location.lng ?? 0,
      });
      console.log(response);
      if (response) {
        setLoading({
          isLoading: false,
        });
      }
      if (response.status === "SUCCESS") {
        await alert("방문인증 완료!!");

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
            size={85}
            sx={{
              transform: "rotate(8deg)",
            }}
            onClick={handleClickStamp}
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
          {/* 퀴즈 */}
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
              퀴즈 시작 연결 필요
            </Box>
          )}
        </Box>
      </Box>
      {/* 로딩창 */}
      <CommonLoading loading={commonLoading} />
    </>
  );
};
export default PlaceDetailPage;
