import { makeFile, makeDir, type FSDir } from "./filesystem";

const ABOUT_TXT = `
name:     Kutluhan Gil
role:     Solo Developer & SaaS Builder
location: Istanbul, Turkey
focus:    Building fast, shipping often

I'm a self-taught developer who's been obsessively building
web products since 2020. I believe in constraints, taste,
and getting things out the door.

Currently building multiple SaaS products, learning
everything I can about distribution, and occasionally
shipping something that makes people say "how?"

Run \`about\` for the full story.
Run \`projects\` to see what I've built.
`.trim();

const CONTACT_MD = `
# Get in Touch

Email:    hi@kutluhan.dev
GitHub:   github.com/kutluhangil
LinkedIn: linkedin.com/in/kutluhangil
Twitter:  @kutluhangil

The fastest way to reach me is email.
I read everything.
`.trim();

const SKILLS_JSON = JSON.stringify(
  {
    frontend: { level: 95, stack: ["Next.js", "React", "TypeScript", "Tailwind"] },
    backend: { level: 78, stack: ["Node.js", "Supabase", "PostgreSQL", "Prisma"] },
    devops: { level: 60, stack: ["Docker", "Nginx", "Cloudflare", "Vercel"] },
    mobile: { level: 45, stack: ["React Native", "Expo"] },
    ai: { level: 72, stack: ["Anthropic", "OpenAI", "Langchain", "RAG"] },
  },
  null,
  2
);

const EXPERIENCE_JSON = JSON.stringify(
  [
    {
      period: "2024 – now",
      role: "Solo Founder",
      company: "Multiple SaaS Projects",
      highlights: [
        "Built and launched 10+ web products",
        "Full-stack development, design, marketing",
        "EntrepreneurLoop, NeoRescue, MeetMind, and more",
      ],
    },
    {
      period: "2022 – 2024",
      role: "Freelance Developer",
      company: "Various Clients",
      highlights: [
        "Web applications for startups",
        "React, Next.js, Node.js",
        "UI/UX design & implementation",
      ],
    },
  ],
  null,
  2
);

const NEORESCUE_MD = `
# NeoRescue

Animal rescue coordination platform connecting shelters,
volunteers, and adopters.

Tech: Next.js · Supabase · Mapbox · Stripe

Status: Active
Link:   github.com/kutluhangil/neorescue
`.trim();

const ENTREPRENEURLOOP_MD = `
# EntrepreneurLoop Analytics

SaaS analytics platform for indie hackers and solopreneurs.
Track MRR, churn, customer insights.

Tech: Next.js · Supabase · Recharts · Stripe

Status: Active
`.trim();

const OBSIDIAN_DEX_MD = `
# Obsidian Dex

Personal knowledge management plugin for Obsidian.
Adds structured data queries to your vault.

Tech: TypeScript · Obsidian Plugin API · Dataview

GitHub stars: 180+
Status: Open Source
`.trim();

const MOTD = [
  '"The best time to start was yesterday. The second best time is now."',
  '"Shipping beats perfecting."',
  '"Build in public. Learn in private."',
  '"Every expert was once a beginner."',
  '"Talk is cheap. Show me the code. — Linus Torvalds"',
  '"Make it work, make it right, make it fast."',
  '"The most important skill in coding is knowing what to Google."',
][Math.floor(Math.random() * 7)];

const BOOT_LOG = `[0.000] KUT/OS v1.0.0 booting...
[0.301] memory check OK
[0.402] cpu OK — kut-cortex M1 @ 3.2GHz
[0.512] graphics OK — WebGL 2.0
[0.601] audio OK — Web Audio API
[0.714] network OK — connected
[0.820] filesystem OK — mounted
[1.800] personality loaded
[2.200] boot complete`;

const EGG_TXT = `
You found the easter egg. Impressive.

Secret command: \`hack\`
Also try: \`fortune\`, \`cowsay\`, \`xyzzy\`, \`42\`

And if you're really curious... try the Konami code:
↑ ↑ ↓ ↓ ← → ← → B A

— kut
`.trim();

export function buildSeedFS(): FSDir {
  return makeDir("/", {
    home: makeDir("home", {
      kut: makeDir("kut", {
        "about.txt": makeFile("about.txt", ABOUT_TXT),
        "contact.md": makeFile("contact.md", CONTACT_MD),
        "skills.json": makeFile("skills.json", SKILLS_JSON),
        "experience.json": makeFile("experience.json", EXPERIENCE_JSON),
        "resume.pdf": {
          type: "file",
          name: "resume.pdf",
          content: "[binary file — run `resume --download` to get it]",
          size: 0,
          modified: new Date(),
          perms: "-r--r--r--",
          binary: true,
        },
        projects: makeDir("projects", {
          "neorescue.md": makeFile("neorescue.md", NEORESCUE_MD),
          "entrepreneurloop.md": makeFile("entrepreneurloop.md", ENTREPRENEURLOOP_MD),
          "obsidian-dex.md": makeFile("obsidian-dex.md", OBSIDIAN_DEX_MD),
        }),
        ".secrets": makeDir(".secrets", {
          "🥚.txt": makeFile("🥚.txt", EGG_TXT),
        }),
      }),
    }),
    etc: makeDir("etc", {
      motd: makeFile("motd", MOTD),
      hostname: makeFile("hostname", "kut.os"),
    }),
    var: makeDir("var", {
      log: makeDir("log", {
        "boot.log": makeFile("boot.log", BOOT_LOG),
      }),
    }),
  });
}
