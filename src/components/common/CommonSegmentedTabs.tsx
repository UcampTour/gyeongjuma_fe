import { Box, Typography } from "@mui/material";

export interface SegmentedTabItem<T extends string = string> {
  value: T;
  label: string;
}

interface CommonSegmentedTabsProps<T extends string = string> {
  items: SegmentedTabItem<T>[];
  activeTab: T;
  onChange: (value: T) => void;
}

const CommonSegmentedTabs = <T extends string = string>({
  items,
  activeTab,
  onChange,
}: CommonSegmentedTabsProps<T>) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          bgcolor: "#EBE5D8",
          borderRadius: "999px",
          p: "4px",
          width: "100%",
          boxShadow: "inset 0 2px 4px rgba(142,114,73,0.06)",
        }}
      >
        {items.map((item) => {
          const isActive = activeTab === item.value;

          return (
            <Box
              key={item.value}
              onClick={() => onChange(item.value)}
              sx={{
                flex: 1,
                py: "8px",
                textAlign: "center",
                borderRadius: "999px",
                cursor: "pointer",
                bgcolor: isActive ? "#FFFFFF" : "transparent",
                boxShadow: isActive
                  ? "0 2px 8px rgba(142,114,73,0.12)"
                  : "none",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#2C251E" : "#8C8273",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CommonSegmentedTabs;
