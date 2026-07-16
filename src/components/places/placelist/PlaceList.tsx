import { Box } from "@mui/material";
import type { PlaceListBase } from "../../../models/PlaceModel";
import PlaceCard from "./PlaceCard";
import { useNavigate } from "react-router-dom";

interface PlaceListProps {
  placeList: PlaceListBase[];
}

const PlaceList = ({ placeList }: PlaceListProps) => {
  const navigate = useNavigate();

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
