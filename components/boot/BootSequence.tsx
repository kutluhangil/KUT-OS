"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BootLogo } from "./BootLogo";
import { BootText, BOOT_MESSAGES } from "./BootText";
import { BootProgress } from "./BootProgress";
import { useTerminalStore } from "@/store/useTerminalStore";

// Timing constants (ms)
const BIOS_DELAY = 300;
const MSG_INTERVAL = 160;
const LOGO_DELAY = 1800;
const PROMPT_DELAY = 2200;
const FAST_MULTIPLIER = 0.35; // return visits: 35% of normal timing

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const { bootSkipped, setBootSkipped, setBooted } = useTerminalStore();
  const [phase, setPhase] = useState<"black" | "messages" | "logo" | "prompt" | "done">("black");
  const [visibleMsgCount, setVisibleMsgCount] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const factor = bootSkipped ? FAST_MULTIPLIER : 1;

  const complete = useCallback(() => {
    setExiting(true);
    setBootSkipped(true);
    setTimeout(() => {
      setBooted(true);
      onComplete();
    }, 400);
  }, [setBooted, setBootSkipped, onComplete]);

  // Keyboard handler: any key completes boot, Esc skips immediately
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === "done") return;
      if (e.key === "Escape" || phase === "prompt") {
        complete();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, complete]);

  // Boot sequence timeline
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: show BIOS line
    timers.push(
      setTimeout(() => {
        setPhase("messages");
        setVisibleMsgCount(1);
      }, BIOS_DELAY * factor)
    );

    // Phase 2: reveal each POST message
    for (let i = 1; i < BOOT_MESSAGES.length; i++) {
      timers.push(
        setTimeout(
          () => {
            setVisibleMsgCount(i + 1);
          },
          (BIOS_DELAY + i * MSG_INTERVAL) * factor
        )
      );
    }

    // Phase 3: ASCII logo
    timers.push(
      setTimeout(() => {
        setPhase("logo");
        setLogoVisible(true);
      }, LOGO_DELAY * factor)
    );

    // Phase 4: "press any key" prompt
    timers.push(
      setTimeout(() => {
        setPhase("prompt");
        setPromptVisible(true);
      }, PROMPT_DELAY * factor)
    );

    return () => timers.forEach(clearTimeout);
  }, [factor]);

  const progress = Math.min(100, (visibleMsgCount / BOOT_MESSAGES.length) * 100);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex flex-col items-start justify-center px-[32px] md:px-[80px]"
          style={{ background: "var(--bg-primary)", zIndex: 50 }}
        >
          <div className="w-full max-w-2xl">
            {/* ASCII Logo */}
            <BootLogo visible={logoVisible} />

            {/* POST messages */}
            {phase !== "black" && <BootText visibleCount={visibleMsgCount} />}

            {/* Progress bar */}
            {phase !== "black" && <BootProgress progress={progress} />}

            {/* Press any key */}
            <AnimatePresence>
              {promptVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="font-mono text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  press any key to continue_
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skip hint */}
            {phase !== "prompt" && (
              <div className="mt-6 font-mono text-xs" style={{ color: "var(--text-disabled)" }}>
                [ESC] skip
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
