import { NextResponse } from "next/server";

// In-memory visitor counter — resets on cold start
let count = Math.floor(Math.random() * 800) + 1200;

export async function GET() {
  return NextResponse.json({ count });
}

export async function POST() {
  count++;
  return NextResponse.json({ count });
}
