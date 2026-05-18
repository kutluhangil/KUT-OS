import { useTerminalStore } from "@/store/useTerminalStore";
import Fuse from "fuse.js";

const MAX_HISTORY = 100;

export function pushToHistory(command: string): void {
  if (!command.trim()) return;
  useTerminalStore.getState().pushHistory(command);
}

export function navigateHistory(direction: "up" | "down"): string {
  const { commandHistory, historyIndex, setHistoryIndex, setInput } = useTerminalStore.getState();

  if (commandHistory.length === 0) return "";

  let newIndex: number;

  if (direction === "up") {
    newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
  } else {
    if (historyIndex === -1) return "";
    newIndex = historyIndex >= commandHistory.length - 1 ? -1 : historyIndex + 1;
  }

  setHistoryIndex(newIndex);

  const entry = newIndex === -1 ? "" : (commandHistory[newIndex]?.command ?? "");
  setInput(entry);
  return entry;
}

export function searchHistory(query: string): string[] {
  const { commandHistory } = useTerminalStore.getState();
  if (!query) return commandHistory.map((e) => e.command).reverse();

  const fuse = new Fuse(commandHistory, {
    keys: ["command"],
    threshold: 0.4,
  });

  return fuse.search(query).map((r) => r.item.command);
}

export function getHistoryList(): string[] {
  const { commandHistory } = useTerminalStore.getState();
  return commandHistory.map((e) => e.command);
}
