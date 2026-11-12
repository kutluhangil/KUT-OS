<div align="center">

<img src="docs/media/hero.svg" alt="KUT/OS — a living terminal portfolio that boots in the browser" width="100%">

<p>
  <a href="https://kut-os.vercel.app"><img alt="Live demo" src="https://img.shields.io/badge/live%20demo-type%20help-39ff7a?style=for-the-badge&labelColor=020803"></a>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-ff4fd8?style=for-the-badge&labelColor=020803">
  <img alt="Shell" src="https://img.shields.io/badge/shell-custom%20parser-3ad1ff?style=for-the-badge&labelColor=020803">
  <img alt="Web Audio" src="https://img.shields.io/badge/sound-Web%20Audio-39ff7a?style=for-the-badge&labelColor=020803">
</p>

<p><em>Not a portfolio site but a tiny operating system that lives in your browser.<br>
It boots, it has a file system, games, a music player, an assistant and more easter eggs than it admits.</em></p>

</div>

<img src="docs/media/divider.svg" width="100%" alt="">

## What it is

KUT/OS starts with a CRT-style POST sequence and drops you into a real shell: a custom parser, a command registry, fuzzy autocomplete and <kbd>Ctrl</kbd> <kbd>R</kbd> history search. The portfolio is something you explore with `ls`, `cat` and `open`, not something you scroll.

```
~/kut.os ➜ help
~/kut.os ➜ ls projects
~/kut.os ➜ cat about.md
~/kut.os ➜ ask what do you build?
~/kut.os ➜ play
```

<img src="docs/media/divider.svg" width="100%" alt="">

## Features

| | |
|---|---|
| **Real shell** | Custom parser, command registry, fuzzy autocomplete and reverse history search. |
| **Virtual file system** | `ls`, `cd`, `cat`, `mkdir`, `touch`, `rm`, `mv`, `tree`, persisted to `localStorage`. |
| **Three themes** | Minimal (green), Cyberpunk (magenta) and Mainframe (IBM green). |
| **Mini games** | Snake, Tetris and Matrix rain, fullscreen and keyboard driven. |
| **Assistant** | `ask <question>` streams an answer grounded in the portfolio. |
| **Music player** | `play` starts lo-fi tracks with keyboard controls and a status-bar readout. |
| **Vim editor** | Normal, insert and command modes, `:wq` and `:q!`, saving to the virtual FS. |
| **Guestbook** | Visitors can leave a message, stored through an API route. |
| **WebGL backdrop** | A Three.js particle field that reacts to your typing. |
| **Sound** | UI sounds synthesised in Web Audio, with no audio file dependencies. |
| **15+ easter eggs** | The Konami code, a night mode, hidden commands. Good luck. |

<img src="docs/media/divider.svg" width="100%" alt="">

## How it fits together

```mermaid
flowchart LR
  BOOT[Boot · POST · 2.4 s] --> T[Terminal]
  T --> P[Shell parser] --> REG[Command registry]
  REG --> FS[Virtual FS · localStorage]
  REG --> APPS[Apps · games · vim · player]
  REG --> AI[ask → API route · streaming]
  REG --> GB[Guestbook → KV]
  T --> FX[WebGL particles · themes · sound]
```

<img src="docs/media/divider.svg" width="100%" alt="">

## Türkçe özet

**KUT/OS**, klasik bir portfolyo sitesi değil; tarayıcıda açılan küçük bir terminal işletim sistemi. CRT tarzı bir açılışla başlıyor, gerçek bir kabuk (komut ayrıştırıcı, otomatik tamamlama, geçmiş arama) ve sanal bir dosya sistemi sunuyor. Portfolyo `ls`, `cat` ve `open` komutlarıyla geziliyor. İçinde Snake, Tetris, Vim editörü, müzik çalar, ziyaretçi defteri, portfolyo hakkında soru cevaplayan bir asistan ve 15'ten fazla gizli sürpriz var.

<img src="docs/media/divider.svg" width="100%" alt="">

## Development

```sh
pnpm install
cp .env.local.example .env.local   # assistant key and KV for the guestbook
pnpm dev                           # http://localhost:3000
pnpm test                          # vitest
pnpm type-check
pnpm build
```

```
commands/     core, fs, portfolio, apps, meta and easter-egg commands
lib/shell/    parser, registry, autocomplete, history
lib/fs/       virtual file system
components/   terminal, boot sequence, apps, effects
content/      the portfolio as files
app/api/      assistant, guestbook and music routes
```

<div align="center">
<br>
<a href="https://github.com/kutluhangil"><img src="docs/media/signature.svg" width="100%" alt="Built by kutluhangil"></a>
<sub>~/kut.os ➜ type <code>help</code> to begin</sub>
</div>
