import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import MapSearchItem from "../../components/map/MapSearchItem";
import { usePlaceListQuery } from "../../queries/usePlaceListQuery";

const MapSearchPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const { data: placeList = [] } = usePlaceListQuery({
    latitude: 0,
    longitude: 0,
  });

  // 캐싱 데이터 내에서 검색
  const searchResults = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    if (!trimmed) return [];

    return placeList
      .filter((place) => place.placeName.toLowerCase().includes(trimmed))
      .sort((a, b) => {
        const aStarts = a.placeName.toLowerCase().startsWith(trimmed);
        const bStarts = b.placeName.toLowerCase().startsWith(trimmed);

        if (aStarts !== bStarts) {
          return aStarts ? -1 : 1;
        }

        return a.placeName.localeCompare(b.placeName, "ko");
      });
  }, [keyword, placeList]);

  const handleLinkToPlace = (placeId: number) => {
    navigate(`/explore/${placeId}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <CommonSearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          placeholder={t("map:search.placeholder")}
        />

        <Button
          variant="text"
          onClick={() => navigate(-1)}
          sx={{
            p: 0,
            minWidth: "50px",
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          취소
        </Button>
      </Stack>

      <Box>
        {keyword.trim().length >= 2 && searchResults.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            "{keyword}"에 대한 검색 결과가 없습니다.
          </Typography>
        )}

        {searchResults.length > 0 && (
          <Stack sx={{ width: "100%" }}>
            {searchResults.map((place) => (
              <MapSearchItem
                key={place.placeId}
                title={place.placeName}
                // enTitle={place.enPlaceName}
                address={`${place?.add1} ${place?.add2}`}
                distance={place.distance ?? 0}
                onClick={() => handleLinkToPlace(place.placeId)}
              />
            ))}
          </Stack>
        )}

        {keyword.trim().length === 0 && (
          <Stack
            spacing={1.5}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              mt: 8,
            }}
          >
            <TravelExploreIcon sx={{ fontSize: 48, color: "text.secondary" }} />

            <Typography variant="body2" color="text.secondary">
              관광지 이름을 입력해 검색해 보세요.
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default MapSearchPage;
