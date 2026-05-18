import type { Command } from "@/lib/shell/types";

export const rmRfCommand: Command = {
  name: "rm-rf",
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => {
    // This is just a visual joke — handled in the `rm` command itself
    return { type: "noop" };
  },
};
