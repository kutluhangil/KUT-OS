import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ReactNode, ComponentType } from "react";

/* ─── Types ─────────────────────────────────────────────────── */

export type Theme = "minimal" | "cyberpunk" | "mainframe";

export type OutputEntry =
  | { id: string; type: "text"; content: string; timestamp: Date }
  | { id: string; type: "react"; content: ReactNode; timestamp: Date }
  | { id: string; type: "app"; component: ComponentType; timestamp: Date }
  | { id: string; type: "error"; message: string; timestamp: Date }
  | { id: string; type: "command"; content: string; timestamp: Date };

export interface HistoryEntry {
  id: string;
  command: string;
  timestamp: Date;
}

export interface TerminalState {
  /* ── System ── */
  booted: boolean;
  bootSkipped: boolean;

  /* ── Theme ── */
  theme: Theme;

  /* ── Terminal I/O ── */
  input: string;
  output: OutputEntry[];
  commandHistory: HistoryEntry[];
  historyIndex: number;

  /* ── Filesystem ── */
  cwd: string;

  /* ── Audio ── */
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;

  /* ── Visual ── */
  ambientBgEnabled: boolean;
  crtEnabled: boolean;
  cursorStyle: "block" | "line";

  /* ── App State ── */
  activeApp: string | null;
  commandCount: number;
  secretUnlocked: boolean;

  /* ─── Actions ─────────────────────────────────────────────── */

  setBooted: (booted: boolean) => void;
  setBootSkipped: (skipped: boolean) => void;

  setTheme: (theme: Theme) => void;

  setInput: (input: string) => void;
  pushOutput: (entry: Omit<OutputEntry, "id" | "timestamp">) => void;
  clearOutput: () => void;

  pushHistory: (command: string) => void;
  setHistoryIndex: (index: number) => void;

  setCwd: (cwd: string) => void;

  setSoundEnabled: (enabled: boolean) => void;
  setMusicEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;

  setAmbientBgEnabled: (enabled: boolean) => void;
  setCrtEnabled: (enabled: boolean) => void;
  setCursorStyle: (style: "block" | "line") => void;

  setActiveApp: (app: string | null) => void;
  incrementCommandCount: () => void;
}

/* ─── Store ─────────────────────────────────────────────────── */

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export const useTerminalStore = create<TerminalState>()(
  devtools(
    persist(
      (set) => ({
        /* ── Initial State ── */
        booted: false,
        bootSkipped: false,
        theme: "minimal",
        input: "",
        output: [],
        commandHistory: [],
        historyIndex: -1,
        cwd: "/home/kut",
        soundEnabled: false,
        musicEnabled: false,
        volume: 70,
        ambientBgEnabled: true,
        crtEnabled: false,
        cursorStyle: "block",
        activeApp: null,
        commandCount: 0,
        secretUnlocked: false,

        /* ── Actions ── */
        setBooted: (booted) => set({ booted }),
        setBootSkipped: (bootSkipped) => set({ bootSkipped }),

        setTheme: (theme) => set({ theme }),

        setInput: (input) => set({ input }),

        pushOutput: (entry) =>
          set((state) => ({
            output: [
              ...state.output.slice(-199),
              { ...entry, id: generateId(), timestamp: new Date() } as OutputEntry,
            ],
          })),

        clearOutput: () => set({ output: [] }),

        pushHistory: (command) =>
          set((state) => ({
            commandHistory: [
              ...state.commandHistory.slice(-99),
              { id: generateId(), command, timestamp: new Date() },
            ],
            historyIndex: -1,
          })),

        setHistoryIndex: (historyIndex) => set({ historyIndex }),

        setCwd: (cwd) => set({ cwd }),

        setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
        setMusicEnabled: (musicEnabled) => set({ musicEnabled }),
        setVolume: (volume) => set({ volume }),

        setAmbientBgEnabled: (ambientBgEnabled) => set({ ambientBgEnabled }),
        setCrtEnabled: (crtEnabled) => set({ crtEnabled }),
        setCursorStyle: (cursorStyle) => set({ cursorStyle }),

        setActiveApp: (activeApp) => set({ activeApp }),

        incrementCommandCount: () =>
          set((state) => ({
            commandCount: state.commandCount + 1,
            secretUnlocked: state.commandCount + 1 >= 10 ? true : state.secretUnlocked,
          })),
      }),
      {
        name: "kut-os-store",
        partialize: (state) => ({
          theme: state.theme,
          commandHistory: state.commandHistory,
          soundEnabled: state.soundEnabled,
          musicEnabled: state.musicEnabled,
          volume: state.volume,
          ambientBgEnabled: state.ambientBgEnabled,
          crtEnabled: state.crtEnabled,
          cursorStyle: state.cursorStyle,
          commandCount: state.commandCount,
          secretUnlocked: state.secretUnlocked,
          bootSkipped: state.bootSkipped,
        }),
      }
    ),
    { name: "KUT/OS Terminal" }
  )
);
