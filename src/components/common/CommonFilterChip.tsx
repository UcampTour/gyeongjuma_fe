import { Chip } from "@mui/material";

interface CommonFilterChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const CommonFilterChip = ({
  label,
  selected = false,
  onClick,
  onDelete,
}: CommonFilterChipProps) => {
  return (
    <Chip
      clickable
      label={label}
      onClick={onClick}
      onDelete={selected ? onDelete : undefined}
      // deleteIcon={<CloseIcon sx={{ fontSize: 18 }} />}
      sx={{
        height: 36,
        px: 0.3,
        py: 0.1,
        borderRadius: "18px",
        fontWeight: 400,
        fontSize: 14,

        bgcolor: selected ? "#BC9A5D" : "#FFFFFF",
        color: selected ? "#FFFFFF" : "#8A8A8A",

        border: selected ? "none" : "1px solid #E2E2E2",

        "&:hover": {
          bgcolor: selected ? "#BC9A5D" : "#F8F8F8",
        },

        "& .MuiChip-deleteIcon": {
          color: "#FFFFFF",
          marginLeft: "2px",

          "&:hover": {
            color: "#FFFFFF",
          },
        },
      }}
    />
  );
};

export default CommonFilterChip;
