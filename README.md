# KUT/OS

**A living terminal portfolio. Not a website pretending to be a terminal — a tiny operating system you can explore in your browser.**

```
  ██╗  ██╗██╗   ██╗████████╗ ██████╗ ███████╗
  ██║ ██╔╝██║   ██║╚══██╔══╝██╔═══██╗██╔════╝
  █████╔╝ ██║   ██║   ██║   ██║   ██║███████╗
  ██╔═██╗ ██║   ██║   ██║   ██║   ██║╚════██║
  ██║  ██╗╚██████╔╝   ██║   ╚██████╔╝███████║
  ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚══════╝

  v1.0.0  —  type `help` to begin
```

## What is this?

KUT/OS is my portfolio, reimagined as a browser-based terminal OS. It boots, it has a filesystem, it has games, it has an AI assistant, and it has more easter eggs than I'd like to admit.

Built in ~2 weeks. Ships to Vercel. Runs in your browser at 60fps.

## Features

- **Real shell** — parser, registry, executor, fuzzy autocomplete, command history (Ctrl+R)
- **Virtual filesystem** — `ls`, `cd`, `cat`, `mkdir`, `touch`, `rm`, `mv`, `tree`
- **3 themes** — minimal (green), cyberpunk (magenta), mainframe (IBM green)
- **Mini-games** — Snake, Tetris, Matrix rain (fullscreen)
- **AI assistant** — `ask <question>` → Claude Haiku answers from portfolio context
- **Music player** — `play` command, streaming lo-fi tracks, keyboard controls
- **WebGL ambient** — particle background, reacts to typing
- **Boot sequence** — CRT-style POST messages, 2.4s cinematic boot
- **15+ easter eggs** — find them all (or type `help` and look for hidden ones)
- **Sound effects** — Web Audio API synth, zero file dependencies

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v3-38bdf8?style=flat-square&logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=threedotjs)
![Anthropic](https://img.shields.io/badge/Claude-Haiku-orange?style=flat-square)

| Layer     | Tech                                    |
| --------- | --------------------------------------- |
| Framework | Next.js 14 App Router                   |
| Language  | TypeScript (strict)                     |
| Styling   | Tailwind CSS v3 + CSS custom properties |
| State     | Zustand + persist                       |
| Animation | Framer Motion                           |
| 3D        | Three.js + @react-three/fiber           |
| Audio     | Howler.js + Web Audio API               |
| AI        | Anthropic Claude Haiku                  |
| Deploy    | Vercel                                  |

## Quick Start

```bash
git clone https://github.com/kutluhangil/kut-os
cd kut-os
pnpm install
cp .env.local.example .env.local
# add your ANTHROPIC_API_KEY to .env.local
pnpm dev
```

Open `http://localhost:3000` and type `help`.

## Commands

```
CORE       help, clear, echo, whoami
META       theme, history, sound, share, ask
FS         ls, cd, cat, pwd, mkdir, touch, rm, mv, tree
PORTFOLIO  about, projects, experience, skills, contact, social, resume, now
APPS       matrix, snake, tetris, play
EASTER     sudo, coffee, hire-me, fortune, cowsay, ...and more
```

## Easter Eggs

There are **15+ hidden commands**. Some require specific conditions. Some only work at night. Some unlock after you've typed enough commands.

Good luck.

## Environment Variables

```bash
ANTHROPIC_API_KEY=      # required for `ask` command
NEXT_PUBLIC_SITE_URL=   # your deployment URL (for OG image, canonical)
```

## Deploy

```bash
vercel deploy
```

Set `ANTHROPIC_API_KEY` in your Vercel project environment variables.

## Author

**kutluhan.gil** — solo developer & saas builder, istanbul.

- GitHub: [@kutluhangil](https://github.com/kutluhangil)
- LinkedIn: [kutluhangil](https://linkedin.com/in/kutluhangil)

---

_"i portfolyomu işletim sistemi olarak yazdım"_
