import { create } from "zustand";

interface AudioState {
  title: string;
  imageUrl?: string;
  isPlaying: boolean;
  audioId: number | null;
  placeId: number | null;

  showMiniPlayer: boolean;

  setAudio: (data: {
    title: string;
    imageUrl?: string;
    audioId: number | null;
    placeId: number | null;
  }) => void;

  setPlaying: (value: boolean) => void;
  setShowMiniPlayer: (value: boolean) => void;
  resetAudio: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  title: "",
  imageUrl: "",
  isPlaying: false,
  audioId: null,
  placeId: null,
  showMiniPlayer: false,

  setAudio: (data) =>
    set({
      ...data,
    }),

  setPlaying: (value) =>
    set({
      isPlaying: value,
    }),

  setShowMiniPlayer: (value) =>
    set({
      showMiniPlayer: value,
    }),

  resetAudio: () =>
    set({
      title: "",
      imageUrl: "",
      isPlaying: false,
      audioId: null,
      placeId: null,
      showMiniPlayer: false,
    }),
}));
