import type { ReactNode } from "react";
import IconButton from "@mui/material/IconButton";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

interface IconCircleButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const IconCircleButton = ({
  icon,
  onClick,
  ariaLabel,
  disabled = false,
  sx,
}: IconCircleButtonProps) => {
  return (
    <IconButton
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      sx={{
        zIndex: 10,
        positon: "absolute",
        bgcolor: "background.paper",
        color: "text.primary",
        border: 1,
        borderColor: "divider",
        boxShadow: 1,
        width: 48,
        height: 48,
        "&:hover": {
          bgcolor: "grey.100",
        },
        ...sx,
      }}
    >
      {icon}
    </IconButton>
  );
};

export default IconCircleButton;
