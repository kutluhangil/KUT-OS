# 🖥️ KUT/OS

> **Living Terminal Portfolio** — Bir portfolyo sitesi değil, tarayıcıda yaşayan minik bir işletim sistemi.

```
version:  v1.0.0-blueprint
target:   Claude Code (VS Code)
stack:    Next.js 14 · TypeScript · Tailwind · Zustand
aesthetic: premium dark minimalism
build:    9 specialized agents
```

---

## 📌 TL;DR

Standart terminal portfolyolar sıkıcı: siyah arkaplan, yeşil yazı, beş komut, bitti.

**KUT/OS** farklı. Burası **gezilebilen, oynanabilen, paylaşılabilen** kendine has bir mikro OS. Boot sekansı var, çoklu pencere yöneticisi var, gerçek vim var, gizli klasörler var, ziyaretçi defteri var, AI sohbet modu var, üç farklı tema var, müzik çalar var. LinkedIn'de paylaştığında "bunu nasıl yaptın?" yorumları alırsın.

Bu dosya Claude Code için yazıldı. **9 ajan halinde organize edildi.** Her ajan belirli bir alanı sahipleniyor, sırayla çalıştırılacak.

İsim alternatifleri: `KUT/OS` (önerilen), `kut.sh`, `term://kutluhan`, `~kut`.

---

## 📋 İÇİNDEKİLER

1. [Vizyon & Farklılaştırıcılar](#-vizyon--farklılaştırıcılar)
2. [Tasarım Felsefesi](#-tasarım-felsefesi)
3. [Görsel Sistem](#-görsel-sistem)
4. [Teknoloji Yığını](#-teknoloji-yığını)
5. [Mimari Genel Bakış](#-mimari-genel-bakış)
6. [Klasör Yapısı](#-klasör-yapısı)
7. [Ajan Sistemi](#-ajan-sistemi)
8. [Komut Sözlüğü](#-komut-sözlüğü)
9. [Easter Egg Listesi](#-easter-eggs)
10. [Performans Hedefleri](#-performans-hedefleri)
11. [Deploy & SEO](#-deploy--seo)
12. [README Şablonu](#-readme-şablonu)

---

## 🎯 VİZYON & FARKLILAŞTIRICILAR

**Hedef:** Geliştirici portfolyolarının "klişe terminal" formatını gerçekten ileri taşıyan, paylaşıldığında insanların "bu nasıl yapıldı?" diye sorduğu bir proje.

### Klasik Terminal Portfolyo vs KUT/OS

| Klasik                 | KUT/OS                                                       |
| ---------------------- | ------------------------------------------------------------ |
| Statik komut listesi   | Sinematik **boot sekansı** + canlı OS hissi                  |
| Sadece metin çıktısı   | Komutlar **React component** döndürür (grafik, oyun, görsel) |
| Tek tema (yeşil/siyah) | **3 tema**: Minimal · Cyberpunk · IBM Mainframe              |
| Sahte vim              | **Gerçek vim modu**, dosyalar localStorage'da kalıcı         |
| Tek panel              | **tmux benzeri** çoklu pencere/panel desteği                 |
| Easter egg yok         | **15+ gizli komut**, gizli dosyalar, konami kodu             |
| Sessiz                 | Toggleable klavye tıklamaları, ambient lo-fi müzik           |
| Yardım komutu          | Bilinmeyen komut → **AI fallback** (doğal dil sohbet)        |
| Statik                 | Ziyaretçi sayacı, canlı saat, "now playing" Spotify          |
| Eski tarz              | **WebGL reaktif** ambient arkaplan (klavyeye tepki verir)    |
| Yorum yok              | `sign` komutuyla **ziyaretçi defteri** (Vercel KV)           |

### Hedef Etki

- ✅ LinkedIn paylaşımı: 5K+ etkileşim
- ✅ Hacker News "Show HN" potansiyeli
- ✅ Recruiter'lar "ben de böyle bir şey istiyorum" diyecek
- ✅ GitHub'da yıldız çekecek (open source)
- ✅ 2-3 haftalık solo dev çalışması ile bitirilebilir
- ✅ Her ziyaret biraz farklı (saat, persona, tema)

---

## 🎨 TASARIM FELSEFESİ

**Premium Dark Minimalism.** Bu, sıradan terminal estetiği değil. Apple Terminal'ı ile Linear'ın UI'sının çocuğu gibi düşün.

### Prensipler

1. **Restraint over decoration.** Neon parlamalar yok. Glow efektleri minimal. Tek aksan rengi.
2. **Motion serves meaning.** Animasyon süslemek için değil, durumu iletmek için.
3. **Type-driven design.** Tipografi karakter. Font seçimi tüm tasarımı taşır.
4. **Negative space is a feature.** Boşluğa saygı. Padding cömert.
5. **Sound is optional but exquisite.** Açıldığında film gibi olmalı, ama varsayılan kapalı.
6. **Discoverability over instruction.** Easter egg'ler kullanıcı keşfetsin diye var.
7. **Performance is design.** 60fps her zaman. Lighthouse 95+.

### Mood Board (Referans)

- Linear.app'in karanlık panel hissi
- Vercel dashboard'unun nefes alan ritmi
- Apple Terminal'ın temizliği
- Severance dizisinin Lumon arayüzü
- Teenage Engineering ürün dökümantasyonu
- Raycast launcher'ın geçişleri
- Warp terminal'ın yumuşaklığı

---

## 🌈 GÖRSEL SİSTEM

### Renk Paleti — `theme: minimal` (varsayılan)

```css
--bg-primary: #0a0a0a; /* near-black, pure feeling */
--bg-secondary: #111111; /* paneller, modaller */
--bg-elevated: #1a1a1a; /* hover, active states */
--border: #1f1f1f; /* incelikli ayırıcılar */
--border-strong: #2a2a2a;

--text-primary: #ededed; /* off-white, gözü yormaz */
--text-secondary: #a1a1a1; /* açıklamalar */
--text-muted: #6b6b6b; /* timestamp, meta */
--text-disabled: #404040;

--accent: #c1ff00; /* electric lime - sadece tek aksan */
--accent-dim: #c1ff0033; /* glow için */

--success: #4ade80;
--warning: #fbbf24;
--error: #f87171;

--cursor: var(--accent);
```

### `theme: cyberpunk`

```css
--bg-primary: #0d0221;
--accent: #ff00ff; /* magenta */
--text-primary: #00f0ff; /* cyan */
```

### `theme: mainframe` (IBM 3270 hommage)

```css
--bg-primary: #001100;
--accent: #00ff41; /* phosphor green */
--text-primary: #00cc33;
```

### Tipografi

```css
/* Display & UI */
--font-display: "JetBrains Mono", "IBM Plex Mono", monospace;

/* Body terminal */
--font-mono: "JetBrains Mono", monospace;
/* font-feature-settings: "calt", "liga", "ss01", "ss02"; */
/* (ligature'lar açık — "==>", "!=", "->") */

/* Skala */
--text-xs: 12px; /* meta, timestamp */
--text-sm: 13px; /* secondary */
--text-base: 14px; /* terminal default */
--text-md: 15px;
--text-lg: 18px; /* başlıklar */
--text-xl: 24px; /* boot logo */
--text-2xl: 36px;
```

### Spacing & Layout

```css
--padding-terminal: 32px; /* viewport padding */
--line-height: 1.65; /* generous, breathable */
--cursor-blink: 1.06s; /* CRT throwback */
```

### Animasyon

- **Cursor blink:** 1.06s sinüs (gerçek CRT terminallerin frekansı)
- **Boot sequence:** Toplam 2.4s, easings: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Command execution:** 80ms typing reveal effect (opsiyonel)
- **Pane transitions:** 220ms ease-out
- **Theme switch:** 400ms crossfade

### WebGL Ambient Background

- Çok düşük opasite (≤0.06) particle field veya soft noise
- Klavye girişlerinde `lerp` ile reaksiyon: yazdıkça ufak dalga
- Boş kaldığında `breathing` döngüsü (4s sinüs)
- GPU yükü: <2% (RAF throttling)
- Toggle: `bg --off`

---

## 🛠️ TEKNOLOJİ YIĞINI

### Core

| Katman      | Teknoloji                        | Sebep                              |
| ----------- | -------------------------------- | ---------------------------------- |
| Framework   | **Next.js 14** (App Router)      | Static export uyumlu, SEO için SSR |
| Dil         | **TypeScript** (strict)          | Komut registry tip güvenliği       |
| Styling     | **Tailwind CSS** + CSS Variables | Tema sistemi için                  |
| State       | **Zustand**                      | Hafif, terminal store için ideal   |
| Animasyon   | **Framer Motion**                | Boot, transitions                  |
| 3D / WebGL  | **Three.js** + **R3F**           | Ambient background, 3D mode        |
| Audio       | **Howler.js**                    | Sound effects, music player        |
| AI          | **Anthropic API** (Claude Haiku) | AI fallback komutu                 |
| Persistence | **localStorage** + **Vercel KV** | FS + guestbook                     |
| Deploy      | **Vercel**                       | Edge, hızlı, ücretsiz              |
| Fonts       | **next/font** + JetBrains Mono   | Performans, no CLS                 |

### Geliştirme

- **Package manager:** pnpm
- **Lint:** ESLint + Prettier
- **Test:** Vitest (sadece shell parser için)
- **Type check:** `tsc --noEmit` pre-commit
- **Git hooks:** Husky + lint-staged

### Bağımlılıklar

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^3.4.0",
    "zustand": "^4.5.0",
    "framer-motion": "^11.0.0",
    "three": "^0.165.0",
    "@react-three/fiber": "^8.16.0",
    "@react-three/drei": "^9.108.0",
    "howler": "^2.2.4",
    "@anthropic-ai/sdk": "^0.27.0",
    "@vercel/kv": "^2.0.0",
    "clsx": "^2.1.0",
    "date-fns": "^3.6.0",
    "fuse.js": "^7.0.0"
  }
}
```

---

## 🏗️ MİMARİ GENEL BAKIŞ

```
┌─────────────────────────────────────────────────────────────┐
│                      BOOT SEQUENCE                          │
│                   (2.4s, atlanabilir)                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       TERMINAL UI                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Status Bar (saat, tema, theme switcher, music)     │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  Output area (komut çıktıları, rich components)      │   │
│  │                                                       │   │
│  │  ┌────────────────┐  ┌────────────────┐              │   │
│  │  │  Pane 1        │  │  Pane 2        │ (tmux)      │   │
│  │  │                │  │                │              │   │
│  │  └────────────────┘  └────────────────┘              │   │
│  │                                                       │   │
│  │  ~ kutluhan@kut.os  ➜  _                             │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Hints bar (autocomplete suggestions)                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Ambient WebGL canvas (z: -1, opacity: 0.06)                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      SHELL ENGINE                           │
│   parser → registry → executor → rich output renderer       │
└─────────────────────────────────────────────────────────────┘
        │            │             │              │
        ▼            ▼             ▼              ▼
   ┌────────┐  ┌─────────┐  ┌──────────┐  ┌─────────────┐
   │  FS    │  │  Apps   │  │  Audio   │  │  AI Client  │
   │ (vfs)  │  │ (vim,   │  │ (Howler) │  │ (Anthropic) │
   │        │  │  snake) │  │          │  │             │
   └────────┘  └─────────┘  └──────────┘  └─────────────┘
```

### Veri Akışı

1. User keystroke → `useTerminalStore.input` güncellenir
2. Enter → parser → tokenize → registry lookup
3. Komut bulundu → executor çağırılır (sync veya async)
4. Output → React component veya string
5. Store'a push → otomatik re-render → scroll bottom
6. State persiste edilir (gerekirse): theme, fs, history

---

## 📁 KLASÖR YAPISI

```
kut-os/
├── app/
│   ├── layout.tsx                  # root layout + fonts
│   ├── page.tsx                    # ana sayfa: <BootSequence /> + <Terminal />
│   ├── globals.css                 # CSS variables, base styles
│   └── api/
│       ├── ask/route.ts            # AI fallback endpoint
│       ├── guestbook/route.ts      # GET/POST visitor messages
│       ├── now-playing/route.ts    # Spotify (opsiyonel)
│       └── visitors/route.ts       # visitor counter
│
├── components/
│   ├── boot/
│   │   ├── BootSequence.tsx        # ana boot orchestrator
│   │   ├── BootLogo.tsx
│   │   ├── BootProgress.tsx
│   │   └── BootText.tsx            # POST messages
│   │
│   ├── terminal/
│   │   ├── Terminal.tsx            # ana container
│   │   ├── Prompt.tsx              # ~kut@kutluhan ➜
│   │   ├── InputLine.tsx
│   │   ├── OutputRenderer.tsx      # rich/text output ayrıştırma
│   │   ├── CursorBlink.tsx
│   │   ├── StatusBar.tsx           # üst bar
│   │   ├── HintBar.tsx             # autocomplete önerileri
│   │   └── PaneManager.tsx         # tmux-style split
│   │
│   ├── effects/
│   │   ├── AmbientBg.tsx           # WebGL R3F canvas
│   │   ├── CRTOverlay.tsx          # opsiyonel scanline
│   │   └── KeyParticles.tsx        # klavye reaksiyon
│   │
│   ├── apps/                       # "uygulamalar"
│   │   ├── Vim.tsx                 # gerçek modlu editor
│   │   ├── Snake.tsx
│   │   ├── Tetris.tsx
│   │   ├── MatrixRain.tsx
│   │   ├── MusicPlayer.tsx
│   │   └── Guestbook.tsx
│   │
│   └── ui/                         # küçük UI parçaları
│       ├── Window.tsx
│       ├── Card.tsx
│       └── KBD.tsx                 # <kbd> stilizasyonu
│
├── lib/
│   ├── shell/
│   │   ├── parser.ts               # tokenize, flags, pipes
│   │   ├── registry.ts             # CommandRegistry singleton
│   │   ├── history.ts              # ↑/↓ navigation
│   │   ├── autocomplete.ts         # tab completion
│   │   ├── executor.ts             # async execution + cancellation
│   │   └── types.ts                # Command, Output tipler
│   │
│   ├── fs/
│   │   ├── filesystem.ts           # tree-based vfs
│   │   ├── persist.ts              # localStorage senkr.
│   │   ├── seedFiles.ts            # default dosyalar
│   │   └── ops.ts                  # ls, cat, mkdir, etc.
│   │
│   ├── audio/
│   │   ├── soundbank.ts            # key click, boot, etc.
│   │   ├── musicPlayer.ts          # play/pause/next
│   │   └── tracks.ts               # lo-fi URL listesi
│   │
│   ├── ai/
│   │   └── client.ts               # Anthropic API wrapper
│   │
│   ├── themes/
│   │   ├── minimal.ts
│   │   ├── cyberpunk.ts
│   │   ├── mainframe.ts
│   │   └── apply.ts                # CSS var injection
│   │
│   └── utils/
│       ├── cn.ts                   # clsx wrapper
│       ├── format.ts               # date, size formatting
│       └── ascii.ts                # ASCII art helpers
│
├── commands/                       # her komut bir dosya
│   ├── index.ts                    # registry export
│   ├── core/
│   │   ├── help.tsx
│   │   ├── clear.tsx
│   │   ├── echo.tsx
│   │   └── whoami.tsx
│   ├── portfolio/
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   ├── experience.tsx
│   │   ├── skills.tsx
│   │   ├── contact.tsx
│   │   ├── resume.tsx
│   │   ├── social.tsx
│   │   └── now.tsx
│   ├── fs/
│   │   ├── ls.tsx
│   │   ├── cd.tsx
│   │   ├── cat.tsx
│   │   ├── mkdir.tsx
│   │   ├── touch.tsx
│   │   ├── rm.tsx
│   │   └── pwd.tsx
│   ├── apps/
│   │   ├── vim.tsx
│   │   ├── snake.tsx
│   │   ├── tetris.tsx
│   │   ├── matrix.tsx
│   │   ├── play.tsx
│   │   └── guestbook.tsx
│   ├── meta/
│   │   ├── theme.tsx
│   │   ├── ask.tsx                 # AI komutu
│   │   ├── history.tsx
│   │   └── share.tsx
│   └── easter/
│       ├── sudo.tsx
│       ├── coffee.tsx
│       ├── hire-me.tsx
│       └── rm-rf.tsx
│
├── content/                        # statik veri
│   ├── about.mdx
│   ├── projects.json
│   ├── experience.json
│   ├── skills.json
│   └── secrets/                    # easter egg dosyaları
│       └── 🥚.txt
│
├── public/
│   ├── fonts/
│   │   └── JetBrainsMono-*.woff2
│   ├── sounds/
│   │   ├── key.mp3
│   │   ├── boot.mp3
│   │   └── error.mp3
│   ├── music/
│   │   └── lofi-*.mp3
│   ├── resume.pdf
│   ├── og.png                      # 1200x630 social preview
│   └── favicon.svg
│
├── store/
│   └── useTerminalStore.ts         # Zustand store
│
├── tests/
│   └── shell/
│       ├── parser.test.ts
│       └── registry.test.ts
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
├── README.md
└── .env.local.example
```

---

## 🤖 AJAN SİSTEMİ

Bu projeyi **9 specialized agent** ile build edeceğiz. Her ajan kendi dosya setini sahipleniyor. Sırayla çalıştırılacak — bir ajan tamamlanmadan sonraki başlamayacak.

### Ajanların Genel Görünümü

```
[1] ARCHITECT       →  Proje iskeleti, config, base layout
[2] AESTHETICIAN    →  Görsel sistem, temalar, animasyonlar
[3] SHELL ENGINEER  →  Komut motoru (parser/registry/executor)
[4] WORLD BUILDER   →  Virtual filesystem
[5] CONTENT CURATOR →  Portfolio komutları (about, projects, vs)
[6] GAME MASTER     →  Easter egg'ler, mini oyunlar
[7] VIBE PRODUCER   →  Audio sistemi, müzik çalar
[8] AI WHISPERER    →  AI fallback, doğal dil sohbet
[9] POLISHER        →  SEO, performance, deploy, README
```

### Ajan Bağımlılık Grafiği

```
[1] ───┬──> [2]
       ├──> [3] ───┬──> [4]
       │           ├──> [5]
       │           ├──> [6]
       │           └──> [8]
       └──> [7]

            [9] (en son, hepsinden sonra)
```

---

### 🟢 AJAN 1 — THE ARCHITECT

**Rol:** Projenin temelini at. Bundan sonraki her ajan bu temele dayanacak.

**Sahip Olduğu Dosyalar:**

- `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `store/useTerminalStore.ts` (iskelet)
- `lib/utils/cn.ts`, `lib/utils/format.ts`
- `.env.local.example`, `.gitignore`

**Görevler:**

1. Next.js 14 App Router projesi kur (TypeScript strict mode)
2. Tailwind CSS yapılandır, CSS variables için preset oluştur
3. Klasör yapısını **eksiksiz** oluştur (boş `index.ts` dosyalarıyla)
4. JetBrains Mono fontunu `next/font/local` ile bağla
5. Zustand store iskeleti:
   ```ts
   interface TerminalState {
     booted: boolean;
     theme: "minimal" | "cyberpunk" | "mainframe";
     history: HistoryEntry[];
     input: string;
     cwd: string;
     output: OutputEntry[];
     // actions
     pushOutput: (o: OutputEntry) => void;
     setTheme: (t: Theme) => void;
     // ...
   }
   ```
6. Base layout: pure black bg, full viewport, hide scrollbars
7. `app/page.tsx`: placeholder "KUT/OS booting..."
8. Husky + lint-staged kurulumu

**Acceptance Criteria:**

- `pnpm dev` çalışıyor, hatasız boot
- `pnpm build` başarılı, 0 type error
- Lighthouse base score: 100/100/100 (boş sayfa)
- Tailwind class'ları çalışıyor (test: `<div className="text-accent">test</div>` görünür)
- Zustand devtools'ta görünür

**Çıktı:** Çalışan iskelet. Sonraki ajan üstüne koyabilir.

---

### 🎨 AJAN 2 — THE AESTHETICIAN

**Rol:** Tüm görsel kimliği inşa et. Tema sistemi, boot sekansı, ambient effects.

**Sahip Olduğu Dosyalar:**

- `lib/themes/*.ts` (minimal, cyberpunk, mainframe, apply.ts)
- `components/boot/*.tsx`
- `components/effects/*.tsx`
- `components/terminal/StatusBar.tsx`
- `components/terminal/CursorBlink.tsx`
- `app/globals.css` (CSS variables, animasyonlar)

**Görevler:**

1. **Tema Sistemi:**
   - 3 tema tanımla (minimal, cyberpunk, mainframe)
   - `applyTheme(theme: Theme)` fonksiyonu CSS variable'ları root'a set eder
   - localStorage'da tema kaydet

2. **Boot Sequence** (2.4s toplam):
   - 0.0s: Pure black
   - 0.3s: Tek satır beliriyor: `[BIOS] kut.os v1.0.0 — initializing...`
   - 0.6s: Satırlar art arda akıyor (POST mesajları):
     ```
     [OK] memory check ........ 16384KB
     [OK] cpu  ................ kut-cortex M1 @ 3.2GHz
     [OK] graphics ............ webgl 2.0
     [OK] audio ............... web audio api
     [OK] network ............. connected
     [..] loading personality.
     ```
   - 1.8s: ASCII logo fade in (KUT/OS)
   - 2.2s: "Press any key" prompt
   - Kullanıcı bir tuşa basınca: terminal'e geçiş (fade)
   - **Skip:** Esc tuşu ile atlanabilir
   - **Speed:** Sonraki ziyaretlerde 0.8s'ye düşür (localStorage flag)

3. **Status Bar:**
   - Sol: `kut.os` logo
   - Orta: gerçek zamanlı saat (`HH:mm:ss`), Istanbul TZ
   - Sağ: tema indicator, müzik durumu, ses toggle, theme switcher
   - Backdrop blur, ince border-bottom

4. **Cursor:**
   - 8x16px block veya 2x16px line (komut: `cursor block|line`)
   - 1.06s sinüs blink (gerçek CRT freq)
   - Aksan rengiyle (`var(--accent)`)

5. **Ambient Background (WebGL):**
   - Three.js + R3F canvas, full viewport, z-index: -1, opacity: 0.06
   - Particle field: 800 nokta, çok yavaş hareket
   - Klavye event'inde particle'lar lerp ile pulse
   - 60fps, GPU <2%
   - Mobile'da: otomatik kapalı (performance)

6. **CRT Overlay (opsiyonel, default OFF):**
   - Çok ince scanline, slight vignette, hafif curve
   - Komut: `crt --on|--off`

7. **Animasyonlar:**
   - Komut yazma reveal effect (opsiyonel, default OFF)
   - Output appear: 120ms fade-in + 4px translateY
   - Pane open/close: 220ms ease-out

**Acceptance Criteria:**

- Boot sekansı 2.4s içinde tamamlanıyor, sinematik hissediyor
- 3 tema da çalışıyor, geçişler yumuşak (400ms crossfade)
- Status bar gerçek zamanlı saati gösteriyor
- WebGL canvas GPU monitor'da <2% kullanım
- Cursor doğal hissediyor (test: 30 saniye bak, rahatsız etmiyor)
- Mobile responsive (320px - 1920px)

---

### ⚙️ AJAN 3 — THE SHELL ENGINEER

**Rol:** Terminal'in beyni. Komut motoru, parser, registry, executor.

**Sahip Olduğu Dosyalar:**

- `lib/shell/parser.ts`
- `lib/shell/registry.ts`
- `lib/shell/history.ts`
- `lib/shell/autocomplete.ts`
- `lib/shell/executor.ts`
- `lib/shell/types.ts`
- `components/terminal/Terminal.tsx`
- `components/terminal/Prompt.tsx`
- `components/terminal/InputLine.tsx`
- `components/terminal/OutputRenderer.tsx`
- `components/terminal/HintBar.tsx`
- `tests/shell/*`

**Görevler:**

1. **Type Sistem:**

   ```ts
   type CommandHandler = (
     args: string[],
     flags: Record<string, string | boolean>,
     ctx: CommandContext
   ) => CommandOutput | Promise<CommandOutput>;

   type CommandOutput =
     | { type: "text"; content: string }
     | { type: "react"; content: ReactNode }
     | { type: "app"; component: ComponentType }
     | { type: "error"; message: string }
     | { type: "noop" };

   interface Command {
     name: string;
     aliases?: string[];
     description: string;
     usage?: string;
     category: "core" | "portfolio" | "fs" | "apps" | "meta" | "easter";
     hidden?: boolean; // easter egg flag
     handler: CommandHandler;
     completions?: (partial: string) => string[];
   }
   ```

2. **Parser** (`parser.ts`):
   - Tokenize: `git log --oneline -n 5` → `{ cmd: 'git', args: ['log'], flags: { oneline: true, n: '5' } }`
   - Quote desteği: `echo "hello world"` → tek arg
   - Pipe desteği (basit): `cat file.txt | grep foo` (opsiyonel v2)

3. **Registry** (`registry.ts`):
   - Singleton pattern
   - `register(command: Command)` ve `get(name: string)`
   - Alias çözümleme
   - Category bazlı filtreleme (help için)

4. **History** (`history.ts`):
   - localStorage'da son 100 komut
   - `↑` / `↓` navigation
   - `Ctrl+R` ile reverse search (Fuse.js)
   - `history` komutu listele

5. **Autocomplete** (`autocomplete.ts`):
   - Tab tuşu: komut adı veya dosya adı complete
   - HintBar'da preview göster
   - Komut + arg autocomplete (örn. `cat <tab>` dosya listele)

6. **Executor** (`executor.ts`):
   - Async desteği
   - Abort (Ctrl+C) — Promise cancellation
   - Output stream (progressive output için)
   - Error handling — registry'de yoksa AI fallback'e gönder

7. **Terminal Component:**
   - Auto-scroll to bottom
   - Output history render (virtualized değil, max 200 entry)
   - Input line her zaman en altta
   - Click anywhere → input focus
   - Selection: text seçilebilir (kopyalama için)

8. **Keyboard Shortcuts:**
   - `Tab` → autocomplete
   - `↑` / `↓` → history
   - `Ctrl+L` → clear
   - `Ctrl+C` → cancel running command
   - `Ctrl+R` → reverse history search
   - `Esc` → close active app/pane

**Acceptance Criteria:**

- `help` komutu çalışıyor, kategorize liste döner
- `echo hello world` → "hello world" (quote desteği)
- Tab autocomplete çalışıyor
- ↑/↓ history navigation çalışıyor
- 200+ komut history performansı düşürmüyor (<16ms render)
- Vitest testleri: parser için %100 coverage

---

### 💾 AJAN 4 — THE WORLD BUILDER

**Rol:** Virtual filesystem. Gerçek bir Unix benzeri dosya sistemi metaforu.

**Sahip Olduğu Dosyalar:**

- `lib/fs/filesystem.ts`
- `lib/fs/persist.ts`
- `lib/fs/seedFiles.ts`
- `lib/fs/ops.ts`
- `commands/fs/*.tsx` (ls, cd, cat, mkdir, touch, rm, pwd, mv, cp)
- `content/about.mdx`
- `content/secrets/🥚.txt`

**Görevler:**

1. **FS Data Structure:**

   ```ts
   type FSNode =
     | { type: "file"; name: string; content: string; size: number; modified: Date; perms: string }
     | { type: "dir"; name: string; children: Record<string, FSNode>; modified: Date };
   ```

2. **Seed Filesystem:**

   ```
   /
   ├── home/
   │   └── kut/
   │       ├── about.txt
   │       ├── projects/
   │       │   ├── neorescue.md
   │       │   ├── entrepreneurloop.md
   │       │   └── obsidian-dex.md
   │       ├── skills.json
   │       ├── experience.json
   │       ├── contact.md
   │       ├── resume.pdf  (binary marker)
   │       └── .secrets/
   │           └── 🥚.txt    (hidden, easter egg)
   ├── etc/
   │   ├── motd            (message of the day, random quote)
   │   └── hostname
   └── var/
       └── log/
           └── boot.log
   ```

3. **Komutlar:**
   - `ls [-a] [-l] [path]` — listele, `-a` hidden dosyaları göster
   - `cd <path>` — navigate
   - `cat <file>` — içerik göster (MDX dosyaları rendered)
   - `pwd` — current dir
   - `mkdir <name>` — yeni dir
   - `touch <name>` — boş dosya
   - `rm [-r] <path>` — sil (`/` korumalı, `rm -rf /` özel)
   - `mv <src> <dst>` — taşı
   - `cp <src> <dst>` — kopyala
   - `tree` — dir tree'yi göster

4. **Path Resolution:**
   - Relative: `cd projects` (cwd'ye göre)
   - Absolute: `cd /home/kut`
   - Home shortcut: `cd ~`
   - Parent: `cd ..`

5. **Persistence:**
   - User-created dosyalar localStorage'da
   - Seed dosyalar her zaman read-only (silinmiyor, sadece "deleted" flag)
   - `factory-reset` komutu fs'yi temizler

6. **Hidden Files:**
   - `.` ile başlayan dosyalar `ls` ile gizli, `ls -a` ile görünür
   - `.secrets/🥚.txt` → easter egg (Ajan 6 doldurur)

**Acceptance Criteria:**

- `ls`, `cd`, `cat`, `pwd` çalışıyor
- Path resolution tüm edge case'lerde doğru
- localStorage'a yazılan dosyalar refresh sonrası kalıyor
- `rm -rf /` → özel animasyon (Game Master agent ele alır)
- `tree` komutu çıktısı güzel formatlı

---

### 📚 AJAN 5 — THE CONTENT CURATOR

**Rol:** Portfolyo komutlarını yarat. Burası senin hikâyenin anlatıldığı yer.

**Sahip Olduğu Dosyalar:**

- `commands/portfolio/*.tsx` (about, projects, experience, skills, contact, resume, social, now)
- `content/projects.json`, `content/experience.json`, `content/skills.json`
- `components/ui/Card.tsx`, `components/ui/Timeline.tsx`

**Görevler:**

1. **`about`** komutu:
   - Rich React component
   - Sol: ASCII portre (sen — opsiyonel)
   - Sağ: kısa bio (3-4 paragraf), nokta nokta highlight
   - Alt: "type `projects` to see what I've built"

2. **`projects`** komutu:
   - Card grid (terminal içinde!)
   - Her card: proje adı, kısa açıklama, tech stack chips, link, demo
   - Filter: `projects --type=saas`, `projects --year=2025`
   - Detay: `projects neorescue` → tek proje detayı
   - Senin projelerin: EntrepreneurLoop Analytics, NeoRescue, MeetMind, ReturnBox, Appointify, ContentForge, FreelancerKit, FitCRM, Obsidian Dex, Palindrome Runner, ORU

3. **`experience`** komutu:
   - Timeline component (terminal text-based)
   - `2024 ────● solo founder · multiple SaaS`
   - Expandable: enter ile detay

4. **`skills`** komutu:
   - Kategorize bar chart (text-based):
     ```
     frontend  ████████████████░  95%  Next.js, React, TS, Tailwind
     backend   ████████████░░░░░  78%  Node, Supabase, PostgreSQL
     devops    █████████░░░░░░░░  60%  Docker, Nginx, Cloudflare
     mobile    ███████░░░░░░░░░░  45%  React Native, Expo
     ```

5. **`contact`** komutu:
   - Interactive mini form:
     ```
     name: _
     email: _
     message: _
     ```
   - Submit → API endpoint → senin mailine düşer (opsiyonel: Resend)
   - Veya basit: clipboard'a email kopyala

6. **`resume`** komutu:
   - `resume --download` → `public/resume.pdf` indir
   - `resume` → text version göster

7. **`social`** komutu:
   - GitHub, LinkedIn, Twitter/X, vb. linkler
   - Her biri tıklanabilir, terminal styled

8. **`now`** komutu (https://nownownow.com tarzı):
   - Şu an üzerinde çalıştığın şey
   - "what i'm building right now"
   - Manuel update edilebilir (content/now.mdx)

9. **`whoami`** komutu:
   - Hızlı identity: `kutluhan.gil — solo dev · turkey · saas builder`

**Acceptance Criteria:**

- Her komut **rich React output** dönüyor, sadece text değil
- Tasarım terminal estetiğine sadık (mono font, ASCII separators)
- Filter ve flag'ler çalışıyor
- Mobile'da da okunabilir

---

### 🎮 AJAN 6 — THE GAME MASTER

**Rol:** Easter egg'ler, gizli komutlar, mini oyunlar. Eğlence faktörü buradan gelir.

**Sahip Olduğu Dosyalar:**

- `commands/easter/*.tsx`
- `commands/apps/snake.tsx`, `tetris.tsx`, `matrix.tsx`, `play.tsx`
- `components/apps/Snake.tsx`, `Tetris.tsx`, `MatrixRain.tsx`

**Görevler:**

1. **Mini Oyunlar:**
   - **Snake** (`snake` veya `play snake`):
     - 20x15 grid, ASCII rendering (`●` ve `□`)
     - WASD veya ok tuşları
     - High score localStorage'da
     - Game over'da: skor + tekrar oyna prompt
   - **Tetris** (`tetris`):
     - 10x20 grid
     - Klasik 7 parça
     - High score
   - **Matrix Rain** (`matrix`):
     - Tam ekran Matrix yağmuru efekti
     - Esc ile çık
     - Hint: typing while running stops the rain

2. **Easter Egg Komutları:**
   - `sudo <anything>` → `permission denied: nice try`
   - `sudo hire-me` → özel mesaj + animasyon + email kopyala
   - `rm -rf /` → fake "deleting..." animasyonu → "psych! nothing was deleted."
   - `coffee` → ASCII coffee cup, animated steam
   - `hack` → fake hacker rolling text (HackerTyper tarzı)
   - `fortune` → random programmer quote
   - `cowsay <text>` → ASCII inek + balon
   - `weather` → fake weather (veya gerçek: open-meteo API)
   - `whoami --really` → "you're amazing for reading this far"
   - `42` → "the answer to life, the universe, and everything"
   - `xyzzy` → "nothing happens" (klasik adventure game easter egg)
   - `make me a sandwich` → "what? make it yourself"
   - `make me a sandwich --sudo` → "okay"
   - `:q` → "you're not in vim. use exit"
   - `exit` → "you can't leave KUT/OS. but you can close the tab."

3. **Konami Kodu:**
   - ↑ ↑ ↓ ↓ ← → ← → B A
   - Detect → secret panel açılır, gizli proje veya özel mesaj

4. **Hidden Files:**
   - `.secrets/🥚.txt` — `cat ~/.secrets/🥚.txt` ile okunur
   - İçinde gizli komut adı veya secret link
   - GitHub repo'da bulunan ipuçlarına link verebilir

5. **Time-based Easter Eggs:**
   - Gece yarısı: `night-mode` özel tema
   - Doğum gününde özel mesaj (eğer biliyorsan kendi gününü encode edebilirsin)
   - Yeni yıl: konfeti ASCII

6. **Interactive Surprises:**
   - 10. komut sonrası: "you're really exploring! try `secret`"
   - `secret` → gizli komut listesi (sadece keşfedenlere)

**Acceptance Criteria:**

- Snake ve Tetris oynanabilir, score kaydediliyor
- Matrix rain 60fps, esc ile çıkış
- 15+ easter egg implement edildi
- Konami kodu detect ediliyor
- `secret` komutu sadece 10. komuttan sonra çalışıyor

---

### 🎵 AJAN 7 — THE VIBE PRODUCER

**Rol:** Ses tasarımı. Klavye tıklamaları, müzik çalar, ortam atmosferi.

**Sahip Olduğu Dosyalar:**

- `lib/audio/soundbank.ts`
- `lib/audio/musicPlayer.ts`
- `lib/audio/tracks.ts`
- `components/apps/MusicPlayer.tsx`
- `commands/apps/play.tsx` (music)
- `public/sounds/*`
- `public/music/*`

**Görevler:**

1. **Sound Bank:**
   - `key-click.mp3` — yumuşak mekanik klavye sesi (Cherry MX Brown vibe)
   - `boot.mp3` — boot sound (mac startup tarzı, kısa)
   - `error.mp3` — soft error chime
   - `success.mp3` — soft success
   - `notification.mp3` — yeni mesaj/event

2. **Soundbank Manager:**
   - Howler.js wrapper
   - Volume control (master)
   - Mute toggle (`m` shortcut, status bar'da göstergesi)
   - Default: muted (kullanıcı izin vermeden ses çıkarmıyoruz)
   - `sound on` / `sound off` komutu

3. **Müzik Çalar:**
   - 3-5 lo-fi/synthwave track (CC license veya kendi besteleri)
   - Komutlar:
     - `play` — random track
     - `play <track-name>` — specific
     - `play list` — listele
     - `pause` / `resume` / `next` / `prev`
     - `volume <0-100>`
   - Status bar'da: 🎵 track adı (scroll animation eğer uzunsa)
   - Persistent across sessions (localStorage)
   - Browser autoplay policy: kullanıcı ilk etkileşim sonrası çalsın

4. **Sound Effects Mapping:**
   - Her keystroke → key-click (volume düşük, throttled max 10 fps)
   - Command execute → soft "thunk"
   - Error → error chime
   - Boot → boot sound (boot sekansı sırasında)

5. **Settings:**
   - `sound effects on/off`
   - `music on/off`
   - Master volume

**Acceptance Criteria:**

- Tüm ses dosyaları <100KB
- Lazy load (kullanıcı `play` yazana kadar yüklenmez)
- Browser autoplay policy ihlal etmiyor
- Mobile'da çalışıyor
- Volume kontrol smooth (no clicking)

---

### 🤖 AJAN 8 — THE AI WHISPERER

**Rol:** Doğal dil sohbet modu. Bilinmeyen komutlar için AI fallback.

**Sahip Olduğu Dosyalar:**

- `lib/ai/client.ts`
- `app/api/ask/route.ts`
- `commands/meta/ask.tsx`
- `.env.local.example` (ANTHROPIC_API_KEY)

**Görevler:**

1. **`ask <question>` komutu:**
   - Örnek: `ask what tech stack do you use?`
   - Backend route: `/api/ask` POST
   - Anthropic Claude Haiku API (ucuz + hızlı)
   - System prompt: "You are KUT, the AI assistant for kutluhan.gil's portfolio terminal. Answer questions about his background, projects, and skills based on the context provided. Keep answers concise (1-3 sentences), terminal-style, no markdown formatting. Use a slightly cyberpunk tone."
   - Context injection: about.mdx + projects.json + skills.json içeriği

2. **Bilinmeyen Komut Fallback:**
   - Registry'de yoksa → "command not found. did you mean: [fuzzy match]?"
   - "or type `ask '<original input>'` to query the AI assistant"
   - Veya: doğrudan AI'a gönder (smart mode):
     ```
     > how do I contact you?
     command not found.
     [AI mode] try: `contact` command, or my email is hi@kutluhan.dev
     ```

3. **Rate Limiting:**
   - Per IP: 20 sorgu / saat (Vercel KV)
   - Rate limit aşıldıysa: "too many questions. type `contact` for direct reach."

4. **Streaming Response:**
   - SSE (Server-Sent Events) ile token streaming
   - Terminal'de yazılıyormuş gibi görünsün (typing effect)

5. **AI Persona:**
   - Adı: KUT
   - Ton: cyberpunk-light, kısa, kuru mizah
   - Asla "as an AI" diye başlamasın
   - Hassas konularda: "i'm just KUT, kutluhan's terminal AI. ask him directly."

**Acceptance Criteria:**

- `ask` komutu cevap dönüyor (<3s)
- Streaming çalışıyor (kullanıcı bekleme hissetmiyor)
- Rate limit aktif
- API key environment variable'dan okunuyor
- Bilinmeyen komut → akıllı fallback

---

### ✨ AJAN 9 — THE POLISHER

**Rol:** Son rötuş. SEO, performance, deploy, README, OG image.

**Sahip Olduğu Dosyalar:**

- `app/layout.tsx` (metadata, OG)
- `app/sitemap.ts`, `app/robots.ts`
- `next-sitemap.config.js`
- `public/og.png`, `public/favicon.svg`
- `README.md`
- `LICENSE`
- `.vercelignore`, `vercel.json`

**Görevler:**

1. **SEO Meta:**
   - Title: "KUT/OS — kutluhan.gil's terminal portfolio"
   - Description: "A living terminal portfolio. Type `help` to explore."
   - OG image: terminal screenshot (1200x630), elegant
   - Twitter card: summary_large_image
   - Canonical URL
   - JSON-LD schema (Person)

2. **OG Image:**
   - Static `public/og.png`:
     - Pure dark bg
     - Terminal görünümü, prompt: `~/kut.os ➜ explore`
     - Logo köşede
   - Veya dinamik: `@vercel/og` ile generate (advanced)

3. **Favicon:**
   - SVG: monogram "K" veya terminal prompt sembolü "▌"
   - Animated: cursor blink (sadece SVG'de mümkünse)

4. **Performance:**
   - Lighthouse hedefleri:
     - Performance: 95+
     - Accessibility: 100
     - Best Practices: 100
     - SEO: 100
   - Bundle analyzer çalıştır, ağır şeyleri lazy load et
   - Three.js dynamic import (sadece boot sonrası yükle)
   - Howler.js dynamic import (sadece müzik çalışınca yükle)
   - AI client dynamic import

5. **Analytics:**
   - Plausible (privacy-friendly, KVKK uyumlu) — opsiyonel
   - Vercel Analytics

6. **Sharing:**
   - `share` komutu: current URL + son komutu kopyala
   - "screenshot mode": tüm ambient kapat, ekran kaydı için temiz

7. **README.md:**
   - Marketing odaklı (LinkedIn linki buraya gelecek)
   - Banner: terminal screenshot GIF
   - Features list
   - Tech stack badges
   - Quick start
   - Commands list
   - Easter eggs teaser ("there are 15+ hidden commands. find them all.")
   - Credits

8. **Deploy:**
   - Vercel projesi
   - Custom domain: `kutluhan.dev` veya `kut.dev` veya `kut.sh`
   - Environment variables: ANTHROPIC_API_KEY, KV credentials
   - Edge runtime için API routes

9. **Launch Checklist:**
   - [ ] All themes work
   - [ ] All commands work
   - [ ] Mobile responsive (320px+)
   - [ ] AI works
   - [ ] Easter eggs hidden
   - [ ] OG image preview test (Twitter, LinkedIn)
   - [ ] Custom domain SSL
   - [ ] Lighthouse 95+
   - [ ] GitHub repo public
   - [ ] LinkedIn post drafted
   - [ ] HackerNews Show HN drafted

**Acceptance Criteria:**

- Lighthouse: 95+ performance, 100 SEO/A11y
- OG image LinkedIn'de düzgün görünüyor (test)
- Custom domain çalışıyor
- README LinkedIn'de paylaşıma hazır
- Bundle size: First Load JS <200KB

---

## 📜 KOMUT SÖZLÜĞÜ

### Core

| Komut             | Açıklama                   |
| ----------------- | -------------------------- |
| `help [category]` | Tüm komutlar veya kategori |
| `clear`           | Ekranı temizle             |
| `echo <text>`     | Yazıyı yazdır              |
| `whoami`          | Hızlı identity             |
| `history`         | Komut geçmişi              |

### Portfolio

| Komut                 | Açıklama                  |
| --------------------- | ------------------------- |
| `about`               | Hakkımda                  |
| `projects [filter]`   | Projeler                  |
| `projects <name>`     | Tek proje detay           |
| `experience`          | Deneyim timeline          |
| `skills`              | Yetenek bar chart         |
| `contact`             | Iletişim formu            |
| `resume [--download]` | Resume                    |
| `social`              | Sosyal linkler            |
| `now`                 | Şu an üzerinde çalıştığım |

### Filesystem

| Komut            | Açıklama          |
| ---------------- | ----------------- |
| `ls [-a] [-l]`   | List dir          |
| `cd <path>`      | Change dir        |
| `pwd`            | Print working dir |
| `cat <file>`     | Print file        |
| `mkdir <name>`   | New dir           |
| `touch <name>`   | New file          |
| `rm [-r] <path>` | Remove            |
| `tree`           | Tree view         |

### Apps

| Komut                  | Açıklama         |
| ---------------------- | ---------------- |
| `vim <file>`           | Editor           |
| `snake` / `play snake` | Game             |
| `tetris`               | Game             |
| `matrix`               | Effect           |
| `play [track]`         | Music            |
| `pause`/`next`/`prev`  | Music control    |
| `volume <0-100>`       | Volume           |
| `guestbook`            | Visitor messages |
| `sign`                 | Leave a message  |

### Meta

| Komut                | Açıklama      |
| -------------------- | ------------- |
| `theme <name>`       | Switch theme  |
| `ask <question>`     | AI assistant  |
| `share`              | Share session |
| `cursor block\|line` | Cursor style  |
| `sound on\|off`      | SFX toggle    |
| `crt on\|off`        | CRT overlay   |
| `bg on\|off`         | Ambient bg    |

### Easter Eggs (Hidden)

`sudo`, `coffee`, `hack`, `fortune`, `cowsay`, `weather`, `xyzzy`, `42`, `make me a sandwich`, `:q`, `exit`, `night-mode`, `secret`, `🥚`, ... (+ konami code)

---

## 🥚 EASTER EGGS

> Bu liste sadece sen ve Claude Code için. Public README'de hint olarak "15+ hidden commands" yaz, hepsini sıralama. Keşif değerli olsun.

1. `sudo` → `permission denied: nice try`
2. `sudo hire-me` → animated rich output + email kopya
3. `sudo make me a sandwich` → "okay"
4. `rm -rf /` → fake deletion → "psych!"
5. `coffee` → ASCII coffee with animated steam
6. `hack` → fake terminal hacker animation (3s)
7. `fortune` → random programmer quote
8. `cowsay <text>` → ASCII cow with speech bubble
9. `xyzzy` → "nothing happens"
10. `42` → "the answer..."
11. `:q` / `:wq` / `:q!` → "you're not in vim. use `exit`."
12. `exit` → "you can't leave KUT/OS"
13. Konami kodu → secret panel açılır
14. `night-mode` → sadece gece (00:00-06:00 IST) çalışır
15. `cat ~/.secrets/🥚.txt` → gizli mesaj + bir sonraki ipucu
16. 10. komuttan sonra → `secret` komutu unlock
17. `secret` → tüm easter egg listesi
18. Doğum günü: özel konfeti + mesaj (manuel encode)
19. `theme rainbow` → joke command, tek satır rainbow text sonra geri döner
20. `clear` 5x peş peşe → "obsessive much?"

---

## ⚡ PERFORMANS HEDEFLERİ

| Metrik                    | Hedef         |
| ------------------------- | ------------- |
| Lighthouse Performance    | ≥ 95          |
| Lighthouse SEO            | 100           |
| Lighthouse A11y           | 100           |
| First Contentful Paint    | < 1.0s        |
| Largest Contentful Paint  | < 1.5s        |
| Cumulative Layout Shift   | < 0.05        |
| First Load JS             | < 200KB       |
| Boot Sequence             | < 2.5s        |
| Command execution latency | < 16ms (sync) |
| Mobile responsive         | 320px+        |
| GPU usage (idle)          | < 2%          |

### Optimization Stratejileri

- Three.js, Howler.js, Anthropic SDK: dynamic import
- Three.js scene: idle frame skip (kullanıcı yoksa render durdur)
- Output history: max 200 entry, sonrasında head'i kes
- Komutlar: React.memo ile wrap
- Boot sequence sonrası: kritik olmayan asset'leri prefetch
- Image: AVIF + WebP fallback

---

## 🚀 DEPLOY & SEO

### Hosting

- **Vercel** (Edge Functions desteği)
- Custom domain önerisi: `kutluhan.dev` veya `kut.sh`
- Environment variables:
  ```
  ANTHROPIC_API_KEY=
  KV_URL=
  KV_REST_API_TOKEN=
  KV_REST_API_READ_ONLY_TOKEN=
  ```

### SEO Strategy

- Static export friendly (boot sonrası tüm interaktivite client-side)
- Server-rendered initial HTML: terminal görünür durumda (no JS fallback)
- JSON-LD Person schema
- Sitemap.xml + robots.txt
- Open Graph + Twitter cards

### Launch Plan

**Day 1: Vercel'e deploy.** Domain, SSL, analytics.

**Day 2: LinkedIn post.**

- 60 saniyelik ekran kaydı (boot → komutlar → snake → matrix)
- Caption: "I rebuilt my portfolio as a tiny OS. 3 themes, real vim, hidden commands, AI fallback. Open source. Link in comments."
- Hashtag: #webdev #typescript #nextjs #portfolio

**Day 3: Hacker News Show HN.**

- Title: "Show HN: I rebuilt my portfolio as a browser-based OS"
- Body: feature list, tech stack, GitHub link

**Day 4: Twitter/X thread.**

- 5-tweet thread, her tweet bir feature gösteren GIF

**Day 5+: Reddit (`/r/webdev`, `/r/sideproject`), Product Hunt**

---

## 📝 README ŞABLONU

```markdown
# 🖥️ KUT/OS

> A living terminal portfolio. Not a website pretending to be a terminal — a tiny operating system you can explore in your browser.

[![Live Demo](https://img.shields.io/badge/demo-kut.sh-c1ff00)](https://kut.sh)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

![KUT/OS Banner](public/banner.gif)

## ✨ Features

- 🎬 **Cinematic boot sequence** — like turning on a real machine
- 🪟 **Multi-pane window manager** — tmux-style splits
- ✏️ **Real vim mode** — actually edit and save files (in localStorage)
- 🎨 **3 themes** — Minimal · Cyberpunk · IBM Mainframe
- 🎮 **Mini games** — Snake, Tetris, Matrix rain
- 🎵 **Music player** — built-in lo-fi player
- 🤖 **AI fallback** — type natural language, get answers
- 📚 **Persistent guestbook** — leave a message for future visitors
- 🥚 **15+ hidden commands** — can you find them all?
- ⚡ **60fps everything** — Lighthouse 95+

## 🚀 Quick Start

\`\`\`bash
git clone https://github.com/kutluhangil/kut-os
cd kut-os
pnpm install
cp .env.local.example .env.local

# add your ANTHROPIC_API_KEY

pnpm dev
\`\`\`

## 📜 Commands

Type \`help\` to start. A few favorites:

- \`about\` — who am I
- \`projects\` — what I've built
- \`snake\` — play a game
- \`theme cyberpunk\` — change vibe
- \`ask anything\` — talk to my AI
- ...and many more hidden ones

## 🛠️ Tech Stack

Next.js 14 · TypeScript · Tailwind · Zustand · Three.js · Framer Motion · Howler.js · Anthropic API · Vercel KV

## 🙏 Inspiration

Linear, Vercel, Apple Terminal, Raycast, Warp, Teenage Engineering.

## 📄 License

MIT — fork it, learn from it, build your own.

---

Made with care by [@kutluhangil](https://github.com/kutluhangil) · [LinkedIn](https://linkedin.com/in/kutluhangil)
```

---

## 🗓️ İMPLEMENTASYON SIRASI (Claude Code İçin)

Vibe coding'de her ajanı **ayrı bir session** olarak çalıştır. Her session sonunda commit at:

```
Day 1-2:   Agent 1 (Architect)      → commit: "feat: project scaffold"
Day 3-4:   Agent 2 (Aesthetician)   → commit: "feat: visual system + boot sequence"
Day 5-7:   Agent 3 (Shell Engineer) → commit: "feat: shell engine"
Day 8:     Agent 4 (World Builder)  → commit: "feat: virtual filesystem"
Day 9-11:  Agent 5 (Content Curator)→ commit: "feat: portfolio commands"
Day 12-13: Agent 6 (Game Master)    → commit: "feat: easter eggs & games"
Day 14:    Agent 7 (Vibe Producer)  → commit: "feat: audio + music player"
Day 15:    Agent 8 (AI Whisperer)   → commit: "feat: AI assistant"
Day 16-17: Agent 9 (Polisher)       → commit: "chore: deploy + polish"
Day 18:    Launch (LinkedIn + HN)
```

**~3 hafta solo dev**, 2-3 saat / gün tempo ile rahat bitirilir.

---

## 🎬 SON SÖZ

Bu proje bittiğinde elinde:

- 🟢 Inanılmaz bir portfolyo (kendi terminal OS'un)
- 🟢 9 farklı teknik alanda derinleşmiş kas (Three.js, audio, AI, vfs, shell engine...)
- 🟢 GitHub'da yıldız çeken bir open source repo
- 🟢 LinkedIn'de bookmarklanan bir paylaşım
- 🟢 Show HN potansiyeli
- 🟢 Recruiter dikkati
- 🟢 Bir hikâye — "ben portfolyomu işletim sistemi olarak yazdım"

**Şimdi başla. Agent 1'i Claude Code'a hand off et.**

```
~/kut.os ➜  ssh agent-1@architect
[+] connection established
[+] beginning scaffold...
```

---

`end of blueprint` · `v1.0.0` · `built with ❤️ for kutluhan.gil`
