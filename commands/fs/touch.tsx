import type { Command } from "@/lib/shell/types";
import { touch } from "@/lib/fs/ops";
import { useTerminalStore } from "@/store/useTerminalStore";

export const touchCommand: Command = {
  name: "touch",
  description: "create an empty file",
  usage: "touch <filename>",
  category: "fs",
  handler: (args) => {
    if (!args[0]) return { type: "error", message: "touch: missing filename" };
    const cwd = useTerminalStore.getState().cwd;
    const result = touch(args[0], cwd);
    if (!result.ok) return { type: "error", message: result.error };
    return { type: "noop" };
  },
};
