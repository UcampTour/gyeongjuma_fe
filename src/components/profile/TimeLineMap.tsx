import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useKakaoMap } from "../../hooks/map/useKakaoMap";

export interface TimelinePlace {
  id: number;
  name: string;
  lat: number;
  lng: number;
  image: string;
}

interface TimeLinePageProps {
  places: TimelinePlace[];
}

const TimeLineMap = ({ places }: TimeLinePageProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { map } = useKakaoMap(mapRef);

  const navigate = useNavigate();

  useEffect(() => {
    if (!map || places.length === 0) return;

    const kakao = window.kakao;

    const positions = places.map(
      (place) => new kakao.maps.LatLng(place.lat, place.lng),
    );

    // ===== Polyline =====
    const polyline = new kakao.maps.Polyline({
      path: positions,
      strokeWeight: 4,
      strokeColor: "#614101",
      strokeOpacity: 0.8,
      strokeStyle: "dash",
    });

    polyline.setMap(map);

    // ===== 마커 =====
    const overlays: any[] = [];

    places.forEach((place, index) => {
      // ===== 마커 전체 컨테이너 =====
      const markerWrapper = document.createElement("div");

      Object.assign(markerWrapper.style, {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
      } satisfies Partial<CSSStyleDeclaration>);

      // ===== 사진/숫자 마커 =====
      const markerContent = document.createElement("div");

      Object.assign(markerContent.style, {
        position: "relative",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "#614101",
        border: "3px solid white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.15s ease",
        boxSizing: "border-box",
      } satisfies Partial<CSSStyleDeclaration>);

      // ===== 숫자 =====
      const number = document.createElement("span");

      number.textContent = String(index + 1);

      Object.assign(number.style, {
        color: "white",
        fontSize: "16px",
        fontWeight: "700",
        lineHeight: "1",
        zIndex: "2",
        transition: "opacity 0.15s ease",
      } satisfies Partial<CSSStyleDeclaration>);

      markerContent.appendChild(number);

      // ===== 이미지 =====
      const image = document.createElement("img");

      Object.assign(image.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        opacity: "0",
        transition: "opacity 0.15s ease",
      } satisfies Partial<CSSStyleDeclaration>);

      image.src = place.image ?? "/images/default_place_image.png";
      image.alt = place.name;

      markerContent.appendChild(image);

      // ===== 관광지명 라벨 =====
      const label = document.createElement("div");

      label.textContent = place.name;

      Object.assign(label.style, {
        marginTop: "6px",
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

      // 마커 + 관광지명
      markerWrapper.appendChild(markerContent);
      markerWrapper.appendChild(label);

      // ===== Hover =====
      const handleMouseEnter = () => {
        image.style.opacity = "1";
        number.style.opacity = "0";
        markerContent.style.transform = "scale(1.1)";
      };

      const handleMouseLeave = () => {
        image.style.opacity = "0";
        number.style.opacity = "1";
        markerContent.style.transform = "scale(1)";
      };

      markerContent.addEventListener("mouseenter", handleMouseEnter);
      markerContent.addEventListener("mouseleave", handleMouseLeave);

      // ===== 클릭 → 관광지 상세 =====
      const handleClick = () => {
        navigate(`/explore/${place.id}`);
      };

      // markerContent.addEventListener("click", handleClick);

      // ===== CustomOverlay =====
      const overlay = new kakao.maps.CustomOverlay({
        position: positions[index],
        content: markerWrapper,
        xAnchor: 0.5,
        yAnchor: 0.5,
        zIndex: 10,
      });

      overlay.setMap(map);
      overlays.push(overlay);
    });

    // ===== 모든 장소가 보이도록 =====
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
  }, [map, places, navigate]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
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
