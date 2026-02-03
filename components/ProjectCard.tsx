import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
          <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
        </div>
        {p.year && (
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/60">
            {p.year}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-white/70"
          >
            {t}
          </span>
        ))}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {p.highlights.slice(0, 2).map((h) => (
          <li key={h} className="leading-snug">
            <span className="text-white/40">• </span>{h}
          </li>
        ))}
      </ul>

      <div className="mt-4 text-sm text-white/70">
        <span className="underline decoration-white/20 group-hover:decoration-white/60">
          Open case study
        </span>
      </div>
    </Link>
  );
}
