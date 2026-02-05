"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ----------------------------- Types ----------------------------- */

type SkillGroup = "learning" | "evaluation" | "systems" | "optimisation" | "data";

type Skill = {
  id: string;
  label: string;
  group: SkillGroup;
  tier: "core" | "support";
  depth?: number; // fake z-axis
};

type Constellation = {
  id: string;
  title: string;
  center: { x: number; y: number };
  radius: number;
  skills: Skill[];
};

/* ----------------------------- Helpers ----------------------------- */

function rand(i: number, scale = 1) {
  return Math.sin(i * 97.31) * scale;
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
function dist2(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

/* ----------------------------- Palette ----------------------------- */

const GROUP_COLOR: Record<SkillGroup, string> = {
  learning: "rgba(140,210,255,0.95)", // blue
  evaluation: "rgba(200,170,255,0.95)", // purple
  systems: "rgba(255,200,140,0.95)", // amber
  optimisation: "rgba(160,240,210,0.95)", // teal
  data: "rgba(180,220,180,0.95)", // green
};

const GROUP_LABEL: Record<SkillGroup, string> = {
  learning: "learning",
  evaluation: "evaluation",
  systems: "systems",
  optimisation: "optimisation",
  data: "data",
};

/* ----------------------------- Data ----------------------------- */

const CONSTELLATIONS: Constellation[] = [
  {
    id: "coop-ai",
    title: "Cooperative AI",
    center: { x: 520, y: 120 },
    radius: 150,
    skills: [
      { id: "python", label: "Python", group: "learning", tier: "core", depth: 0.9 },
      { id: "pytorch", label: "PyTorch", group: "learning", tier: "core", depth: 0.85 },
      { id: "jax", label: "JAX", group: "learning", tier: "support", depth: 0.6 },
      { id: "llms", label: "LLMs", group: "learning", tier: "support", depth: 0.6 },
      { id: "cv", label: "Computer Vision", group: "learning", tier: "support", depth: 0.55 },
      { id: "marl", label: "Multi-Agent RL", group: "learning", tier: "core", depth: 0.9 },
      { id: "ippo", label: "IPPO", group: "learning", tier: "support", depth: 0.5 },
      { id: "mappo", label: "MAPPO", group: "learning", tier: "support", depth: 0.5 },
      { id: "ssd", label: "Sequential Social Dilemmas", group: "evaluation", tier: "core", depth: 0.8 },
      { id: "policy-eval", label: "Policy Evaluation", group: "evaluation", tier: "support", depth: 0.6 },
      { id: "game-theory", label: "Game Theory", group: "optimisation", tier: "support", depth: 0.6 },
      { id: "ablations", label: "Ablation Studies", group: "evaluation", tier: "support", depth: 0.7 },
    ],
  },
  {
    id: "geo-ml",
    title: "Geospatial ML",
    center: { x: 220, y: 340 },
    radius: 150,
    skills: [
      { id: "python-geo", label: "Python", group: "learning", tier: "core", depth: 0.8 },
      { id: "numpy", label: "NumPy", group: "data", tier: "support", depth: 0.5 },
      { id: "pandas", label: "Pandas", group: "data", tier: "support", depth: 0.5 },
      { id: "gis", label: "GIS / Raster", group: "data", tier: "core", depth: 0.8 },
      { id: "spatial", label: "Spatial Statistics", group: "data", tier: "core", depth: 0.75 },
      { id: "risk", label: "Risk Modelling", group: "evaluation", tier: "core", depth: 0.8 },
      { id: "shift", label: "Distribution Shift", group: "evaluation", tier: "support", depth: 0.6 },
      { id: "pipelines", label: "Data Pipelines", group: "systems", tier: "support", depth: 0.55 },
    ],
  },
  {
    id: "systems",
    title: "Systems",
    center: { x: 840, y: 340 },
    radius: 150,
    skills: [
      { id: "c", label: "C", group: "systems", tier: "core", depth: 0.9 },
      { id: "java", label: "Java", group: "systems", tier: "support", depth: 0.6 },
      { id: "go", label: "Go", group: "systems", tier: "support", depth: 0.6 },
      { id: "bash", label: "Bash", group: "systems", tier: "support", depth: 0.5 },
      { id: "linux", label: "Linux", group: "systems", tier: "core", depth: 0.85 },
      { id: "docker", label: "Docker", group: "systems", tier: "core", depth: 0.85 },
      { id: "git", label: "Git", group: "systems", tier: "support", depth: 0.5 },
      { id: "ci", label: "CI / Automation", group: "systems", tier: "support", depth: 0.5 },
      { id: "cuda", label: "CUDA", group: "optimisation", tier: "support", depth: 0.7 },
      { id: "onnx", label: "ONNX Runtime", group: "systems", tier: "core", depth: 0.8 },
      { id: "profiling", label: "Performance Profiling", group: "optimisation", tier: "support", depth: 0.7 },
      { id: "edge", label: "Edge Inference", group: "systems", tier: "core", depth: 0.8 },
    ],
  },
  {
    id: "sim-eval",
    title: "Simulation & Evaluation",
    center: { x: 520, y: 560 },
    radius: 150,
    skills: [
      { id: "simulation", label: "Stochastic Simulation", group: "evaluation", tier: "core", depth: 0.9 },
      { id: "metrics", label: "Behavioural Metrics", group: "evaluation", tier: "core", depth: 0.85 },
      { id: "robust", label: "Robustness Analysis", group: "evaluation", tier: "core", depth: 0.85 },
      { id: "sweeps", label: "Scenario Sweeps", group: "evaluation", tier: "support", depth: 0.6 },
      { id: "design", label: "Experimental Design", group: "evaluation", tier: "core", depth: 0.8 },
      { id: "repro", label: "Reproducibility", group: "systems", tier: "support", depth: 0.6 },
      { id: "tflite", label: "TensorFlow Lite", group: "optimisation", tier: "core", depth: 0.8 },
      { id: "flutter", label: "Flutter", group: "systems", tier: "support", depth: 0.6 },
      { id: "ble", label: "BLE", group: "systems", tier: "support", depth: 0.5 },
    ],
  },
];

/* ----------------------------- Component ----------------------------- */

export default function SkillConstellations() {
  const [hoverGroup, setHoverGroup] = useState<SkillGroup | null>(null);

  // light-weight animation tick (30fps-ish)
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const [t, setT] = useState(0);

  useEffect(() => {
    const loop = (now: number) => {
      if (now - lastRef.current > 33) {
        lastRef.current = now;
        setT(now);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // View bounds / padding so nothing clips
  const W = 1040;
  const H = 700;

  const PAD_TEXT_RIGHT = 220;
  const PAD_TEXT_LEFT = 26;
  const PAD_TOP = 18;
  const PAD_BOTTOM = 20;

  const STAR_MIN_X = PAD_TEXT_LEFT;
  const STAR_MAX_X = W - PAD_TEXT_RIGHT;
  const STAR_MIN_Y = PAD_TOP;
  const STAR_MAX_Y = H - PAD_BOTTOM;

  type PlacedSkill = Skill & {
    x: number;
    y: number;
    constellationId: string;
    seedA: number;
    seedB: number;
    freqA: number;
    freqB: number;
  };

  // Skills placed (deterministic) + clamped to bounds + repelled to avoid overlaps
  const placed: PlacedSkill[] = useMemo(() => {
    const out: PlacedSkill[] = [];

    // initial placement
    CONSTELLATIONS.forEach((c, ci) => {
      c.skills.forEach((s, i) => {
        const depth = s.depth ?? (s.tier === "core" ? 0.8 : 0.4);

        const r =
          c.radius *
          (s.tier === "core" ? 0.45 : 0.8) *
          (0.82 + Math.abs(rand(i + ci * 13, 0.38)));

        const angle = ((i + ci * 3) / c.skills.length) * Math.PI * 2;

        const x = c.center.x + Math.cos(angle) * r + rand(i + ci * 29, 28);
        const y = c.center.y + Math.sin(angle) * r + rand(i + ci * 29 + 3, 28);

        let cx = clamp(x, STAR_MIN_X + 18, STAR_MAX_X - 18);
        let cy = clamp(y, STAR_MIN_Y + 18, STAR_MAX_Y - 18);

        // boundary scatter to avoid right-edge stacking
        if (cx > STAR_MAX_X - 24) {
          cx -= 10 * Math.sin((i + ci * 7) * 1.7);
        }

        // per-node deterministic jitter params (seeds + slightly different frequencies)
        const base = (i + 1) * 173 + (ci + 1) * 997;
        const seedA = rand(base, 1);
        const seedB = rand(base + 91, 1);
        const freqA = 0.55 + Math.abs(rand(base + 13, 0.35)); // ~0.55..0.90
        const freqB = 0.50 + Math.abs(rand(base + 37, 0.38)); // ~0.50..0.88

        out.push({
          ...s,
          constellationId: c.id,
          x: cx,
          y: cy,
          depth,
          seedA,
          seedB,
          freqA,
          freqB,
        });
      });
    });

    // relaxation pass to prevent overlaps
    const MIN_SEP = 30;
    const MIN_SEP2 = MIN_SEP * MIN_SEP;

    for (let iter = 0; iter < 14; iter++) {
      for (let i = 0; i < out.length; i++) {
        for (let j = i + 1; j < out.length; j++) {
          if (out[i].constellationId !== out[j].constellationId) continue;

          const d = dist2(out[i].x, out[i].y, out[j].x, out[j].y);
          if (d >= MIN_SEP2) continue;

          const dx = out[i].x - out[j].x + 0.001 * rand(i * 41 + j * 17, 1);
          const dy = out[i].y - out[j].y + 0.001 * rand(i * 19 + j * 53, 1);
          const len = Math.max(0.0001, Math.hypot(dx, dy));

          const push = (MIN_SEP - Math.sqrt(d + 1e-6)) * 0.55;
          const ux = dx / len;
          const uy = dy / len;

          out[i].x = clamp(out[i].x + ux * push, STAR_MIN_X + 18, STAR_MAX_X - 18);
          out[i].y = clamp(out[i].y + uy * push, STAR_MIN_Y + 18, STAR_MAX_Y - 18);

          out[j].x = clamp(out[j].x - ux * push, STAR_MIN_X + 18, STAR_MAX_X - 18);
          out[j].y = clamp(out[j].y - uy * push, STAR_MIN_Y + 18, STAR_MAX_Y - 18);
        }
      }
    }

    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeGroup: SkillGroup | null = hoverGroup;

  // Jittered positions (cheap: just compute per render from base)
  const jittered = useMemo(() => {
    // time in seconds
    const tt = t * 0.001;

    return placed.map((s) => {
      const z = s.depth ?? 0.5;

      // smaller = calmer (so links don’t look messy)
      const ampBase = s.tier === "core" ? 1.6 : 2.4;
      const amp = ampBase * (0.65 + z * 0.6);

      const dx = Math.sin(tt * (1.15 * s.freqA) + s.seedA * 10.0) * amp;
      const dy = Math.cos(tt * (1.05 * s.freqB) + s.seedB * 10.0) * amp;

      return {
        ...s,
        jx: clamp(s.x + dx, STAR_MIN_X + 18, STAR_MAX_X - 18),
        jy: clamp(s.y + dy, STAR_MIN_Y + 18, STAR_MAX_Y - 18),
      };
    });
  }, [placed, t, STAR_MIN_X, STAR_MAX_X, STAR_MIN_Y, STAR_MAX_Y]);

  // Precompute same-group link pairs once (so animation doesn’t redo O(n^2) allocations)
  const linkPairs = useMemo(() => {
    const pairs: Array<[number, number]> = [];
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        if (placed[i].group === placed[j].group) pairs.push([i, j]);
      }
    }
    return pairs;
  }, [placed]);

  /* ----------------------------- Smart title placement ----------------------------- */
  const titlePos = useMemo(() => {
    const byConst: Record<string, { x: number; y: number }> = {};
    for (const c of CONSTELLATIONS) {
      const pts = placed.filter((s) => s.constellationId === c.id);
      if (pts.length === 0) {
        byConst[c.id] = { x: c.center.x, y: c.center.y - c.radius - 70 };
        continue;
      }
      const cx = pts.reduce((a, pt) => a + pt.x, 0) / pts.length;
      const cy = pts.reduce((a, pt) => a + pt.y, 0) / pts.length;

      const vx = cx - c.center.x;
      const vy = cy - c.center.y;
      const len = Math.max(1, Math.hypot(vx, vy));

      const ux = -vx / len;
      const uy = -vy / len;

      const tx = c.center.x + ux * (c.radius + 80);
      const ty = c.center.y + uy * (c.radius + 80);

      byConst[c.id] = {
        x: clamp(tx, STAR_MIN_X + 90, STAR_MAX_X - 90),
        y: clamp(ty, 42, H - 42),
      };
    }
    return byConst;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placed]);

  return (
    <div className="relative">
      {/* Right-side legend (glow + dim behaviour) */}
      <div className="absolute right-4 top-4 space-y-2 text-xs">
        {(Object.keys(GROUP_COLOR) as SkillGroup[]).map((g) => {
          const isActive = activeGroup === g;
          const isDim = activeGroup !== null && !isActive;
          return (
            <div
              key={g}
              className="flex items-center gap-2 select-none"
              onMouseEnter={() => setHoverGroup(g)}
              onMouseLeave={() => setHoverGroup(null)}
              style={{
                color: GROUP_COLOR[g],
                opacity: isDim ? 0.22 : 1,
                filter: isActive ? `drop-shadow(0 0 10px ${GROUP_COLOR[g]})` : "none",
                transition: "all 160ms ease",
                cursor: "default",
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: GROUP_COLOR[g],
                  boxShadow: isActive ? `0 0 12px ${GROUP_COLOR[g]}` : "none",
                  transition: "all 160ms ease",
                }}
              />
              {GROUP_LABEL[g]}
            </div>
          );
        })}
      </div>

      <svg
        width="100%"
        height="700"
        viewBox={`0 0 ${W} ${H}`}
        className="rounded-xl border border-white/10"
        style={{ background: "#070a10" }}
      >
        {/* Constellation titles */}
        {CONSTELLATIONS.map((c) => {
          const tp = titlePos[c.id] ?? { x: c.center.x, y: c.center.y - c.radius - 80 };
          return (
            <text
              key={c.id}
              x={tp.x}
              y={tp.y}
              textAnchor="middle"
              className="fill-white/80 text-sm font-semibold"
              style={{ letterSpacing: "0.2px" }}
            >
              {c.title}
            </text>
          );
        })}

        {/* Group links (use jittered positions) */}
        {linkPairs.map(([i, j]) => {
          const a = jittered[i];
          const b = jittered[j];

          return (
            <line
              key={`${i}-${j}`}
              x1={a.jx}
              y1={a.jy}
              x2={b.jx}
              y2={b.jy}
              stroke={GROUP_COLOR[a.group]}
              strokeOpacity={
                activeGroup === null ? 0.06 : activeGroup === a.group ? 0.32 : 0.012
              }
              strokeWidth={activeGroup === a.group ? 1.35 : 1}
            />
          );
        })}

        {/* Skills */}
        {jittered.map((s) => {
          const z = s.depth ?? 0.5;
          const isActive = activeGroup === null || activeGroup === s.group;

          const baseR = s.tier === "core" ? 4.7 : 3.2;
          const r = baseR * (isActive ? 1 + z * 0.45 : 0.8);

          return (
            <g
              key={s.id}
              onMouseEnter={() => setHoverGroup(s.group)}
              onMouseLeave={() => setHoverGroup(null)}
            >
              <circle
                cx={s.jx}
                cy={s.jy}
                r={r}
                fill={GROUP_COLOR[s.group]}
                opacity={isActive ? 1 : 0.16}
                style={{
                  filter: isActive ? `drop-shadow(0 0 ${6 * z}px ${GROUP_COLOR[s.group]})` : "none",
                  transform: isActive ? `translate(${-z * 2}px, ${-z * 2}px)` : undefined,
                  transition: "all 180ms ease",
                }}
              />

              {activeGroup === s.group && (
                <text
                  x={clamp(s.jx + 8, STAR_MIN_X + 4, STAR_MAX_X - 8)}
                  y={clamp(s.jy + 4, 24, H - 24)}
                  className="fill-white text-[11px]"
                  style={{ pointerEvents: "none" }}
                >
                  {s.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
