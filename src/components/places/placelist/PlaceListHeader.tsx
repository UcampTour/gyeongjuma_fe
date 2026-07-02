import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material"
import { PlaceSortType } from "../../../models/PlaceModel";
import { useTranslation } from "react-i18next";

interface PlaceListHeaderProps {
  sortBy: PlaceSortType;
  setSortBy: (sort:PlaceSortType) => void;
}

const PlaceListHeader = ({ sortBy, setSortBy }: PlaceListHeaderProps) => {

  const { t } =  useTranslation();

  const sortTypes = [
    {value: PlaceSortType.DEFAULT, label: t("places:sortType.default")},
    {value: PlaceSortType.LIKES, label: t("places:sortType.likes")},
    {value: PlaceSortType.DISTANCE, label: t("places:sortType.distance")},
  ]

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, mt: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "22px", color: "#111111" }}>
        경주의 관광지 둘러보기
      </Typography>
      
      <FormControl size="small" sx={{ minWidth: 85 }}>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          displayEmpty
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "8px",
            height: "36px",
            fontSize: "13px",
            color: "#555555",
            "& .MuiOutlinedInput-notchedOutline": { border: "1px solid #E3DCCE" },
            fontWeight: 500,
          }}
        >
          {sortTypes.map((sort) => (
             <MenuItem value={sort.value}>{sort.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default PlaceListHeader;