import type { Command } from "@/lib/shell/types";

const BIO = `
  ╭──────────────────────────────────────────────────────╮
  │                                                      │
  │   kutluhan gül                                       │
  │   full stack developer                               │
  │   istanbul, turkey                                   │
  │                                                      │
  ╰──────────────────────────────────────────────────────╯

  Full stack developer with a background that spans
  hospitality, customer success at Amazon, and now
  software engineering. I moved into tech deliberately —
  not by accident.

  Studied at GoIT (2025–present), Anadolu University
  (Computer Programming), and built a stack covering
  React, TypeScript, Node.js, REST APIs, and clean UI.

  My hospitality years taught me that great products,
  like great service, are about the person on the
  other side of the screen. That's why I obsess over UX.

  Currently: building projects that solve real problems,
  shipping code daily, leveling up the full stack.

  Beliefs:
  ● Ship before you're ready.
  ● Taste is a skill. So is speed.
  ● The best portfolio is a live product.
  ● Great tools deserve great UIs.

  This terminal is my portfolio. You're already in it.

  ─────────────────────────────────────────────────────

  \`projects\`     → see what I've built
  \`experience\`   → where I've been
  \`skills\`       → what I can do
  \`contact\`      → get in touch
  \`now\`          → what I'm doing right now
`.trimEnd();

export const aboutCommand: Command = {
  name: "about",
  aliases: ["bio"],
  description: "about kutluhan.gil",
  category: "portfolio",
  handler: () => ({ type: "text", content: BIO }),
};
