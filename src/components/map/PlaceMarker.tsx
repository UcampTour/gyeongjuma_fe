import highCongestionMarker from "../../assets/map/congestion_high.png";
import lowCongestionMarker from "../../assets/map/congestion_low.png";
import mediumCongestionMarker from "../../assets/map/congestion_medium.png";
import normalMarker from "../../assets/map/normal_marker.png";
import operatingMarker from "../../assets/map/operating_marker.png";
import unvisitedFilterMarker from "../../assets/map/unvisited_filter_marker.png";
import { PlaceFilterType } from "../../models/MapModel";
import type { PlaceListBase } from "../../models/PlaceModel";
import MapMarker from "./MapMarker";

/**
 *  관광지 마커 컴포넌트
 */
export interface PlaceMarkerProps {
  map: any; // useKakaoMap 훅이 반환한 카카오맵 객체
  clusterer?: any;
  place: PlaceListBase; // 관광지 정보
  onClick?: (place: PlaceListBase) => void; // 클릭 이벤트 핸들러
  filter: PlaceFilterType;
}

const PlaceMarker = ({
  filter = PlaceFilterType.NONE,
  map,
  clusterer,
  place,
  onClick,
}: PlaceMarkerProps) => {
  // 필터별 마커 이미지를 결정하는 함수
  const settingMarkerImage = () => {
    switch (filter) {
      case PlaceFilterType.CONGESTION:
        // congestion 레벨에 따른 이미지 분기
        if (place.congestion === "HIGH") {
          return highCongestionMarker; // 임포트한 이미지 변수명으로 대체
        }
        if (place.congestion === "MEDIUM") {
          return mediumCongestionMarker;
        }
        if (place.congestion === "LOW") {
          return lowCongestionMarker;
        }
        return normalMarker; // 기본값 예외 처리

      case PlaceFilterType.OPERATING:
        return operatingMarker; // 운영중 필터 이미지 변수명

      case PlaceFilterType.UNVISITED:
        return place.isVisited ? normalMarker : unvisitedFilterMarker; // 미방문 필터 이미지 변수명

      case PlaceFilterType.NONE:
      default:
        // 기본 모드(NONE)일 때는 기존처럼 방문 여부에 따라 분기 처리
        return normalMarker;
    }
  };

  return (
    <MapMarker
      map={map}
      clusterer={clusterer}
      lat={place.lat}
      lng={place.lng}
      title={place.placeName}
      image={settingMarkerImage()}
      imageSize={{ width: 35, height: 35 }}
      onClick={() => onClick?.(place)}
    />
  );
};

export default PlaceMarker;
