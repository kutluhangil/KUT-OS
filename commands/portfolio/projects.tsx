import type { Command } from "@/lib/shell/types";
import projectsData from "@/content/projects.json";

interface Project {
  name: string;
  slug: string;
  description: string;
  stack: string[];
  type: string;
  year: number;
  status: string;
  url?: string;
}

const projects = projectsData as Project[];

const STATUS_COLOR: Record<string, string> = {
  active: "✦",
  shipped: "✓",
  wip: "◌",
};

function renderProject(p: Project): string {
  const status = STATUS_COLOR[p.status] ?? "·";
  const stack = p.stack.join(" · ");
  const url = p.url ? `\n    ↗ ${p.url}` : "";
  return [
    `  ${status} ${p.name.padEnd(22)} [${p.type}] ${p.year}`,
    `    ${p.description}`,
    `    ${stack}${url}`,
  ].join("\n");
}

function renderAll(list: Project[]): string {
  const lines: string[] = [
    "",
    "  ── Projects ────────────────────────────────────",
    "  ✦ active  ✓ shipped  ◌ wip",
    "",
  ];
  for (const p of list) {
    lines.push(renderProject(p));
    lines.push("");
  }
  lines.push(`  ${list.length} projects total. Run \`projects <name>\` for details.`);
  lines.push("");
  return lines.join("\n");
}

export const projectsCommand: Command = {
  name: "projects",
  aliases: ["work", "portfolio"],
  description: "list my projects",
  usage: "projects [--type=saas|open-source|game] [--year=N] [<name>]",
  category: "portfolio",
  handler: (args, flags) => {
    // Detail view
    if (args[0]) {
      const slug = args[0].toLowerCase();
      const found = projects.find((p) => p.slug === slug || p.name.toLowerCase() === slug);
      if (!found) {
        return {
          type: "text",
          content: `  project "${args[0]}" not found.\n  run \`projects\` to see all.`,
        };
      }

      const lines = [
        "",
        `  ── ${found.name} ──────────────────────────────`,
        "",
        `  ${found.description}`,
        "",
        `  Type:    ${found.type}`,
        `  Year:    ${found.year}`,
        `  Status:  ${found.status}`,
        `  Stack:   ${found.stack.join(", ")}`,
      ];
      if (found.url) lines.push(`  URL:     ${found.url}`);
      lines.push("");
      return { type: "text", content: lines.join("\n") };
    }

    // Filter
    let list = [...projects];
    if (flags["type"]) {
      list = list.filter((p) => p.type === flags["type"]);
    }
    if (flags["year"]) {
      list = list.filter((p) => p.year === Number(flags["year"]));
    }
    if (flags["status"]) {
      list = list.filter((p) => p.status === flags["status"]);
    }

    return { type: "text", content: renderAll(list) };
  },
};
