import { Box, Paper, Stack, Typography } from "@mui/material";

type LegendItem = {
  label: string;
  value?: any;
  color: string;
  count: number | string;
};

export interface MapLegendConfig {
  title: string | undefined;
  items: LegendItem[];
}

export interface MapLegendProps {
  config: MapLegendConfig;
  onClick?: () => void;
}
const MapLegend = ({ config, onClick }: MapLegendProps) => {
  return (
    <Paper
      elevation={3}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick();
        }
      }}
      sx={{
        width: 140,
        position: "absolute",
        // right: 16,
        bottom: 16,
        px: 1.5,
        py: 1,
        cursor: onClick ? "pointer" : "default",
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.95)",
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, mb: 0.8, display: "block" }}
      >
        {config.title ?? ""}
      </Typography>

      <Stack spacing={0.75}>
        {config.items.map((item) => (
          <Stack
            key={item.label}
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: item.color,
                flexShrink: 0,
              }}
            />

            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "space-between",
              }}
            >
              <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
                {item.label}
              </Typography>
              <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
                {item.count}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default MapLegend;
