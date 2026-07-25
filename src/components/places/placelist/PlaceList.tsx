import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PlaceListBase } from "../../../models/PlaceModel";
import PlaceCard from "./PlaceCard";

interface PlaceListProps {
  placeList: PlaceListBase[];
}

const PlaceList = ({ placeList }: PlaceListProps) => {
  const navigate = useNavigate();
  const [itemLimit, setItemLimit] = useState(20);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItemLimit(20);
  }, [placeList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setItemLimit((prev) => (prev < placeList.length ? prev + 20 : prev));
        }
      },
      { threshold: 0.5 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [placeList.length]);

  const displayData = placeList.slice(0, itemLimit);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flex: 1, // 남은 공간 채우기
        overflowY: "auto", // 이 영역에만 세로 스크롤 생성
        pr: 1, // 스크롤바와 카드 간격 확보용 (선택사항)
      }}
    >
      {displayData.map((place) => (
        <PlaceCard
          key={place.placeId}
          place={place}
          onClick={() => navigate(`/explore/${place.placeId}`)}
        />
      ))}

      <div ref={observerTarget} style={{ height: "20px", width: "100%" }} />
    </Box>
  );
};

export default PlaceList;
