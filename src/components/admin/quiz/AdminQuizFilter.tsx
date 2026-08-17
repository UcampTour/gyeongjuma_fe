import { Box, TextField, MenuItem, Select, FormControl, InputLabel, type SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { ChangeEvent } from "react";

interface AdminQuizFilterProps {
  keyword: string;
  useFlag: string;
  difficulty: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onUsageChange: (e: SelectChangeEvent) => void;
  onDifficultyChange: (e: SelectChangeEvent) => void;
}

const AdminQuizFilter = ({
  keyword, 
  useFlag, 
  difficulty, 
  onSearchChange, 
  onUsageChange, 
  onDifficultyChange
}: AdminQuizFilterProps) => {
  return (
    <Box sx={{ p: 2, bgcolor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E0E0E0", mb: 3 }}>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="관광지 및 퀴즈 제목 검색"
            value={keyword}
            onChange={onSearchChange}
            slotProps={{
              input: {
                startAdornment: <SearchIcon sx={{ color: "gray", mr: 1, fontSize: 18 }} />,
              },
            }}
            sx={{ width: "260px" }}
          />

          <FormControl size="small" sx={{ width: "130px" }}>
            <InputLabel id="usage-status-label">사용 여부</InputLabel>
            <Select 
              labelId="usage-status-label" 
              value={useFlag} 
              label="사용 여부" 
              onChange={onUsageChange}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="active">사용중 (Y)</MenuItem>
              <MenuItem value="inactive">미사용 (N)</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: "130px" }}>
            <InputLabel id="difficulty-label">난이도</InputLabel>
            <Select 
              labelId="difficulty-label" 
              value={difficulty} 
              label="난이도" 
              onChange={onDifficultyChange}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="HIGH">상</MenuItem>
              <MenuItem value="MEDIUM">중</MenuItem>
              <MenuItem value="LOW">하</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
  );
};

export default AdminQuizFilter;