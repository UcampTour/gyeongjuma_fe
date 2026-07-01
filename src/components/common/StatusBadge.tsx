import { Box } from "@mui/material";

interface StatusBadgeProps {
  label: string;
  bgcolor?: string;
  color?: string;
}


const StatusBadge = ({ 
  label, 
  bgcolor = "#3F8E72",
  color = "#FFFFFF"
}: StatusBadgeProps) => {

  return (
     <Box sx={{ 
        position: "absolute",
        top: "6px",
        left: "6px",
        bgcolor: bgcolor,
        color: color,
        px: 0.8,
        py: 0.3,
        borderRadius: "6px",
        fontSize: "10px",
        fontWeight: 800,
        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        letterSpacing: "-0.3px",
        lineHeight: 1
      }}>
        {label}
      </Box>
  )
}

export default StatusBadge;