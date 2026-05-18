import type { Command } from "@/lib/shell/types";
import { progressBar } from "@/lib/utils/ascii";

interface SkillCategory {
  label: string;
  key: string;
  level: number;
  stack: string;
}

const SKILLS: SkillCategory[] = [
  {
    label: "frontend ",
    key: "frontend",
    level: 95,
    stack: "Next.js · React · TypeScript · Tailwind",
  },
  {
    label: "backend  ",
    key: "backend",
    level: 78,
    stack: "Node.js · Supabase · PostgreSQL · Prisma",
  },
  { label: "devops   ", key: "devops", level: 60, stack: "Docker · Nginx · Cloudflare · Vercel" },
  { label: "mobile   ", key: "mobile", level: 45, stack: "React Native · Expo" },
  { label: "ai / ml  ", key: "ai", level: 72, stack: "Anthropic · OpenAI · LangChain · RAG" },
];

export const skillsCommand: Command = {
  name: "skills",
  aliases: ["stack"],
  description: "tech skills overview",
  category: "portfolio",
  handler: () => {
    const lines = ["", "  ── Skills ───────────────────────────────────────", ""];

    for (const s of SKILLS) {
      const bar = progressBar(s.level, 100, 18);
      lines.push(`  ${s.label}  ${bar}  ${String(s.level).padStart(3)}%  ${s.stack}`);
    }

    lines.push(
      "",
      "  ── Also ─────────────────────────────────────────",
      "",
      "  Design     Figma · shadcn/ui · Framer",
      "  Testing    Vitest · Playwright",
      "  Tooling    Git · pnpm · Turborepo · GitHub Actions",
      ""
    );

    return { type: "text", content: lines.join("\n") };
  },
};
