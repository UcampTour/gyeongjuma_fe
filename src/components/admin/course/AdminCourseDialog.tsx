import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Divider,
  ButtonGroup,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface SelectedPlace {
  id: number;
  name: string;
}

interface AdminCourseDialogProps {
  open: boolean;
  dialogMode: "CREATE" | "EDIT";
  formType: "WALK" | "PUBLIC" | "DRIVE";
  setFormType: (val: "WALK" | "PUBLIC" | "DRIVE") => void;
  formIsUse: boolean;
  setFormIsUse: (val: boolean) => void;
  formPlaces: SelectedPlace[];
  currentLanguage: string;
  currentCourseName: string;
  currentDescription: string;
  supportedLanguages: { code: string; label: string }[];
  setCurrentLanguage: (lang: string) => void;
  handleFieldChange: (field: "courseName" | "description", value: string) => void;
  handleCloseDialog: () => void;
  handleSaveCourse: () => void;
  setOpenPlaceSearch: (open: boolean) => void;
  handleMovePlace: (index: number, direction: "up" | "down") => void;
  handleRemovePlace: (index: number) => void;
}

export const AdminCourseDialog: React.FC<AdminCourseDialogProps> = ({
  open,
  dialogMode,
  formType,
  setFormType,
  formIsUse,
  setFormIsUse,
  formPlaces,
  currentLanguage,
  currentCourseName,
  currentDescription,
  supportedLanguages,
  setCurrentLanguage,
  handleFieldChange,
  handleCloseDialog,
  handleSaveCourse,
  setOpenPlaceSearch,
  handleMovePlace,
  handleRemovePlace,
}) => {
  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>
        {dialogMode === "CREATE" ? "코스 등록" : "코스 수정"}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5}>
          {/* 유형 및 사용 여부 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>유형</InputLabel>
              <Select 
                value={formType} 
                label="유형" 
                onChange={(e) => setFormType(e.target.value as any)}
              >
                <MenuItem value="WALK">도보</MenuItem>
                <MenuItem value="PUBLIC">대중교통</MenuItem>
                <MenuItem value="DRIVE">운전</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>사용 여부</InputLabel>
              <Select 
                value={formIsUse ? "Y" : "N"} 
                label="사용 여부" 
                onChange={(e) => setFormIsUse(e.target.value === "Y")}
              >
                <MenuItem value="Y">사용 (Y)</MenuItem>
                <MenuItem value="N">미사용 (N)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider />

          {/* 다국어 탭 및 입력 영역 (코스명 + 설명) */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                코스 정보 (다국어)
              </Typography>
              <ButtonGroup size="small">
                {supportedLanguages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={currentLanguage === lang.code ? "contained" : "outlined"}
                    onClick={() => setCurrentLanguage(lang.code)}
                    sx={{
                      bgcolor: currentLanguage === lang.code ? "#AC8E61" : "transparent",
                      color: currentLanguage === lang.code ? "#fff" : "#AC8E61",
                      borderColor: "#AC8E61",
                      "&:hover": {
                        bgcolor: currentLanguage === lang.code ? "#8f734a" : "rgba(172, 142, 97, 0.04)",
                      },
                    }}
                  >
                    {lang.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>

            <Stack spacing={2}>
              <TextField
                label={`코스명 (${currentLanguage})`}
                size="small"
                fullWidth
                value={currentCourseName}
                onChange={(e) => handleFieldChange("courseName", e.target.value)}
                placeholder={`[${currentLanguage}] 코스명을 입력하세요.`}
              />

              <TextField
                label={`코스 설명 (${currentLanguage})`}
                size="small"
                fullWidth
                multiline
                rows={3}
                value={currentDescription}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                placeholder={`[${currentLanguage}] 코스 설명을 입력하세요.`}
              />
            </Stack>
          </Box>

          <Divider />

          {/* 관광지 리스트 영역 */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                포함된 관광지 (최소 2개 이상)
              </Typography>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => setOpenPlaceSearch(true)} 
                sx={{ color: "#AC8E61", borderColor: "#AC8E61" }}
              >
                + 관광지 검색 추가
              </Button>
            </Box>

            {formPlaces.length === 0 ? (
              <Box sx={{ p: 3, textAlign: "center", bgcolor: "#F9F9F9", borderRadius: "8px", border: "1px dashed #E0E0E0", color: "text.secondary" }}>
                추가된 관광지가 없습니다. 관광지 검색을 통해 추가해주세요.
              </Box>
            ) : (
              <Stack spacing={1.5}>
                {formPlaces.map((place, index) => (
                  <Box key={`${place.id}-${index}`} sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "#F9F9F9", p: 1.5, borderRadius: "8px", border: "1px solid #E0E0E0" }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, minWidth: "24px", textAlign: "center" }}>
                      {index + 1}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 500 }}>
                      {place.name} <span style={{ color: "gray", fontSize: "0.8rem" }}>(ID: {place.id})</span>
                    </Typography>

                    <IconButton size="small" onClick={() => handleMovePlace(index, "up")} disabled={index === 0}>
                      <ArrowUpwardIcon fontSize="small" />
                    </IconButton>

                    <IconButton size="small" onClick={() => handleMovePlace(index, "down")} disabled={index === formPlaces.length - 1}>
                      <ArrowDownwardIcon fontSize="small" />
                    </IconButton>

                    <IconButton size="small" color="error" onClick={() => handleRemovePlace(index)}>
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleCloseDialog} color="inherit">취소</Button>
        <Button onClick={handleSaveCourse} variant="contained" sx={{ bgcolor: "#AC8E61", "&:hover": { bgcolor: "#8f734a" } }}>
          {dialogMode === "CREATE" ? "등록" : "저장"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};