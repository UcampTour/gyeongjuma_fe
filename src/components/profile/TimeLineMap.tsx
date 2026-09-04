import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useKakaoMap } from "../../hooks/map/useKakaoMap";

export interface TimelinePlace {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface TimeLinePageProps {
  places: TimelinePlace[];
}

const TimeLineMap = ({ places }: TimeLinePageProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { map } = useKakaoMap(mapRef);

  useEffect(() => {
    if (!map || places.length === 0) return;

    const kakao = window.kakao;

    const positions = places.map(
      (place) => new kakao.maps.LatLng(place.lat, place.lng),
    );

    // Polyline
    const polyline = new kakao.maps.Polyline({
      path: positions,
      strokeWeight: 5,
      strokeColor: "#614101",
      strokeOpacity: 0.9,
      strokeStyle: "solid",
    });

    polyline.setMap(map);

    // 마커
    const overlays: any[] = [];

    places.forEach((place, index) => {
      const markerContent = document.createElement("div");

      Object.assign(markerContent.style, {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "#614101",
        border: "3px solid white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
      } satisfies Partial<CSSStyleDeclaration>);

      markerContent.textContent = String(index + 1);

      const overlay = new kakao.maps.CustomOverlay({
        position: positions[index],
        content: markerContent,
        yAnchor: 0.5,
        xAnchor: 0.5,
        zIndex: 10,
      });

      overlay.setMap(map);
      overlays.push(overlay);
    });

    // 모든 장소가 보이도록
    const bounds = new kakao.maps.LatLngBounds();

    positions.forEach((position) => {
      bounds.extend(position);
    });

    map.setBounds(bounds, 50, 50, 50, 50);

    return () => {
      polyline.setMap(null);

      overlays.forEach((overlay) => {
        overlay.setMap(null);
      });
    };
  }, [map, places]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* 지도 */}
      <Box
        ref={mapRef}
        sx={{
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};

export default TimeLineMap;
