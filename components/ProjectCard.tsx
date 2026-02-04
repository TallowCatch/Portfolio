import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.06]"
    >
      {/* Cover */}
      <div className="relative h-64 w-full border-b border-white/10 bg-black/30">
        {p.cover ? (
          <Image
            src={p.cover}
            alt={`${p.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-[0.92] group-hover:opacity-100 transition"
            quality={92}
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-white/45">
              <ImageIcon className="h-4 w-4" />
              <span>Add cover: /public/projects/{p.slug}/cover.png</span>
            </div>
          </div>
        )}

        {/* soft gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
      </div>

      {/* Body */}
      <div className="p-5">
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
              <span className="text-white/40">• </span>
              {h}
            </li>
          ))}
        </ul>

        {/* <div className="mt-4 text-sm text-white/70">
          <span className="underline decoration-white/20 group-hover:decoration-white/60">
            Open case study
          </span>
        </div> */}
      </div>
    </Link>
  );
}
