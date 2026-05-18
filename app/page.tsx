"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { BootSequence } from "@/components/boot/BootSequence";
import { Terminal } from "@/components/terminal/Terminal";
import { CRTOverlay } from "@/components/effects/CRTOverlay";
import { useTerminalStore } from "@/store/useTerminalStore";
import { applyTheme } from "@/lib/themes/apply";

// Three.js: lazy load after boot to keep initial bundle lean
const AmbientBg = dynamic(
  () => import("@/components/effects/AmbientBg").then((m) => ({ default: m.AmbientBg })),
  { ssr: false }
);

export default function Home() {
  const { theme } = useTerminalStore();
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

      {/* Main terminal — rendered once boot is done */}
      {!showBoot && <Terminal />}
    </>
  );
}
