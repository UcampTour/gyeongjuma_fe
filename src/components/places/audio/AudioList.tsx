import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import { Box, Button, Stack, styled, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { audioPlayer } from "../../../hooks/audio/AudioPlayer";
import { useAudioStore } from "../../../store/audioPlayerStore";
import AudioItem from "./AudioItem";

export interface AudioListProps {
  audioList: any[];
}

const AudioList = ({ audioList }: AudioListProps) => {
  const { t } = useTranslation();
  const { setAudio, setPlaying } = useAudioStore();
  const [hardMode, setHardMode] = useState<boolean>(false);
  const navigate = useNavigate();

  /**
   * 전체듣기
   */
  const handlePlayAll = () => {
    const firstAudio = audioList[0];

    // 1. 재생목록 설정 + 첫 번째 오디오 재생
    audioPlayer.playPlaylist(audioList);

    setAudio({
      title: firstAudio.title,
      imageUrl: firstAudio.imageUrl,
      audioId: firstAudio.audioId,
      placeId: firstAudio.placeId,
    });

    setPlaying(true);

    navigate(`/audio/${firstAudio.placeId}/${firstAudio.audioId}`);
  };
  if (audioList.length === 0) {
    return (
      <Box
        sx={{
          mt: 2,
          px: 3,
          py: 5,
          borderRadius: "24px",
          bgcolor: "#FCFBF8",
          border: "1px dashed #D9CDBD",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <HeadphonesOutlinedIcon
          sx={{
            fontSize: 56,
            color: "#C7B8A3",
            mb: 2,
          }}
        />

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "#5A534A",
            mb: 0.5,
          }}
        >
          {t("places:audio.emptyState.title")}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          {t("places:audio.emptyState.message")}
          <br />
          {t("places:audio.emptyState.message2")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Stack
        direction={"column"}
        sx={{
          mb: 1.5,
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            ml: 0.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.875rem",
            }}
          >
            {t("places:audio.label.story")}
            <Box
              component="span"
              sx={{
                color: "#B04A32",
              }}
            >
              ({audioList.length})
            </Box>
          </Typography>

          {/* <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {hardMode ? "고급 설명" : "쉬운 설명"}
            </Typography>

            <EasyModeSwitch
              checked={hardMode}
              onChange={(e) => setHardMode(e.target.checked)}
            />
          </Stack> */}
        </Stack>
        <Button
          variant="contained"
          fullWidth
          size="medium"
          sx={{
            py: 1,
            px: 0.5,
            borderRadius: "16px",
            // borderRadius: "16px",
            fontWeight: 700,
            fontSize: "0.955rem",
            bgcolor: "#A08E73", // "#2C2C2C",
            boxShadow: "none",
          }}
          disabled={audioList.length === 0}
          onClick={handlePlayAll}
        >
          {t("places:audio.label.playAll")}
        </Button>
      </Stack>

      {audioList.map((item) => (
        <AudioItem key={item.audioId} item={item} />
      ))}
    </Box>
  );
};

const EasyModeSwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 25,
  padding: 0,

  "& .MuiSwitch-switchBase": {
    padding: 2,

    "&.Mui-checked": {
      transform: "translateX(32px)",
      color: "#fff",

      "& + .MuiSwitch-track": {
        backgroundColor: "#7B5A00",
        opacity: 1,
        border: 0,
      },
    },
  },

  "& .MuiSwitch-thumb": {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    boxShadow: "none",
  },

  "& .MuiSwitch-track": {
    borderRadius: 16,
    backgroundColor: "#D9D9D9",
    opacity: 1,
  },
}));

export default AudioList;
