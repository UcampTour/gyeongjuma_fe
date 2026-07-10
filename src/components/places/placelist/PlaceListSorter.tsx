import { FormControl, MenuItem, Select } from "@mui/material";
import { PlaceSortType } from "../../../models/PlaceModel";
import { useTranslation } from "react-i18next";

interface PlaceListSorterProps {
  sortBy: PlaceSortType;
  setSortBy: (sort: PlaceSortType) => void;
}

const PlaceListSorter = ({ sortBy, setSortBy }: PlaceListSorterProps) => {
  const { t } = useTranslation();

  const sortTypes = [
    { value: PlaceSortType.DEFAULT, label: t("places:sortType.default") },
    { value: PlaceSortType.LIKES, label: t("places:sortType.likes") },
    { value: PlaceSortType.DISTANCE, label: t("places:sortType.distance") },
  ];

  return (
    <FormControl size="small" sx={{ height: "100%", minWidth: 90 }}>
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as PlaceSortType)}
        displayEmpty
        sx={{
          height: "100%", // 부모(48px)를 꽉 채움
          bgcolor: "#FFFFFF",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#555555",
          "& .MuiOutlinedInput-notchedOutline": { border: "1px solid #E3DCCE" },
          fontWeight: 500,
          // Select 내부의 텍스트를 Flex로 중앙 정렬
          "& .MuiSelect-select": { 
             display: "flex", 
             alignItems: "center",
             height: "100%", 
             boxSizing: "border-box" 
          },
        }}
      >
        {sortTypes.map((sort) => (
          <MenuItem key={sort.value} value={sort.value}>
            {sort.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PlaceListSorter;