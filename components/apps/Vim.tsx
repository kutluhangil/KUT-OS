"use client";

import { useEffect, useReducer, useRef, useCallback } from "react";
import { useTerminalStore } from "@/store/useTerminalStore";
import { getFile, setNode, makeFile, basename } from "@/lib/fs/filesystem";
import { persistCreatedFile } from "@/lib/fs/persist";

type Mode = "normal" | "insert" | "command";

interface Cursor {
  row: number;
  col: number;
}

interface State {
  lines: string[];
  cursor: Cursor;
  mode: Mode;
  cmdBuf: string;
  statusMsg: string;
  modified: boolean;
  prevLines: string[] | null;
  prevCursor: Cursor | null;
}

type Action =
  | { type: "LOAD"; lines: string[] }
  | { type: "NORMAL"; key: string }
  | { type: "INSERT"; key: string }
  | { type: "CMD"; key: string }
  | { type: "STATUS"; msg: string }
  | { type: "DD"; lines: string[]; cursor: Cursor; prev: string[]; prevCursor: Cursor }
  | { type: "GG" };

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function safeCol(lines: string[], row: number, col: number, insert = false): number {
  const len = lines[row]?.length ?? 0;
  return clamp(col, 0, insert ? len : Math.max(0, len - 1));
}

function snap(s: State): Pick<State, "prevLines" | "prevCursor"> {
  return { prevLines: [...s.lines], prevCursor: { ...s.cursor } };
}

const INIT: State = {
  lines: [""],
  cursor: { row: 0, col: 0 },
  mode: "normal",
  cmdBuf: "",
  statusMsg: "",
  modified: false,
  prevLines: null,
  prevCursor: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD":
      return { ...INIT, lines: action.lines };

    case "STATUS":
      return { ...state, statusMsg: action.msg };

    case "GG": {
      return { ...state, cursor: { row: 0, col: safeCol(state.lines, 0, state.cursor.col) } };
    }

    case "DD": {
      return {
        ...state,
        lines: action.lines,
        cursor: action.cursor,
        prevLines: action.prev,
        prevCursor: action.prevCursor,
        modified: true,
        statusMsg: "",
      };
    }

    case "CMD": {
      const { key } = action;
      if (key === "Escape") return { ...state, mode: "normal", cmdBuf: "", statusMsg: "" };
      if (key === "Enter") return { ...state, mode: "normal", cmdBuf: "" };
      if (key === "Backspace") {
        const next = state.cmdBuf.slice(0, -1);
        return next === ""
          ? { ...state, mode: "normal", cmdBuf: "", statusMsg: "" }
          : { ...state, cmdBuf: next };
      }
      if (key.length === 1) return { ...state, cmdBuf: state.cmdBuf + key };
      return state;
    }

    case "INSERT": {
      const { key } = action;
      if (key === "Escape") {
        const col = safeCol(state.lines, state.cursor.row, state.cursor.col - 1);
        return { ...state, mode: "normal", cursor: { ...state.cursor, col }, statusMsg: "" };
      }
      const {
        lines,
        cursor: { row, col },
      } = state;
      const line = lines[row] ?? "";
      if (key === "Enter") {
        const next = [
          ...lines.slice(0, row),
          line.slice(0, col),
          line.slice(col),
          ...lines.slice(row + 1),
        ];
        return { ...state, lines: next, cursor: { row: row + 1, col: 0 }, modified: true };
      }
      if (key === "Backspace") {
        if (col > 0) {
          const nl = [...lines];
          nl[row] = line.slice(0, col - 1) + line.slice(col);
          return { ...state, lines: nl, cursor: { row, col: col - 1 }, modified: true };
        }
        if (row > 0) {
          const prev = lines[row - 1] ?? "";
          const merged = [...lines.slice(0, row - 1), prev + line, ...lines.slice(row + 1)];
          return {
            ...state,
            lines: merged,
            cursor: { row: row - 1, col: prev.length },
            modified: true,
          };
        }
        return state;
      }
      if (key.length === 1 || key.length === 2) {
        // length 2 handles Tab→"  "
        const nl = [...lines];
        nl[row] = line.slice(0, col) + key + line.slice(col);
        return { ...state, lines: nl, cursor: { row, col: col + key.length }, modified: true };
      }
      return state;
    }

    case "NORMAL": {
      const { key } = action;
      const {
        lines,
        cursor: { row, col },
      } = state;
      const last = lines.length - 1;

      if (key === ":") return { ...state, mode: "command", cmdBuf: "", statusMsg: "" };
      if (key === "i") return { ...state, mode: "insert", statusMsg: "" };
      if (key === "a") {
        const nc = Math.min(col + 1, (lines[row] ?? "").length);
        return { ...state, mode: "insert", cursor: { row, col: nc }, statusMsg: "" };
      }
      if (key === "o") {
        const nl = [...lines.slice(0, row + 1), "", ...lines.slice(row + 1)];
        return {
          ...state,
          ...snap(state),
          lines: nl,
          cursor: { row: row + 1, col: 0 },
          mode: "insert",
          modified: true,
          statusMsg: "",
        };
      }
      if (key === "h")
        return { ...state, cursor: { row, col: safeCol(lines, row, col - 1) }, statusMsg: "" };
      if (key === "l")
        return { ...state, cursor: { row, col: safeCol(lines, row, col + 1) }, statusMsg: "" };
      if (key === "j") {
        const nr = clamp(row + 1, 0, last);
        return { ...state, cursor: { row: nr, col: safeCol(lines, nr, col) }, statusMsg: "" };
      }
      if (key === "k") {
        const nr = clamp(row - 1, 0, last);
        return { ...state, cursor: { row: nr, col: safeCol(lines, nr, col) }, statusMsg: "" };
      }
      if (key === "0") return { ...state, cursor: { row, col: 0 }, statusMsg: "" };
      if (key === "$")
        return {
          ...state,
          cursor: { row, col: Math.max(0, (lines[row] ?? "").length - 1) },
          statusMsg: "",
        };
      if (key === "G") {
        const nr = last;
        return { ...state, cursor: { row: nr, col: safeCol(lines, nr, col) }, statusMsg: "" };
      }
      if (key === "x") {
        const line = lines[row] ?? "";
        if (!line.length) return state;
        const nl = [...lines];
        nl[row] = line.slice(0, col) + line.slice(col + 1);
        return {
          ...state,
          ...snap(state),
          lines: nl,
          cursor: { row, col: safeCol(nl, row, col) },
          modified: true,
          statusMsg: "",
        };
      }
      if (key === "u") {
        if (!state.prevLines) return { ...state, statusMsg: "Already at oldest change" };
        return {
          ...state,
          lines: state.prevLines,
          cursor: state.prevCursor ?? state.cursor,
          prevLines: null,
          prevCursor: null,
          statusMsg: "1 change; before #1",
        };
      }
      if (key === "Escape") return { ...state, statusMsg: "" };
      return state;
    }

    default:
      return state;
  }
}

export function Vim() {
  const activeApp = useTerminalStore((s) => s.activeApp);
  const setActiveApp = useTerminalStore((s) => s.setActiveApp);

  const path = activeApp?.startsWith("vim:") ? activeApp.slice(4) : "/untitled";
  const filename = basename(path);

  const [state, dispatch] = useReducer(reducer, INIT);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRowRef = useRef<HTMLDivElement>(null);

  // Load file on mount
  useEffect(() => {
    const file = getFile(path);
    dispatch({ type: "LOAD", lines: file ? file.content.split("\n") : [""] });
    setTimeout(() => containerRef.current?.focus(), 0);
  }, [path]);

  // Scroll cursor into view
  useEffect(() => {
    cursorRowRef.current?.scrollIntoView({ block: "nearest" });
  }, [state.cursor.row]);

  const save = useCallback(() => {
    const content = state.lines.join("\n");
    setNode(path, makeFile(filename, content));
    persistCreatedFile(path, content);
  }, [state.lines, path, filename]);

  // Module-level refs for key sequence tracking
  const ggRef = useRef(false);
  const ddRef = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;

      /* ── Command mode ── */
      if (state.mode === "command") {
        e.preventDefault();
        if (key === "Enter") {
          const cmd = state.cmdBuf.trim();
          if (cmd === "q") {
            if (state.modified)
              dispatch({
                type: "STATUS",
                msg: "E37: No write since last change (use ! to override)",
              });
            else setActiveApp(null);
          } else if (cmd === "q!") {
            setActiveApp(null);
          } else if (cmd === "w" || cmd === "x") {
            save();
            dispatch({ type: "STATUS", msg: `"${filename}" written` });
            dispatch({ type: "CMD", key: "Enter" });
          } else if (cmd === "wq") {
            save();
            setActiveApp(null);
          } else {
            dispatch({ type: "STATUS", msg: `E492: Not an editor command: ${cmd}` });
            dispatch({ type: "CMD", key: "Enter" });
          }
        } else {
          dispatch({ type: "CMD", key });
        }
        return;
      }

      /* ── Insert mode ── */
      if (state.mode === "insert") {
        if (key === "Tab") {
          e.preventDefault();
          dispatch({ type: "INSERT", key: "  " });
          return;
        }
        if (key.length === 1 || key === "Enter" || key === "Backspace" || key === "Escape") {
          e.preventDefault();
          dispatch({ type: "INSERT", key });
        }
        return;
      }

      /* ── Normal mode ── */
      if (key === "Escape") {
        e.preventDefault();
        dispatch({ type: "NORMAL", key: "Escape" });
        ggRef.current = false;
        ddRef.current = false;
        return;
      }

      const handled = ["h", "j", "k", "l", "0", "$", "G", "x", "i", "a", "o", ":", "u", "g", "d"];
      if (!handled.includes(key)) return;
      e.preventDefault();

      // gg — go to first line
      if (key === "g") {
        if (ggRef.current) {
          ggRef.current = false;
          dispatch({ type: "GG" });
        } else {
          ggRef.current = true;
          setTimeout(() => {
            ggRef.current = false;
          }, 600);
        }
        ddRef.current = false;
        return;
      }

      // dd — delete current line
      if (key === "d") {
        ggRef.current = false;
        if (ddRef.current) {
          ddRef.current = false;
          const { lines, cursor } = state;
          const prevLines = [...lines];
          const prevCursor = { ...cursor };
          const newLines =
            lines.length === 1
              ? [""]
              : [...lines.slice(0, cursor.row), ...lines.slice(cursor.row + 1)];
          const newRow = clamp(cursor.row, 0, newLines.length - 1);
          const newCol = safeCol(newLines, newRow, cursor.col);
          dispatch({
            type: "DD",
            lines: newLines,
            cursor: { row: newRow, col: newCol },
            prev: prevLines,
            prevCursor,
          });
        } else {
          ddRef.current = true;
          setTimeout(() => {
            ddRef.current = false;
          }, 600);
        }
        return;
      }

      ggRef.current = false;
      ddRef.current = false;
      dispatch({ type: "NORMAL", key });
    },
    [state, save, filename, setActiveApp]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const { lines, cursor, mode, cmdBuf, statusMsg, modified } = state;

  const modeLabel =
    mode === "insert" ? "-- INSERT --" : mode === "command" ? `:${cmdBuf}` : "-- NORMAL --";

  const statusColor =
    mode === "insert"
      ? "var(--accent)"
      : mode === "command"
        ? "var(--text-primary)"
        : "var(--text-muted)";

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="fixed inset-0 z-50 flex flex-col font-mono outline-none"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "13px" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 py-1 text-xs select-none"
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          color: "var(--text-muted)",
        }}
      >
        <span>
          <span style={{ color: "var(--accent)" }}>VIM</span>
          {"  "}
          {filename}
          {modified && <span style={{ color: "var(--error)" }}> [+]</span>}
        </span>
        <span style={{ opacity: 0.6 }}>{path}</span>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto" style={{ lineHeight: "1.6" }}>
        {lines.map((line, row) => {
          const active = row === cursor.row;
          return (
            <div
              key={row}
              ref={active ? cursorRowRef : undefined}
              className="flex"
              style={{ background: active ? "var(--bg-secondary)" : undefined }}
            >
              {/* Line number */}
              <span
                className="select-none text-right pr-2 shrink-0"
                style={{
                  minWidth: "3.2em",
                  color: active ? "var(--text-muted)" : "var(--border)",
                  borderRight: "1px solid var(--border)",
                  paddingLeft: "4px",
                }}
              >
                {row + 1}
              </span>
              {/* Line content */}
              <span className="pl-2 whitespace-pre flex-1">
                {line.split("").map((ch, ci) => (
                  <span
                    key={ci}
                    style={
                      active && ci === cursor.col
                        ? { background: "var(--text-primary)", color: "var(--bg-primary)" }
                        : undefined
                    }
                  >
                    {ch}
                  </span>
                ))}
                {/* End-of-line block cursor */}
                {active && cursor.col >= line.length && (
                  <span style={{ background: "var(--text-primary)", color: "var(--bg-primary)" }}>
                    &nbsp;
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-2 py-0.5 text-xs select-none"
        style={{
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
        }}
      >
        <span style={{ color: statusMsg ? "var(--error)" : statusColor }}>
          {statusMsg || modeLabel}
        </span>
        <span>
          {cursor.row + 1}:{cursor.col + 1}
        </span>
      </div>
    </div>
  );
}
