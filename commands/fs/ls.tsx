import type { Command } from "@/lib/shell/types";
import { ls } from "@/lib/fs/ops";
import { useTerminalStore } from "@/store/useTerminalStore";

export const lsCommand: Command = {
  name: "ls",
  aliases: ["dir"],
  description: "list directory contents",
  usage: "ls [-a] [-l] [path]",
  category: "fs",
  handler: (args, flags) => {
    const cwd = useTerminalStore.getState().cwd;
    const path = args[0] ?? ".";
    const showHidden = Boolean(flags["a"]);
    const longForm = Boolean(flags["l"]);
    const result = ls(path, cwd, showHidden, longForm);
    if (!result.ok) return { type: "error", message: result.error };
    return { type: "text", content: result.data };
  },
};
