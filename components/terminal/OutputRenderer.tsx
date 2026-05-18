"use client";

import { motion } from "framer-motion";
import type { OutputEntry } from "@/store/useTerminalStore";

interface OutputRendererProps {
  entry: OutputEntry;
}

export function OutputRenderer({ entry }: OutputRendererProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className="font-mono text-sm"
    >
      {renderEntry(entry)}
    </motion.div>
  );
}

function renderEntry(entry: OutputEntry) {
  switch (entry.type) {
    case "command":
      return (
        <div className="flex items-baseline gap-0 opacity-60 mb-0.5">
          <span style={{ color: "var(--text-muted)" }}>~kut@kut.os </span>
          <span style={{ color: "var(--accent)" }}>➜ </span>
          <span style={{ color: "var(--text-primary)" }}>{entry.content}</span>
        </div>
      );

    case "text":
      return (
        <pre
          className="whitespace-pre-wrap break-words text-sm leading-relaxed"
          style={{ color: "var(--text-primary)" }}
        >
          {entry.content}
        </pre>
      );

    case "react":
      return <div className="my-1">{entry.content}</div>;

    case "app":
      return (
        <div className="my-1">
          <entry.component />
        </div>
      );

    case "error":
      return (
        <pre className="whitespace-pre-wrap break-words text-sm" style={{ color: "var(--error)" }}>
          {entry.message}
        </pre>
      );

    default:
      return null;
  }
}
