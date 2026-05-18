import type { Command } from "@/lib/shell/types";
import { useTerminalStore } from "@/store/useTerminalStore";

export const soundCommand: Command = {
  name: "sound",
  description: "toggle sound effects and music",
  category: "meta",
  completions: (p) =>
    ["on", "off", "effects", "music", "status", "volume"].filter((c) => c.startsWith(p)),
  handler: async (args) => {
    const store = useTerminalStore.getState();
    const sub = args[0]?.toLowerCase();
    const val = args[1]?.toLowerCase();

    if (!sub || sub === "status") {
      const sfx = store.soundEnabled ? "on" : "off";
      const music = store.musicEnabled ? "on" : "off";
      const lines = [
        "",
        "  sound effects : " + sfx,
        "  music         : " + music,
        "  volume        : " + store.volume + "%",
        "",
        "  usage: sound on|off",
        "         sound effects on|off",
        "         sound music on|off",
        "         sound volume <0-100>",
        "",
      ];
      return { type: "text", content: lines.join("\n") };
    }

    if (sub === "on") {
      store.setSoundEnabled(true);
      return { type: "text", content: "  ◉ sound effects on" };
    }

    if (sub === "off") {
      store.setSoundEnabled(false);
      return { type: "text", content: "  ○ sound effects off" };
    }

    if (sub === "effects") {
      if (val === "on") {
        store.setSoundEnabled(true);
        return { type: "text", content: "  ◉ sound effects on" };
      }
      if (val === "off") {
        store.setSoundEnabled(false);
        return { type: "text", content: "  ○ sound effects off" };
      }
      store.setSoundEnabled(!store.soundEnabled);
      return {
        type: "text",
        content: `  ${store.soundEnabled ? "○" : "◉"} sound effects ${store.soundEnabled ? "off" : "on"}`,
      };
    }

    if (sub === "music") {
      if (val === "on") {
        store.setMusicEnabled(true);
        return { type: "text", content: "  ♪ music on" };
      }
      if (val === "off") {
        store.setMusicEnabled(false);
        const { musicPlayer } = await import("@/lib/audio/musicPlayer");
        musicPlayer.pause();
        return { type: "text", content: "  ♪ music off" };
      }
      store.setMusicEnabled(!store.musicEnabled);
      if (store.musicEnabled) {
        const { musicPlayer } = await import("@/lib/audio/musicPlayer");
        musicPlayer.pause();
      }
      return {
        type: "text",
        content: `  ♪ music ${store.musicEnabled ? "off" : "on"}`,
      };
    }

    if (sub === "volume" || sub === "vol") {
      const v = parseInt(args[1] ?? "", 10);
      if (isNaN(v) || v < 0 || v > 100) {
        return { type: "error", message: "usage: sound volume <0-100>" };
      }
      store.setVolume(v);
      return { type: "text", content: `  volume: ${v}%` };
    }

    return { type: "error", message: `sound: unknown option "${args[0]}"` };
  },
};
