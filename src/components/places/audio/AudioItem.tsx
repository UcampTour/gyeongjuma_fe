import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { AudioItemRes } from "../../../models/PlaceModel";

export interface AudioItemProps {
  item: AudioItemRes;
}

const AudioItem = ({ item }: AudioItemProps) => {
  const navigate = useNavigate();

  /**
   * 재생시간 포맷 변환
   */
  const formatPlayTime = (seconds: string | number) => {
    const total = Number(seconds);
    const min = Math.floor(total / 60);
    const sec = total % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        // alignItems: "center",
        alignItems: "flex-start",
        gap: 2,
        py: 2,
        cursor: "pointer",
        borderBottom: "1px solid",
        borderColor: "divider",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
      onClick={() => navigate(`/audio/${item.placeId}/${item.audioId}`)}
    >
      {/* 썸네일 */}
      <Box
        component="img"
        src={item.imageUrl}
        alt={item.title}
        sx={{
          width: 70,
          height: 70,
          borderRadius: 2,
          objectFit: "cover",
          flexShrink: 0,
          opacity: 0.8, // 0 ~ 1
        }}
      />

      {/* 내용 */}
      <Stack
        spacing={1}
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </Typography>

        <Typography
          // variant="caption"
          color="text.secondary"
          sx={{
            color: "#818181",
            fontSize: "11px",
            display: "-webkit-box",
            WebkitLineClamp: 1, // 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.5,
          }}
        >
          {item.script}
        </Typography>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <PlayCircleFilledWhiteOutlinedIcon
            sx={{
              fontSize: 18,
              color: "text.secondary",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: "text.secondary",
            }}
          >
            {formatPlayTime(item.playTime)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AudioItem;
