import type { ParsedCommand } from "./types";

/**
 * Tokenize a shell-like command string.
 * Supports:
 *  - Double/single quoted strings: `echo "hello world"` → one arg
 *  - Flags: `--flag`, `--key=value`, `-f`
 *  - Short combined flags: `-la` → { l: true, a: true }
 */
export function parseCommand(raw: string): ParsedCommand {
  const trimmed = raw.trim();
  if (!trimmed) return { cmd: "", args: [], flags: {}, raw };

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return { cmd: "", args: [], flags: {}, raw };

  const [cmd, ...rest] = tokens;
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (const token of rest) {
    if (token.startsWith("--")) {
      // Long flag: --name or --name=value
      const eqIdx = token.indexOf("=");
      if (eqIdx > -1) {
        const key = token.slice(2, eqIdx);
        const value = token.slice(eqIdx + 1);
        flags[key] = value;
      } else {
        flags[token.slice(2)] = true;
      }
    } else if (token.startsWith("-") && token.length > 1 && !/^-\d/.test(token)) {
      // Short flags: -l, -la (expand each char)
      for (const ch of token.slice(1)) {
        flags[ch] = true;
      }
    } else {
      args.push(token);
    }
  }

  return { cmd: cmd.toLowerCase(), args, flags, raw };
}

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let inDouble = false;
  let inSingle = false;
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
      i++;
      continue;
    }

    if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      i++;
      continue;
    }

    if (ch === " " && !inDouble && !inSingle) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      i++;
      continue;
    }

    current += ch;
    i++;
  }

  if (current) tokens.push(current);
  return tokens;
}
