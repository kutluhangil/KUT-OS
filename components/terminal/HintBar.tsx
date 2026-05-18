"use client";

interface HintBarProps {
  completions: string[];
  selected: number;
  query: string;
}

export function HintBar({ completions, selected, query }: HintBarProps) {
  if (completions.length === 0) return null;

  return (
    <div
      className="flex items-center gap-1 px-4 py-1 font-mono text-xs overflow-x-auto"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <span style={{ color: "var(--text-muted)" }}>tab:</span>
      {completions.slice(0, 8).map((c, i) => (
        <span
          key={c}
          className="px-1.5 py-0.5 rounded"
          style={{
            background: i === selected ? "var(--accent-dim)" : "transparent",
            color: i === selected ? "var(--accent)" : "var(--text-secondary)",
            border: i === selected ? "1px solid var(--accent)" : "1px solid transparent",
          }}
        >
          {c}
        </span>
      ))}
      {completions.length > 8 && (
        <span style={{ color: "var(--text-disabled)" }}>+{completions.length - 8} more</span>
      )}
    </div>
  );
}
