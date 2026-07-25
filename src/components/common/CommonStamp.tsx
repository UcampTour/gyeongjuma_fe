import type { Theme } from "@emotion/react";
import { Box, Typography, type SxProps } from "@mui/material";

interface CommonStampProps {
  label: string;

  // 스탬프 크기
  size?: number;

  // 외부 스타일 override
  sx?: SxProps<Theme>;

  // 색상 변경 가능
  color?: string;

  onClick?: () => void;
}

const CommonStamp = ({
  label,
  size = 50,
  color = "#8E7249",
  sx,
  onClick,
}: CommonStampProps) => {
  const isClickable = Boolean(onClick);

  return (
    <Box
      component={isClickable ? "button" : "div"}
      type={isClickable ? "button" : undefined}
      onClick={onClick}
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.5px dashed ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isClickable ? "pointer" : "default",
        pointerEvents: isClickable ? "auto" : "none",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: `inset 0 0 0 1px ${color}`,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M0 0h10v1H0zm0 4h10v1H0z' fill='%238E7249' fill-opacity='0.04'/%3E%3C/svg%3E")`,
        ...sx,
      }}
    >
      <Box
        sx={{
          border: "1px solid rgba(142, 114, 73, 0.25)",
          borderRadius: "50%",
          width: size * 0.76,
          height: size * 0.76,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: size * 0.18,
            fontWeight: 900,
            color: color,
            letterSpacing: "0.1px",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommonStamp;
