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
    setAudio,
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

  const handlePrevious = (event: React.MouseEvent) => {
    event.stopPropagation();

    audioPlayer.playPrevious();

    const previousAudio = audioPlayer.getCurrentAudio();

    if (!previousAudio) return;

    setAudio({
      title: previousAudio.title,
      imageUrl: previousAudio.imageUrl,
      audioId: previousAudio.audioId,
      placeId: previousAudio.placeId,
    });

    setPlaying(true);

    navigate(`/audio/${previousAudio.placeId}/${previousAudio.audioId}`, {
      replace: true,
    });
  };

  const handleNext = (event: React.MouseEvent) => {
    event.stopPropagation();

    audioPlayer.playNext();

    const nextAudio = audioPlayer.getCurrentAudio();

    if (!nextAudio) return;

    setAudio({
      title: nextAudio.title,
      imageUrl: nextAudio.imageUrl,
      audioId: nextAudio.audioId,
      placeId: nextAudio.placeId,
    });

    setPlaying(true);

    navigate(`/audio/${nextAudio.placeId}/${nextAudio.audioId}`, {
      replace: true,
    });
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
        maxWidth: "444px",
        // right: 16,
        bottom: 8, // BottomNavigation 위
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        zIndex: 2000,
        px: 1,
      }}
    >
      <Box
        sx={{
          bgcolor: "#434343b5",
          width: "100%",
          height: "100%",
          borderRadius: 5,
          background: "rgba(60, 60, 60, 0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 3,
        }}
        onClick={handleNavigate}
      >
        {/* 오디오이미지 */}
        <Box
          component="img"
          src={imageUrl || defaultImage}
          alt={title}
          sx={{
            width: 45,
            height: 45,
            borderRadius: 3,
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
          <IconButton sx={{ color: "white" }} onClick={handlePrevious}>
            <SkipPreviousIcon sx={{ fontSize: 35 }} />
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
          <IconButton sx={{ color: "white" }} onClick={handleNext}>
            <SkipNextIcon sx={{ fontSize: 35 }} />
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
