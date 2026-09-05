import { Box, Chip, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import PlaceCard from "../../components/places/placelist/PlaceCard";
import { usePlaceList } from "../../hooks/place/usePlaceList";

type BookmarkFilter = "ALL" | "VISITED" | "UNVISITED";

const bookmarkFilters = [
  {
    type: "ALL" as const,
    label: "전체",
  },
  {
    type: "VISITED" as const,
    label: "방문 완료",
  },
  {
    type: "UNVISITED" as const,
    label: "방문 전",
  },
];

const BookmarkPage = () => {
  const navigate = useNavigate();
  const { placeList } = usePlaceList();

  const [selectedFilter, setSelectedFilter] = useState<BookmarkFilter>("ALL");

  // 즐겨찾기한 관광지만 먼저 추림
  const favoriteList = useMemo(
    () => placeList?.filter((item) => item.isFavorite) ?? [],
    [placeList],
  );

  // 탭별 개수
  const visitedCount = useMemo(
    () => favoriteList.filter((place) => place.isVisited).length,
    [favoriteList],
  );

  const unvisitedCount = favoriteList.length - visitedCount;

  // 탭별 표시 데이터
  const displayList = useMemo(() => {
    if (selectedFilter === "ALL") {
      return favoriteList;
    }

    if (selectedFilter === "VISITED") {
      return favoriteList.filter((place) => place.isVisited);
    }

    return favoriteList.filter((place) => !place.isVisited);
  }, [favoriteList, selectedFilter]);

  // 탭별 개수
  const getFilterCount = (type: BookmarkFilter) => {
    switch (type) {
      case "ALL":
        return favoriteList.length;
      case "VISITED":
        return visitedCount;
      case "UNVISITED":
        return unvisitedCount;
    }
  };

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
        <PageHeader title="즐겨찾기 관광지" />

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
          {bookmarkFilters.map((filter) => {
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
            <Typography
              sx={{
                fontSize: 40,
                mb: 1,
              }}
            >
              ♡
            </Typography>

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#4A4038",
                mb: 0.5,
              }}
            >
              {selectedFilter === "ALL"
                ? "아직 즐겨찾기한 관광지가 없어요"
                : selectedFilter === "VISITED"
                  ? "방문 완료한 관광지가 없어요"
                  : "아직 방문하지 않은 관광지가 없어요"}
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#8A8178",
              }}
            >
              마음에 드는 관광지를 즐겨찾기에 추가해보세요.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BookmarkPage;
