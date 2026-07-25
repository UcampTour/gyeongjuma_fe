import IconButton from "@mui/material/IconButton";
import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/system";
import type { ReactNode } from "react";

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
        // position: "absolute",
        bgcolor: "background.paper",
        color: "text.primary",
        border: 1,
        borderColor: "divider",
        boxShadow: 1,
        width: 37,
        height: 37,
        "&:hover": {
          bgcolor: "grey.100",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "1rem",
        },
        ...sx,
      }}
    >
      {icon}
    </IconButton>
  );
};

export default IconCircleButton;
