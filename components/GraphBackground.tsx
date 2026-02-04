"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number };

export function GraphBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const flow = (x: number, y: number, t: number) => {
      const nx = x / Math.max(w, 1);
      const ny = y / Math.max(h, 1);
      const a = Math.sin(nx * 6.0 + t * 0.00035) + Math.cos(ny * 5.0 - t * 0.00025);
      const b = Math.cos(nx * 5.0 - t * 0.00030) - Math.sin(ny * 6.0 + t * 0.00028);
      return { fx: a, fy: b };
    };

    resize();
    window.addEventListener("resize", resize);

    const N = 140;
    const particles: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const step = (t: number) => {
      // brighter trails: less fade
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const f = flow(p.x, p.y, t);

        p.vx = p.vx * 0.92 + f.fx * 0.05;
        p.vy = p.vy * 0.92 + f.fy * 0.05;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        // point (brighter)
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150, 230, 170, 0.38)";
        ctx.fill();

        // links (brighter)
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 85 * 85) {
            const a = 1 - d2 / (85 * 85);
            ctx.strokeStyle = `rgba(255,255,255,${0.055 * a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" />

      {/* lighter overlays so the background shows more */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_30%,rgba(0,0,0,0.02),rgba(0,0,0,0.70)_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/55" />
    </div>
  );
}
