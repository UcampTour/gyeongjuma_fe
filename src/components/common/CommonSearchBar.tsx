import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";

interface CommonSearchBarProps {
  placeholder?: string;
}

const CommonSearchBar = ({ placeholder}: CommonSearchBarProps) => {
  return (
    <TextField
        fullWidth
        placeholder={placeholder ?? "검색어를 입력하세요"}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#8E8576" }} />
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
            "& fieldset": { border: "none" }, 
            boxShadow: "0 2px 6px rgba(142,114,73,0.06)"
          }
        }}
      />
  )
}

export default CommonSearchBar;