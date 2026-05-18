"use client";

import { useTerminalStore } from "@/store/useTerminalStore";

export function Prompt() {
  const { cwd } = useTerminalStore();

  const displayPath = cwd.replace("/home/kut", "~");

  return (
    <span className="font-mono text-sm shrink-0 select-none">
      <span style={{ color: "var(--text-muted)" }}>~kut</span>
      <span style={{ color: "var(--text-disabled)" }}>@</span>
      <span style={{ color: "var(--text-secondary)" }}>kut.os</span>
      <span style={{ color: "var(--text-muted)" }}> {displayPath} </span>
      <span style={{ color: "var(--accent)" }}>➜ </span>
    </span>
  );
}
