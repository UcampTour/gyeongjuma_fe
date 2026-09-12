import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";

interface CommonSearchBarProps {
  mode?: "input" | "navigate";
  placeholder?: string;
  keyword?: string;
  setKeyword?: (keyword: string) => void;
  onSearch?: () => void;
  onClick?: () => void; // navigate 모드에서 클릭 시 페이지 이동을 위한 함수
}

const CommonSearchBar = ({
  mode = "input",
  placeholder,
  keyword = "",
  setKeyword,
  onSearch,
  onClick,
}: CommonSearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isNavigate = mode === "navigate";

  const handleClear = () => {
    setKeyword?.("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      placeholder={placeholder ?? "검색어를 입력하세요"}
      value={keyword}
      onChange={(e) => setKeyword?.(e.target.value)}
      onClick={isNavigate ? onClick : undefined}
      variant="outlined"
      slotProps={{
        input: {
          readOnly: isNavigate,
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={onSearch} size="small">
                <SearchIcon sx={{ color: "#8E8576" }} />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: !isNavigate && keyword && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search text"
                onClick={handleClear}
                edge="end"
                sx={{
                  color: "#B8B0A2",
                  p: 0.5,
                  "&:hover": { color: "#8E8576" },
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
          boxShadow: "0 2px 6px rgba(142,114,73,0.06)",
        },
      }}
    />
  );
};

export default CommonSearchBar;
