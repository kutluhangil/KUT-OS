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
    level: 90,
    stack: "HTML/CSS · JavaScript · React · Redux · TypeScript",
  },
  {
    label: "backend  ",
    key: "backend",
    level: 75,
    stack: "Node.js · REST API · Express",
  },
  { label: "tooling  ", key: "tooling", level: 80, stack: "Git · VSCode · XCode · Vercel" },
  { label: "design   ", key: "design", level: 70, stack: "Clean UI · Figma · Tailwind CSS" },
  {
    label: "ai/vibes ",
    key: "ai",
    level: 85,
    stack: "Prompt Engineering · Vibecoding · Anthropic",
  },
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
      "  ── Languages ─────────────────────────────────────",
      "",
      "  Turkish    Native",
      "  English    C1 — Professional",
      ""
    );

    return { type: "text", content: lines.join("\n") };
  },
};
