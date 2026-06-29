import { useEffect, useRef, useState } from "react";
import { useKakaoMap } from "../../hooks/useKakaoMap";
import { type MapLocation, type SiteMapMarker } from "../../models/MapModel";
import { Box, Stack } from "@mui/material";
import IconCircleButton from "../../components/common/IconCircleButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import SiteMarker from "../../components/map/SiteMarker";
import CurrentLocationMarker from "../../components/map/CurrentLocationMarker";
import { dummySiteMarkerList } from "../../data/map/mapData"; // dummy test data
import MapBottomSheet, {
  type HandleSheetRef,
} from "../../components/map/MapBottomSheet";
import type { LoadingProps } from "../../components/common/CommonLoading";
import CommonLoading from "../../components/common/CommonLoading";

/**
 * 지도 메인 페이지
 */
const MapMainPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HandleSheetRef>(null);

  const map = useKakaoMap(mapRef);

  const [siteData, setSiteData] = useState<SiteMapMarker[]>([]); // 관광지 목록 데이터
  const [selectedSite, setSelectedSite] = useState<SiteMapMarker | null>(null); // 선택 관광지
  const [loading, setLoading] = useState<LoadingProps | undefined>(undefined);

  const [currentLocation, setCurrentLocation] = useState<MapLocation | null>(
    null,
  ); // 현재 위치 상태

  useEffect(() => {
    // dummySiteData를 siteData 상태로 설정
    setSiteData(dummySiteMarkerList);

    // todo. fe에서 api 호출하여 관광지 목록 가져오기
  }, []);

  useEffect(() => {
    if (!map) return;

    const handleMapClick = () => {
      setSelectedSite(null);
    };

    const handleDragStart = () => {
      // 관광지가 선택되어 있을 때만 BottomSheet를 20%로 접기
      if (selectedSite) {
        sheetRef.current?.collapse();
      }
    };

    window.kakao.maps.event.addListener(map, "click", handleMapClick);
    window.kakao.maps.event.addListener(map, "dragstart", handleDragStart);

    return () => {
      window.kakao.maps.event.removeListener(map, "click", handleMapClick);
      window.kakao.maps.event.removeListener(map, "dragstart", handleDragStart);
    };
  }, [map, selectedSite]);

  /**
   * 마커 클릭 이벤트 핸들러
   */
  const handleMarkerClick = (site: SiteMapMarker) => {
    console.log("marker clicked", site);
    setSelectedSite(site);
    sheetRef.current?.expand(); // BottomSheet를 기본 높이로 열기
  };

  /**
   * 경주 중심지로 이동
   */
  const handleGoToGyeongjuCenter = () => {
    if (!map) return;

    sheetRef.current?.close(); // BottomSheet 닫기
    setLoading({ isLoading: true, loadingMsg: "경주 중심지로 이동 중..." });

    const gyeongjuCenter = new window.kakao.maps.LatLng(35.798365, 129.138955);

    map.setCenter(gyeongjuCenter);

    setTimeout(() => {
      setLoading(undefined);
    }, 500);
  };

  /**
   * 현재 위치로 이동
   */
  const handleGoToCurrentLocation = () => {
    sheetRef.current?.close(); // BottomSheet 닫기
    if (!map) return;

    if (!navigator.geolocation) {
      console.warn("Geolocation 브라우저에서 작동 에러");
      return;
    }
    setLoading({ isLoading: true, loadingMsg: "현재 위치로 이동 중..." });

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const position = new window.kakao.maps.LatLng(
          coords.latitude,
          coords.longitude,
        );
        map.setCenter(position);
        setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });

        setLoading(undefined);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setLoading(undefined);
      },
      { enableHighAccuracy: true, maximumAge: 0 },
    );
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 80px)",
        }}
      >
        {/* 지도 렌더링 */}
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 20,
          }}
        >
          <Stack direction="column" spacing={1}>
            <IconCircleButton
              icon={<LocationOnIcon />}
              ariaLabel="경주 중심지로 이동"
              onClick={handleGoToGyeongjuCenter}
            />
            <IconCircleButton
              icon={<GpsFixedIcon />}
              ariaLabel="현재 위치로 이동"
              onClick={handleGoToCurrentLocation}
            />
          </Stack>
        </Box>
        {/* 하단 드로어 */}
        <MapBottomSheet
          ref={sheetRef}
          open={!!selectedSite}
          site={selectedSite}
          onClose={() => {
            setSelectedSite(null);
          }}
        />
      </div>

      {/* 관광지 마커 렌더링 */}
      {map &&
        siteData.map((site) => (
          <SiteMarker
            key={site.id}
            site={site}
            map={map}
            onClick={handleMarkerClick}
          />
        ))}

      {/* 현재 위치 마커 렌더링 */}
      {currentLocation && (
        <CurrentLocationMarker
          map={map}
          lat={currentLocation.lat}
          lng={currentLocation.lng}
        />
      )}
      <CommonLoading loading={loading} />
    </>
  );
};

export default MapMainPage;
