"use client";

import { useEffect, useRef } from "react";
import { useTerminalStore } from "@/store/useTerminalStore";

const CHARS = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";

interface Column {
  y: number;
  speed: number;
  chars: string[];
  length: number;
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setActiveApp } = useTerminalStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 14;
    let cols: number;
    let columns: Column[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      columns = Array.from({ length: cols }, () => ({
        y: Math.random() * -50,
        speed: 0.3 + Math.random() * 0.7,
        length: 10 + Math.floor(Math.random() * 20),
        chars: Array.from({ length: 30 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
      }));
    }

    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    let frame = 0;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frame++;

      columns.forEach((col, i) => {
        const x = i * fontSize;

        col.chars.forEach((ch, j) => {
          const y = (col.y - j) * fontSize;
          if (y < 0 || y > canvas.height) return;

          if (j === 0) {
            ctx.fillStyle = "#ffffff";
          } else {
            const alpha = 1 - j / col.length;
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
          }

          ctx.font = `${fontSize}px monospace`;
          ctx.fillText(ch, x, y);
        });

        // Advance column
        if (frame % 3 === 0) {
          col.y += col.speed;
          // Randomize chars
          col.chars[Math.floor(Math.random() * col.chars.length)] =
            CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        // Reset when off-screen
        if ((col.y - col.length) * fontSize > canvas.height) {
          col.y = -col.length;
          col.speed = 0.3 + Math.random() * 0.7;
        }
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveApp(null);
      }
    };
    window.addEventListener("keydown", escHandler);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", escHandler);
    };
  }, [setActiveApp]);

  return (
    <div className="fixed inset-0 z-50" style={{ background: "#000" }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div
        className="absolute bottom-4 right-4 font-mono text-xs"
        style={{ color: "rgba(0,255,65,0.5)" }}
      >
        [ESC] exit
      </div>
    </div>
  );
}
