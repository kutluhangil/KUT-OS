import type { Command } from "@/lib/shell/types";

const BIO = `
  ╭──────────────────────────────────────────────────────╮
  │                                                      │
  │   kutluhan gil                                       │
  │   solo developer & saas builder                     │
  │   istanbul, turkey                                   │
  │                                                      │
  ╰──────────────────────────────────────────────────────╯

  I build web products — fast, obsessively, and usually
  without sleeping enough.

  Self-taught. Started with HTML in 2018. Fell down the
  rabbit hole. Never came back.

  Currently: building multiple SaaS products in public,
  learning everything there is to know about distribution,
  and occasionally shipping something that makes people
  ask "how?"

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
