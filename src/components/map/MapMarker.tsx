import { useEffect } from "react";
import placeMarkerImage from "../../assets/map/test_marker.png";
import currentLocationImage from "../../assets/map/test_current_marker.png";
import type { MapLocation } from "../../models/MapModel";

interface MapMarkerProps {
  map: any; // useKakaoMap 훅이 반환한 카카오맵 객체
  lat: number; // 위도
  lng: number; // 경도
  onClick?: (marker: MapLocation) => void;
  image?: string;
  imageSize?: { width: number; height: number };
  title?: string;
}

/**
 * 기본 마커 컴포넌트
 */
const MapMarker = ({
  map,
  lat,
  lng,
  onClick,
  image,
  imageSize = { width: 50, height: 50 },
  title,
}: MapMarkerProps) => {
  useEffect(() => {
    if (!map) return;

    // 1. 카카오 좌표 객체 생성
    const position = new window.kakao.maps.LatLng(lat, lng);

    // 2. 마커 이미지 생성
    const defaultImageUrls = {
      place: placeMarkerImage,
      visited: placeMarkerImage,
      currentLocation: currentLocationImage,
    } as const;

    const markerImageUrl = image;
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageUrl,
      new window.kakao.maps.Size(imageSize.width, imageSize.height),
    );

    // 3. 마커 인스턴스 생성
    const marker = new window.kakao.maps.Marker({
      position,
      title: title ?? "", // 마우스 오버 시 뜨는 기본 툴팁
      image: markerImage, // 커스텀 이미지 적용
    });

    // 지도에 마커 표시
    marker.setMap(map);

    // 클릭 이벤트 바인딩
    const clickListener = () => {
      if (onClick) {
        onClick({ lat, lng }); // 클릭된 마커의 위치 데이터를 부모로 넘겨줌
      }
    };

    window.kakao.maps.event.addListener(marker, "click", clickListener);

    // 컴포넌트 언마운트 시 마커 제거 및 이벤트 해제
    // Cleanup: 데이터가 바뀌거나 필터링되어 컴포넌트가 사라질 때 지도에서 마커 삭제
    return () => {
      window.kakao.maps.event.removeListener(marker, "click", clickListener);
      marker.setMap(null); // 카카오 오버레이 객체만 제어하므로 DOM은 그리지 않음
    };
  }, [map, lat, lng, image, imageSize, onClick]);

  return null;
};

export default MapMarker;
