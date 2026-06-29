import { Stack, Chip } from "@mui/material";

export interface TabItem {
  label: string;
  value: string;
}

interface CommonChipTabsProps {
  tabs: TabItem[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const CommonChipTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: CommonChipTabsProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        width: "100%",
        justifyContent: "space-between",
        py: 1,
        pt: 3,
      }}
    >
      {tabs.map((tab, index) => (
        <Chip
          key={tab.value}
          label={tab.label}
          clickable
          onClick={() => setActiveTab(index)}
          sx={{
            borderRadius: "20px",
            width: "100%",
            height: 36,

            border: "1px solid #D6C5A4",

            backgroundColor: activeTab === index ? "#BC9A5D" : "#F4F0E5",

            color: activeTab === index ? "#FFFFFF" : "#49454F",

            "& .MuiChip-label": {
              fontSize: "15px",
              fontWeight: activeTab === index ? 700 : 500,
            },

            "&:hover": {
              backgroundColor: activeTab === index ? "#A8864E" : "#EDE3D5",
            },
          }}
        />
      ))}
    </Stack>
  );
};

export default CommonChipTabs;
