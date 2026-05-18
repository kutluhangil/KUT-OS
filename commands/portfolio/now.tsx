import type { Command } from "@/lib/shell/types";

const NOW = `
  ── Now ───────────────────────────────────────────────
  (updated: May 2025 · nownownow.com inspired)

  BUILDING ────────────────────────────────────────────

  · KUT/OS — this terminal portfolio
    Writing blog posts about the build process.
    Planning an open-source release.

  · EntrepreneurLoop — analytics for indie hackers
    Adding cohort analysis and MRR forecasting.

  · ContentForge — AI content repurposing
    Beta testing with 30 early users.

  LEARNING ────────────────────────────────────────────

  · Distribution: how to actually get users
  · RAG systems and knowledge bases
  · Video editing for demo content

  READING ─────────────────────────────────────────────

  · "The Lean Startup" — Eric Ries
  · Hacker News (as always)

  OBSESSING OVER ──────────────────────────────────────

  · Getting the first paying customer faster
  · Reducing time from idea to shipped feature

  ──────────────────────────────────────────────────────
  Run \`projects\` to see what I've shipped.
`;

export const nowCommand: Command = {
  name: "now",
  aliases: ["currently", "status"],
  description: "what i'm working on right now",
  category: "portfolio",
  handler: () => ({ type: "text", content: NOW }),
};
