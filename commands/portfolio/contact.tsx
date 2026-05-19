import type { Command } from "@/lib/shell/types";

const CONTACT = `
  ── Contact ───────────────────────────────────────────

  Email     kutluhangul@windowslive.com
  Phone     +90 (506) 246 10 33
  GitHub    github.com/kutluhangil
  LinkedIn  linkedin.com/in/kutluhangil

  ──────────────────────────────────────────────────────

  The fastest way: email. I read everything.
  Response time: usually < 24h.

  For work inquiries: kutluhangul@windowslive.com
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
        navigator.clipboard.writeText("kutluhangul@windowslive.com");
        return {
          type: "text",
          content: "  email copied to clipboard: kutluhangul@windowslive.com",
        };
      }
    }
    return { type: "text", content: CONTACT };
  },
};
