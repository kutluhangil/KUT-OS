"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { BootSequence } from "@/components/boot/BootSequence";
import { StatusBar } from "@/components/terminal/StatusBar";
import { CRTOverlay } from "@/components/effects/CRTOverlay";
import { CursorBlink } from "@/components/terminal/CursorBlink";
import { useTerminalStore } from "@/store/useTerminalStore";
import { applyTheme } from "@/lib/themes/apply";

// Three.js: lazy load after boot to keep initial bundle lean
const AmbientBg = dynamic(
  () => import("@/components/effects/AmbientBg").then((m) => ({ default: m.AmbientBg })),
  { ssr: false }
);

export default function Home() {
  const { booted, theme } = useTerminalStore();
  const [showBoot, setShowBoot] = useState(true);

  // Apply persisted theme on mount
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <>
      {/* Ambient WebGL background */}
      <AmbientBg />

      {/* CRT overlay */}
      <CRTOverlay />

      {/* Boot sequence */}
      {showBoot && <BootSequence onComplete={() => setShowBoot(false)} />}

      {/* Main terminal UI (placeholder until Agent 3) */}
      {booted && !showBoot && (
        <div className="flex flex-col h-screen w-full" style={{ background: "var(--bg-primary)" }}>
          <StatusBar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center font-mono">
              <div className="text-lg mb-2" style={{ color: "var(--accent)" }}>
                KUT/OS
              </div>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                <span>~kut@kut.os</span>
                <span style={{ color: "var(--text-muted)" }}> ➜ </span>
                <CursorBlink />
              </div>
              <div className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
                shell engine loading... (Agent 3)
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
