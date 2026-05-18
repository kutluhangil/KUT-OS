import type { Command } from "@/lib/shell/types";

export const sudoCommand: Command = {
  name: "sudo",
  description: "...",
  category: "easter",
  hidden: true,
  handler: (args) => {
    const subCmd = args.join(" ").toLowerCase();

    if (subCmd === "hire-me" || subCmd === "hire me") {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText("hi@kutluhan.dev");
      }
      return {
        type: "text",
        content: [
          "",
          "  ╔═══════════════════════════════════════╗",
          "  ║  sudo hire-me: ACCESS GRANTED          ║",
          "  ╚═══════════════════════════════════════╝",
          "",
          "  Hi! I'm Kutluhan.",
          "  I build fast, ship often, and obsess over details.",
          "",
          "  Email (copied to clipboard): hi@kutluhan.dev",
          "  LinkedIn: linkedin.com/in/kutluhangil",
          "",
          "  Let's build something great.",
          "",
        ].join("\n"),
      };
    }

    if (subCmd === "make me a sandwich") {
      return { type: "text", content: "  okay." };
    }

    return {
      type: "text",
      content: `  permission denied: nice try.\n  (hint: try \`sudo hire-me\`)`,
    };
  },
};
