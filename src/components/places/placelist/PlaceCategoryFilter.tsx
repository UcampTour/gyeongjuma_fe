import { Box } from "@mui/material";
import { useState } from "react";

const PlaceCategoryFilter = () => {

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const categories = ["전체", "관광지", "유적지", "기타"];
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