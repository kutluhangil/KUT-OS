"use client";

import { useEffect, useState, useCallback } from "react";
import { useTerminalStore } from "@/store/useTerminalStore";
import { TRACKS } from "@/lib/audio/tracks";
import type { Track } from "@/lib/audio/tracks";

export function MusicPlayer() {
  const { setActiveApp, volume } = useTerminalStore();
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [player, setPlayer] = useState<typeof import("@/lib/audio/musicPlayer") | null>(null);

  useEffect(() => {
    import("@/lib/audio/musicPlayer").then((mod) => {
      setPlayer(mod);
      setPlaying(mod.musicPlayer.playing);
      setCurrentTrack(mod.musicPlayer.currentTrack);
      mod.musicPlayer.onChange((track) => {
        setCurrentTrack(track);
        setPlaying(mod.musicPlayer.playing);
      });
    });
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!player) return;
      if (e.key === "Escape") {
        setActiveApp(null);
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        player.musicPlayer.toggle().then(() => setPlaying(player.musicPlayer.playing));
      }
      if (e.key === "n" || e.key === "ArrowRight") {
        e.preventDefault();
        player.musicPlayer.next().then(() => {
          setCurrentTrack(player.musicPlayer.currentTrack);
        });
      }
      if (e.key === "p" || e.key === "ArrowLeft") {
        e.preventDefault();
        player.musicPlayer.prev().then(() => {
          setCurrentTrack(player.musicPlayer.currentTrack);
        });
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const newVol = Math.min(100, useTerminalStore.getState().volume + 10);
        player.musicPlayer.setVolume(newVol);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const newVol = Math.max(0, useTerminalStore.getState().volume - 10);
        player.musicPlayer.setVolume(newVol);
      }
    },
    [player, setActiveApp]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const vol = volume;
  const filledBars = Math.round(vol / 10);
  const volBar = Array.from({ length: 10 }, (_, i) => (i < filledBars ? "█" : "░")).join("");

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center font-mono"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mb-6 text-sm" style={{ color: "var(--accent)" }}>
        ♪ KUT/OS MUSIC PLAYER
      </div>

      {/* Track list */}
      <div
        style={{
          border: "1px solid var(--border-strong)",
          background: "var(--bg-secondary)",
          padding: "8px 12px",
          minWidth: "340px",
        }}
      >
        {TRACKS.map((track, i) => {
          const active = currentTrack?.id === track.id;
          return (
            <div
              key={track.id}
              className="flex justify-between items-center text-sm py-1 px-2 cursor-pointer"
              style={{
                background: active ? "var(--selection)" : "transparent",
                color: active ? "var(--accent)" : "var(--text-secondary)",
              }}
              onClick={() => {
                if (!player) return;
                player.musicPlayer.play(i).then(() => {
                  setPlaying(player.musicPlayer.playing);
                  setCurrentTrack(player.musicPlayer.currentTrack);
                  useTerminalStore.getState().setMusicEnabled(true);
                });
              }}
            >
              <span className="mr-3" style={{ width: "12px", display: "inline-block" }}>
                {active ? (playing ? "▶" : "‖") : " "}
              </span>
              <span className="flex-1">{track.title}</span>
              <span style={{ color: "var(--text-muted)" }}>{track.duration}</span>
            </div>
          );
        })}
      </div>

      {/* Now playing */}
      <div className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
        {currentTrack
          ? `${playing ? "▶" : "‖"} ${currentTrack.title} — ${currentTrack.artist}`
          : "select a track to begin"}
      </div>

      {/* Volume */}
      <div className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
        vol: [{volBar}] {vol}%
      </div>

      {/* Hints */}
      <div className="mt-4 text-xs" style={{ color: "var(--text-disabled)" }}>
        [SPACE] play/pause · ← prev · → next · ↑↓ volume · [ESC] exit
      </div>
    </div>
  );
}
