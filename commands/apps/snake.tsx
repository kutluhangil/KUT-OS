import type { Command } from "@/lib/shell/types";
import { useTerminalStore } from "@/store/useTerminalStore";

export const snakeCommand: Command = {
  name: "snake",
  aliases: ["play snake"],
  description: "play Snake",
  category: "apps",
  handler: () => {
    useTerminalStore.getState().setActiveApp("snake");
    return { type: "noop" };
  },
};
