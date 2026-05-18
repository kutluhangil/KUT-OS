"use client";

import { useEffect, useReducer, useRef, useCallback } from "react";
import { useTerminalStore } from "@/store/useTerminalStore";

const COLS = 20;
const ROWS = 15;
const TICK = 120; // ms per frame
const HS_KEY = "kut-os-snake-hs";

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Pos = { x: number; y: number };

interface State {
  snake: Pos[];
  food: Pos;
  dir: Dir;
  nextDir: Dir;
  score: number;
  dead: boolean;
  started: boolean;
}

type Action = { type: "TICK" } | { type: "DIR"; dir: Dir } | { type: "START" } | { type: "RESET" };

function randomFood(snake: Pos[]): Pos {
  let pos: Pos;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

const INITIAL: State = {
  snake: [{ x: 10, y: 7 }],
  food: { x: 5, y: 5 },
  dir: "RIGHT",
  nextDir: "RIGHT",
  score: 0,
  dead: false,
  started: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === "START") return { ...INITIAL, started: true };
  if (action.type === "RESET") return { ...INITIAL };
  if (!state.started || state.dead) return state;

  if (action.type === "DIR") {
    const { dir } = action;
    const opposites: Record<Dir, Dir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
    if (opposites[dir] === state.dir) return state;
    return { ...state, nextDir: dir };
  }

  if (action.type === "TICK") {
    const dir = state.nextDir;
    const head = state.snake[0];
    const delta: Record<Dir, Pos> = {
      UP: { x: 0, y: -1 },
      DOWN: { x: 0, y: 1 },
      LEFT: { x: -1, y: 0 },
      RIGHT: { x: 1, y: 0 },
    };
    const d = delta[dir];
    const next = { x: head.x + d.x, y: head.y + d.y };

    // Wall collision
    if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
      return { ...state, dead: true };
    }
    // Self collision
    if (state.snake.slice(0, -1).some((s) => s.x === next.x && s.y === next.y)) {
      return { ...state, dead: true };
    }

    const ateFood = next.x === state.food.x && next.y === state.food.y;
    const newSnake = ateFood ? [next, ...state.snake] : [next, ...state.snake.slice(0, -1)];
    const newFood = ateFood ? randomFood(newSnake) : state.food;
    const newScore = ateFood ? state.score + 10 : state.score;

    return { ...state, snake: newSnake, food: newFood, score: newScore, dir };
  }

  return state;
}

export function Snake() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const { setActiveApp } = useTerminalStore();
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const highScore = typeof window !== "undefined" ? Number(localStorage.getItem(HS_KEY) ?? 0) : 0;

  // Save high score
  useEffect(() => {
    if (state.dead && state.score > highScore) {
      localStorage.setItem(HS_KEY, String(state.score));
    }
  }, [state.dead, state.score, highScore]);

  // Tick
  useEffect(() => {
    if (state.started && !state.dead) {
      tickRef.current = setInterval(() => dispatch({ type: "TICK" }), TICK);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [state.started, state.dead]);

  // Keyboard
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "UP",
        w: "UP",
        W: "UP",
        ArrowDown: "DOWN",
        s: "DOWN",
        S: "DOWN",
        ArrowLeft: "LEFT",
        a: "LEFT",
        A: "LEFT",
        ArrowRight: "RIGHT",
        d: "RIGHT",
        D: "RIGHT",
      };
      if (e.key === "Escape") {
        setActiveApp(null);
        return;
      }
      if (e.key === "Enter") {
        if (!state.started || state.dead) {
          dispatch({ type: "START" });
          return;
        }
      }
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        dispatch({ type: "DIR", dir });
      }
    },
    [state.started, state.dead, setActiveApp]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Render grid
  const grid = Array.from({ length: ROWS }, (_, y) =>
    Array.from({ length: COLS }, (_, x) => {
      if (state.snake[0]?.x === x && state.snake[0]?.y === y) return "head";
      if (state.snake.slice(1).some((s) => s.x === x && s.y === y)) return "body";
      if (state.food.x === x && state.food.y === y) return "food";
      return "empty";
    })
  );

  const CELL: Record<string, string> = {
    head: "●",
    body: "●",
    food: "◆",
    empty: "·",
  };
  const COLOR: Record<string, string> = {
    head: "var(--accent)",
    body: "var(--text-secondary)",
    food: "var(--error)",
    empty: "var(--border)",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center font-mono"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mb-3 text-sm" style={{ color: "var(--text-muted)" }}>
        <span style={{ color: "var(--accent)" }}>SNAKE</span>
        {"  "}score: {state.score}
        {"  "}best: {Math.max(highScore, state.score)}
      </div>

      {/* Grid */}
      <div
        style={{
          border: "1px solid var(--border-strong)",
          padding: "8px",
          background: "var(--bg-secondary)",
        }}
      >
        {grid.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <span
                key={x}
                style={{
                  color: COLOR[cell],
                  width: "14px",
                  display: "inline-block",
                  textAlign: "center",
                  fontSize: "12px",
                  lineHeight: "16px",
                }}
              >
                {CELL[cell]}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
        {!state.started && !state.dead && "[ENTER] start  [ESC] exit"}
        {state.started && !state.dead && "WASD / arrow keys  ·  [ESC] exit"}
        {state.dead && (
          <span>
            game over! <span style={{ color: "var(--accent)" }}>[ENTER]</span> retry{" "}
            <span style={{ color: "var(--text-muted)" }}>[ESC]</span> exit
          </span>
        )}
      </div>
    </div>
  );
}
