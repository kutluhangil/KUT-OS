import { NextRequest, NextResponse } from "next/server";

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

// In-memory store — persists within a deployment instance
// For production persistence, replace with a KV store (Upstash, Vercel Marketplace)
const entries: GuestEntry[] = [
  {
    id: "seed-1",
    name: "ghost_user",
    message: "found this while scrolling LinkedIn. respect.",
    createdAt: "2025-05-01T10:00:00Z",
  },
  {
    id: "seed-2",
    name: "arch_explorer",
    message: "type `snake` — you won't regret it.",
    createdAt: "2025-05-10T14:22:00Z",
  },
];

export async function GET() {
  return NextResponse.json({ entries: entries.slice(-50) });
}

export async function POST(req: NextRequest) {
  let body: { name?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 32);
  const message = (body.message ?? "").trim().slice(0, 280);

  if (!name || !message) {
    return NextResponse.json({ error: "name and message required" }, { status: 400 });
  }

  const entry: GuestEntry = {
    id: Math.random().toString(36).slice(2, 9),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  entries.push(entry);

  return NextResponse.json({ entry }, { status: 201 });
}
