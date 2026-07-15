import { useEffect, useState, type RefObject } from "react";

/**
 * Kakao Maps hook
 * 카카오맵 인스턴스 생성 및 관리 훅
 *
 * @param mapRef : 지도를 렌더링할 HTML div 요소 ref
 * @returns 생성된 카카오맵 인스턴스 (아직 로드 전일 때는 null 반환)
 */
export const useKakaoMap = (mapRef: RefObject<HTMLDivElement | null>) => {
  /* 카카오맵 인스턴스 상태 관리 */
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    // 지도를 렌더링할 div 요소가 존재하지 않으면 종료
    // 'kakao is not defined' 에러 방지
    if (!mapRef.current) return;

    // 카카오맵 API 로드 후 지도 생성
    window.kakao.maps.load(() => {
      const kakaoMap = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(35.798365, 129.138955), // 초기 중심 좌표: 경주역
        level: 5,
      });

      setMap(kakaoMap);
    });
  }, []);

  return map;
};
