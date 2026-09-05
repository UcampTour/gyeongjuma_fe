import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../assets/default_place_img.png";
import { audioPlayer } from "../../hooks/audio/AudioPlayer";
import { useAudioQuery } from "../../queries/useAudioQuery";
import { useAudioStore } from "../../store/audioPlayerStore";

const AudioDetailPage = () => {
  const { placeId, audioId } = useParams();
  const { setAudio, isPlaying, setPlaying, resetAudio } = useAudioStore();
  const navigate = useNavigate();

  const { data: audioList = [], isLoading: isAudioLoading } = useAudioQuery(
    Number(placeId),
  );

  const audioData = audioList.find(
    (item: any) => item.audioId === Number(audioId),
  );

  const playlist = audioPlayer.getPlaylist();
  const currentAudio = audioPlayer.getCurrentAudio();

  const [isScriptMode, setIsScriptMode] = useState(false); // 스크립트 모드
  const [isListMode, setIsListMode] = useState(false); // 재생 목록

  const [currentTime, setCurrentTime] = useState(0); // 초
  const [duration, setDuration] = useState(0); // 초

  /**
   * 0.5초마다
   * currentTime, duration 및 실제 isPlaying 상태 동기화
   */
  useEffect(() => {
    const timer = setInterval(() => {
      if (audioPlayer.hasAudio()) {
        const current = audioPlayer.getCurrentTime();
        const total = audioPlayer.getDuration();
        const playing = audioPlayer.isPlaying(); // ★ 실제 재생 여부 확인

        setCurrentTime(current);
        setDuration(total);
        setPlaying(playing); // ★ UI 아이콘 상태 동기화
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [setPlaying]);

  useEffect(() => {
    if (!audioData?.audioUrl) return;

    const currentAudio = audioPlayer.getCurrentAudio();

    // 이미 같은 오디오가 재생 중인 경우
    if (currentAudio?.audioId === audioData.audioId && audioPlayer.hasAudio()) {
      const playing = audioPlayer.isPlaying();
      setPlaying(playing);
      return;
    }

    // 새 오디오 재생
    audioPlayer.play(audioData);

    // 현재 오디오 및 재생 상태 저장
    setAudio({
      title: audioData.title,
      imageUrl: audioData.imageUrl,
      audioId: audioData.audioId,
      placeId: audioData.placeId,
    });

    setPlaying(true);
  }, [audioData, setAudio, setPlaying]);

  /**
   * 상세 페이지를 벗어나면 오디오 정리
   */
  // useEffect(() => {
  //   return () => {
  //     audioPlayer.stop();
  //     resetAudio();
  //   };
  // }, [resetAudio]);

  /**
   * 00:00 형식으로 포맷팅
   */
  const formatPlayTime = (seconds?: string | number) => {
    const totalSeconds = Number(seconds ?? 0);

    const minutes = Math.floor(totalSeconds / 60);
    const remainSeconds = Math.floor(totalSeconds % 60);

    return `${minutes}:${String(remainSeconds).padStart(2, "0")}`;
  };

  /**
   * 일시정지
   */
  const handlePlayPause = () => {
    if (!audioData?.audioUrl) return;

    if (!audioPlayer.hasAudio()) {
      audioPlayer.play(audioData);

      setAudio({
        title: audioData.title,
        imageUrl: audioData.imageUrl,
        audioId: audioData.audioId,
        placeId: audioData.placeId,
      });

      setPlaying(true);

      return;
    }

    if (audioPlayer.isPlaying()) {
      audioPlayer.pause();

      // setIsPlaying(false);
      setPlaying(false);
    } else {
      audioPlayer.resume();

      // setIsPlaying(true);
      setPlaying(true);
    }
  };

  /**
   * 원하는 구간으로 이동
   */
  const handleSeek = (_: Event, value: number | number[]) => {
    const seconds = Array.isArray(value) ? value[0] : value;

    audioPlayer.seek(seconds);
    setCurrentTime(seconds);
  };

  const formatScript = (script?: string) => {
    if (!script) return "";

    return script.replace(/\.\s*/g, ".\n\n");
  };

  /**
   * 스크립트 모드, 재생목록 모드 전환
   */
  const handleScriptMode = () => {
    setIsScriptMode((prev) => !prev);
    setIsListMode(false);
  };

  const handleListMode = () => {
    setIsListMode((prev) => !prev);
    setIsScriptMode(false);
  };

  /**
   * 다음 오디오 재생
   */
  const handleNext = () => {
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
    // setIsPlaying(true);

    navigate(`/audio/${nextAudio.placeId}/${nextAudio.audioId}`, {
      replace: true,
    });
  };

  /**
   * 이전 오디오 재생
   */
  const handlePrevious = () => {
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
    // setIsPlaying(true);

    navigate(`/audio/${previousAudio.placeId}/${previousAudio.audioId}`, {
      replace: true,
    });
  };

  return (
    <Stack
      sx={{
        height: "100vh",
        bgcolor: "#8A8782",
        color: "white",
        display: "flex",
        flexDirection: "column",
        px: 4,
        pt: 3,
        pb: 15,
      }}
    >
      {/* 상단 */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          px: 1,
          pb: 4,
          alignItems: "center",
          // justifyContent: "space-between"
          justifyContent: "flex-end",
        }}
      >
        <IconButton sx={{ color: "white" }} onClick={() => navigate(-1)}>
          <ExpandMoreIcon fontSize="large" />
        </IconButton>
      </Stack>

      {/* 가운데 */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:
            isScriptMode || isListMode ? "flex-start" : "space-around",
          px: 3,
        }}
      >
        <Stack
          direction={isScriptMode || isListMode ? "row" : "column"}
          sx={{
            width: "100%",
            flexShrink: 0,
          }}
          spacing={isScriptMode || isListMode ? 2 : 0}
          onClick={() => setIsScriptMode(!isScriptMode)}
        >
          {/* 이미지 */}
          <Box
            component="img"
            src={audioData?.imageUrl ?? defaultImage}
            sx={{
              width: isScriptMode || isListMode ? "20%" : "100%",
              height: isScriptMode || isListMode ? "auto" : 280,
              borderRadius: 1,
              objectFit: "cover",
              aspectRatio: "1 / 1",
            }}
          />

          {/* 제목 */}
          <Stack
            sx={{
              width: "100%",
              mt: 4,
              textAlign: "left",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: isScriptMode || isListMode ? "0.875rem" : "1.3rem",
              }}
            >
              {audioData?.title}
            </Typography>

            <Typography
              sx={{
                fontSize: isScriptMode || isListMode ? "1.25rem" : "1.5rem",
                fontWeight: 600,
              }}
            >
              {audioData?.title}
            </Typography>
          </Stack>
        </Stack>

        {/* 스크립트 모드 */}
        {isScriptMode && (
          <Box
            sx={{
              mt: 3,
              width: "100%",
              flex: 1,
              overflowY: "auto",
              minHeight: 0,
              whiteSpace: "pre-line",
              pr: 1,
            }}
            onClick={() => setIsScriptMode(!isScriptMode)}
          >
            {formatScript(audioData?.script)}
          </Box>
        )}
        {/* 재생목록 모드 */}
        {isListMode && (
          <Box
            sx={{
              mt: 3,
              width: "100%",
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              pr: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 700,
                mb: 2,
              }}
            >
              재생 목록
            </Typography>

            <Stack spacing={1}>
              {playlist.map((audio, index) => {
                const isCurrent = currentAudio?.audioId === audio.audioId;

                return (
                  <Box
                    key={audio.audioId}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1,
                      borderRadius: 2,
                      bgcolor: isCurrent
                        ? "rgba(255,255,255,0.18)"
                        : "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const selectedAudio = playlist[index];

                      audioPlayer.playAt(index);

                      setAudio({
                        title: selectedAudio.title,
                        imageUrl: selectedAudio.imageUrl,
                        audioId: selectedAudio.audioId,
                        placeId: selectedAudio.placeId,
                      });

                      setPlaying(true);
                      // setIsPlaying(true);
                    }}
                  >
                    <Typography
                      sx={{
                        width: 24,
                        fontSize: "0.8rem",
                        opacity: 0.7,
                      }}
                    >
                      {index + 1}
                    </Typography>

                    <Box
                      component="img"
                      src={audio.imageUrl ?? defaultImage}
                      alt={audio.title}
                      sx={{
                        width: 45,
                        height: 45,
                        borderRadius: 1.5,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      sx={{
                        flex: 1,
                        fontSize: "0.9rem",
                        fontWeight: isCurrent ? 700 : 500,
                      }}
                    >
                      {audio.title}
                    </Typography>

                    {isCurrent && (
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        재생 중
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* 재생바 */}
        <Box sx={{ mt: 2, width: "100%" }}>
          <Slider
            value={currentTime}
            min={0}
            max={duration || 0}
            onChange={handleSeek}
            sx={{
              color: "white",
              height: 6,

              "& .MuiSlider-thumb": {
                width: 14,
                height: 14,
              },

              "& .MuiSlider-rail": {
                opacity: 0.3,
              },

              "& .MuiSlider-track": {
                border: "none",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>{formatPlayTime(currentTime)}</Typography>
            <Typography>{formatPlayTime(duration)}</Typography>
          </Box>
          {/* 플레이 버튼 */}
          <Stack
            direction="row"
            spacing={5}
            sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
          >
            <IconButton sx={{ color: "white" }}>
              <SkipPreviousIcon
                sx={{ fontSize: 40 }}
                onClick={handlePrevious}
              />
            </IconButton>

            <IconButton sx={{ color: "white" }} onClick={handlePlayPause}>
              {isPlaying ? (
                <PauseIcon sx={{ fontSize: 40 }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 40 }} />
              )}
            </IconButton>

            <IconButton sx={{ color: "white" }}>
              <SkipNextIcon sx={{ fontSize: 40 }} onClick={handleNext} />
            </IconButton>
          </Stack>
        </Box>

        {/* 스크립트, 재생목록 버튼 */}
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <IconButton
            onClick={handleScriptMode}
            sx={{
              color: isScriptMode ? "white" : "rgba(255,255,255,0.5)",
            }}
          >
            <MenuBookOutlinedIcon />
          </IconButton>

          <IconButton
            onClick={handleListMode}
            sx={{
              color: isListMode ? "white" : "rgba(255,255,255,0.5)",
            }}
          >
            <FormatListBulletedIcon />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AudioDetailPage;
