// Web Audio API sound synthesizer — zero file dependencies
import { useTerminalStore } from "@/store/useTerminalStore";

type SFX = "keyClick" | "boot" | "error" | "success" | "notification";

let _ctx: AudioContext | null = null;
let lastClick = 0;
const CLICK_THROTTLE_MS = 80;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!_ctx) {
    _ctx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    )();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType = "sine",
  vol = 0.3,
  delay = 0
): void {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = type;
  osc.frequency.value = freq;
  const t = c.currentTime + delay;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(dur, 0.01));
  osc.start(t);
  osc.stop(t + Math.max(dur, 0.01) + 0.02);
}

const SOUNDS: Record<SFX, (vol: number) => void> = {
  keyClick: (vol) => tone(800, 0.06, "square", vol * 0.12),
  boot: (vol) => {
    [261, 329, 392, 523].forEach((f, i) => tone(f, 0.4, "sine", vol * 0.28, i * 0.12));
  },
  error: (vol) => {
    tone(220, 0.2, "square", vol * 0.22, 0);
    tone(196, 0.25, "square", vol * 0.18, 0.15);
  },
  success: (vol) => {
    tone(523, 0.15, "sine", vol * 0.22, 0);
    tone(659, 0.2, "sine", vol * 0.18, 0.12);
  },
  notification: (vol) => {
    tone(880, 0.12, "sine", vol * 0.22, 0);
    tone(1100, 0.15, "sine", vol * 0.18, 0.08);
  },
};

export const soundbank = {
  play(sfx: SFX): void {
    if (typeof window === "undefined") return;
    const { soundEnabled, volume } = useTerminalStore.getState();
    if (!soundEnabled) return;

    if (sfx === "keyClick") {
      const now = Date.now();
      if (now - lastClick < CLICK_THROTTLE_MS) return;
      lastClick = now;
    }

    SOUNDS[sfx](volume / 100);
  },
};
