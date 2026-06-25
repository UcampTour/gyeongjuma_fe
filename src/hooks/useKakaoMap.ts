import { useEffect, useState, type RefObject } from "react";

export const useKakaoMap = (mapRef: RefObject<HTMLDivElement | null>) => {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    window.kakao.maps.load(() => {
      const kakaoMap = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(35.8562, 129.2247), // 경주 시청 좌표
        level: 5,
      });

      setMap(kakaoMap);
    });
  }, []);

  return map;
};
