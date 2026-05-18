import type { Command } from "@/lib/shell/types";
import { getHistoryList } from "@/lib/shell/history";

export const historyCommand: Command = {
  name: "history",
  description: "show command history",
  category: "meta",
  handler: () => {
    const list = getHistoryList();
    if (list.length === 0) {
      return { type: "text", content: "  no commands in history." };
    }
    const lines = list.map((cmd, i) => `  ${String(i + 1).padStart(4)}  ${cmd}`).join("\n");
    return { type: "text", content: lines };
  },
};
