import { useEffect, useRef } from "react";
import type { HandleInfoSheetRef } from "../../components/map/MapCommonInfoSheet";
import type { HandleSheetRef } from "../../components/map/MapBottomSheet";
import type { PlaceListBase } from "../../models/PlaceModel";

interface UseMapEventProps {
  map: any | null;

  // 선택된 관광지
  selectedPlace: PlaceListBase | null;

  // 관광지 선택 상태 변경
  setSelectedPlace: React.Dispatch<React.SetStateAction<PlaceListBase | null>>;

  // 추천 시트 열림 상태 변경
  setIsRecommendOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // 추천 정보 시트 ref
  infoSheetRef: React.RefObject<HandleInfoSheetRef | null>;

  // 관광지 상세 시트 ref
  sheetRef: React.RefObject<HandleSheetRef | null>;
}

/**
 * Kakao Map 이벤트 관리 Hook
 *
 * - 지도 클릭
 * - 지도 드래그
 * 이벤트 처리
 */
export const useMapEvent = ({
  map,
  selectedPlace,
  setSelectedPlace,
  setIsRecommendOpen,
  infoSheetRef,
  sheetRef,
}: UseMapEventProps) => {
  // 최신 selectedPlace 값 유지
  const selectedPlaceRef = useRef(selectedPlace);

  useEffect(() => {
    selectedPlaceRef.current = selectedPlace;
  }, [selectedPlace]);

  useEffect(() => {
    if (!map) return;

    /**
     * 지도 클릭 시
     * - 선택 관광지 제거
     * - 추천 시트 표시
     */
    const handleMapClick = () => {
      setSelectedPlace(null);
      setIsRecommendOpen(true);

      setTimeout(() => {
        infoSheetRef.current?.expand();
      }, 0);
    };

    /**
     * 지도 이동 시작 시
     * - 관광지가 선택되어 있으면 상세 시트 접기
     */
    const handleDragStart = () => {
      if (selectedPlaceRef.current) {
        sheetRef.current?.collapse();
        setIsRecommendOpen(false);
      }
    };

    window.kakao.maps.event.addListener(map, "click", handleMapClick);

    window.kakao.maps.event.addListener(map, "dragstart", handleDragStart);

    return () => {
      window.kakao.maps.event.removeListener(map, "click", handleMapClick);

      window.kakao.maps.event.removeListener(map, "dragstart", handleDragStart);
    };
  }, [map]);
};
