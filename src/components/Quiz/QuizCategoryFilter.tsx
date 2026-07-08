import { Box } from "@mui/material";
import { QuizFilter, type QuizFilterType, type QuizStatusType } from "../../models/QuizModel";

interface QuizCategoryFilterProps {
  selectedCategory: QuizFilterType,
  setSelectedCategory: (category: QuizFilterType) => void;
}

const QuizCategoryFilter = ({ selectedCategory, setSelectedCategory }: QuizCategoryFilterProps) => {

  const categories = [
    {value: QuizFilter.ALL, label: "전체"},
    {value: QuizFilter.AVAILABLE, label: "도전가능"},
    {value: QuizFilter.PROGRESS, label: "진행중"},
    {value: QuizFilter.COMPLETED, label: "완료"},
    {value: QuizFilter.LOCKED, label: "잠김"},
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
      {categories.map((category) => {
        const isSelected = selectedCategory === category.value;
        return (
          <Box
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
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
            {category.label}
          </Box>
        );
      })}
    </Box>
    )
}

export default QuizCategoryFilter;