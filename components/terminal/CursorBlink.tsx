"use client";

import type React from "react";
import { useTerminalStore } from "@/store/useTerminalStore";
import { cn } from "@/lib/utils/cn";

interface CursorBlinkProps {
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
}

export function CursorBlink({ className, style, active = true }: CursorBlinkProps) {
  const { cursorStyle } = useTerminalStore();

  const isBlock = cursorStyle === "block";

  return (
    <span
      className={cn("inline-block cursor-blink", className)}
      style={{
        width: isBlock ? "8px" : "2px",
        height: "1em",
        background: "var(--cursor)",
        verticalAlign: "text-bottom",
        animationPlayState: active ? "running" : "paused",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
