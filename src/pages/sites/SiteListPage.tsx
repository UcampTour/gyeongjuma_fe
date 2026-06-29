import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { dummySiteListData } from "../../data/sites/sitesData";
import SiteListHeader from "../../components/sites/sitelist/SiteListHeader";
import SiteCategoryFilter from "../../components/sites/sitelist/SiteCategoryFilter";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import SiteList from "../../components/sites/sitelist/SiteList";
import { getDistance } from "../../utils/geo";



const SiteListPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const sitesData = dummySiteListData;

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
  
  const calculatedSites = sitesData.map((site) => {
    const distance = userLocation ? getDistance(userLocation.lat, userLocation.lng, site.lat, site.lng) : null;
    return { ...site, distance };
  });

  return (
    <Box sx={{ p: 2, bgcolor: "#F7F5EE", minHeight: "100vh", pb: 12 }}>
      
      {/* 상단 타이틀 & 정렬 */}
      <SiteListHeader />

      {/* 카테고리 탭 가로 스크롤 영역 */}
      <SiteCategoryFilter />

      {/* 검색창 */}
      <CommonSearchBar placeholder="관광지를 검색해보세요"/>

      {/* 관광지 리스트 영역 */}
      <SiteList siteList={calculatedSites} />
      
    </Box>
  );
}

export default SiteListPage;