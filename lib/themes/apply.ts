import { minimalTheme } from "./minimal";
import { cyberpunkTheme } from "./cyberpunk";
import { mainframeTheme } from "./mainframe";
import type { Theme } from "@/store/useTerminalStore";

export const themes = {
  minimal: minimalTheme,
  cyberpunk: cyberpunkTheme,
  mainframe: mainframeTheme,
};

export function applyTheme(theme: Theme): void {
  const t = themes[theme];
  if (!t) return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  Object.entries(t.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function getThemeLabel(theme: Theme): string {
  return themes[theme]?.label ?? theme;
}
