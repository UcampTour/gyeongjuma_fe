import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { QuizCategory } from "../../../models/QuizModel";

interface QuizCategoryFilterProps {
  selectedCategory: QuizCategory;
  setSelectedCategory: (category: QuizCategory) => void;
}

const QuizCategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
}: QuizCategoryFilterProps) => {
  const { t } = useTranslation("quiz");

  const categories = [
    { value: QuizCategory.ALL, label: t("category.all") },
    { value: QuizCategory.AVAILABLE, label: t("category.available") },
    { value: QuizCategory.PROGRESS, label: t("category.progress") },
    { value: QuizCategory.COMPLETED, label: t("category.completed") },
    { value: QuizCategory.LOCKED, label: t("category.locked") },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        whiteSpace: "nowrap",
        mb: 3,
        pb: 1,
        ":-webkit-scrollbar": { display: "none" },
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
              boxShadow: isSelected
                ? "0 2px 8px rgba(142,114,73,0.25)"
                : "none",
              transition: "all 0.2s",
            }}
          >
            {category.label}
          </Box>
        );
      })}
    </Box>
  );
};

export default QuizCategoryFilter;