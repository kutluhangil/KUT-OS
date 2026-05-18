import type { Command } from "@/lib/shell/types";

const TIMELINE = `
  ── Experience ────────────────────────────────────────

  2024 ────●  Solo Founder · Multiple SaaS Projects
            │  Built and launched 10+ web products
            │  Full-stack: design → dev → marketing → support
            │  EntrepreneurLoop, NeoRescue, MeetMind, and more
            │
  2022 ────●  Freelance Developer · Various Clients
            │  Web apps for startups across EU & TR
            │  React, Next.js, Node.js, design systems
            │
  2020 ────●  Self-taught Journey Begins
               HTML → CSS → JS → React → TypeScript → everything

  ──────────────────────────────────────────────────────

  Education: Self-taught. The internet is my university.
  Languages: Turkish (native), English (fluent)

  Run \`skills\` to see tech stack details.
`;

export const experienceCommand: Command = {
  name: "experience",
  aliases: ["exp", "work-history"],
  description: "career timeline",
  category: "portfolio",
  handler: () => ({ type: "text", content: TIMELINE }),
};
