"use client";

import { useEffect, useState } from "react";
import { useTerminalStore } from "@/store/useTerminalStore";
import { getISTTime } from "@/lib/utils/format";
import type { Theme } from "@/store/useTerminalStore";
import { applyTheme } from "@/lib/themes/apply";

const THEMES: { value: Theme; label: string; color: string }[] = [
  { value: "minimal", label: "MIN", color: "#c1ff00" },
  { value: "cyberpunk", label: "CYB", color: "#ff00ff" },
  { value: "mainframe", label: "IBM", color: "#00ff41" },
];

export function StatusBar() {
  const { theme, setTheme, soundEnabled, setSoundEnabled, musicEnabled, nowPlaying } =
    useTerminalStore();
  const [clock, setClock] = useState(getISTTime());

  // Real-time clock
  useEffect(() => {
    setClock(getISTTime());
    const id = setInterval(() => setClock(getISTTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleTheme = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
  };

  return (
    <div
      className="flex items-center justify-between px-4 h-9 shrink-0 no-select"
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* Left: logo */}
      <div className="font-mono text-xs font-semibold" style={{ color: "var(--accent)" }}>
        KUT/OS
      </div>

      {/* Center: clock */}
      <div
        className="font-mono text-xs tabular-nums"
        style={{ color: "var(--text-muted)" }}
        suppressHydrationWarning
      >
        {clock} IST
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-3">
        {/* Now playing */}
        {musicEnabled && nowPlaying && (
          <div
            className="font-mono text-xs"
            style={{
              color: "var(--text-muted)",
              maxWidth: "140px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={nowPlaying}
          >
            ♪ {nowPlaying}
          </div>
        )}
        {musicEnabled && !nowPlaying && (
          <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            ♪
          </div>
        )}

        {/* Sound toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="font-mono text-xs transition-opacity hover:opacity-100"
          style={{
            color: soundEnabled ? "var(--text-secondary)" : "var(--text-disabled)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          title={soundEnabled ? "sound on" : "sound off"}
        >
          {soundEnabled ? "◉" : "○"}
        </button>

        {/* Theme switcher */}
        <div className="flex items-center gap-1">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => handleTheme(t.value)}
              className="font-mono text-xs transition-all"
              style={{
                color: theme === t.value ? t.color : "var(--text-disabled)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 2px",
                fontWeight: theme === t.value ? "600" : "400",
              }}
              title={`theme: ${t.value}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
