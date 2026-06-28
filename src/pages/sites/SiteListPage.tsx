import React from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment, 
  Card, 
  CardContent, 
  Button, 
  Select, 
  MenuItem, 
  FormControl 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

function SiteListPage() {
  return (
    <Box sx={{ p: 2, bgcolor: "#F7F5EE", minHeight: "100vh", pb: 12 }}>

      {/* 검색창 */}
      <TextField
        fullWidth
        placeholder="관광지를 검색해보세요"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#777777" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            bgcolor: "#FFFFFF",
            borderRadius: "24px",
            height: "46px",
            "& fieldset": { border: "none" },
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }
        }}
      />

      {/* 섹션 1: 가까운 관광지 */}
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, fontSize: "18px", color: "#111111" }}>
        가까운 관광지
      </Typography>

      {/* 카드 1 (미달성 예시) */}
      <Card elevation={0} sx={{ display: "flex", mb: 2, borderRadius: "16px", bgcolor: "#FFFFFF", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
        {/* 이미지 더미 영역 */}
        <Box sx={{ width: 110, height: 110, bgcolor: "#EAEAEA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Typography variant="caption" color="text.secondary">No Image</Typography>
        </Box>
        {/* 텍스트 영역 */}
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: "12px !important" }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box>
                <Typography variant="caption" sx={{ color: "#888888", fontSize: "11px", display: "block", lineHeight: 1 }}>Title</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 0.5, color: "#222222" }}>경주 불국사</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <LockIcon sx={{ color: "#A64B4B", fontSize: "20px" }} />
                <Typography variant="caption" sx={{ color: "#A64B4B", fontWeight: "bold", fontSize: "10px" }}>미달성</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: "#666666", fontSize: "12px", mt: 0.5 }}>
              세계문화유산, 불교 사찰
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
            <Button variant="outlined" size="small" sx={{ borderRadius: "8px", borderColor: "#CCCCCC", color: "#333333", fontSize: "11px", py: 0.3, px: 1.5, textTransform: "none", fontWeight: "bold", "&:hover": { borderColor: "#999999", bgcolor: "transparent" } }}>
              상세 정보
            </Button>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#555555", fontSize: "13px" }}>
              5.2 km
            </Typography>
          </Box>
        </CardContent>
      </Card>


      {/* 섹션 2: 전체 관광지 타이틀 + 정렬 셀렉트 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4, mb: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "18px", color: "#111111" }}>
          전체 관광지
        </Typography>
        <FormControl size="small" sx={{ minWidth: 90 }}>
          <Select
            value="default"
            displayEmpty
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "8px",
              height: "32px",
              fontSize: "12px",
              fontWeight: "bold",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
            }}
          >
            <MenuItem value="default">기본순</MenuItem>
            <MenuItem value="distance">거리순</MenuItem>
            <MenuItem value="achieved">달성순</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 카드 2 (미달성 예시) */}
      <Card elevation={0} sx={{ display: "flex", mb: 2, borderRadius: "16px", bgcolor: "#FFFFFF", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
        <Box sx={{ width: 110, height: 110, bgcolor: "#EAEAEA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Typography variant="caption" color="text.secondary">No Image</Typography>
        </Box>
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: "12px !important" }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box>
                <Typography variant="caption" sx={{ color: "#888888", fontSize: "11px", display: "block", lineHeight: 1 }}>Title</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 0.5, color: "#222222" }}>석굴암</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <LockIcon sx={{ color: "#A64B4B", fontSize: "20px" }} />
                <Typography variant="caption" sx={{ color: "#A64B4B", fontWeight: "bold", fontSize: "10px" }}>미달성</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: "#666666", fontSize: "12px", mt: 0.5 }}>
              세계문화유산, 불교 사찰
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
            <Button variant="outlined" size="small" sx={{ borderRadius: "8px", borderColor: "#CCCCCC", color: "#333333", fontSize: "11px", py: 0.3, px: 1.5, textTransform: "none", fontWeight: "bold", "&:hover": { borderColor: "#999999", bgcolor: "transparent" } }}>
              상세 정보
            </Button>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#555555", fontSize: "13px" }}>
              4.8 km
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* 카드 3 (달성 완료 예시) */}
      <Card elevation={0} sx={{ display: "flex", mb: 2, borderRadius: "16px", bgcolor: "#FFFFFF", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
        <Box sx={{ width: 110, height: 110, bgcolor: "#EAEAEA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Typography variant="caption" color="text.secondary">No Image</Typography>
        </Box>
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: "12px !important" }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box>
                <Typography variant="caption" sx={{ color: "#888888", fontSize: "11px", display: "block", lineHeight: 1 }}>description</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 0.5, color: "#222222" }}>안압지</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <LockOpenIcon sx={{ color: "#4E8A4D", fontSize: "20px" }} />
                <Typography variant="caption" sx={{ color: "#4E8A4D", fontWeight: "bold", fontSize: "10px" }}>달성 완료</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: "#666666", fontSize: "12px", mt: 0.5 }}>
              세계문화유산, 불교 사찰
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
            <Button variant="outlined" size="small" sx={{ borderRadius: "8px", borderColor: "#CCCCCC", color: "#333333", fontSize: "11px", py: 0.3, px: 1.5, textTransform: "none", fontWeight: "bold", "&:hover": { borderColor: "#999999", bgcolor: "transparent" } }}>
              상세 정보
            </Button>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#555555", fontSize: "13px" }}>
              1.1 km
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SiteListPage;