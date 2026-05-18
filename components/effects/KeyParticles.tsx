"use client";

// KeyParticles: small burst of particles on keystroke
// Implemented as a lightweight DOM-based effect (no canvas overhead)
import { useEffect } from "react";

interface Particle {
  el: HTMLDivElement;
  vx: number;
  vy: number;
  life: number;
}

let particles: Particle[] = [];
let container: HTMLDivElement | null = null;
let rafId: number | null = null;

function spawnParticles() {
  if (!container) return;

  // Find active input position
  const input = document.getElementById("terminal-input");
  const rect = input?.getBoundingClientRect() ?? {
    left: window.innerWidth / 2,
    top: window.innerHeight / 2,
    width: 0,
    height: 0,
  };

  const x = rect.left + rect.width;
  const y = rect.top + rect.height / 2;

  for (let i = 0; i < 4; i++) {
    const el = document.createElement("div");
    el.style.cssText = `
      position:fixed;
      width:2px;height:2px;
      border-radius:50%;
      background:var(--accent);
      pointer-events:none;
      left:${x}px;top:${y}px;
      opacity:0.7;
      z-index:9999;
    `;
    container.appendChild(el);

    particles.push({
      el,
      vx: (Math.random() - 0.5) * 3,
      vy: -(Math.random() * 2 + 1),
      life: 1,
    });
  }
}

function animate() {
  particles = particles.filter((p) => {
    p.life -= 0.06;
    p.vy += 0.1; // gravity
    const el = p.el;
    const x = parseFloat(el.style.left) + p.vx;
    const y = parseFloat(el.style.top) + p.vy;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.opacity = String(p.life * 0.7);
    if (p.life <= 0) {
      el.remove();
      return false;
    }
    return true;
  });

  if (particles.length > 0) {
    rafId = requestAnimationFrame(animate);
  } else {
    rafId = null;
  }
}

export function KeyParticles() {
  useEffect(() => {
    container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9999;";
    document.body.appendChild(container);

    const handler = () => {
      spawnParticles();
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      container?.remove();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
