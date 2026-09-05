import { Box, Stack, Typography } from "@mui/material";

export interface InfoBoxProps {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  description?: React.ReactNode | string;
  bgColor?: string;
}
const InfoBox = ({
  label,
  value,
  icon,
  description,
  bgColor,
}: InfoBoxProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
        py: 2,
        backgroundColor: "#F4F0E5", // bgColor ? bgColor : "#F4F0E5",
        height: "100%",
        borderRadius: "15px",
      }}
    >
      <Stack direction="column">
        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            alignItems: "center",
            mb: 1,
          }}
        >
          {icon}
          <Typography
            sx={{
              // width: 80,
              color: "#202020",
              // color: "text.",
              fontWeight: 700,
              fontSize: "0.875rem",
            }}
          >
            {label}
          </Typography>
        </Stack>
        <Typography
          component="div"
          sx={{
            flex: 1,
            fontWeight: 500,
            fontSize: "0.85rem",
            ml: 4,
            mb: 0.5,
          }}
        >
          {value}
        </Typography>
        {description && description}
      </Stack>
    </Box>
  );
};

export default InfoBox;
