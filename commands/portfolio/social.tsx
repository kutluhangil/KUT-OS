import type { Command } from "@/lib/shell/types";

const LINKS = [
  { label: "GitHub    ", url: "github.com/kutluhangil", icon: "⌥" },
  { label: "LinkedIn  ", url: "linkedin.com/in/kutluhangil", icon: "◈" },
  { label: "Portfolio ", url: "kutluhangul.com", icon: "◎" },
  { label: "Email     ", url: "kutluhangul@windowslive.com", icon: "◇" },
];

export const socialCommand: Command = {
  name: "social",
  aliases: ["links"],
  description: "social media links",
  category: "portfolio",
  handler: () => {
    const lines = ["", "  ── Find me ──────────────────────────────────────", ""];
    for (const l of LINKS) {
      lines.push(`  ${l.icon}  ${l.label}  ${l.url}`);
    }
    lines.push("", "  Click any link to open in a new tab.", "");
    return { type: "text", content: lines.join("\n") };
  },
};
