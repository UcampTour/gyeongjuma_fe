import CloseIcon from "@mui/icons-material/Close";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/default_place_img.png";
import { audioPlayer } from "../../hooks/audio/AudioPlayer";
import { useAudioStore } from "../../store/audioPlayerStore";

const AudioMiniPlayer = () => {
  const {
    title,
    imageUrl,
    audioId,
    placeId,
    isPlaying,
    setPlaying,
    showMiniPlayer,
    resetAudio,
  } = useAudioStore();
  const navigate = useNavigate();

  if (!showMiniPlayer || !audioId || !placeId) {
    return null;
  }

  const handlePlayPause = (event: React.MouseEvent) => {
    // 부모 Box의 오디오 상세 페이지 이동 방지
    event.stopPropagation();

    if (!audioPlayer.hasAudio()) {
      return;
    }

    if (audioPlayer.isPlaying()) {
      audioPlayer.pause();
      setPlaying(false);
    } else {
      audioPlayer.resume();
      setPlaying(true);
    }
  };

  const handleNavigate = () => {
    navigate(`/audio/${placeId}/${audioId}`);
  };

  const handlePrevious = () => {
    // 이전 오디오 재생
  };

  const handleNext = () => {
    // 다음 오디오 재생
  };

  /**
   * 미니 플레이어 닫기
   */
  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();

    // 실제 오디오 정지
    audioPlayer.stop();

    // Zustand 상태 초기화
    resetAudio();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        // right: 16,
        bottom: 72, // BottomNavigation 위
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        zIndex: 2000,
        px: 1,
      }}
    >
      <Box
        sx={{
          bgcolor: "#434343b5",
          width: "100%",
          height: "100%",
          borderRadius: 2,
          background: "rgba(60, 60, 60, 0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 2,
        }}
        onClick={handleNavigate}
      >
        {/* 오디오이미지 */}
        <Box
          component="img"
          src={imageUrl || defaultImage}
          alt={title}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            objectFit: "cover",
            flexShrink: 0,
            mr: 2,
          }}
        />
        {/* 오디오 제목 */}
        <Typography
          sx={{
            color: "white",
            fontWeight: 700,
            mr: 2,

            flex: 1,
            minWidth: 0,

            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            flexShrink: 0,
            alignItems: "center",
          }}
        >
          <IconButton sx={{ color: "white" }}>
            <SkipPreviousIcon sx={{ fontSize: 35 }} onClick={handlePrevious} />
          </IconButton>
          {/* 재생버튼 */}
          <IconButton
            sx={{
              // bgcolor: "#8E7249",
              color: "white",
              // boxShadow: 4,
              // "&:hover": {
              //   bgcolor: "#7B6240",
              // },
            }}
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: 35 }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 35 }} />
            )}
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <SkipNextIcon sx={{ fontSize: 35 }} onClick={handleNext} />
          </IconButton>
          {/* 닫기 */}
          <IconButton
            size="small"
            sx={{
              color: "rgba(255,255,255,0.7)",
              ml: 0.5,
              p: 0.5,
            }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default AudioMiniPlayer;
