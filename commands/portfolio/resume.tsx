import type { Command } from "@/lib/shell/types";

const RESUME_TEXT = `
  ── Resume ────────────────────────────────────────────

  Kutluhan Gül — Full Stack Developer
  Istanbul, Turkey · kutluhangul@windowslive.com

  EXPERIENCE ──────────────────────────────────────────

  Senior Selling Partner Support Associate
  Amazon · Remote · Aug 2022 – Nov 2024
  · Supported EU marketplace sellers at scale
  · Handled complex technical & account escalations
  · Cross-functional collaboration with global teams

  Guest Service Agent
  Crowne Plaza Istanbul Tuzla · Sep 2021 – Aug 2022
  · Front desk, guest relations, complaint resolution

  Guest Service Agent
  Radisson Blu Istanbul Tuzla · May 2019 – Sep 2021
  · Night audit, reception, concierge services

  Floor / Night Supervisor
  Work & Travel USA · Park City, Utah · 2013 – 2016

  EDUCATION ───────────────────────────────────────────

  GoIT IT School      Full Stack Developer  2025–present
  Anadolu University  Computer Programming  2022–2026
  Anadolu University  Web Coding            2019–2021
  Atilim University   Tourism (Master's)    2017–2019
  Mustafa Kemal Univ  Tourism (Bachelor's)  2009–2014

  SKILLS ──────────────────────────────────────────────

  Frontend:  HTML/CSS · JavaScript · React · Redux · TS
  Backend:   Node.js · REST API · Express
  Tooling:   Git · VSCode · Vercel
  Languages: Turkish (native) · English (C1)

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
        window.open("/documents/Kutluhan_Gul_CV.pdf", "_blank");
      }
      return { type: "text", content: "  opening CV..." };
    }
    return { type: "text", content: RESUME_TEXT };
  },
};
