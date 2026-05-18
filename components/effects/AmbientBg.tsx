"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTerminalStore } from "@/store/useTerminalStore";

const PARTICLE_COUNT = 800;
const BASE_OPACITY = 0.06;

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const { size } = useThree();
  const keyActivityRef = useRef(0); // 0–1 lerp target

  // Generate initial positions
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      vel[i * 3] = (Math.random() - 0.5) * 0.0002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0002;
      vel[i * 3 + 2] = 0;
    }
    return [pos, vel];
  }, []);

  // Keyboard activity listener
  useEffect(() => {
    const onKey = () => {
      keyActivityRef.current = 1;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0xc1ff00,
        size: 0.018,
        transparent: true,
        opacity: BASE_OPACITY,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  // Breathing phase
  const breathRef = useRef(0);
  // Lerped activity
  const activityRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Cap delta to avoid spiral of death
    const dt = Math.min(delta, 0.05);

    // Breathing: slow sine, 4s period
    breathRef.current += dt * (Math.PI / 2); // full cycle every 4s
    const breathScale = 1 + Math.sin(breathRef.current) * 0.03;

    // Activity lerp (decay toward 0)
    activityRef.current += (keyActivityRef.current - activityRef.current) * 0.12;
    keyActivityRef.current *= 0.9;

    // Update opacity: base + activity pulse
    mat.opacity = BASE_OPACITY + activityRef.current * 0.04;

    const pos = meshRef.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;

    const halfW = size.width / 200;
    const halfH = size.height / 200;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      // Move particles
      arr[ix] += velocities[ix] * breathScale + (Math.random() - 0.5) * 0.0001;
      arr[ix + 1] += velocities[ix + 1] * breathScale + (Math.random() - 0.5) * 0.0001;

      // Wrap around viewport
      if (arr[ix] > halfW) arr[ix] = -halfW;
      if (arr[ix] < -halfW) arr[ix] = halfW;
      if (arr[ix + 1] > halfH) arr[ix + 1] = -halfH;
      if (arr[ix + 1] < -halfH) arr[ix + 1] = halfH;
    }

    pos.needsUpdate = true;
  });

  return <points ref={meshRef} geometry={geo} material={mat} />;
}

export function AmbientBg() {
  const { ambientBgEnabled } = useTerminalStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (!ambientBgEnabled || isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1]}
        frameloop="always"
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
