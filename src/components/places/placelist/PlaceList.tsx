import { Box } from "@mui/material";
import type { PlaceListItem } from "../../../models/PlaceModel";
import PlaceCard from "./PlaceCard";
import { useNavigate } from "react-router-dom";

interface PlaceListProps {
  placeList: PlaceListItem[];
}

const PlaceList = ({ placeList }: PlaceListProps) => {
  const navigate = useNavigate();

  const handleGoToPlaceDetail = () => {
    navigate("/explore/");
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {placeList.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          onClick={() => navigate(`/explore/${place.id}`)}
        />
      ))}
    </Box>
  );
};

export default PlaceList;
