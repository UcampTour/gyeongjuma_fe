import React from "react";
import type { SiteMapMarker } from "../../models/MapModel";
import MapMarker from "./MapMarker";
import normalMarker from "../../assets/map/test_marker.png";
import visitedMarker from "../../assets/map/test_visited_marker.png";

/**
 *  관광지 마커 컴포넌트
 */
export interface SiteMarkerProps {
  map: any; // useKakaoMap 훅이 반환한 카카오맵 객체
  site: SiteMapMarker; // 관광지 정보
  onClick?: (site: SiteMapMarker) => void; // 클릭 이벤트 핸들러
}
const SiteMarker = ({ map, site, onClick }: SiteMarkerProps) => {
  const image = site.isVisited ? visitedMarker : normalMarker;

  return (
    <MapMarker
      map={map}
      lat={site.lat}
      lng={site.lng}
      title={site.title}
      image={image}
      onClick={() => onClick?.(site)}
    />
  );
};

export default SiteMarker;
