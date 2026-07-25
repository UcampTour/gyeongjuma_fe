import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import MapSearchItem from "../../components/map/MapSearchItem";

const dummyPlaceMarkerList = [
  {
    id: 1,
    title: "경주역",
    latitude: 35.8562,
    longitude: 129.2247,
  },
  {
    id: 2,
    title: "불국사",
    enTitle: "Bulguksa Temple",
    address: "경상북도 경주시 불국로 385",
    distance: 1200,
    latitude: 35.7904,
    longitude: 129.3316,
  },
  {
    id: 3,
    title: "불국사2",
    enTitle: "Bulguksa Temple",
    address: "경상북도 경주시 불국로 385",
    distance: 1200,
    latitude: 35.7904,
    longitude: 129.3316,
  },
  {
    id: 4,
    title: "불국사3",
    enTitle: "Bulguksa Temple",
    address: "경상북도 경주시 불국로 385",
    distance: 1200,
    latitude: 35.7904,
    longitude: 129.3316,
  },
];
const MapSearchPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(""); // 검색어 입력값
  const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과 목록
  const [isSearching, setIsSearching] = useState(false); // 검색 API 호출 중 여부

  /**
   * 검색 버튼(돋보기) 클릭 시 즉시 검색
   * - 디바운스를 기다리지 않고 현재 입력된 키워드로 검색
   */
  const handleSearch = () => {
    // 검색 버튼 클릭 시 처리 로직
    searchPlaces(keyword);
  };

  /**
   * 검색어 변경 시 자동 검색
   *
   * 디바운스(Debounce)를 적용하여 사용자가 입력을 멈춘 뒤
   * 300ms 후에 검색 API를 호출
   *
   * 입력할 때마다 API를 호출하지 않는 이유!!
   * - 불필요한 네트워크 요청 감소
   * - 서버 부하 감소
   * - 사용자 입력 중 끊김 없는 UX 제공
   */
  useEffect(() => {
    const trimmed = keyword.trim();

    // 공백이거나 2글자 미만이면 검색하지 않고 결과를 초기화
    if (trimmed.length < 2) {
      setSearchResults([]);
      return;
    }

    // 사용자가 입력을 멈춘 후 300ms 뒤 검색 실행
    const timer = setTimeout(() => {
      searchPlaces(trimmed);
    }, 300);

    // 입력이 계속되면 이전 타이머를 취소하여 마지막 입력만 검색
    return () => clearTimeout(timer);
  }, [keyword]);

  /**
   * 관광지 검색
   *
   * 현재는 더미 데이터를 필터링 => 추후 관광지 검색 API로 교체하면 됨.
   *
   * @param keyword 검색 키워드
   */
  const searchPlaces = async (keyword: string) => {
    setIsSearching(true);

    // TODO: 관광지 검색 API 호출
    const results = dummyPlaceMarkerList.filter((place) =>
      place.title.toLowerCase().includes(keyword.toLowerCase()),
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleLinkToPlace = (placeId: number) => () => {
    navigate(`/explore/${placeId}`);
    // navigate("/");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <CommonSearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          placeholder={t("map:search.placeholder")}
          onSearch={handleSearch}
        />
        <Button
          variant="text"
          onClick={() => navigate(-1)}
          sx={{
            p: 0,
            width: "fit-content",
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
        {keyword.length > 0 && searchResults.length === 0 && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            "{keyword}"에 대한 검색 결과가 없습니다.
          </Typography>
        )}
        {keyword.length > 0 && searchResults.length > 0 && (
          <Stack sx={{ width: "100%" }}>
            {searchResults.map((place) => (
              <MapSearchItem
                key={place.placeId}
                title={place.title}
                enTitle={place.enTitle}
                address={place.address}
                distance={place.distance}
                onClick={handleLinkToPlace(place.id)}
              />
            ))}
          </Stack>
        )}
        {keyword.length === 0 && searchResults.length === 0 && (
          <Stack
            direction="column"
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              mt: 8,
            }}
            spacing={1.5}
          >
            <TravelExploreIcon sx={{ fontSize: 48, color: "text.secondary" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              최근 검색 기록이 없습니다.
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default MapSearchPage;

// TODO. react-query 적용
