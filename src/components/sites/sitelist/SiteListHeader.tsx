import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material"

const SiteListHeader = () => {

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, mt: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "22px", color: "#111111" }}>
        경주의 관광지 둘러보기
      </Typography>
      
      <FormControl size="small" sx={{ minWidth: 85 }}>
        <Select
          value="default"
          displayEmpty
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "8px",
            height: "36px",
            fontSize: "13px",
            color: "#555555",
            "& .MuiOutlinedInput-notchedOutline": { border: "1px solid #E3DCCE" },
            fontWeight: 500,
          }}
        >
          <MenuItem value="default">기본순</MenuItem>
          <MenuItem value="likes">인기순</MenuItem>
          <MenuItem value="distance">거리순</MenuItem>
          <MenuItem value="congestion">혼잡도순</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SiteListHeader;