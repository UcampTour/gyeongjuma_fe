import { InputAdornment, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear"; 
import { useRef } from "react";

interface CommonSearchBarProps {
  placeholder?: string;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const CommonSearchBar = ({ placeholder, keyword, setKeyword }: CommonSearchBarProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setKeyword("")

    if(inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      placeholder={placeholder ?? "검색어를 입력하세요"}
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#8E8576" }} />
            </InputAdornment>
          ),
          endAdornment: keyword && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search text"
                onClick={handleClear} 
                edge="end"
                sx={{ 
                  color: "#B8B0A2", 
                  p: 0.5,
                  "&:hover": { color: "#8E8576" } 
                }}
              >
                <ClearIcon sx={{ fontSize: "18px" }} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        mb: 3,
        "& .MuiOutlinedInput-root": {
          bgcolor: "#FFFFFF",
          borderRadius: "24px",
          height: "46px",
          pl: 2, // 돋보기 아이콘 왼쪽 여백 조정
          pr: 3, // X 버튼 오른쪽 여백 조정
          "& fieldset": { border: "none" }, 
          boxShadow: "0 2px 6px rgba(142,114,73,0.06)"
        }
      }}
    />
  );
};

export default CommonSearchBar;