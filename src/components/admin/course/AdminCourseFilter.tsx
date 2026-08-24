import React from "react";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface AdminCourseFilterProps {
  filter: {
    keyword: string;
    courseType: string;
    useFlag: string;
  };
  setFilter: React.Dispatch<React.SetStateAction<{
    keyword: string;
    courseType: string;
    useFlag: string;
  }>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const AdminCourseFilter: React.FC<AdminCourseFilterProps> = ({ filter, setFilter, setPage }) => {
  return (
    <Box sx={{ p: 2, bgcolor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E0E0E0", mb: 3 }}>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="코스명 및 설명 검색"
          value={filter.keyword}
          onChange={(e) => { setFilter((prev) => ({ ...prev, keyword: e.target.value })); setPage(0); }}
          slotProps={{
            input: { startAdornment: <SearchIcon sx={{ color: "gray", mr: 1, fontSize: 18 }} /> },
          }}
          sx={{ width: "260px" }}
        />

        <FormControl size="small" sx={{ width: "130px" }}>
          <InputLabel>유형</InputLabel>
          <Select 
            value={filter.courseType} 
            label="유형" 
            onChange={(e) => { setFilter((prev) => ({ ...prev, courseType: e.target.value })); setPage(0); }}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="WALK">도보</MenuItem>
            <MenuItem value="PUBLIC">대중교통</MenuItem>
            <MenuItem value="DRIVE">운전</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: "130px" }}>
          <InputLabel>사용 여부</InputLabel>
          <Select 
            value={filter.useFlag} 
            label="사용 여부" 
            onChange={(e) => { setFilter((prev) => ({ ...prev, useFlag: e.target.value })); setPage(0); }}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="active">사용중 (Y)</MenuItem>
            <MenuItem value="inactive">미사용 (N)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};