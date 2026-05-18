import type { Command } from "@/lib/shell/types";
import { registry } from "@/lib/shell/registry";

const CATEGORY_ORDER: Command["category"][] = ["core", "portfolio", "fs", "apps", "meta"];

const CATEGORY_LABELS: Record<Command["category"], string> = {
  core: "Core",
  portfolio: "Portfolio",
  fs: "Filesystem",
  apps: "Apps & Games",
  meta: "Settings",
  easter: "???",
};

export const helpCommand: Command = {
  name: "help",
  aliases: ["h", "?"],
  description: "show available commands",
  usage: "help [category]",
  category: "core",
  handler: (args) => {
    const filter = args[0] as Command["category"] | undefined;

    const categories = filter ? [filter] : CATEGORY_ORDER;

    const lines: string[] = ["", "  available commands:", ""];

    for (const cat of categories) {
      const cmds = registry.getByCategory(cat).sort((a, b) => a.name.localeCompare(b.name));
      if (cmds.length === 0) continue;

      lines.push(`  ── ${CATEGORY_LABELS[cat]} ──────────────────────`);
      for (const cmd of cmds) {
        const name = cmd.name.padEnd(14);
        const aliases = cmd.aliases?.length ? `(${cmd.aliases.join(", ")}) ` : "";
        lines.push(`  ${name}  ${aliases}${cmd.description}`);
      }
      lines.push("");
    }

    lines.push(
      "  ── Tips ────────────────────────────────",
      "  Tab              autocomplete",
      "  ↑ / ↓            history navigation",
      "  Ctrl+L           clear screen",
      "  Ctrl+C           cancel command",
      ""
    );

    return { type: "text", content: lines.join("\n") };
  },
};
