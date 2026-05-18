import type { Command } from "@/lib/shell/types";

export const echoCommand: Command = {
  name: "echo",
  description: "print text to the terminal",
  usage: "echo <text>",
  category: "core",
  handler: (args) => {
    return { type: "text", content: args.join(" ") };
  },
};
