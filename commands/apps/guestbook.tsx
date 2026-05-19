import type { Command } from "@/lib/shell/types";
import { useTerminalStore } from "@/store/useTerminalStore";

export const guestbookCommand: Command = {
  name: "guestbook",
  description: "view and sign the visitor guestbook",
  category: "apps",
  aliases: ["gb", "sign"],
  handler: () => {
    useTerminalStore.getState().setActiveApp("guestbook");
    return { type: "text", content: "  opening guestbook..." };
  },
};
