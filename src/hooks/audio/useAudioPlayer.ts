// 오디오 플레이어 훅
import { useMemo } from "react";
import { audioPlayer } from "./AudioPlayer";

export const useAudioPlayer = () => {
  return useMemo(() => audioPlayer, []);
};
