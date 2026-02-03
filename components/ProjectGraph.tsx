"use client";

import Link from "next/link";
import { projects } from "@/content/projects";

type Node = { id: string; label: string; kind: "theme" | "project"; x: number; y: number; href?: string };

export function ProjectGraph() {
  const themes: Node[] = [
    { id: "t1", label: "Cooperative AI", kind: "theme", x: 20, y: 35 },
    { id: "t2", label: "Geospatial ML", kind: "theme", x: 20, y: 65 },
    { id: "t3", label: "Systems", kind: "theme", x: 20, y: 85 },
  ];

  const projs: Node[] = [
    { id: "p1", label: "REDNET-ML", kind: "project", x: 72, y: 52, href: "/projects/rednet-ml" },
    { id: "p2", label: "AWRP", kind: "project", x: 70, y: 30, href: "/projects/awrp" },
    { id: "p3", label: "RANT", kind: "project", x: 78, y: 18, href: "/projects/rant" },
    { id: "p4", label: "Hemayah", kind: "project", x: 82, y: 72, href: "/projects/hemayah" },
    { id: "p5", label: "Firewall", kind: "project", x: 68, y: 88, href: "/projects/firewall-configuration" },
  ];

  const edges: Array<[string, string]> = [
    ["t1", "p2"], ["t1", "p3"], // coopAI-ish
    ["t2", "p1"],              // geo ml
    ["t3", "p5"],              // systems
    ["t2", "p4"], ["t3", "p4"] // embedded edge ML touches both
  ];

  const nodes = [...themes, ...projs];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-white/80">Project Graph</p>
        <Link href="/projects" className="text-sm text-white/70 underline decoration-white/20 hover:decoration-white/60">
          View all ({projects.length})
        </Link>
      </div>

      <svg viewBox="0 0 100 100" className="h-[260px] w-full">
        {/* edges */}
        {edges.map(([a, b]) => {
          const A = nodes.find((n) => n.id === a)!;
          const B = nodes.find((n) => n.id === b)!;
          return (
            <line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.6"
            />
          );
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const r = n.kind === "theme" ? 3.2 : 2.6;
          const fill = n.kind === "theme" ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.55)";
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={r} fill={fill} />
              <text
                x={n.x + 4}
                y={n.y + 1.2}
                fontSize="3.2"
                fill="rgba(255,255,255,0.75)"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-xs text-white/55">
        Click any project below — this graph is your “research map”: themes → evidence → outputs.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {projs.map((p) => (
          <Link
            key={p.id}
            href={p.href!}
            className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/75 hover:bg-white/[0.06]"
          >
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
