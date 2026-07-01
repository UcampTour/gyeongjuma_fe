import { Box, Typography } from "@mui/material";

interface CommonStampProps {
  label: string;
}

const CommonStamp = ({ label }: CommonStampProps) => {

  return (
    <Box
      sx={{
        width: "50px",  
        height: "50px", 
        borderRadius: "50%",
        border: "1.5px dashed #8E7249",   
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",         
        backgroundColor: "rgba(255, 255, 255, 0.85)", 
        boxShadow: "inset 0 0 0 1px #8E7249", 
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M0 0h10v1H0zm0 4h10v1H0z' fill='%238E7249' fill-opacity='0.04'/%3E%3C/svg%3E")`,
      }}
    >
      <Box 
        sx={{ 
          border: "1px solid rgba(142, 114, 73, 0.25)", 
          borderRadius: "50%", 
          width: "38px", 
          height: "38px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}
      >
        <Typography sx={{ fontSize: "9px", fontWeight: 900, color: "#8E7249", letterSpacing: "0.1px" }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommonStamp;