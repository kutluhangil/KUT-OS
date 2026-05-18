import type { Command } from "@/lib/shell/types";
import { TRACKS } from "@/lib/audio/tracks";
import { useTerminalStore } from "@/store/useTerminalStore";

export const playCommand: Command = {
  name: "play",
  description: "music player — play/pause/next/prev/list/volume",
  category: "apps",
  aliases: ["music"],
  completions: (p) =>
    ["list", "next", "prev", "pause", "resume", "volume"].filter((c) => c.startsWith(p)),
  handler: async (args) => {
    const sub = args[0]?.toLowerCase();

    if (!sub) {
      useTerminalStore.getState().setActiveApp("music");
      useTerminalStore.getState().setMusicEnabled(true);
      return { type: "text", content: "  ♪ opening music player..." };
    }

    if (sub === "list" || sub === "ls") {
      const lines = [
        "",
        "  ♪ KUT/OS MUSIC PLAYER",
        "  " + "─".repeat(42),
        ...TRACKS.map(
          (t, i) => `  [${String(i + 1).padStart(2, "0")}]  ${t.title.padEnd(24)} ${t.duration}`
        ),
        "",
        "  usage: play <number|title>",
        "         play pause | resume | next | prev",
        "         play volume <0-100>",
        "",
      ];
      return { type: "text", content: lines.join("\n") };
    }

    const { musicPlayer } = await import("@/lib/audio/musicPlayer");

    if (sub === "pause" || sub === "stop") {
      musicPlayer.pause();
      useTerminalStore.getState().setMusicEnabled(false);
      return { type: "text", content: "  ‖ paused" };
    }

    if (sub === "resume") {
      await musicPlayer.play();
      useTerminalStore.getState().setMusicEnabled(true);
      const t = musicPlayer.currentTrack;
      return { type: "text", content: `  ▶ ${t?.title ?? "playing"}` };
    }

    if (sub === "next") {
      await musicPlayer.next();
      const t = musicPlayer.currentTrack;
      return { type: "text", content: `  ▶ next: ${t?.title ?? "—"}` };
    }

    if (sub === "prev") {
      await musicPlayer.prev();
      const t = musicPlayer.currentTrack;
      return { type: "text", content: `  ▶ prev: ${t?.title ?? "—"}` };
    }

    if (sub === "volume" || sub === "vol") {
      const v = parseInt(args[1] ?? "", 10);
      if (isNaN(v) || v < 0 || v > 100) {
        return { type: "error", message: "usage: play volume <0-100>" };
      }
      await musicPlayer.setVolume(v);
      return { type: "text", content: `  volume: ${v}%` };
    }

    // Match by number or title fragment
    const num = parseInt(sub, 10);
    if (!isNaN(num) && num >= 1 && num <= TRACKS.length) {
      await musicPlayer.play(num - 1);
      useTerminalStore.getState().setMusicEnabled(true);
      const t = musicPlayer.currentTrack;
      return { type: "text", content: `  ▶ ${t?.title} — ${t?.artist}` };
    }

    const idx = TRACKS.findIndex((t) => t.title.toLowerCase().includes(sub) || t.id === sub);
    if (idx >= 0) {
      await musicPlayer.play(idx);
      useTerminalStore.getState().setMusicEnabled(true);
      const t = musicPlayer.currentTrack;
      return { type: "text", content: `  ▶ ${t?.title} — ${t?.artist}` };
    }

    return {
      type: "error",
      message: `play: "${args[0]}" not found\ntype "play list" to see available tracks`,
    };
  },
};
