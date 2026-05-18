import type { Command } from "@/lib/shell/types";
import { cd } from "@/lib/fs/ops";
import { useTerminalStore } from "@/store/useTerminalStore";

export const cdCommand: Command = {
  name: "cd",
  description: "change working directory",
  usage: "cd [path]",
  category: "fs",
  handler: (args) => {
    const { cwd, setCwd } = useTerminalStore.getState();
    const path = args[0] ?? "~";
    const result = cd(path, cwd);
    if (!result.ok) return { type: "error", message: result.error };
    if (result.newCwd) setCwd(result.newCwd);
    return { type: "noop" };
  },
};
