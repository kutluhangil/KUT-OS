import type { Command } from "@/lib/shell/types";

const TIMELINE = `
  ── Experience ────────────────────────────────────────

  2025 ────●  Full Stack Developer · GoIT Student
            │  Intensive full-stack bootcamp
            │  React, Node.js, TypeScript, REST APIs, Git
            │
  2022 ────●  Senior Selling Partner Support Associate
            │  Amazon · Remote
            │  Aug 2022 – Nov 2024
            │  Supported EU marketplace sellers, resolved
            │  complex account and technical escalations,
            │  worked cross-functionally with global teams
            │
  2021 ────●  Guest Service Agent
            │  Crowne Plaza Istanbul Tuzla
            │  Sep 2021 – Aug 2022
            │  Front desk operations, guest relations,
            │  complaint resolution, team coordination
            │
  2019 ────●  Guest Service Agent
            │  Radisson Blu Istanbul Tuzla
            │  May 2019 – Sep 2021
            │  Night audit, reception management,
            │  concierge services
            │
  2013 ────●  Floor / Night Supervisor
               Work & Travel USA · Park City, Utah
               2013 – 2016 · Hospitality operations

  ── Education ─────────────────────────────────────────

  2025–now  IT School GoIT              Full Stack Developer
  2022–2026 Anadolu University          Computer Programming
  2019–2021 Anadolu University          Web Coding
  2017–2019 Atilim University           Tourism (Master's)
  2009–2014 Mustafa Kemal University    Tourism (Bachelor's)

  ──────────────────────────────────────────────────────

  Languages: Turkish (native) · English (C1)

  Run \`skills\` to see tech stack details.
`;

export const experienceCommand: Command = {
  name: "experience",
  aliases: ["exp", "work-history"],
  description: "career timeline",
  category: "portfolio",
  handler: () => ({ type: "text", content: TIMELINE }),
};
