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

// ── Filesystem ────────────────────────────────────────────────
import { lsCommand } from "./fs/ls";
import { cdCommand } from "./fs/cd";
import { catCommand } from "./fs/cat";
import { pwdCommand } from "./fs/pwd";
import { mkdirCommand } from "./fs/mkdir";
import { touchCommand } from "./fs/touch";
import { rmCommand } from "./fs/rm";
import { mvCommand } from "./fs/mv";
import { treeCommand } from "./fs/tree";

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
  lsCommand,
  cdCommand,
  catCommand,
  pwdCommand,
  mkdirCommand,
  touchCommand,
  rmCommand,
  mvCommand,
  treeCommand,
  sudoCommand,
  coffeeCommand,
  hireMeCommand,
].forEach((cmd) => registry.register(cmd));
