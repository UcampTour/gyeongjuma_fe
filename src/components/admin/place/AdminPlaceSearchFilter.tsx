import type { ChangeEvent } from "react";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { SelectChangeEvent } from "@mui/material";

interface AdminPlaceSearchFilterProps {
  keyword: string;
  languageFilter: string;
  useFlag: string;
  onKeywordChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onLanguageChange: (e: SelectChangeEvent) => void;
  onUsageChange: (e: SelectChangeEvent) => void;
}

export const AdminPlaceSearchFilter = ({
  keyword,
  languageFilter,
  useFlag,
  onKeywordChange,
  onLanguageChange,
  onUsageChange,
}: AdminPlaceSearchFilterProps) => {
  return (
    <Box sx={{ p: 2, bgcolor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E0E0E0", mb: 3 }}>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="관광지 이름 검색"
          value={keyword}
          onChange={onKeywordChange}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ color: "gray", mr: 1, fontSize: 18 }} />,
            },
          }}
          sx={{ width: "200px" }}
        />

        <FormControl size="small" sx={{ width: "130px" }}>
          <InputLabel id="language-filter-label">언어</InputLabel>
          <Select 
            labelId="language-filter-label" 
            value={languageFilter} 
            label="언어" 
            onChange={onLanguageChange}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="ko">한국어</MenuItem>
            <MenuItem value="en">영어</MenuItem>
            <MenuItem value="ja">일본어</MenuItem>
            <MenuItem value="zh">중국어</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: "120px" }}>
          <InputLabel id="usage-status-label">사용 여부</InputLabel>
          <Select 
            labelId="usage-status-label" 
            value={useFlag} 
            label="사용 여부" 
            onChange={onUsageChange}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="active">활성 (Y)</MenuItem>
            <MenuItem value="inactive">비활성 (N)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};