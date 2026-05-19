import type { Command } from "@/lib/shell/types";

export const whoamiCommand: Command = {
  name: "whoami",
  description: "current user identity",
  category: "core",
  handler: (_, flags) => {
    if (flags["really"]) {
      return {
        type: "text",
        content: "  you're amazing for reading this far. seriously.",
      };
    }
    return {
      type: "text",
      content:
        "  kutluhan.gül — full stack developer · istanbul, turkey\n  try \`about\` for more.",
    };
  },
};
