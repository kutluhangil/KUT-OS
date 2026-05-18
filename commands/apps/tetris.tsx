import type { Command } from "@/lib/shell/types";
import { useTerminalStore } from "@/store/useTerminalStore";

export const tetrisCommand: Command = {
  name: "tetris",
  description: "play Tetris",
  category: "apps",
  handler: () => {
    useTerminalStore.getState().setActiveApp("tetris");
    return { type: "noop" };
  },
};
