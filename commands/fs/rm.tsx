import type { Command } from "@/lib/shell/types";
import { rm } from "@/lib/fs/ops";
import { useTerminalStore } from "@/store/useTerminalStore";

export const rmCommand: Command = {
  name: "rm",
  description: "remove files or directories",
  usage: "rm [-r] <path>",
  category: "fs",
  handler: (args, flags) => {
    if (!args[0]) return { type: "error", message: "rm: missing path" };
    const cwd = useTerminalStore.getState().cwd;
    const recursive = Boolean(flags["r"]) || Boolean(flags["rf"]) || Boolean(flags["f"]);
    const result = rm(args[0], cwd, recursive);
    if (!result.ok) return { type: "error", message: result.error };

    // Easter egg: rm -rf /
    if (result.isRootNuke) {
      return {
        type: "text",
        content: [
          "",
          "  rm: deleting /bin ........ done",
          "  rm: deleting /etc ........ done",
          "  rm: deleting /home ....... done",
          "  rm: deleting /usr ........ done",
          "  rm: deleting /var ........ done",
          "  rm: deleting everything.. ████████████████ 100%",
          "",
          "  psych! nothing was deleted.",
          "  nice try though.",
          "",
        ].join("\n"),
      };
    }

    return { type: "noop" };
  },
};
