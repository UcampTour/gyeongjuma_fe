import { useRef } from "react";
import { useKakaoMap } from "../../hooks/useKakaoMap";

const MapMainPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useKakaoMap(mapRef);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "calc(100vh - 90px)",
      }}
    />
  );
};

export default MapMainPage;
