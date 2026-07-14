import { Box } from "@mui/material";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import PageHeader from "../../components/common/PageHeader";
import PlaceCategoryFilter from "../../components/places/placelist/PlaceCategoryFilter";
import PlaceList from "../../components/places/placelist/PlaceList";
import { usePlaceList } from "../../hooks/usePlaceList";
import PlaceListSorter from "../../components/places/placelist/PlaceListSorter";

const PlaceListPage = () => {
  const {
    placeList,
    selectedCategory,
    setSelectedCategory,
    searchKeyword,
    setSearchKeyword,
    sortBy,
    setSortBy,
  } = usePlaceList();

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      {/* 페이지 헤더 영역 */}
      <PageHeader title="경주의 관광지 둘러보기" />

      <Box sx={{ px: 2 }}>
        {/* 관광지 카테고리 영역 */}
        <PlaceCategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
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
              placeholder="관광지를 검색해보세요"
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
