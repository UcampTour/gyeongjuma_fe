import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CommonLoading from "../../components/common/CommonLoading";
import PageHeader from "../../components/common/PageHeader";
import PlaceCard from "../../components/places/placelist/PlaceCard";
import { usePlaceList } from "../../hooks/place/usePlaceList";

type BookmarkFilter = "ALL" | "VISITED" | "UNVISITED";

const AudioPlaceListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { placeList, isLoading } = usePlaceList();

  const [selectedFilter, setSelectedFilter] = useState<BookmarkFilter>("ALL");

  // 오디오가 있는 관광지만 추림
  const audioPlaceList = useMemo(
    () => placeList?.filter((item) => item.audioCount > 0) ?? [],
    [placeList],
  );

  // 탭별 개수
  const visitedCount = useMemo(
    () => audioPlaceList.filter((place) => place.isVisited).length,
    [audioPlaceList],
  );

  const unvisitedCount = audioPlaceList.length - visitedCount;

  // 탭별 표시 데이터
  const displayList = useMemo(() => {
    if (selectedFilter === "ALL") {
      return audioPlaceList;
    }

    if (selectedFilter === "VISITED") {
      return audioPlaceList.filter((place) => place.isVisited);
    }

    return audioPlaceList.filter((place) => !place.isVisited);
  }, [audioPlaceList, selectedFilter]);

  const filters = [
    {
      type: "ALL" as const,
      label: t("common:label.all"),
    },
    {
      type: "VISITED" as const,
      label: t("common:label.visited"),
    },
    {
      type: "UNVISITED" as const,
      label: t("common:label.unvisited"),
    },
  ];

  // 탭별 개수
  const getFilterCount = (type: BookmarkFilter) => {
    switch (type) {
      case "ALL":
        return audioPlaceList.length;
      case "VISITED":
        return visitedCount;
      case "UNVISITED":
        return unvisitedCount;
    }
  };

  if (isLoading) {
    return (
      <CommonLoading
        loading={{
          isLoading: true,
          loadingMsg: t("places:bookmark.message.loadingPlaceList"),
          description: t("places:bookmark.message.loadingPlaceListDesc"),
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "#F7F5EE",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* 고정 헤더 */}
      <Box sx={{ flexShrink: 0 }}>
        <PageHeader title={t("places:audio.list.title")} />

        {/* 방문 상태 필터 */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            px: 3,
            py: 1.5,
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter.type;
            const count = getFilterCount(filter.type);

            return (
              <Chip
                key={filter.type}
                label={`${filter.label} (${count})`}
                onClick={() => setSelectedFilter(filter.type)}
                sx={{
                  flexShrink: 0,
                  height: 36,
                  borderRadius: 5,
                  fontSize: 13,
                  fontWeight: 600,

                  bgcolor: isSelected ? "#BC9A5D" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "#555",
                  border: isSelected
                    ? "1px solid #BC9A5D"
                    : "1px solid #E5E1D8",

                  "&:hover": {
                    bgcolor: isSelected ? "#BC9A5D" : "#F5F2EA",
                  },

                  "& .MuiChip-label": {
                    px: 1.5,
                  },
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* 리스트 영역 */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          px: 3,
          pb: 16,

          "&::-webkit-scrollbar": {
            width: 6,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 999,
          },
        }}
      >
        {displayList.length > 0 ? (
          <Stack spacing={1.5} sx={{ pt: 1 }}>
            {displayList.map((place) => (
              <PlaceCard
                key={place.placeId}
                place={place}
                onClick={() => navigate(`/explore/${place.placeId}`)}
              />
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pb: 10,
            }}
          >
            <FavoriteBorderRoundedIcon
              sx={{
                fontSize: 48,
                color: "#BC9A5D",
                mb: 1,
              }}
            />
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#4A4038",
                mb: 0.5,
              }}
            >
              {selectedFilter === "ALL"
                ? t("places:audio.list.emptyState")
                : selectedFilter === "VISITED"
                  ? t("places:audio.list.emptyVisitState")
                  : t("places:audio.list.allVisitState")}
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#8A8178",
              }}
            >
              {t("places:audio.list.listMessage")}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AudioPlaceListPage;
