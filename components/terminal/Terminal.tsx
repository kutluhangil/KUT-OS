"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useTerminalStore } from "@/store/useTerminalStore";
import { StatusBar } from "./StatusBar";
import { InputLine } from "./InputLine";
import { OutputRenderer } from "./OutputRenderer";
import { HintBar } from "./HintBar";
import { FSProvider } from "./FSProvider";
import { executeCommand } from "@/lib/shell/executor";
import { soundbank } from "@/lib/audio/soundbank";

// Load all command registrations on mount
import "@/commands";

// Lazy-loaded apps
const MatrixRain = dynamic(
  () => import("@/components/apps/MatrixRain").then((m) => ({ default: m.MatrixRain })),
  { ssr: false }
);
const Snake = dynamic(() => import("@/components/apps/Snake").then((m) => ({ default: m.Snake })), {
  ssr: false,
});
const Tetris = dynamic(
  () => import("@/components/apps/Tetris").then((m) => ({ default: m.Tetris })),
  { ssr: false }
);
const MusicPlayer = dynamic(
  () => import("@/components/apps/MusicPlayer").then((m) => ({ default: m.MusicPlayer })),
  { ssr: false }
);

export function Terminal() {
  const { output, pushOutput, activeApp } = useTerminalStore();
  const outputEndRef = useRef<HTMLDivElement>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [tabState, setTabState] = useState<{ completions: string[]; selected: number }>({
    completions: [],
    selected: 0,
  });

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  // Konami code
  useEffect(() => {
    import("@/lib/utils/konami").then(({ listenKonami }) => {
      const cleanup = listenKonami(() => {
        pushOutput({
          type: "text",
          content: [
            "",
            "  ✦ ↑↑↓↓←→←→BA — KONAMI CODE ACTIVATED",
            "",
            "  You have unlocked: nothing.",
            "  Just kidding.",
            "  You unlocked the knowledge that you know the Konami code.",
            "  That's worth something.",
            "",
          ].join("\n"),
        });
      });
      return cleanup;
    });
  }, [pushOutput]);

  // Show MOTD on first mount
  useEffect(() => {
    pushOutput({
      type: "text",
      content: [
        "",
        "  ██╗  ██╗██╗   ██╗████████╗ ██████╗ ███████╗",
        "  ██║ ██╔╝██║   ██║╚══██╔══╝██╔═══██╗██╔════╝",
        "  █████╔╝ ██║   ██║   ██║   ██║   ██║███████╗",
        "  ██╔═██╗ ██║   ██║   ██║   ██║   ██║╚════██║",
        "  ██║  ██╗╚██████╔╝   ██║   ╚██████╔╝███████║",
        "  ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚══════╝",
        "",
        "  v1.0.0  —  kutluhan.gil's terminal portfolio",
        "",
        "  type \`help\` to see available commands.",
        "  type \`about\` to learn more.",
        "",
      ].join("\n"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(
    async (raw: string) => {
      if (!raw.trim()) {
        pushOutput({ type: "command", content: "" });
        return;
      }

      // Echo the command
      pushOutput({ type: "command", content: raw });

      setIsExecuting(true);
      try {
        const result = await executeCommand(raw);
        if (result.output.type === "error") {
          soundbank.play("error");
        } else if (result.output.type !== "noop") {
          soundbank.play("success");
        }
        if (result.output.type !== "noop") {
          pushOutput(result.output as Exclude<typeof result.output, { type: "noop" }>);
        }
      } finally {
        setIsExecuting(false);
      }
    },
    [pushOutput]
  );

  return (
    <FSProvider>
      {/* Fullscreen app overlays */}
      {activeApp === "matrix" && <MatrixRain />}
      {activeApp === "snake" && <Snake />}
      {activeApp === "tetris" && <Tetris />}
      {activeApp === "music" && <MusicPlayer />}

      <div
        className="flex flex-col h-screen w-full overflow-hidden"
        style={{ background: "var(--bg-primary)" }}
      >
        <StatusBar />

        {/* Output area */}
        <div className="flex-1 overflow-y-auto terminal-scroll px-4 py-3 space-y-0.5">
          {output.map((entry) => (
            <OutputRenderer key={entry.id} entry={entry} />
          ))}
          <div ref={outputEndRef} />
        </div>

        {/* Input */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <InputLine
            onSubmit={handleSubmit}
            onTabComplete={(completions, selected) => setTabState({ completions, selected })}
            tabState={tabState}
            disabled={isExecuting}
          />
          <HintBar completions={tabState.completions} selected={tabState.selected} query="" />
        </div>
      </div>
    </FSProvider>
  );
}
