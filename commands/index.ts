import { registry } from "@/lib/shell/registry";

// ── Core ──────────────────────────────────────────────────────
import { helpCommand } from "./core/help";
import { clearCommand } from "./core/clear";
import { echoCommand } from "./core/echo";
import { whoamiCommand } from "./core/whoami";

// ── Meta ──────────────────────────────────────────────────────
import { historyCommand } from "./meta/history";
import { themeCommand } from "./meta/theme";
import { shareCommand } from "./meta/share";

// ── Easter ────────────────────────────────────────────────────
import { sudoCommand } from "./easter/sudo";
import { coffeeCommand } from "./easter/coffee";
import { hireMeCommand } from "./easter/hire-me";

// Register all commands
[
  helpCommand,
  clearCommand,
  echoCommand,
  whoamiCommand,
  historyCommand,
  themeCommand,
  shareCommand,
  sudoCommand,
  coffeeCommand,
  hireMeCommand,
].forEach((cmd) => registry.register(cmd));
