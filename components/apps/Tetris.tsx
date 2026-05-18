"use client";

import { useEffect, useReducer, useCallback, useRef } from "react";
import { useTerminalStore } from "@/store/useTerminalStore";

const COLS = 10;
const ROWS = 20;
const TICK = 500;
const HS_KEY = "kut-os-tetris-hs";

type Board = (string | null)[][];
type Piece = { shape: number[][]; color: string };

const PIECES: Piece[] = [
  { shape: [[1, 1, 1, 1]], color: "var(--accent)" },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "var(--warning)",
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "var(--success)",
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "var(--error)",
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#a78bfa",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#f472b6",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#60a5fa",
  },
];

function randPiece(): Piece {
  return PIECES[Math.floor(Math.random() * PIECES.length)];
}

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function rotate(shape: number[][]): number[][] {
  return shape[0].map((_, col) => shape.map((row) => row[col]).reverse());
}

interface TState {
  board: Board;
  piece: Piece;
  x: number;
  y: number;
  score: number;
  lines: number;
  dead: boolean;
  started: boolean;
  paused: boolean;
}

type TAction =
  | { type: "START" }
  | { type: "TICK" }
  | { type: "MOVE"; dx: number }
  | { type: "ROTATE" }
  | { type: "DROP" }
  | { type: "PAUSE" };

function fits(board: Board, shape: number[][], x: number, y: number): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nx = x + c,
        ny = y + r;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
      if (ny >= 0 && board[ny][nx]) return false;
    }
  }
  return true;
}

function place(board: Board, shape: number[][], x: number, y: number, color: string): Board {
  const b = board.map((r) => [...r]);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] && y + r >= 0) {
        b[y + r][x + c] = color;
      }
    }
  }
  return b;
}

function clearLines(board: Board): { board: Board; cleared: number } {
  const kept = board.filter((row) => row.some((cell) => !cell));
  const cleared = ROWS - kept.length;
  const newRows: Board = Array.from({ length: cleared }, () => Array(COLS).fill(null));
  return { board: [...newRows, ...kept], cleared };
}

const SCORE_TABLE = [0, 100, 300, 500, 800];

function tReducer(state: TState, action: TAction): TState {
  if (action.type === "START") {
    const piece = randPiece();
    return {
      board: emptyBoard(),
      piece,
      x: 3,
      y: -2,
      score: 0,
      lines: 0,
      dead: false,
      started: true,
      paused: false,
    };
  }
  if (!state.started || state.dead || state.paused) return state;

  if (action.type === "PAUSE") return { ...state, paused: !state.paused };

  if (action.type === "MOVE") {
    const nx = state.x + action.dx;
    if (fits(state.board, state.piece.shape, nx, state.y)) {
      return { ...state, x: nx };
    }
    return state;
  }

  if (action.type === "ROTATE") {
    const rotated = rotate(state.piece.shape);
    if (fits(state.board, rotated, state.x, state.y)) {
      return { ...state, piece: { ...state.piece, shape: rotated } };
    }
    return state;
  }

  if (action.type === "TICK" || action.type === "DROP") {
    const ny = action.type === "DROP" ? state.y + 10 : state.y + 1;
    if (fits(state.board, state.piece.shape, state.x, ny)) {
      return { ...state, y: ny };
    }
    // Lock
    const locked = place(state.board, state.piece.shape, state.x, state.y, state.piece.color);
    const { board: cleared, cleared: n } = clearLines(locked);
    const newPiece = randPiece();
    const startX = 3,
      startY = -2;
    if (!fits(cleared, newPiece.shape, startX, startY)) {
      return { ...state, board: cleared, dead: true };
    }
    return {
      ...state,
      board: cleared,
      piece: newPiece,
      x: startX,
      y: startY,
      score: state.score + (SCORE_TABLE[n] ?? 0),
      lines: state.lines + n,
    };
  }

  return state;
}

export function Tetris() {
  const [state, dispatch] = useReducer(tReducer, {
    board: emptyBoard(),
    piece: PIECES[0],
    x: 3,
    y: -2,
    score: 0,
    lines: 0,
    dead: false,
    started: false,
    paused: false,
  });
  const { setActiveApp } = useTerminalStore();
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const speed = Math.max(100, TICK - state.lines * 20);

  useEffect(() => {
    if (state.started && !state.dead && !state.paused) {
      tickRef.current = setInterval(() => dispatch({ type: "TICK" }), speed);
    } else if (tickRef.current) {
      clearInterval(tickRef.current);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [state.started, state.dead, state.paused, speed]);

  useEffect(() => {
    if (state.dead) {
      const hs = Number(localStorage.getItem(HS_KEY) ?? 0);
      if (state.score > hs) localStorage.setItem(HS_KEY, String(state.score));
    }
  }, [state.dead, state.score]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveApp(null);
        return;
      }
      if (e.key === "Enter" && (!state.started || state.dead)) {
        dispatch({ type: "START" });
        return;
      }
      if (e.key === "p" || e.key === "P") {
        dispatch({ type: "PAUSE" });
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        dispatch({ type: "MOVE", dx: -1 });
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        dispatch({ type: "MOVE", dx: 1 });
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        dispatch({ type: "ROTATE" });
      }
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        dispatch({ type: "DROP" });
      }
    },
    [state.started, state.dead, setActiveApp]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Build display board
  const display: (string | null)[][] = state.board.map((r) => [...r]);
  if (state.started && !state.dead) {
    for (let r = 0; r < state.piece.shape.length; r++) {
      for (let c = 0; c < state.piece.shape[r].length; c++) {
        if (state.piece.shape[r][c]) {
          const y = state.y + r,
            x = state.x + c;
          if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
            display[y][x] = state.piece.color;
          }
        }
      }
    }
  }

  const hs = typeof window !== "undefined" ? Number(localStorage.getItem(HS_KEY) ?? 0) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center font-mono"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mb-2 text-sm flex gap-6" style={{ color: "var(--text-muted)" }}>
        <span>
          <span style={{ color: "var(--accent)" }}>TETRIS</span>
        </span>
        <span>score: {state.score}</span>
        <span>lines: {state.lines}</span>
        <span>best: {Math.max(hs, state.score)}</span>
      </div>

      <div
        style={{
          border: "1px solid var(--border-strong)",
          background: "var(--bg-secondary)",
          padding: "4px",
        }}
      >
        {display.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={x}
                style={{
                  width: "16px",
                  height: "16px",
                  background: cell ?? "transparent",
                  border: cell ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border)",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
        {!state.started && !state.dead && "[ENTER] start  [ESC] exit"}
        {state.started && !state.dead && "← → rotate  ↑ drop  P pause  [ESC] exit"}
        {state.dead && (
          <span>
            game over! <span style={{ color: "var(--accent)" }}>[ENTER]</span> retry [ESC] exit
          </span>
        )}
      </div>
    </div>
  );
}
