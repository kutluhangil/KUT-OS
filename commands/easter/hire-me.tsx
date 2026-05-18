import type { Command } from "@/lib/shell/types";

export const hireMeCommand: Command = {
  name: "hire-me",
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => {
    return {
      type: "text",
      content: ["", "  try: sudo hire-me", ""].join("\n"),
    };
  },
};
