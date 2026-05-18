/** KUT/OS ASCII logo — used in boot sequence and `about` */
export const ASCII_LOGO = `
██╗  ██╗██╗   ██╗████████╗ ██████╗ ███████╗
██║ ██╔╝██║   ██║╚══██╔══╝██╔═══██╗██╔════╝
█████╔╝ ██║   ██║   ██║   ██║   ██║███████╗
██╔═██╗ ██║   ██║   ██║   ██║   ██║╚════██║
██║  ██╗╚██████╔╝   ██║   ╚██████╔╝███████║
╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚══════╝
`.trim();

/** Compact version for status bar */
export const ASCII_LOGO_SMALL = "KUT/OS";

/** ASCII horizontal rule */
export function hr(width = 60, char = "─"): string {
  return char.repeat(width);
}

/** ASCII box */
export function box(content: string, width = 60): string {
  const lines = content.split("\n");
  const top = "┌" + "─".repeat(width - 2) + "┐";
  const bottom = "└" + "─".repeat(width - 2) + "┘";
  const middle = lines.map((l) => "│ " + l.padEnd(width - 4) + " │").join("\n");
  return [top, middle, bottom].join("\n");
}

/** ASCII progress bar */
export function progressBar(value: number, max = 100, width = 20): string {
  const filled = Math.round((value / max) * width);
  const empty = width - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}
