"use client";

import { useEffect, useState } from "react";

interface Props {
  question: string;
}

export function StreamingResponse({ question }: Props) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });

        if (!res.ok) {
          const msg = await res.text();
          if (!cancelled) setError(msg || `error ${res.status}`);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) return;
        const decoder = new TextDecoder();

        while (true) {
          const { done: streamDone, value } = await reader.read();
          if (streamDone || cancelled) break;
          setText((prev) => prev + decoder.decode(value, { stream: true }));
        }

        if (!cancelled) setDone(true);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "network error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [question]);

  const base: React.CSSProperties = {
    fontFamily: "inherit",
    fontSize: "0.875rem",
    lineHeight: 1.6,
    padding: "2px 0",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };

  if (error) {
    return <div style={{ ...base, color: "var(--error)" }}>KUT: {error}</div>;
  }

  return (
    <div style={{ ...base, color: "var(--text-primary)" }}>
      <span style={{ color: "var(--accent)" }}>KUT:</span> {text}
      {!done && (
        <span
          style={{
            color: "var(--accent)",
            animation: "cursor-blink 1.06s step-end infinite",
          }}
        >
          █
        </span>
      )}
    </div>
  );
}
