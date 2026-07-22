import { Box } from "@mui/material";
import type { PlaceListBase } from "../../../models/PlaceModel";
import PlaceCard from "./PlaceCard";
import { useNavigate } from "react-router-dom";

interface PlaceListProps {
  placeList: PlaceListBase[];
}

const PlaceList = ({ placeList }: PlaceListProps) => {
  const navigate = useNavigate();

  console.log("지금 그려질 리스트:", placeList);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {placeList.map((place) => (
        <PlaceCard
          key={place.placeId}
          place={place}
          onClick={() => navigate(`/explore/${place.placeId}`)}
        />
      ))}
    </Box>
  );
};

export default PlaceList;
