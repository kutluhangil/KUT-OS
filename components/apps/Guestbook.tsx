"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useTerminalStore } from "@/store/useTerminalStore";

interface Entry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

type View = "list" | "form";

export function Guestbook() {
  const { setActiveApp } = useTerminalStore();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("list");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((d) => setEntries(d.entries ?? []))
      .catch(() => setError("failed to load entries"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (view === "form") nameRef.current?.focus();
  }, [view]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (view === "form") {
          setView("list");
        } else {
          setActiveApp(null);
        }
      }
      if (e.key === "n" && view === "list" && document.activeElement?.tagName !== "INPUT") {
        setView("form");
      }
    },
    [view, setActiveApp]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { entry } = await res.json();
      setEntries((prev) => [...prev, entry]);
      setSubmitted(true);
      setTimeout(() => {
        setView("list");
        setSubmitted(false);
        setName("");
        setMessage("");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col font-mono"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" }}
      >
        <span style={{ color: "var(--accent)" }}>✦ GUESTBOOK</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {view === "list" && (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {loading && (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                loading...
              </p>
            )}
            {error && (
              <p className="text-sm" style={{ color: "var(--error)" }}>
                {error}
              </p>
            )}
            {!loading && entries.length === 0 && (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                no entries yet. be the first — press [N].
              </p>
            )}
            <div className="space-y-4">
              {entries.map((e) => (
                <div
                  key={e.id}
                  style={{ borderLeft: "2px solid var(--border)", paddingLeft: "16px" }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                      {e.name}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-disabled)" }}>
                      {fmt(e.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    {e.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="px-6 py-2 text-xs shrink-0"
            style={{ borderTop: "1px solid var(--border)", color: "var(--text-disabled)" }}
          >
            [N] new entry · [ESC] exit
          </div>
        </>
      )}

      {view === "form" && (
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 px-6 py-6 gap-4 max-w-lg">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            leave a message — it&apos;ll live here forever (or until the server restarts).
          </p>

          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ color: "var(--text-muted)" }}>
              name (max 32 chars)
            </label>
            <input
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={32}
              className="bg-transparent outline-none text-sm px-2 py-1"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                caretColor: "var(--accent)",
              }}
              placeholder="anonymous"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ color: "var(--text-muted)" }}>
              message (max 280 chars)
            </label>
            <textarea
              ref={msgRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={280}
              rows={4}
              className="bg-transparent outline-none text-sm px-2 py-1 resize-none"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                caretColor: "var(--accent)",
              }}
              placeholder="say something..."
            />
          </div>

          {error && (
            <p className="text-xs" style={{ color: "var(--error)" }}>
              {error}
            </p>
          )}

          {submitted && (
            <p className="text-xs" style={{ color: "var(--success, #00ff87)" }}>
              ✓ message saved.
            </p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting || !name.trim() || !message.trim()}
              className="text-sm px-4 py-1"
              style={{
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                background: "transparent",
                cursor: submitting ? "wait" : "pointer",
                opacity: !name.trim() || !message.trim() ? 0.4 : 1,
              }}
            >
              {submitting ? "submitting..." : "submit [ENTER]"}
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className="text-sm px-4 py-1"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              cancel [ESC]
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
