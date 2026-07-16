/**
 * 현재 위치 관련 훅
 */

import { useState } from "react";
import type { MapLocation } from "../models/MapModel";

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<MapLocation | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  /**
   * 좌표를 행정동 주소로 변환
   */
  const getCurrentAddress = (
    lat: number,
    lng: number,
  ): Promise<string | null> => {
    return new Promise((resolve) => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2RegionCode(lng, lat, (result: any[], status: string) => {
        if (status !== window.kakao.maps.services.Status.OK) {
          resolve(null);
          return;
        }

        const region = result.find((item) => item.region_type === "H");

        resolve(
          region
            ? `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`
            : null,
        );
      });
    });
  };

  /**
   * 사용자의 현재 좌표 조회
   */
  const updateCurrentLocation = (): Promise<MapLocation | null> => {
    setLoading(true);

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setLoading(false);
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const location: MapLocation = {
            lat: coords.latitude,
            lng: coords.longitude,
          };

          setCurrentLocation(location);
          setLoading(false);
          resolve(location);
        },
        () => {
          setLoading(false);
          resolve(null);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 30000,
          timeout: 10000,
        },
      );
    });
  };

  return {
    loading,
    currentLocation,
    updateCurrentLocation,
    getCurrentAddress,
  };
};
