import type { Command } from "@/lib/shell/types";
import { useTerminalStore } from "@/store/useTerminalStore";

export const pwdCommand: Command = {
  name: "pwd",
  description: "print working directory",
  category: "fs",
  handler: () => {
    const cwd = useTerminalStore.getState().cwd;
    return { type: "text", content: "  " + cwd };
  },
};
