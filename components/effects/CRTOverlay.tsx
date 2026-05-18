"use client";

import { useTerminalStore } from "@/store/useTerminalStore";

export function CRTOverlay() {
  const { crtEnabled } = useTerminalStore();

  if (!crtEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 40 }} aria-hidden="true">
      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
          backgroundSize: "100% 4px",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}
