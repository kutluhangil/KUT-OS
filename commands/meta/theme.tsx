import type { Command } from "@/lib/shell/types";
import { useTerminalStore } from "@/store/useTerminalStore";
import { applyTheme } from "@/lib/themes/apply";
import type { Theme } from "@/store/useTerminalStore";

const VALID_THEMES: Theme[] = ["minimal", "cyberpunk", "mainframe"];

export const themeCommand: Command = {
  name: "theme",
  description: "switch terminal theme",
  usage: "theme <minimal|cyberpunk|mainframe>",
  category: "meta",
  completions: (partial) => VALID_THEMES.filter((t) => t.startsWith(partial)),
  handler: (args) => {
    const themeName = args[0] as Theme | string;

    if (themeName === "rainbow") {
      return {
        type: "text",
        content: "  [[31mr[32ma[33mi[34mn[35mb[36mo[37mw[0m] nice try. back to minimal.",
      };
    }

    if (!themeName || !VALID_THEMES.includes(themeName as Theme)) {
      const current = useTerminalStore.getState().theme;
      return {
        type: "text",
        content: [
          `  current theme: ${current}`,
          `  available: ${VALID_THEMES.join(", ")}`,
          `  usage: theme <name>`,
        ].join("\n"),
      };
    }

    useTerminalStore.getState().setTheme(themeName as Theme);
    applyTheme(themeName as Theme);
    return {
      type: "text",
      content: `  theme switched to: ${themeName}`,
    };
  },
};
