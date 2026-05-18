import { registry } from "./registry";
import { parseCommand } from "./parser";
import { pushToHistory } from "./history";
import { useTerminalStore } from "@/store/useTerminalStore";
import type { CommandOutput, CommandContext } from "./types";

export interface ExecuteResult {
  output: CommandOutput;
  raw: string;
}

let abortController: AbortController | null = null;

export async function executeCommand(raw: string): Promise<ExecuteResult> {
  const trimmed = raw.trim();
  if (!trimmed) return { output: { type: "noop" }, raw };

  pushToHistory(trimmed);

  const store = useTerminalStore.getState();
  store.incrementCommandCount();

  const parsed = parseCommand(trimmed);
  if (!parsed.cmd) return { output: { type: "noop" }, raw };

  const ctx: CommandContext = {
    cwd: store.cwd,
    theme: store.theme,
    commandCount: store.commandCount,
    secretUnlocked: store.secretUnlocked,
  };

  const command = registry.get(parsed.cmd);

  if (!command) {
    const suggestions = registry.suggest(parsed.cmd);
    const suggestionText =
      suggestions.length > 0
        ? `\ndid you mean: ${suggestions.map((s) => `\`${s}\``).join(", ")}?`
        : "\ntype \`help\` to see available commands.";

    return {
      output: {
        type: "error",
        message: `command not found: ${parsed.cmd}${suggestionText}\nor try: \`ask ${trimmed}\` to query the AI assistant`,
      },
      raw,
    };
  }

  abortController = new AbortController();

  try {
    const result = command.handler(parsed.args, parsed.flags, ctx);
    const output = result instanceof Promise ? await result : result;
    return { output, raw };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { output: { type: "text", content: "^C" }, raw };
    }
    const msg = err instanceof Error ? err.message : String(err);
    return { output: { type: "error", message: msg }, raw };
  } finally {
    abortController = null;
  }
}

export function abortCurrentCommand(): void {
  abortController?.abort();
}
