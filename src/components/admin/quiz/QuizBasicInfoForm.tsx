import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { QuizInfo } from "../../../pages/admin/quiz/AdminQuizFormPage";
import { useState } from "react";
import PlaceSearchDialog from "./PlaceSearchDialog";

interface QuizBasicInfoFormInterface {
  quizInfo: QuizInfo;
  handleQuizInfoChange: (field: string, value: any) => void; 
}

const QuizBasicInfoForm = ({
  quizInfo,
  handleQuizInfoChange,
}: QuizBasicInfoFormInterface) => {
  const [isPlaceDialogOpen, setIsPlaceDialogOpen] = useState(false);

  const handleSelectPlace = (place: { id: number; name: string }) => {
    handleQuizInfoChange("placeId", place.id);
    handleQuizInfoChange("placeName", place.name);
    setIsPlaceDialogOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          p: 4,
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827", mb: -1 }}>
          퀴즈 기본 정보
        </Typography>

        {/* 관광지 ID 및 관광지명 */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <TextField
            label="관광지 ID"
            size="small"
            sx={{ width: "25%" }}
            value={quizInfo.placeId}
            disabled 
          />

          <Box sx={{ display: "flex", gap: 1, width: "75%" }}>
            <TextField
              label="관광지명"
              size="small"
              fullWidth
              value={quizInfo.placeName}
              disabled 
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={() => setIsPlaceDialogOpen(true)}
              sx={{
                bgcolor: "#374151",
                "&:hover": { bgcolor: "#1F2937" },
                whiteSpace: "nowrap",
                px: 3,
                boxShadow: "none",
                height: "40px",
              }}
            >
              찾기
            </Button>
          </Box>
        </Box>

        <TextField
          label="퀴즈 제목"
          size="small"
          fullWidth
          placeholder="예: 불국사 다보탑의 비밀 탐구"
          value={quizInfo.title}
          onChange={(e) => handleQuizInfoChange("title", e.target.value)}
        />

        <TextField
          label="퀴즈 설명"
          size="small"
          multiline
          rows={3}
          fullWidth
          placeholder="퀴즈에 대한 설명을 입력하세요."
          value={quizInfo.description}
          onChange={(e) => handleQuizInfoChange("description", e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>난이도</InputLabel>
            <Select
              value={quizInfo.difficulty}
              label="난이도"
              onChange={(e) => handleQuizInfoChange("difficulty", e.target.value)}
            >
              <MenuItem value="HIGH">상</MenuItem>
              <MenuItem value="MEDIUM">중</MenuItem>
              <MenuItem value="LOW">하</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="문제당 포인트"
            type="number"
            size="small"
            sx={{ flex: 1 }}
            value={quizInfo.points}
            onChange={(e) => handleQuizInfoChange("points", e.target.value)}
          />
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={quizInfo.isActive}
              onChange={(e) => handleQuizInfoChange("isActive", e.target.checked)}
              color="success"
            />
          }
          label={`사용 여부: ${quizInfo.isActive ? "사용중 (Y)" : "미사용 (N)"}`}
        />
      </Paper>

      <PlaceSearchDialog
        open={isPlaceDialogOpen}
        onClose={() => setIsPlaceDialogOpen(false)}
        handleSelectPlace={handleSelectPlace}
      />
    </>
  );
};

export default QuizBasicInfoForm;