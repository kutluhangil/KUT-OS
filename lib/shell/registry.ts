import type { Command } from "./types";

export class CommandRegistry {
  private commands = new Map<string, Command>();
  private aliases = new Map<string, string>();

  register(command: Command): void {
    this.commands.set(command.name, command);
    if (command.aliases) {
      for (const alias of command.aliases) {
        this.aliases.set(alias, command.name);
      }
    }
  }

  get(name: string): Command | undefined {
    const resolvedName = this.aliases.get(name) ?? name;
    return this.commands.get(resolvedName);
  }

  getAll(includeHidden = false): Command[] {
    const cmds = Array.from(this.commands.values());
    return includeHidden ? cmds : cmds.filter((c) => !c.hidden);
  }

  getByCategory(category: Command["category"], includeHidden = false): Command[] {
    return this.getAll(includeHidden).filter((c) => c.category === category);
  }

  getNames(includeHidden = false): string[] {
    return this.getAll(includeHidden).map((c) => c.name);
  }

  has(name: string): boolean {
    const resolvedName = this.aliases.get(name) ?? name;
    return this.commands.has(resolvedName);
  }

  /** Fuzzy match for "did you mean?" suggestions */
  suggest(input: string, limit = 3): string[] {
    const names = this.getNames(false);
    return names
      .map((name) => ({ name, score: similarity(input, name) }))
      .filter((x) => x.score > 0.3)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((x) => x.name);
  }
}

// Levenshtein-based similarity (0–1)
function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  const maxLen = Math.max(a.length, b.length);
  const dist = levenshtein(a, b);
  return 1 - dist / maxLen;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// Singleton
export const registry = new CommandRegistry();
