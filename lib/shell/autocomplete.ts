import { registry } from "./registry";

export interface CompletionResult {
  completions: string[];
  prefix: string;
}

/**
 * Tab completion: given current input, return possible completions.
 * - First word → command names
 * - Subsequent words → command-specific completions if available
 */
export function getCompletions(input: string): CompletionResult {
  const trimmed = input.trimStart();
  const spaceIdx = trimmed.indexOf(" ");

  if (spaceIdx === -1) {
    // Completing a command name
    const names = registry.getNames(false);
    const matches = names.filter((n) => n.startsWith(trimmed));
    return { completions: matches, prefix: trimmed };
  }

  // Completing an argument
  const cmdName = trimmed.slice(0, spaceIdx);
  const partial = trimmed.slice(spaceIdx + 1);
  const cmd = registry.get(cmdName);

  if (cmd?.completions) {
    const matches = cmd.completions(partial);
    return { completions: matches, prefix: partial };
  }

  return { completions: [], prefix: partial };
}

/**
 * Apply a completion: replaces the relevant prefix in the input.
 */
export function applyCompletion(input: string, completion: string): string {
  const spaceIdx = input.trimStart().indexOf(" ");
  if (spaceIdx === -1) {
    // Completing the command itself
    return completion;
  }
  const beforeArg = input.slice(0, input.lastIndexOf(" ") + 1);
  return beforeArg + completion;
}
