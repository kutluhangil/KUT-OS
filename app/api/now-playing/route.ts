import { NextResponse } from "next/server";

// Static "now playing" — replace with Spotify integration if desired
// Spotify setup: https://developer.spotify.com/documentation/web-api
const NOW_PLAYING = {
  isPlaying: false,
  track: null,
  artist: null,
  // Uncomment and add Spotify env vars to enable live integration
};

export async function GET() {
  return NextResponse.json(NOW_PLAYING);
}

export async function POST() {
  return NextResponse.json(NOW_PLAYING);
}
