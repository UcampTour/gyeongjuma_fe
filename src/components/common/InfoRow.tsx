import { Box, Stack, Typography } from "@mui/material";

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
    {icon}

    <Typography
      sx={{
        width: 80,
        color: "text.secondary",
        fontWeight: 700,
        fontSize: "0.975rem",
      }}
    >
      {label}
    </Typography>

    <Box
      sx={{
        flex: 1,
        fontWeight: 400,
        fontSize: "0.9rem",
      }}
    >
      {value}
    </Box>
  </Stack>
);

export default InfoRow;
