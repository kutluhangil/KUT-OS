import type { Command } from "@/lib/shell/types";
import { tree } from "@/lib/fs/ops";
import { useTerminalStore } from "@/store/useTerminalStore";

export const treeCommand: Command = {
  name: "tree",
  description: "display directory tree",
  usage: "tree [path]",
  category: "fs",
  handler: (args) => {
    const cwd = useTerminalStore.getState().cwd;
    const path = args[0] ?? ".";
    const result = tree(path, cwd);
    if (!result.ok) return { type: "error", message: result.error };
    return { type: "text", content: result.data };
  },
};
