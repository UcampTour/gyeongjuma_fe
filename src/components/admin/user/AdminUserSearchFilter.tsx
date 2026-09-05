import type { SelectChangeEvent } from "@mui/material";
import type { ChangeEvent } from "react";
import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface AdminUserSearchFilterProps {
  keyword: string;
  roleFilter: string;
  useFlag: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRoleFilterChange: (e: SelectChangeEvent) => void;
  onUsageChange: (e: SelectChangeEvent) => void;
}

export const AdminUserSearchFilter = ({
  keyword,
  roleFilter,
  useFlag,
  onSearchChange,
  onRoleFilterChange,
  onUsageChange,
}: AdminUserSearchFilterProps) => {
  return (
    <Box sx={{ p: 2, bgcolor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E0E0E0", mb: 3 }}>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="회원 닉네임 검색"
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
          <InputLabel id="role-label">권한</InputLabel>
          <Select labelId="role-label" value={roleFilter} label="권한" onChange={onRoleFilterChange}>
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
            <MenuItem value="ADMIN">ADMIN</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: "130px" }}>
          <InputLabel id="usage-status-label">상태</InputLabel>
          <Select labelId="usage-status-label" value={useFlag} label="상태" onChange={onUsageChange}>
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="active">활성 (Y)</MenuItem>
            <MenuItem value="inactive">비활성 (N)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};