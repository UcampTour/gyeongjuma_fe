import { useEffect } from "react";
import type { SiteMarker } from "../../models/MapModel";

interface SiteMarkerProps {
  map: any; // useKakaoMap 훅이 반환한 카카오맵 객체
  site: SiteMarker;
  onClick?: (site: SiteMarker) => void;
}
const SiteMarkerComponent = ({ map, site, onClick }: SiteMarkerProps) => {
  useEffect(() => {
    //
    if (!map) return;

    // 1. 카카오 좌표 객체 생성
    const positon = new window.kakao.maps.LatLng(site.lat, site.lng);

    // 2. 마커 이미지 생성
    const markerImageUrl = "/test_marker.png";
    const imageSize = new window.kakao.maps.Size(50, 50);
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageUrl,
      imageSize,
    );

    // 3. 마커 인스턴스 생성
    const marker = new window.kakao.maps.Marker({
      position: positon,
      title: site.title, // 마우스 오버 시 뜨는 기본 툴팁
      image: markerImage, // 커스텀 이미지 적용
    });

    // 지도에 마커 표시
    marker.setMap(map);

    // 클릭 이벤트 바인딩
    const clickListener = () => {
      if (onClick) {
        onClick(site); // 클릭된 관광지 전체 데이터를 부모로 넘겨줌
      }
    };
    window.kakao.maps.event.addListener(marker, "click", clickListener);

    // 컴포넌트 언마운트 시 마커 제거 및 이벤트 해제
    // Cleanup: 데이터가 바뀌거나 필터링되어 컴포넌트가 사라질 때 지도에서 마커 삭제
    return () => {
      window.kakao.maps.event.removeListener(marker, "click", clickListener);
      marker.setMap(null);
    };
  }, [map, site, onClick]);

  return null; // 카카오 오버레이 객체만 제어하므로 DOM은 그리지 않음
};

export default SiteMarkerComponent;
