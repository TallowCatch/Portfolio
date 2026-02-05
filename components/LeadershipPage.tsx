"use client";

import Image from "next/image";

type Pic = {
  src: string;
  alt: string;
  cols?: 1 | 2; // width weight (lg+)
  rows?: number; // height weight (masonry)
  pos?: string; // object-position (for smart crops)
};

const pics: Pic[] = [
  // Hero (wide)
  {
    src: "/leadership/Symposium.jpeg",
    alt: "King's Robotics Symposium 26'",
    cols: 2,
    rows: 26,
    pos: "50% 38%",
  },

  // Medium (1-col)
  { src: "/leadership/AI-Summit.jpeg", alt: "AI Summit 24'", cols: 1, rows: 18, pos: "50% 45%" },
  { src: "/leadership/KPMG-2.jpeg", alt: "Industry event at KPMG", cols: 1, rows: 18, pos: "50% 45%" },

  // Wide horizontal (but not huge)
  {
    src: "/leadership/Hemayah-presentation.jpg",
    alt: "Hemayah project presentation",
    cols: 2,
    rows: 18,
    pos: "50% 42%",
  },

  // Medium (1-col)
  { src: "/leadership/Yusra.jpeg", alt: "Academic discussions", cols: 1, rows: 18, pos: "23% 35%" },
  { src: "/leadership/Roxy.jpeg", alt: "Robotics lab work", cols: 1, rows: 22, pos: "50% 50%" },
  { src: "/leadership/Golf.jpeg", alt: "Golf", cols: 1, rows: 18, pos: "50% 55%" },

  // Wide landscape “breather”
  { src: "/leadership/Como.jpeg", alt: "Kayaking and outdoors", cols: 2, rows: 18, pos: "50% 60%" },
];

export default function LeadershipPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 grid-flow-dense auto-rows-[10px]">
      {pics.map((p) => {
        const rows = p.rows ?? 22;

        return (
          <div
            key={p.src}
            className={[
              "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]",
              "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
              "transition duration-300",
              "hover:-translate-y-[1px] hover:border-white/20 hover:bg-white/[0.05]",
              p.cols === 2 ? "lg:col-span-2" : "",
            ].join(" ")}
            style={{ gridRowEnd: `span ${rows}` }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              quality={95}
              sizes={
                p.cols === 2
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              }
              className="object-cover opacity-[0.92] transition duration-300 group-hover:scale-[1.015] group-hover:opacity-100"
              style={{ objectPosition: p.pos ?? "50% 50%" }}
            />

            {/* subtle vignette (always) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70" />

            {/* Hover glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
              style={{
                background:
                  "radial-gradient(650px circle at 40% 35%, rgba(140,210,255,0.18), transparent 55%)",
              }}
            />

            {/* Caption (only on hover) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition duration-300">
              <span className="text-xs text-white/85 drop-shadow-[0_0_10px_rgba(0,0,0,0.7)]">
                {p.alt}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
