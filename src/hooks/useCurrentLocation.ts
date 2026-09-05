/**
 * 현재 위치 관련 훅
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { MapLocation } from "../models/MapModel";

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<MapLocation | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  // 실시간 위치 추적 ID
  const watchIdRef = useRef<number | null>(null);

  /**
   * 좌표를 행정동 주소로 변환
   */
  const getCurrentAddress = useCallback(
    (lat: number, lng: number): Promise<string | null> => {
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
    },
    [],
  );

  const isGyeongju = useCallback(
    async (lat: number, lng: number): Promise<boolean> => {
      const address = await getCurrentAddress(lat, lng);

      return address?.includes("경주시") ?? false;
    },
    [getCurrentAddress],
  );
  /**
   * 사용자의 현재 좌표 1회 조회
   */
  const updateCurrentLocation = useCallback((): Promise<MapLocation | null> => {
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
          enableHighAccuracy: true,
          maximumAge: 3000,
          timeout: 10000,
        },
      );
    });
  }, []);

  /**
   * 실시간 위치 추적 시작
   *
   * watchPosition으로 위치가 변경될 때마다
   * currentLocation을 업데이트
   */
  const startWatchingLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.error("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
      return;
    }

    // 이미 추적 중이면 중복 실행하지 않음
    if (watchIdRef.current !== null) {
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const location: MapLocation = {
          lat: coords.latitude,
          lng: coords.longitude,
        };

        setCurrentLocation(location);
      },
      (error) => {
        console.error("실시간 위치 추적 실패:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 10000,
      },
    );
  }, []);

  /**
   * 실시간 위치 추적 종료
   */
  const stopWatchingLocation = useCallback(() => {
    if (watchIdRef.current === null) {
      return;
    }

    navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
  }, []);

  /**
   * 훅이 제거될 때 위치 추적 종료
   */
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    loading,
    currentLocation,
    updateCurrentLocation,
    getCurrentAddress,
    isGyeongju,
    startWatchingLocation,
    stopWatchingLocation,
  };
};
