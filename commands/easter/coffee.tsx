import type { Command } from "@/lib/shell/types";

const COFFEE_FRAMES = [
  [
    "      ( (      ",
    "       ) )     ",
    "    ........   ",
    "    |      |]  ",
    "    \\      /   ",
    "     `----'    ",
  ],
  [
    "    )  (  )    ",
    "      ) (      ",
    "    ........   ",
    "    |      |]  ",
    "    \\      /   ",
    "     `----'    ",
  ],
];

export const coffeeCommand: Command = {
  name: "coffee",
  aliases: ["☕"],
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => {
    const frame = COFFEE_FRAMES[Math.floor(Date.now() / 800) % 2];
    return {
      type: "text",
      content: [
        "",
        ...frame.map((l) => `  ${l}`),
        "",
        "  ☕  here's your coffee. now get back to coding.",
        "",
      ].join("\n"),
    };
  },
};
