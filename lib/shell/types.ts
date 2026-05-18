import type { ReactNode, ComponentType } from "react";

export type CommandOutput =
  | { type: "text"; content: string }
  | { type: "react"; content: ReactNode }
  | { type: "app"; component: ComponentType }
  | { type: "error"; message: string }
  | { type: "noop" };

export interface CommandContext {
  cwd: string;
  theme: string;
  commandCount: number;
  secretUnlocked: boolean;
}

export type CommandHandler = (
  args: string[],
  flags: Record<string, string | boolean>,
  ctx: CommandContext
) => CommandOutput | Promise<CommandOutput>;

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  category: "core" | "portfolio" | "fs" | "apps" | "meta" | "easter";
  hidden?: boolean;
  handler: CommandHandler;
  completions?: (partial: string) => string[];
}

export interface ParsedCommand {
  cmd: string;
  args: string[];
  flags: Record<string, string | boolean>;
  raw: string;
}
