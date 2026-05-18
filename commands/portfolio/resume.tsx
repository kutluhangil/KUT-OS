import type { Command } from "@/lib/shell/types";

const RESUME_TEXT = `
  ── Resume ────────────────────────────────────────────

  Kutluhan Gil — Solo Developer & SaaS Builder

  EXPERIENCE ──────────────────────────────────────────

  Solo Founder (2024 – present)
  · 10+ web products shipped
  · Full-stack: design → dev → marketing
  · Stack: Next.js, TypeScript, Supabase, Stripe

  Freelance Developer (2022 – 2024)
  · Web applications for EU/TR startups
  · React, Next.js, Node.js, design systems

  OPEN SOURCE ─────────────────────────────────────────

  · Obsidian Dex — 180+ GitHub stars
  · KUT/OS — this terminal portfolio

  SKILLS ──────────────────────────────────────────────

  Frontend: Next.js, React, TypeScript, Tailwind (95%)
  Backend:  Node.js, Supabase, PostgreSQL (78%)
  AI:       Anthropic, OpenAI, LangChain (72%)

  ──────────────────────────────────────────────────────

  For full PDF: resume --download
`;

export const resumeCommand: Command = {
  name: "resume",
  aliases: ["cv"],
  description: "view or download resume",
  usage: "resume [--download]",
  category: "portfolio",
  handler: (_, flags) => {
    if (flags["download"] || flags["d"]) {
      if (typeof window !== "undefined") {
        window.open("/resume.pdf", "_blank");
      }
      return { type: "text", content: "  opening resume.pdf..." };
    }
    return { type: "text", content: RESUME_TEXT };
  },
};
