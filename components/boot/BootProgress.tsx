"use client";

import { motion } from "framer-motion";

interface BootProgressProps {
  progress: number; // 0–100
}

export function BootProgress({ progress }: BootProgressProps) {
  return (
    <div className="w-full max-w-sm mb-4">
      <div className="h-px w-full overflow-hidden" style={{ background: "var(--border-strong)" }}>
        <motion.div
          className="h-full"
          style={{ background: "var(--accent)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <div className="mt-1 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
        {progress < 100 ? `${Math.round(progress)}%` : "ready"}
      </div>
    </div>
  );
}
