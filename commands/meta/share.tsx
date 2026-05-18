import type { Command } from "@/lib/shell/types";

export const shareCommand: Command = {
  name: "share",
  description: "copy link to clipboard",
  category: "meta",
  handler: () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://kut.os";
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      return {
        type: "text",
        content: `  link copied to clipboard: ${url}`,
      };
    }
    return {
      type: "text",
      content: `  share this link: ${url}`,
    };
  },
};
