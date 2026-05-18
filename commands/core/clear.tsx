import type { Command } from "@/lib/shell/types";
import { useTerminalStore } from "@/store/useTerminalStore";

let clearCount = 0;
let lastClearTime = 0;

export const clearCommand: Command = {
  name: "clear",
  aliases: ["cls"],
  description: "clear the terminal screen",
  category: "core",
  handler: () => {
    const now = Date.now();
    if (now - lastClearTime < 2000) {
      clearCount++;
    } else {
      clearCount = 1;
    }
    lastClearTime = now;

    useTerminalStore.getState().clearOutput();

    if (clearCount >= 5) {
      clearCount = 0;
      return {
        type: "text",
        content: "  obsessive much?\n",
      };
    }

    return { type: "noop" };
  },
};
