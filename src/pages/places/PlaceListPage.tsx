import { Box } from "@mui/material";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import PageHeader from "../../components/common/PageHeader";
import PlaceList from "../../components/places/placelist/PlaceList";
import PlaceListSorter from "../../components/places/placelist/PlaceListSorter";
import { usePlaceList } from "../../hooks/place/usePlaceList";
import PlaceCongestionFilter from "../../components/places/placelist/PlaceCategoryFilter";
import { useTranslation } from "react-i18next";

const PlaceListPage = () => {
  const {
    placeList,
    selectedStatus,
    setSelectedStatus,
    searchKeyword,
    setSearchKeyword,
    sortBy,
    setSortBy,
  } = usePlaceList();

  const { t } = useTranslation("places");

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      {/* 페이지 헤더 영역 */}
      <PageHeader title={t("title")} />

      <Box sx={{ px: 2 }}>
        {/* 운영 상태 필터 영역 */}
        <PlaceCongestionFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        {/* 검색창 및 정렬 영역 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            my: 3,
            height: "48px",
          }}
        >
          <Box sx={{ flex: 1, height: "100%" }}>
            <CommonSearchBar
              placeholder={t("placehorder")}
              keyword={searchKeyword}
              setKeyword={setSearchKeyword}
            />
          </Box>
          <Box sx={{ height: "100%" }}>
            <PlaceListSorter sortBy={sortBy} setSortBy={setSortBy} />
          </Box>
        </Box>

        {/* 관광지 리스트 영역*/}
        <PlaceList placeList={placeList} />
      </Box>
    </Box>
  );
};

export default PlaceListPage;