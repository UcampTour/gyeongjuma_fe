import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { dummyPlaceListData } from "../../data/places/placesData";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import { getDistance } from "../../utils/geo";
import PlaceListHeader from "../../components/places/placelist/PlaceListHeader";
import PlaceCategoryFilter from "../../components/places/placelist/PlaceCategoryFilter";
import PlaceList from "../../components/places/placelist/PlaceList";

const PlaceListPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const placesData = dummyPlaceListData;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.error("위치 정보를 가져오지 못했습니다.", error);
        }
      );
    }
  }, []);
  
  const calculatedPlaces = placesData.map((place) => {
    const distance = userLocation ? getDistance(userLocation.lat, userLocation.lng, place.lat, place.lng) : null;
    return { ...place, distance };
  });

  return (
    <Box sx={{ p: 2, bgcolor: "#F7F5EE", minHeight: "100vh", pb: 12 }}>
      
      {/* 상단 타이틀 & 정렬 */}
      <PlaceListHeader />

      {/* 카테고리 탭 가로 스크롤 영역 */}
      <PlaceCategoryFilter />

      {/* 검색창 */}
      <CommonSearchBar placeholder="관광지를 검색해보세요"/>

      {/* 관광지 리스트 영역 */}
      <PlaceList placeList={calculatedPlaces} />
      
    </Box>
  );
}

export default PlaceListPage;