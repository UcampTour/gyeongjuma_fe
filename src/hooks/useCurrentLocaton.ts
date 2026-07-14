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

  const updateCurrentLocation = () => {
    setLoading(true);

    return new Promise<MapLocation | null>((resolve) => {
      if (!navigator.geolocation) {
        setLoading(false);
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const location = {
            lat: coords.latitude,
            lng: coords.longitude,
          };

          setCurrentLocation({
            lat: location.lat,
            lng: location.lng,
          });
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

  return { loading, currentLocation, updateCurrentLocation };
};
