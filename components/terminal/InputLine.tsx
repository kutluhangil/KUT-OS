"use client";

import { useRef, useEffect, KeyboardEvent } from "react";
import { useTerminalStore } from "@/store/useTerminalStore";
import { Prompt } from "./Prompt";
import { CursorBlink } from "./CursorBlink";
import { navigateHistory } from "@/lib/shell/history";
import { getCompletions, applyCompletion } from "@/lib/shell/autocomplete";
import { abortCurrentCommand } from "@/lib/shell/executor";
import { soundbank } from "@/lib/audio/soundbank";

interface InputLineProps {
  onSubmit: (value: string) => void;
  onTabComplete: (completions: string[], selected: number) => void;
  tabState: { completions: string[]; selected: number };
  disabled?: boolean;
}

export function InputLine({ onSubmit, onTabComplete, tabState, disabled }: InputLineProps) {
  const { input, setInput, setHistoryIndex } = useTerminalStore();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep focus on input
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Don't steal focus from text selection
      if (window.getSelection()?.toString()) return;
      inputRef.current?.focus();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Auto-focus on mount
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter": {
        e.preventDefault();
        const val = input;
        setInput("");
        setHistoryIndex(-1);
        onTabComplete([], 0);
        onSubmit(val);
        break;
      }

      case "Tab": {
        e.preventDefault();
        if (tabState.completions.length === 0) {
          const { completions } = getCompletions(input);
          if (completions.length === 1) {
            setInput(applyCompletion(input, completions[0]));
            onTabComplete([], 0);
          } else if (completions.length > 1) {
            onTabComplete(completions, 0);
          }
        } else {
          // Cycle through completions
          const next = (tabState.selected + 1) % tabState.completions.length;
          const completed = applyCompletion(input, tabState.completions[next]);
          setInput(completed);
          onTabComplete(tabState.completions, next);
        }
        break;
      }

      case "ArrowUp": {
        e.preventDefault();
        navigateHistory("up");
        onTabComplete([], 0);
        break;
      }

      case "ArrowDown": {
        e.preventDefault();
        navigateHistory("down");
        onTabComplete([], 0);
        break;
      }

      case "c": {
        if (e.ctrlKey) {
          e.preventDefault();
          abortCurrentCommand();
          setInput("");
          onTabComplete([], 0);
        }
        break;
      }

      case "l": {
        if (e.ctrlKey) {
          e.preventDefault();
          useTerminalStore.getState().clearOutput();
        }
        break;
      }

      default:
        // Any other key clears tab state
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          onTabComplete([], 0);
          if (e.key.length === 1) soundbank.play("keyClick");
        }
    }
  };

  return (
    <div className="flex items-baseline px-4 py-1">
      <Prompt />
      <div className="relative flex-1 flex items-baseline">
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="w-full bg-transparent outline-none font-mono text-sm caret-transparent"
          style={{
            color: "var(--text-primary)",
            caretColor: "transparent",
          }}
          aria-label="terminal input"
        />
        {/* Fake cursor positioned after typed text */}
        <CursorBlink
          active={!disabled}
          className="absolute"
          style={{ left: `${input.length}ch` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
