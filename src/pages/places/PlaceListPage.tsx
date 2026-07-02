import { Box } from "@mui/material";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import PlaceListHeader from "../../components/places/placelist/PlaceListHeader";
import PlaceCategoryFilter from "../../components/places/placelist/PlaceCategoryFilter";
import PlaceList from "../../components/places/placelist/PlaceList";
import { usePlaceList } from "../../hooks/usePlaceList";

const PlaceListPage = () => {
  
  const { 
    selectedCategory, 
    setSelectedCategory, 
    filteredPlaces,
    searchKeyword,
    setSearchKeyword,
    sortBy,
    setSortBy,
  } = usePlaceList(); 

  return (
    <Box sx={{ p: 2, bgcolor: "#F7F5EE", minHeight: "100vh", pb: 12 }}>
      
      {/* 상단 타이틀 & 정렬 */}
      <PlaceListHeader 
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* 카테고리 탭 가로 스크롤 영역 */}
      <PlaceCategoryFilter 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 검색창 */}
      <CommonSearchBar 
        placeholder="관광지를 검색해보세요"
        keyword={searchKeyword}
        setKeyword={setSearchKeyword}
      />

      {/* 관광지 리스트 영역 */}
      <PlaceList placeList={filteredPlaces} />
      
    </Box>
  );
}

export default PlaceListPage;