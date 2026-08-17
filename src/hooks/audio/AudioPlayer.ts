import { Howl } from "howler";
import type { AudioItemRes } from "../../models/PlaceModel";

/**
 * { 오디오 플레이어 클래스 }
 * - 싱글톤으로 사용되며, 오디오 재생, 일시정지, 정지 등의 기능을 제공
 * - Howler.js 라이브러리를 사용하여 오디오를 관리
 * - 현재 재생 중인 오디오의 상태를 확인하고, 재생 위치를 가져올 수 있음
 * - 오디오 파일의 URL을 받아 재생 가능
 */
export class AudioPlayer {
  private sound: Howl | null = null;

  private playlist: AudioItemRes[] = []; // 재생할 오디오 목록 (전체 목록 재생 가능하도록 큐로 관리)
  private currentIndex = 0;

  hasAudio() {
    return this.sound !== null;
  }

  /**
   * 플레이리스트의 현재 오디오 재생
   * @returns
   */
  private playCurrent() {
    const current = this.playlist[this.currentIndex];

    if (!current) return;

    this.stop();

    this.sound = new Howl({
      src: [current.audioUrl],
      html5: true,

      onend: () => {
        this.playNext();
      },
    });

    this.sound.play();
  }

  /**
   * 플레이리스트 재생
   * @param list
   */
  playPlaylist(list: AudioItemRes[]) {
    this.playlist = list;
    this.currentIndex = 0;

    this.playCurrent();
  }

  /**
   * 이전 오디오 재생
   */
  playPrevious() {
    if (this.currentIndex === 0) return;

    this.currentIndex--;
    this.playCurrent();
  }

  /**
   * 다음 오디오 재생
   * @returns
   */
  playNext() {
    if (this.currentIndex >= this.playlist.length - 1) {
      return;
    }

    this.currentIndex++;
    this.playCurrent();
  }

  /**
   * 단일 오디오 재생
   * @param url
   */
  play(audio: AudioItemRes) {
    this.stop();

    this.playlist = [audio];
    this.currentIndex = 0;

    this.sound = new Howl({
      src: [audio.audioUrl],
      html5: true,
    });

    this.sound.play();
  }

  /**
   * 특정 인덱스의 오디오 재생
   * @param index
   * @returns
   */
  playAt(index: number) {
    if (index < 0 || index >= this.playlist.length) return;

    this.currentIndex = index;
    this.playCurrent();
  }

  // ===================================
  // 재생 제어
  // ===================================

  /**
   * 일시정지
   */
  pause() {
    this.sound?.pause();
  }

  /**
   * 재생
   */
  resume() {
    this.sound?.play();
  }

  /**
   * 정지
   * - 현재 재생 중인 오디오를 정지하고, 메모리에서 해제
   * - 다음 재생 시 새로 로드하여 재생
   */
  stop() {
    this.sound?.stop();
    this.sound?.unload();
    this.sound = null;
  }

  /**
   * 구간 이동
   */
  seek(seconds: number) {
    this.sound?.seek(seconds);
  }

  /**
   * 재생 중인지 확인
   */
  isPlaying() {
    return this.sound?.playing() ?? false;
  }

  /**
   * 현재 플레이리스트 반환
   */
  getPlaylist() {
    return this.playlist;
  }

  /**
   * 현재 재생 중인 오디오 반환
   * @returns
   */
  getCurrentAudio() {
    return this.playlist[this.currentIndex];
  }

  /**
   * 현재 재생 위치 반환 (초)
   */
  getCurrentTime() {
    return (this.sound?.seek() as number) ?? 0;
  }

  /**
   *  전체 재생 시간 반환 (초)
   */
  getDuration() {
    return this.sound?.duration() ?? 0;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }
}

export const audioPlayer = new AudioPlayer();
