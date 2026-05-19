<div align="center">

<br />

<img src="https://img.shields.io/badge/KUT%2FOS-v1.0.0-c1ff00?style=for-the-badge&logoColor=black" alt="version" />
<img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextjs" />
<img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
<img src="https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="threejs" />
<img src="https://img.shields.io/badge/Claude-Haiku-d97706?style=for-the-badge&logoColor=white" alt="claude" />
<img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="vercel" />

<br /><br />

```
  ██╗  ██╗██╗   ██╗████████╗ ██████╗ ███████╗
  ██║ ██╔╝██║   ██║╚══██╔══╝██╔═══██╗██╔════╝
  █████╔╝ ██║   ██║   ██║   ██║   ██║███████╗
  ██╔═██╗ ██║   ██║   ██║   ██║   ██║╚════██║
  ██║  ██╗╚██████╔╝   ██║   ╚██████╔╝███████║
  ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚══════╝

  v1.0.0  —  ~/kut.os ➜  type `help` to begin
```

### **Kutluhan Gil** — Portfolyo değil, işletim sistemi. / Not a portfolio — an operating system.

[🌐 Live Demo](https://kutos.dev) · [📬 Contact](https://kutos.dev) · [💼 LinkedIn](https://www.linkedin.com/in/kutluhangil) · [🐙 GitHub](https://github.com/kutluhangil)

</div>

---

<div align="center">

🇹🇷 **Türkçe** · 🇬🇧 [English](#-overview)

</div>

---

## ✦ Genel Bakış

KUT/OS, klasik bir portfolyo sitesi değil — tarayıcıda çalışan, gerçek bir terminal işletim sistemi.

Açılışta sistem başlar, dosya sistemi var, oyunlar var, AI asistan var, 15'ten fazla easter egg var. Sadece "portföyümü terminal gibi yaptım" değil; shell parser'ı, komut kaydı, sanal dosya sistemi, müzik çalar ve çok daha fazlası gerçekten çalışıyor.

~2 haftada, 9 agent sistemiyle sıfırdan inşa edildi. Vercel'de yaşıyor, tarayıcında 60fps koşuyor.

## ⚡ Özellikler

| Özellik                    | Açıklama                                                                         |
| -------------------------- | -------------------------------------------------------------------------------- |
| 🖥️ **Gerçek Shell**        | Özel parser, komut kaydı, fuzzy autocomplete, Ctrl+R geçmiş arama                |
| 📁 **Sanal Dosya Sistemi** | `ls`, `cd`, `cat`, `mkdir`, `touch`, `rm`, `mv`, `tree` — localStorage'a persist |
| 🎨 **3 Tema**              | Minimal (yeşil) · Cyberpunk (magenta) · Mainframe (IBM yeşili)                   |
| 🎮 **Mini Oyunlar**        | Snake, Tetris, Matrix rain — tam ekran, klavye kontrollü                         |
| 🤖 **AI Asistan**          | `ask <soru>` → Claude Haiku portfolyo bağlamında cevaplar, streaming             |
| 🎵 **Müzik Çalar**         | `play` komutu, lo-fi tracklar, klavye kontrolleri, status bar gösterimi          |
| ✏️ **Vim Editör**          | Normal/insert/command modları, `:wq` `:q!`, VFS'e kayıt                          |
| 📖 **Guestbook**           | Ziyaretçi mesajları bırakabilir, API ile kalıcı                                  |
| 🌌 **WebGL Arka Plan**     | Three.js parçacık sistemi, yazma aktivitesine tepki veriyor                      |
| 🚀 **Sinematik Boot**      | CRT tarzı POST mesajları, 2.4s başlangıç sekansı                                 |
| 🔊 **Ses Sistemi**         | Web Audio API sentezi — sıfır dosya bağımlılığı                                  |
| 🥚 **15+ Easter Egg**      | Konami kodu, gece modu, gizli komutlar... iyi şanslar                            |

## 🛠️ Teknoloji Yığını

```
Çerçeve        →  Next.js 14 App Router
Dil            →  TypeScript (strict)
Stil           →  Tailwind CSS v3 + CSS Custom Properties
Durum Yönt.    →  Zustand + persist middleware
Animasyon      →  Framer Motion
3D / WebGL     →  Three.js + @react-three/fiber
Ses            →  Howler.js + Web Audio API
AI             →  Anthropic Claude Haiku (streaming)
Deploy         →  Vercel (fra1 region)
Test           →  Vitest (16 test)
```

## 🚀 Kurulum

```bash
# Repoyu klonla
git clone https://github.com/kutluhangil/kut-os
cd kut-os

# Bağımlılıkları yükle
pnpm install

# Ortam değişkenlerini ayarla
cp .env.local.example .env.local
# .env.local içine ANTHROPIC_API_KEY ekle

# Geliştirme sunucusunu başlat
pnpm dev
```

`http://localhost:3000` aç ve `help` yaz.

---

## ✦ Overview

KUT/OS is not a portfolio website — it's a browser-based operating system.

It boots, it has a real filesystem, it has games, it has an AI assistant, and it has more easter eggs than I'd like to admit. The shell parser, command registry, virtual filesystem, music player, and Vim editor are all real — not simulated.

Built from scratch in ~2 weeks using a 9-agent system. Deployed on Vercel, runs at 60fps in your browser.

## ⚡ Key Features

| Feature                   | Description                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- |
| 🖥️ **Real Shell**         | Custom parser, command registry, fuzzy autocomplete, Ctrl+R history search          |
| 📁 **Virtual Filesystem** | `ls`, `cd`, `cat`, `mkdir`, `touch`, `rm`, `mv`, `tree` — persisted to localStorage |
| 🎨 **3 Themes**           | Minimal (green) · Cyberpunk (magenta) · Mainframe (IBM green)                       |
| 🎮 **Mini-Games**         | Snake, Tetris, Matrix rain — fullscreen, keyboard-controlled                        |
| 🤖 **AI Assistant**       | `ask <question>` → Claude Haiku answers with portfolio context, streaming           |
| 🎵 **Music Player**       | `play` command, lo-fi tracks, keyboard controls, status bar display                 |
| ✏️ **Vim Editor**         | Normal/insert/command modes, `:wq` `:q!`, writes to VFS                             |
| 📖 **Guestbook**          | Visitors can leave messages, persisted via API                                      |
| 🌌 **WebGL Background**   | Three.js particle system, reacts to typing activity                                 |
| 🚀 **Cinematic Boot**     | CRT-style POST messages, 2.4s startup sequence                                      |
| 🔊 **Sound System**       | Web Audio API synthesis — zero file dependencies                                    |
| 🥚 **15+ Easter Eggs**    | Konami code, night mode, secret commands... good luck                               |

## 🗂️ Commands

```
CORE       help, clear, echo, whoami
META       theme, history, sound, share, ask
FS         ls, cd, cat, pwd, mkdir, touch, rm, mv, tree
PORTFOLIO  about, projects, experience, skills, contact, social, resume, now
APPS       matrix, snake, tetris, play, vim, guestbook
EASTER     sudo, coffee, hire-me, fortune, cowsay, hack, ...and more
```

## 🛠️ Tech Stack

```
Framework      →  Next.js 14 App Router
Language       →  TypeScript (strict)
Styling        →  Tailwind CSS v3 + CSS Custom Properties
State          →  Zustand + persist middleware
Animations     →  Framer Motion
3D / WebGL     →  Three.js + @react-three/fiber
Audio          →  Howler.js + Web Audio API
AI             →  Anthropic Claude Haiku (streaming)
Deployment     →  Vercel (fra1 region)
Testing        →  Vitest (16 tests)
```

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 20`
- pnpm

### Local Development

```bash
# Clone the repository
git clone https://github.com/kutluhangil/kut-os
cd kut-os

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Start the development server
pnpm dev
```

Open `http://localhost:3000` and type `help`.

## ☁️ Deploy to Vercel

```bash
# Via CLI
npx vercel --prod

# Or import from GitHub at vercel.com/new
```

**Required environment variables in Vercel dashboard:**

| Variable               | Description                                   |
| ---------------------- | --------------------------------------------- |
| `ANTHROPIC_API_KEY`    | For the `ask` AI command                      |
| `NEXT_PUBLIC_SITE_URL` | Your custom domain (e.g. `https://kutos.dev`) |

## 📐 Project Structure

```
kut-os/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (ask, guestbook, visitors, og)
│   ├── layout.tsx          # Root layout with metadata & JSON-LD
│   └── page.tsx            # Boot sequence → Terminal
├── commands/               # All ~45 terminal commands
│   ├── core/               # help, clear, echo, whoami
│   ├── fs/                 # ls, cd, cat, mkdir, touch, rm, mv, tree
│   ├── portfolio/          # about, projects, experience, skills, ...
│   ├── apps/               # matrix, snake, tetris, play, vim, guestbook
│   ├── meta/               # theme, history, sound, share, ask
│   └── easter/             # sudo, coffee, hire-me, fortune, ...
├── components/
│   ├── apps/               # MatrixRain, Snake, Tetris, MusicPlayer, Vim, Guestbook
│   ├── boot/               # BootSequence
│   ├── effects/            # AmbientBg (WebGL)
│   └── terminal/           # Terminal, InputLine, StatusBar, OutputRenderer, ...
├── lib/
│   ├── shell/              # parser, registry, executor, history, autocomplete
│   ├── fs/                 # filesystem (VFS), persist, ops
│   ├── audio/              # soundbank, musicPlayer, tracks
│   ├── ai/                 # system prompt + context builder
│   └── themes/             # theme applicator
├── store/                  # Zustand store (useTerminalStore)
├── content/                # projects.json, about.mdx
├── public/                 # favicon.svg, music/, sounds/
└── vercel.json             # Vercel deployment config
```

## 🥚 Easter Eggs

**15'ten fazla gizli komut var. / There are 15+ hidden commands.**

Bazıları belirli koşullar gerektiriyor. Bazıları sadece gece çalışıyor. Bazıları yeterince komut yazdıktan sonra açılıyor. Konami kodunu biliyor musun?

Some require specific conditions. Some only work at night. Some unlock after you've typed enough commands. Do you know the Konami code?

```
↑ ↑ ↓ ↓ ← → ← → B A
```

## 🤝 İletişim / Contact

- Email: [kutluhangil@windowslive.com](mailto:kutluhangil@windowslive.com)
- LinkedIn: [Kutluhan Gil](https://www.linkedin.com/in/kutluhangil)
- GitHub: [kutluhangil](https://github.com/kutluhangil)

---

<div align="center">

_"portfolyomu işletim sistemi olarak yazdım"_

<br />

Built with obsession by [kutluhangil](https://github.com/kutluhangil)

<br />

_Beğendiysen ⭐ vermeyi unutma / If you like it, don't forget to ⭐_

</div>
