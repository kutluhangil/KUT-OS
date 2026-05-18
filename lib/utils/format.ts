import { format, formatDistanceToNow } from "date-fns";

export function formatTime(date: Date): string {
  return format(date, "HH:mm:ss");
}

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDateTime(date: Date): string {
  return format(date, "yyyy-MM-dd HH:mm:ss");
}

export function timeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}K`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}M`;
}

export function padStart(str: string, length: number, char = " "): string {
  return str.padStart(length, char);
}

export function padEnd(str: string, length: number, char = " "): string {
  return str.padEnd(length, char);
}

/** Istanbul timezone clock string */
export function getISTTime(): string {
  return new Date().toLocaleTimeString("tr-TR", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
