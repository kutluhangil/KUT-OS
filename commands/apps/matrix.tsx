import type { Command } from "@/lib/shell/types";
import { useTerminalStore } from "@/store/useTerminalStore";

export const matrixCommand: Command = {
  name: "matrix",
  aliases: ["matrix-rain"],
  description: "enter the matrix",
  category: "apps",
  hidden: false,
  handler: () => {
    useTerminalStore.getState().setActiveApp("matrix");
    return { type: "noop" };
  },
};
