import { useEffect } from "react";

import currentLocationImage from "../../assets/map/test_current_marker.png";
import placeMarkerImage from "../../assets/map/test_marker.png";
import type { MapLocation } from "../../models/MapModel";

interface MapMarkerProps {
  map: any;
  clusterer?: any;
  lat: number;
  lng: number;
  onClick?: (marker: MapLocation) => void;
  image?: string;
  imageSize?: {
    width: number;
    height: number;
  };
  title?: string;
  showLabel?: boolean;
}

/**
 * 카카오맵 마커 컴포넌트
 */
const MapMarker = ({
  map,
  clusterer,
  lat,
  lng,
  onClick,
  image,
  imageSize = { width: 50, height: 50 },
  title,
  showLabel = true,
}: MapMarkerProps) => {
  useEffect(() => {
    if (!map) return;

    const position = new window.kakao.maps.LatLng(lat, lng);

    const defaultImageUrls = {
      place: placeMarkerImage,
      visited: placeMarkerImage,
      currentLocation: currentLocationImage,
    } as const;

    const markerImage = new window.kakao.maps.MarkerImage(
      image ?? defaultImageUrls.place,
      new window.kakao.maps.Size(imageSize.width, imageSize.height),
    );

    // ===== 마커 생성 =====
    const marker = new window.kakao.maps.Marker({
      position,
      image: markerImage,
      title: title ?? "",
    });

    if (clusterer) {
      clusterer.addMarker(marker);
    } else {
      marker.setMap(map);
    }

    // ===== 라벨(CustomOverlay) 생성 =====
    let overlay: any = null;

    if (showLabel && title) {
      const label = document.createElement("div");
      label.textContent = title;

      Object.assign(label.style, {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px 10px",
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #E5E7EB",
        borderRadius: "999px",
        color: "#222",
        fontSize: "12px",
        fontWeight: "600",
        lineHeight: "1",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        pointerEvents: "none",
        userSelect: "none",
      } satisfies Partial<CSSStyleDeclaration>);

      overlay = new window.kakao.maps.CustomOverlay({
        position,
        content: label,
        xAnchor: 0.5,
        yAnchor: -0.15,
      });

      overlay.setMap(map);
    }

    // ===== 클릭 이벤트 =====
    const clickListener = () => {
      onClick?.({ lat, lng });
    };

    window.kakao.maps.event.addListener(marker, "click", clickListener);

    return () => {
      window.kakao.maps.event.removeListener(marker, "click", clickListener);

      if (clusterer) {
        clusterer.removeMarker(marker);
      } else {
        marker.setMap(null);
      }

      overlay?.setMap(null);
    };
  }, [
    map,
    clusterer,
    lat,
    lng,
    image,
    imageSize.width,
    imageSize.height,
    title,
    showLabel,
    onClick,
  ]);

  return null;
};

export default MapMarker;
