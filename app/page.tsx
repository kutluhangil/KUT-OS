"use client";

export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-primary">
      <div className="text-center">
        <div className="text-xl text-accent font-mono mb-4">KUT/OS</div>
        <div className="text-secondary text-sm">
          <span>booting</span>
          <span className="cursor-blink">▌</span>
        </div>
        <div className="mt-8 text-muted text-xs">Agent 1 complete — visual system coming next</div>
      </div>
    </main>
  );
}
