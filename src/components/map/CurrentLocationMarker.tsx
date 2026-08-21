import { useEffect, useRef } from "react";
import image from "../../assets/map/test_current_marker.png";

export interface CurrentLocationMarkerProps {
  map: any;
  lat: number;
  lng: number;
}

const CurrentLocationMarker = ({
  map,
  lat,
  lng,
}: CurrentLocationMarkerProps) => {
  const markerRef = useRef<any>(null);

  // 마커 최초 생성
  useEffect(() => {
    if (!map) return;

    const position = new window.kakao.maps.LatLng(lat, lng);

    const markerImage = new window.kakao.maps.MarkerImage(
      image,
      new window.kakao.maps.Size(80, 80),
    );

    const marker = new window.kakao.maps.Marker({
      map,
      position,
      image: markerImage,
      title: "현재 위치",
      zIndex: 100,
    });

    markerRef.current = marker;

    return () => {
      marker.setMap(null);
      markerRef.current = null;
    };
  }, [map]);

  // 위치 변경
  useEffect(() => {
    if (!markerRef.current) return;

    const position = new window.kakao.maps.LatLng(lat, lng);

    markerRef.current.setPosition(position);
  }, [lat, lng]);

  return null;
};

export default CurrentLocationMarker;
