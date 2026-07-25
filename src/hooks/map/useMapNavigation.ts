import { useState } from "react";
import type { MapLocation } from "../../models/MapModel";
import type { LoadingProps } from "../../components/common/CommonLoading";

/* 경주역 */
const GYEONGJU_CENTER = {
  lat: 35.798365,
  lng: 129.138955,
};

export interface MapNavProps {
  map: any | null;
  selectedPlace?: any;
  sheetRef?: any;
  infoSheetRef?: any;
  setSelectedPlace?: any;
  setIsRecommendOpen?: any;
}
export const useMapNavigation = ({ map }: MapNavProps) => {
  const [locationLoading, setLocationLoading] = useState<
    LoadingProps | undefined
  >(undefined);

  /**
   * 지도 이동 공통 함수
   */
  const moveMap = async (location: MapLocation, message: string) => {
    if (!map) return null;

    setLocationLoading({
      isLoading: true,
      loadingMsg: message,
    });

    if (!location) return;

    const position = new window.kakao.maps.LatLng(location?.lat, location?.lng);

    map.setCenter(position);

    setTimeout(() => {
      setLocationLoading(undefined);
    }, 1500);

    return location;
  };

  /**
   * 경주 중심지로 이동
   */
  const moveToGyeongjuCenter = () => {
    return moveMap(GYEONGJU_CENTER, "경주 중심지로 이동");
  };

  /**
   * 현재 위치로 이동
   */
  const moveToCurrentLocation = (location: MapLocation, message: string) => {
    return moveMap(location, message);
  };

  /**
   * 특정 좌표로 이동
   */
  const moveToLocation = (location: MapLocation, message: string) => {
    return moveMap(location, message);
  };

  return {
    locationLoading,
    moveToGyeongjuCenter,
    moveToCurrentLocation,
    moveToLocation,
  };
};
