import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PlaceCategory } from "../../../models/PlaceModel";

const PlaceCategoryFilter = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(PlaceCategory.ALL);
  
  const categories = [
    {category: PlaceCategory.ALL, label: t("places.category.all")},
    {category: PlaceCategory.HISTORIC, label: t("places.category.historic")},
    {category: PlaceCategory.TOURIST, label: t("places.category.tourist")},
    {category: PlaceCategory.OTHER, label: t("places.category.other")}
  ]

  return (
    <Box 
      sx={{ 
        display: "flex", 
        gap: 1, 
        overflowX: "auto", 
        whiteSpace: "nowrap",
        mb: 3,
        pb: 1,
        "::-webkit-scrollbar": { display: "none" } 
      }}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <Box
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            sx={{
              px: 2.2,
              py: 0.8,
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "1px solid",
              borderColor: isSelected ? "#8E7249" : "#E3DCCE", 
              bgcolor: isSelected ? "#8E7249" : "#FFFFFF",
              color: isSelected ? "#FFFFFF" : "#7A7265",
              boxShadow: isSelected ? "0 2px 8px rgba(142,114,73,0.25)" : "none",
              transition: "all 0.2s"
            }}
          >
            {cat}
          </Box>
        );
      })}
    </Box>
  )
}

export default PlaceCategoryFilter;