import type { Command } from "@/lib/shell/types";
import { normalizePath } from "@/lib/fs/filesystem";
import { useTerminalStore } from "@/store/useTerminalStore";

export const vimCommand: Command = {
  name: "vim",
  description: "open a file in vim",
  category: "apps",
  aliases: ["vi", "nvim"],
  handler: (args, _flags, ctx) => {
    const filename = args[0];
    if (!filename) return { type: "error", message: "usage: vim <filename>" };

    const path = normalizePath(filename, ctx.cwd);
    useTerminalStore.getState().setActiveApp("vim:" + path);
    return { type: "text", content: `  opening ${path} in vim...` };
  },
};
