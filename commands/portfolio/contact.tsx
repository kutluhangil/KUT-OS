import type { Command } from "@/lib/shell/types";

const CONTACT = `
  ── Contact ───────────────────────────────────────────

  Email     hi@kutluhan.dev
  GitHub    github.com/kutluhangil
  LinkedIn  linkedin.com/in/kutluhangil
  Twitter   @kutluhangil

  ──────────────────────────────────────────────────────

  The fastest way: email. I read everything.
  Response time: usually < 24h.

  For work inquiries: hi@kutluhan.dev
  For open source:    GitHub issues / PRs
`;

export const contactCommand: Command = {
  name: "contact",
  aliases: ["reach", "email"],
  description: "contact information",
  category: "portfolio",
  handler: (_, flags) => {
    if (flags["copy"] || flags["c"]) {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText("hi@kutluhan.dev");
        return { type: "text", content: "  email copied to clipboard: hi@kutluhan.dev" };
      }
    }
    return { type: "text", content: CONTACT };
  },
};
