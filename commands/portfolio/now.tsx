import type { Command } from "@/lib/shell/types";

const NOW = `
  ── Now ───────────────────────────────────────────────
  (updated: May 2026 · nownownow.com inspired)

  BUILDING ────────────────────────────────────────────

  · KUT/OS — this terminal portfolio
    Full-featured OS-in-a-browser. You're using it.

  · Full stack projects at GoIT
    React, Node.js, TypeScript — shipping real apps.

  LEARNING ────────────────────────────────────────────

  · Advanced React patterns & state management
  · Backend: REST APIs, databases, auth flows
  · TypeScript deep dives
  · Prompt engineering & AI-assisted development

  READING ─────────────────────────────────────────────

  · MDN docs (the real university)
  · Clean Code — Robert C. Martin
  · Hacker News (as always)

  OBSESSING OVER ──────────────────────────────────────

  · Bridging my hospitality UX instincts with code
  · Shipping things that actually work for real people
  · Getting better every day, measurably

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
