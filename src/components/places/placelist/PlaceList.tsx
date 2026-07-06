import { Box } from "@mui/material";
import type { PlaceListItem } from "../../../models/PlaceModel";
import PlaceCard from "./PlaceCard";

interface PlaceListProps {
  placeList: PlaceListItem[];
}

const PlaceList = ({ placeList }: PlaceListProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {placeList.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </Box>
  )
}

export default PlaceList;