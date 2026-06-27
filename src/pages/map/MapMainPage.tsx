import { useEffect, useRef, useState } from "react";
import { useKakaoMap } from "../../hooks/useKakaoMap";
import type { SiteMarker as SiteMarkerType } from "../../models/MapModel";
import { CongestionLevel, OperationStatus } from "../../models/MapModel";
import SiteMarkerComponent from "../../components/map/SiteMarkerComponent";
import { Box, Stack } from "@mui/material";
import IconCircleButton from "../../components/map/IconCircleButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

export const dummySiteData: SiteMarkerType[] = [
  {
    id: "1",
    title: "첨성대",
    lat: 35.8347,
    lng: 129.219,
    congestion: CongestionLevel.LOW,
    status: OperationStatus.OPEN,
    isVisited: true,
  },
  {
    id: "2",
    title: "불국사",
    lat: 35.79,
    lng: 129.332,
    congestion: CongestionLevel.HIGH,
    status: OperationStatus.OPEN,
    isVisited: false,
  },
  {
    id: "3",
    title: "석굴암",
    lat: 35.7952,
    lng: 129.3499,
    congestion: CongestionLevel.MEDIUM,
    status: OperationStatus.OPEN,
    isVisited: false,
  },
  {
    id: "4",
    title: "동궁과 월지",
    lat: 35.8349,
    lng: 129.2268,
    congestion: CongestionLevel.HIGH,
    status: OperationStatus.OPEN,
    isVisited: true,
  },
  {
    id: "5",
    title: "대릉원",
    lat: 35.8384,
    lng: 129.2114,
    congestion: CongestionLevel.MEDIUM,
    status: OperationStatus.OPEN,
    isVisited: false,
  },
  {
    id: "6",
    title: "황리단길",
    lat: 35.8375,
    lng: 129.2098,
    congestion: CongestionLevel.HIGH,
    status: OperationStatus.OPEN,
    isVisited: true,
  },
  {
    id: "7",
    title: "국립경주박물관",
    lat: 35.8289,
    lng: 129.2277,
    congestion: CongestionLevel.LOW,
    status: OperationStatus.OPEN,
    isVisited: false,
  },
  {
    id: "8",
    title: "월정교",
    lat: 35.8297,
    lng: 129.2148,
    congestion: CongestionLevel.MEDIUM,
    status: OperationStatus.OPEN,
    isVisited: true,
  },
  {
    id: "9",
    title: "교촌마을",
    lat: 35.8283,
    lng: 129.214,
    congestion: CongestionLevel.LOW,
    status: OperationStatus.BREAK_TIME,
    isVisited: false,
  },
  {
    id: "10",
    title: "경주엑스포대공원",
    lat: 35.7919,
    lng: 129.3328,
    congestion: CongestionLevel.MEDIUM,
    status: OperationStatus.CLOSED,
    isVisited: false,
  },
];
const MapMainPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const currentLocationMarkerRef = useRef<any>(null);

  const map = useKakaoMap(mapRef);

  const [siteData, setSiteData] = useState<SiteMarkerType[]>([]);
  const [selectedSite, setSelectedSite] = useState<SiteMarkerType | null>(null);

  useEffect(() => {
    // dummySiteData를 siteData 상태로 설정
    setSiteData(dummySiteData);
  }, []);

  const handleMarkerClick = (site: SiteMarkerType) => {
    console.log("marker clicked", site);
    setSelectedSite(site);
  };

  const handleGoToGyeongjuCenter = () => {
    if (!map) return;
    const gyeongjuCenter = new window.kakao.maps.LatLng(35.8562, 129.2247);
    map.setCenter(gyeongjuCenter);
  };

  const handleGoToCurrentLocation = () => {
    if (!map) return;

    if (!navigator.geolocation) {
      console.warn("Geolocation is not available in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const currentPosition = new window.kakao.maps.LatLng(
          coords.latitude,
          coords.longitude,
        );
        map.setCenter(currentPosition);

        if (currentLocationMarkerRef.current) {
          currentLocationMarkerRef.current.setMap(null);
        }

        const markerImageUrl = "/test_current_marker.png";
        const imageSize = new window.kakao.maps.Size(80, 80);
        const markerImage = new window.kakao.maps.MarkerImage(
          markerImageUrl,
          imageSize,
        );

        const currentMarker = new window.kakao.maps.Marker({
          position: currentPosition,
          map,
          title: "현재 위치",
          image: markerImage,
        });

        currentLocationMarkerRef.current = currentMarker;
      },
      (error) => {
        console.warn("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    );
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 90px)",
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

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            width: "100%",
            bgcolor: "rgba(255,255,255,0.95)",
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
          }}
        >
          {selectedSite ? (
            <>
              <Box component="div" sx={{ fontWeight: 700, mb: 1 }}>
                {selectedSite.title}
              </Box>
              <Box
                component="div"
                sx={{ fontSize: 14, color: "text.secondary" }}
              >
                혼잡도: {selectedSite.congestion}
              </Box>
              <Box
                component="div"
                sx={{ fontSize: 14, color: "text.secondary" }}
              >
                상태: {selectedSite.status}
              </Box>
              <Box
                component="div"
                sx={{ fontSize: 14, color: "text.secondary" }}
              >
                방문 여부: {selectedSite.isVisited ? "방문함" : "미방문"}
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </div>

      {/* 마커 렌더링 */}
      {map &&
        siteData.map((site) => (
          <SiteMarkerComponent
            key={site.id}
            site={site}
            map={map}
            onClick={handleMarkerClick}
          />
        ))}
    </>
  );
};

export default MapMainPage;
