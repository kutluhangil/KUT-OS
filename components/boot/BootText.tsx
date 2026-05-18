"use client";

import { motion } from "framer-motion";

export interface BootMessage {
  prefix: string;
  text: string;
  color?: "success" | "warning" | "muted" | "accent";
}

export const BOOT_MESSAGES: BootMessage[] = [
  { prefix: "[BIOS]", text: "kut.os v1.0.0 — initializing...", color: "muted" },
  { prefix: "[OK]", text: "memory check ........ 16384KB", color: "success" },
  { prefix: "[OK]", text: "cpu ................. kut-cortex M1 @ 3.2GHz", color: "success" },
  { prefix: "[OK]", text: "graphics ............ WebGL 2.0", color: "success" },
  { prefix: "[OK]", text: "audio ............... Web Audio API", color: "success" },
  { prefix: "[OK]", text: "network ............. connected", color: "success" },
  { prefix: "[OK]", text: "filesystem .......... mounted", color: "success" },
  { prefix: "[..] ", text: "loading personality.", color: "muted" },
];

const COLOR_MAP: Record<string, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  muted: "var(--text-muted)",
  accent: "var(--accent)",
};

interface BootTextProps {
  visibleCount: number;
}

export function BootText({ visibleCount }: BootTextProps) {
  return (
    <div className="font-mono text-sm space-y-0.5 mb-6">
      {BOOT_MESSAGES.slice(0, visibleCount).map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-2"
        >
          <span style={{ color: COLOR_MAP[msg.color ?? "muted"] }}>{msg.prefix}</span>
          <span style={{ color: "var(--text-secondary)" }}>{msg.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
