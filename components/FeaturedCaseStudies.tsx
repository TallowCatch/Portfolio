"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function ProjectModal({
  p,
  onClose,
}: {
  p: Project;
  onClose: () => void;
}) {
  // Mini gallery (placeholders supported)
  const gallery = (p.gallery?.length
    ? p.gallery
    : p.cover
      ? [p.cover]
      : []) as string[];
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
  }, [p.slug]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Dim */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#070a10]/95 shadow-2xl"
          initial={{ y: 18, scale: 0.98, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 10, scale: 0.99, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/40 p-2 text-white/70 hover:bg-black/55 hover:text-white transition"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header (textured, no screenshot behind title) */}
          <div className="relative w-full overflow-hidden border-b border-white/10 bg-[#070a10]">
            {/* Texture layers */}
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(900px circle at 30% 20%, rgba(140,210,255,0.18), transparent 55%)," +
                  "radial-gradient(700px circle at 80% 30%, rgba(255,255,255,0.06), transparent 60%)," +
                  "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(0,0,0,0.35))",
              }}
            />

            {/* Noise (inline SVG data URI) */}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-[0.16]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Content */}
            <div className="relative px-6 pb-6 pt-8">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {p.title}
                </h3>

                {p.year ? (
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/60">
                    {p.year}
                  </span>
                ) : null}
              </div>

              <p className="mt-2 max-w-3xl text-base text-white/70">
                {p.subtitle}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.slice(0, 6).map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-6 p-6 md:grid-cols-[0.42fr_1.15fr_0.9fr]">
            {/* Gallery (left column) */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-white/60">Gallery</div>

              {/* Main preview */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                {gallery.length ? (
                  <Image
                    src={gallery[activeImg]}
                    alt={`${p.title} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 92vw, 420px"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-white/40">
                    Add images in{" "}
                    <code className="mx-1 rounded bg-white/5 px-1">gallery</code>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>

              {/* Thumbnails (stacked) */}
              <div className="flex flex-col gap-2">
                {(gallery.length ? gallery : Array.from({ length: 4 }, () => "")).map(
                  (src, idx) => {
                    const is = idx === activeImg;
                    return (
                      <button
                        key={`${src || "ph"}-${idx}`}
                        type="button"
                        onClick={() => src && setActiveImg(idx)}
                        className={[
                          "relative h-16 overflow-hidden rounded-xl border transition",
                          is
                            ? "border-white/30 bg-white/[0.06]"
                            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]",
                        ].join(" ")}
                        aria-label={`Show image ${idx + 1}`}
                      >
                        {src ? (
                          <Image
                            src={src}
                            alt={`${p.title} thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-white/35">
                            Placeholder
                          </div>
                        )}
                        {is ? (
                          <div className="absolute inset-0 ring-1 ring-white/20" />
                        ) : null}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Middle (kept same content as your “Left”) */}
            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold text-white/60">Highlights</div>
                <ul className="mt-2 space-y-2 text-sm text-white/70">
                  {p.highlights.map((h) => (
                    <li key={h} className="leading-snug">
                      <span className="text-white/35">• </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {p.body?.length ? (
                <div className="space-y-4">
                  {p.body.map((b) => (
                    <div key={b.label}>
                      <div className="text-xs font-semibold text-white/60">
                        {b.label}
                      </div>
                      <p className="mt-1 text-sm text-white/70 leading-relaxed">
                        {b.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Right (unchanged) */}
            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold text-white/60">Stack</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-white/60">Links</div>
                <div className="mt-2 flex flex-col gap-2">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/80 hover:bg-white/[0.08] transition"
                  >
                    Open case study
                    <ArrowUpRight className="h-4 w-4 text-white/50" />
                  </Link>

                  {p.links?.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/75 hover:bg-black/40 transition"
                    >
                      {l.label}
                      <ArrowUpRight className="h-4 w-4 text-white/45" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="text-xs font-semibold text-white/60">
                  What to look for
                </div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  I care about stress-testing under shift, clean evaluation loops, and
                  systems you can actually rerun end-to-end.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function FeaturedCaseStudies() {
  // Pick the “featured” set (keep your current ordering)
  const featured = useMemo(() => projects.slice(0, 5), []);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<Project | null>(null);
  const [isShifting, setIsShifting] = useState(false);

  // Auto-rotate
  useEffect(() => {
    if (paused || open || isShifting) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % featured.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, open, isShifting, featured.length]);

  // Keyboard close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl">
        {/* Center heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Featured Case Studies
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 md:text-base">
            A few projects that best represent how I think: measurable behaviour,
            evaluation under shift, and reproducible systems.
          </p>
        </div>

        {/* Carousel stack */}
        <div
          className="relative mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto h-[460px] w-full max-w-5xl">
            {featured.map((p, i) => {
              const n = featured.length;
              // distance from active in circular sense
              const raw = i - active;
              const d = raw > n / 2 ? raw - n : raw < -n / 2 ? raw + n : raw;

              // Only render a few around active for cleanliness
              const visible = Math.abs(d) <= 2;

              const z = 10 - Math.abs(d);
              const scale = 1 - Math.abs(d) * 0.05;
              const y = Math.abs(d) * 18; // more vertical separation
              const x = d * 95; // less horizontal spread
              const rot = d * -2.5; // less “horizontal card” vibe

              return (
                <AnimatePresence key={p.slug}>
                  {visible ? (
                    <motion.button
                      type="button"
                      onClick={() => {
                        if (isShifting) return;

                        // first click: bring to front
                        if (i !== active) {
                          setIsShifting(true);
                          setActive(i);
                          window.setTimeout(() => setIsShifting(false), 380);
                          return;
                        }

                        // second click (already front): open
                        setOpen(p);
                      }}
                      className="
                        absolute left-1/2 top-0
                        w-[72%] max-w-[560px]
                        -translate-x-1/2
                        rounded-3xl border border-white/10 bg-white/[0.03]
                        text-left outline-none
                      "
                      style={{ zIndex: z }}
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{
                        opacity: 1,
                        x,
                        y,
                        rotate: rot,
                        scale,
                        filter: Math.abs(d) === 0 ? "blur(0px)" : "blur(0.25px)",
                      }}
                      exit={{ opacity: 0, y: 18, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                      whileHover={{
                        scale: Math.abs(d) === 0 ? 1.01 : scale + 0.02,
                      }}
                    >
                      {/* Taller cover -> more vertical */}
                      <div className="relative h-[320px] overflow-hidden rounded-3xl border-b border-white/10 bg-black/35">
                        {p.cover ? (
                          <Image
                            src={p.cover}
                            alt={`${p.title} cover`}
                            fill
                            quality={92}
                            sizes="(max-width: 1024px) 90vw, 560px"
                            className="object-cover object-top opacity-[0.92]"
                          />
                        ) : null}

                        {/* hover glow */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(650px circle at 40% 35%, rgba(140,210,255,0.18), transparent 55%)",
                          }}
                        />

                        {/* stronger bottom gradient because image is taller now */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />

                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-lg font-semibold tracking-tight">
                                {p.title}
                              </div>
                              <div className="mt-1 text-sm text-white/70">
                                {p.subtitle}
                              </div>
                            </div>

                            {p.year ? (
                              <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/60">
                                {p.year}
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {p.tags.slice(0, 4).map((t) => (
                              <Chip key={t}>{t}</Chip>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ) : null}
                </AnimatePresence>
              );
            })}
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {featured.map((p, i) => {
              const is = i === active;
              return (
                <button
                  key={p.slug}
                  className={`h-2.5 w-2.5 rounded-full border border-white/10 transition ${
                    is ? "bg-white/70" : "bg-white/20 hover:bg-white/35"
                  }`}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${p.title}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {open ? <ProjectModal p={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}
