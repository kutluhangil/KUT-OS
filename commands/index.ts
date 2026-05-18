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
import { soundCommand } from "./meta/sound";

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

// ── Portfolio ─────────────────────────────────────────────────
import { aboutCommand } from "./portfolio/about";
import { projectsCommand } from "./portfolio/projects";
import { experienceCommand } from "./portfolio/experience";
import { skillsCommand } from "./portfolio/skills";
import { contactCommand } from "./portfolio/contact";
import { socialCommand } from "./portfolio/social";
import { resumeCommand } from "./portfolio/resume";
import { nowCommand } from "./portfolio/now";

// ── Apps ──────────────────────────────────────────────────────
import { matrixCommand } from "./apps/matrix";
import { snakeCommand } from "./apps/snake";
import { tetrisCommand } from "./apps/tetris";
import { playCommand } from "./apps/play";

// ── Easter ────────────────────────────────────────────────────
import { sudoCommand } from "./easter/sudo";
import { coffeeCommand } from "./easter/coffee";
import { hireMeCommand } from "./easter/hire-me";
import {
  fortuneCommand,
  cowsayCommand,
  hackCommand,
  fortyTwoCommand,
  xyzzyCommand,
  vimExitCommand,
  exitCommand,
  nightModeCommand,
  secretCommand,
  makeCommand,
  weatherCommand,
  factoryResetCommand,
} from "./easter/all-eggs";

// Register all commands
[
  helpCommand,
  clearCommand,
  echoCommand,
  whoamiCommand,
  historyCommand,
  themeCommand,
  shareCommand,
  soundCommand,
  lsCommand,
  cdCommand,
  catCommand,
  pwdCommand,
  mkdirCommand,
  touchCommand,
  rmCommand,
  mvCommand,
  treeCommand,
  aboutCommand,
  projectsCommand,
  experienceCommand,
  skillsCommand,
  contactCommand,
  socialCommand,
  resumeCommand,
  nowCommand,
  matrixCommand,
  snakeCommand,
  tetrisCommand,
  playCommand,
  sudoCommand,
  coffeeCommand,
  hireMeCommand,
  fortuneCommand,
  cowsayCommand,
  hackCommand,
  fortyTwoCommand,
  xyzzyCommand,
  vimExitCommand,
  exitCommand,
  nightModeCommand,
  secretCommand,
  makeCommand,
  weatherCommand,
  factoryResetCommand,
].forEach((cmd) => registry.register(cmd));
