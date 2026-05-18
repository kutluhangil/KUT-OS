import { TRACKS, type Track } from "./tracks";

type OnChange = (track: Track | null) => void;

class MusicPlayer {
  private howl: import("howler").Howl | null = null;
  private currentIndex = 0;
  private _playing = false;
  private _onChange: OnChange | null = null;

  get currentTrack(): Track | null {
    return TRACKS[this.currentIndex] ?? null;
  }

  get playing(): boolean {
    return this._playing;
  }

  onChange(fn: OnChange): void {
    this._onChange = fn;
  }

  private async loadTrack(index: number, autoplay: boolean): Promise<void> {
    if (typeof window === "undefined") return;
    if (this.howl) {
      this.howl.unload();
      this.howl = null;
    }
    const track = TRACKS[index];
    if (!track) return;
    this.currentIndex = index;

    const { Howl } = await import("howler");
    const { useTerminalStore } = await import("@/store/useTerminalStore");
    const { volume } = useTerminalStore.getState();

    this.howl = new Howl({
      src: [track.src],
      volume: volume / 100,
      html5: true,
      onend: () => this.next(),
      onloaderror: () => {
        this._playing = false;
        this._onChange?.(null);
      },
      onplay: () => {
        this._playing = true;
        this._onChange?.(track);
        useTerminalStore.getState().setNowPlaying(track.title);
      },
      onpause: () => {
        this._playing = false;
        useTerminalStore.getState().setNowPlaying(null);
      },
      onstop: () => {
        this._playing = false;
        useTerminalStore.getState().setNowPlaying(null);
      },
    });

    this._onChange?.(track);

    if (autoplay) {
      this.howl.play();
    }
  }

  async play(indexOrId?: number | string): Promise<void> {
    if (indexOrId !== undefined) {
      const idx =
        typeof indexOrId === "number"
          ? indexOrId
          : TRACKS.findIndex((t) => t.id === indexOrId || t.title === indexOrId);
      if (idx >= 0) {
        await this.loadTrack(idx, true);
        return;
      }
    }
    if (!this.howl) {
      await this.loadTrack(this.currentIndex, true);
      return;
    }
    if (!this._playing) {
      this.howl.play();
      this._playing = true;
    }
  }

  pause(): void {
    this.howl?.pause();
    this._playing = false;
  }

  async toggle(): Promise<void> {
    this._playing ? this.pause() : await this.play();
  }

  async next(): Promise<void> {
    const idx = (this.currentIndex + 1) % TRACKS.length;
    await this.loadTrack(idx, this._playing);
  }

  async prev(): Promise<void> {
    const idx = (this.currentIndex - 1 + TRACKS.length) % TRACKS.length;
    await this.loadTrack(idx, this._playing);
  }

  async setVolume(pct: number): Promise<void> {
    const clamped = Math.max(0, Math.min(100, pct));
    this.howl?.volume(clamped / 100);
    const { useTerminalStore } = await import("@/store/useTerminalStore");
    useTerminalStore.getState().setVolume(clamped);
  }
}

export const musicPlayer = new MusicPlayer();
