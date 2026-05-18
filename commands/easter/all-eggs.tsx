import type { Command } from "@/lib/shell/types";
import { useTerminalStore } from "@/store/useTerminalStore";

/* ─── fortune ─────────────────────────────────────────────── */
const QUOTES = [
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"The best time to start was yesterday. The second best time is now."',
  '"Shipping beats perfecting."',
  '"Programs must be written for people to read." — SICP',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Any fool can write code a computer can understand. Good programmers write code humans can understand." — Fowler',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
  '"It works on my machine." — every developer, ever',
  '"sudo !!',
];

export const fortuneCommand: Command = {
  name: "fortune",
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => ({
    type: "text",
    content: "\n  " + QUOTES[Math.floor(Math.random() * QUOTES.length)] + "\n",
  }),
};

/* ─── cowsay ────────────────────────────────────────────────── */
export const cowsayCommand: Command = {
  name: "cowsay",
  description: "...",
  category: "easter",
  hidden: true,
  handler: (args) => {
    const text = args.join(" ") || "moo";
    const bar = "-".repeat(text.length + 2);
    return {
      type: "text",
      content: [
        "",
        `  +${bar}+`,
        `  | ${text} |`,
        `  +${bar}+`,
        "         \\   ^__^",
        "          \\  (oo)\\_______",
        "             (__)\\       )\\/\\",
        "                 ||----w |",
        "                 ||     ||",
        "",
      ].join("\n"),
    };
  },
};

/* ─── hack ───────────────────────────────────────────────────── */
const HACK_LINES = [
  "Initiating breach protocol...",
  "Bypassing firewall layer 1... ████████████ OK",
  "Bypassing firewall layer 2... ████████████ OK",
  "Cracking RSA-2048... ████████░░░░ 73%",
  "Cracking RSA-2048... ████████████ DONE",
  "Accessing mainframe... connected",
  "Downloading: /etc/shadow ........ 100%",
  "Downloading: /home/root/.ssh/id_rsa 100%",
  "Covering tracks... done",
  "Mission accomplished. FBI has been notified. Just kidding.",
  "",
  "  (This was fake. Please don't do this in real life.)",
];

export const hackCommand: Command = {
  name: "hack",
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => ({
    type: "text",
    content: "\n" + HACK_LINES.map((l) => (l ? "  " + l : "")).join("\n") + "\n",
  }),
};

/* ─── 42 ─────────────────────────────────────────────────────── */
export const fortyTwoCommand: Command = {
  name: "42",
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => ({
    type: "text",
    content: "\n  42 — the answer to life, the universe, and everything.\n",
  }),
};

/* ─── xyzzy ──────────────────────────────────────────────────── */
export const xyzzyCommand: Command = {
  name: "xyzzy",
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => ({ type: "text", content: "\n  nothing happens.\n" }),
};

/* ─── :q ─────────────────────────────────────────────────────── */
export const vimExitCommand: Command = {
  name: ":q",
  aliases: [":wq", ":q!"],
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => ({
    type: "text",
    content: "\n  you're not in vim.\n  type \`exit\` to try that.\n",
  }),
};

/* ─── exit ───────────────────────────────────────────────────── */
export const exitCommand: Command = {
  name: "exit",
  aliases: ["quit", "logout"],
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => ({
    type: "text",
    content: "\n  you can't leave KUT/OS.\n  but you can close the tab. we won't judge.\n",
  }),
};

/* ─── night-mode ─────────────────────────────────────────────── */
export const nightModeCommand: Command = {
  name: "night-mode",
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
      return {
        type: "text",
        content:
          "\n  night mode activated. it's quiet in here.\n  the real easter eggs only appear at night.\n",
      };
    }
    return {
      type: "text",
      content:
        "\n  this command only works between 00:00 and 06:00 IST.\n  come back at midnight.\n",
    };
  },
};

/* ─── secret ─────────────────────────────────────────────────── */
export const secretCommand: Command = {
  name: "secret",
  description: "...",
  category: "easter",
  hidden: true,
  handler: (_args, _flags, ctx) => {
    if (!ctx.secretUnlocked) {
      return {
        type: "error",
        message: "secret: command not found",
      };
    }
    return {
      type: "text",
      content: [
        "",
        "  ✦ you found the secret command. well done.",
        "",
        "  hidden commands you may not have tried:",
        "    sudo hire-me    fortune    cowsay    hack",
        "    42    xyzzy    :q    exit    coffee",
        "    night-mode    cat ~/.secrets/🥚.txt",
        "",
        "  also: try the Konami code ↑↑↓↓←→←→BA",
        "",
        "  keep exploring. there's more.",
        "",
      ].join("\n"),
    };
  },
};

/* ─── make (sandwich) ────────────────────────────────────────── */
export const makeCommand: Command = {
  name: "make",
  description: "...",
  category: "easter",
  hidden: true,
  handler: (args) => {
    const target = args.join(" ").toLowerCase();
    if (target === "me a sandwich") {
      return {
        type: "text",
        content: "\n  what? make it yourself.\n  (try: sudo make me a sandwich)\n",
      };
    }
    return {
      type: "error",
      message: `make: *** No rule to make target '${target}'. Stop.`,
    };
  },
};

/* ─── weather ─────────────────────────────────────────────────── */
export const weatherCommand: Command = {
  name: "weather",
  description: "...",
  category: "easter",
  hidden: true,
  handler: () => ({
    type: "text",
    content: [
      "",
      "  Istanbul, TR",
      "  ☀  24°C — Clear skies",
      "  Wind: 12 km/h SW",
      "  Humidity: 62%",
      "",
      "  (this is fake weather. but istanbul is genuinely beautiful.)",
      "",
    ].join("\n"),
  }),
};

/* ─── factory-reset ───────────────────────────────────────────── */
export const factoryResetCommand: Command = {
  name: "factory-reset",
  description: "reset filesystem to defaults",
  category: "meta",
  hidden: false,
  handler: () => {
    import("@/lib/fs/persist").then(({ resetFS }) => resetFS());
    useTerminalStore.getState().clearOutput();
    return {
      type: "text",
      content: "\n  filesystem reset to factory defaults.\n",
    };
  },
};
