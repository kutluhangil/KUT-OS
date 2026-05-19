import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px 90px",
        fontFamily: "monospace",
        position: "relative",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(193,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(193,255,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #c1ff00, transparent)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          color: "#c1ff00",
          fontSize: "52px",
          fontWeight: "bold",
          letterSpacing: "-1px",
          marginBottom: "12px",
        }}
      >
        KUT/OS
      </div>

      {/* Tagline */}
      <div
        style={{
          color: "#666",
          fontSize: "22px",
          marginBottom: "56px",
          letterSpacing: "0.5px",
        }}
      >
        kutluhan.gil&apos;s terminal portfolio
      </div>

      {/* Terminal block */}
      <div
        style={{
          background: "#111",
          border: "1px solid #222",
          borderRadius: "6px",
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ color: "#555", fontSize: "14px" }}>~/kut.os — bash — 80x24</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "20px" }}>
          <span style={{ color: "#c1ff00" }}>~/kut.os</span>
          <span style={{ color: "#555" }}>➜</span>
          <span style={{ color: "#fff" }}>help</span>
        </div>
        <div style={{ color: "#888", fontSize: "16px" }}>
          available commands: about, projects, experience, skills, contact...
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "20px" }}>
          <span style={{ color: "#c1ff00" }}>~/kut.os</span>
          <span style={{ color: "#555" }}>➜</span>
          <span
            style={{
              color: "#c1ff00",
              width: "12px",
              height: "22px",
              background: "#c1ff00",
              display: "inline-block",
            }}
          />
        </div>
      </div>

      {/* Bottom right: version */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "90px",
          color: "#2a2a2a",
          fontSize: "14px",
        }}
      >
        v1.0.0
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
