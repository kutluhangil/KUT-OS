import type { Command } from "@/lib/shell/types";
import { mv } from "@/lib/fs/ops";
import { useTerminalStore } from "@/store/useTerminalStore";

export const mvCommand: Command = {
  name: "mv",
  description: "move or rename a file",
  usage: "mv <source> <destination>",
  category: "fs",
  handler: (args) => {
    if (args.length < 2) return { type: "error", message: "mv: missing destination" };
    const cwd = useTerminalStore.getState().cwd;
    const result = mv(args[0], args[1], cwd);
    if (!result.ok) return { type: "error", message: result.error };
    return { type: "noop" };
  },
};
