import type { ChangeEvent } from "react";
import { Box, Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { PlaceItem } from "../../../hooks/admin/useAdminPlace";

interface AdminPlaceDetailPanelProps {
  selectedPlace: PlaceItem | null;
  editIsActive: boolean;
  currentDifficulty: "EASY" | "NORMAL" | "HARD";
  currentDescription: string;
  onEditIsActiveChange: (isActive: boolean) => void;
  onDifficultyChange: (newDiff: "EASY" | "NORMAL" | "HARD") => void;
  onDescriptionChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSaveAll: () => void;
}

export const AdminPlaceDetailPanel = ({
  selectedPlace,
  editIsActive,
  currentDifficulty,
  currentDescription,
  onEditIsActiveChange,
  onDifficultyChange,
  onDescriptionChange,
  onSaveAll,
}: AdminPlaceDetailPanelProps) => {
  return (
    <Box 
      component={Paper} 
      sx={{ 
        flex: 5, 
        p: 3, 
        borderRadius: "12px", 
        border: "1px solid #E0E0E0", 
        boxShadow: "none",
        bgcolor: "#FFFFFF"
      }}
    >
      {selectedPlace ? (
        <>
          {/* 패널 상단: 이름 및 사용 여부 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, pb: 2, borderBottom: "1px solid #E0E0E0" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#2C2A29" }}>
              {selectedPlace.placeName} {selectedPlace.language ? `(${selectedPlace.language})` : ""}
            </Typography>

            <FormControl size="small" sx={{ width: "130px" }}>
              <InputLabel id="panel-usage-label">사용 여부</InputLabel>
              <Select
                labelId="panel-usage-label"
                value={editIsActive ? "active" : "inactive"}
                label="사용 여부"
                onChange={(e) => onEditIsActiveChange(e.target.value === "active")}
              >
                <MenuItem value="active">활성 (Y)</MenuItem>
                <MenuItem value="inactive">비활성 (N)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* 난이도 선택 버튼 그룹 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>난이도 선택</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {(["EASY", "NORMAL", "HARD"] as const).map((diff) => (
                <Button
                  key={diff}
                  variant={currentDifficulty === diff ? "contained" : "outlined"}
                  size="small"
                  onClick={() => onDifficultyChange(diff)}
                  sx={{ 
                    flex: 1,
                    bgcolor: currentDifficulty === diff ? "#AC8E61" : "transparent",
                    color: currentDifficulty === diff ? "#fff" : "inherit",
                    borderColor: "#D1D5DB",
                    "&:hover": {
                      bgcolor: currentDifficulty === diff ? "#8f734a" : "rgba(0,0,0,0.04)"
                    }
                  }}
                >
                  {diff}
                </Button>
              ))}
            </Box>
          </Box>

          {/* 설명 입력 에디터 */}
          <TextField
            label="해설 내용 (Description)"
            multiline
            rows={8}
            fullWidth
            value={currentDescription}
            onChange={onDescriptionChange}
            placeholder="해당 난이도에 맞는 해설을 입력하세요."
            sx={{ mb: 3 }}
          />

          {/* 통합 저장 버튼 */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button 
              onClick={onSaveAll} 
              variant="contained" 
              size="large"
              sx={{ bgcolor: "#AC8E61", "&:hover": { bgcolor: "#8f734a" }, px: 4 }}
            >
              저장하기
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ py: 10, textAlign: "center", color: "text.secondary" }}>
          왼쪽 목록에서 관광지를 선택해주세요.
        </Box>
      )}
    </Box>
  );
};