"use client";

import { motion } from "framer-motion";

const LOGO_LINES = [
  "██╗  ██╗██╗   ██╗████████╗ ██████╗ ███████╗",
  "██║ ██╔╝██║   ██║╚══██╔══╝██╔═══██╗██╔════╝",
  "█████╔╝ ██║   ██║   ██║   ██║   ██║███████╗",
  "██╔═██╗ ██║   ██║   ██║   ██║   ██║╚════██║",
  "██║  ██╗╚██████╔╝   ██║   ╚██████╔╝███████║",
  "╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚══════╝",
];

interface BootLogoProps {
  visible: boolean;
}

export function BootLogo({ visible }: BootLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8"
    >
      {LOGO_LINES.map((line, i) => (
        <div key={i} className="text-accent font-mono text-xs leading-tight select-none">
          {line}
        </div>
      ))}
      <div className="mt-2 text-text-muted text-xs font-mono text-right pr-1">
        v1.0.0 — kutluhan.gil
      </div>
    </motion.div>
  );
}
