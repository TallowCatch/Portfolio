"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";

function ActionButton({
  href,
  label,
  icon: Icon,
  external,
}: {
  href: string;
  label: string;
  icon: any;
  external?: boolean;
}) {
  const cls =
    "group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.10] transition";
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        <Icon className="h-4 w-4 text-white/70 group-hover:text-white" />
        <span className="font-medium">{label}</span>
        <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white/70" />
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      <Icon className="h-4 w-4 text-white/70 group-hover:text-white" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export function HeroWhoAmI() {
  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="rounded-3xl border border-white/10 bg-black/45 p-6 md:p-8 backdrop-blur"
      >
        <div className="grid gap-6 md:grid-cols-[1.25fr_0.85fr] md:items-start">
          {/* Left */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
              {profile.location}
              <span className="text-white/35">•</span>
              MEng Computer Science &amp; Software Engineering
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              <span className="bg-gradient-to-r from-white via-white/70 to-white bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>

            <p className="max-w-2xl text-white/70 md:text-lg">
            I work on machine learning and systems under uncertainty, with an emphasis on evaluation, and behaviour in interactive environments.
            </p>

            <div className="flex flex-wrap gap-2">
              {profile.focusAreas.slice(0, 4).map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
                >
                  {x}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <ActionButton href="/Ameer-Alhashemi-CV.pdf" label="Download CV" icon={Download} />
              <ActionButton href={profile.github} label="GitHub" icon={Github} external />
              <ActionButton href={profile.linkedin} label="LinkedIn" icon={Linkedin} external />
              <ActionButton href={`mailto:${profile.email}`} label="Email" icon={Mail} external />
            </div>
          </div>

          {/* Right */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-white/60">ABOUT</div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/65">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400/80" />
                </span>
                LIVE
              </div>
            </div>

            <div className="mt-3 space-y-3 text-sm text-white/70 leading-relaxed">
              <p>
                I’m finishing an{" "}
                <span className="text-white/85">
                  MEng in Computer Science &amp; Software Engineering
                </span>
                . I like projects where you can measure behaviour end-to-end; evaluation,
                robustness, and reproducible systems.
              </p>
              <p>
                My current focus is{" "}
                <span className="text-white/85">Cooperative AI</span> and{" "}
                <span className="text-white/85">generalisation under shift</span>: what happens
                when partners, incentives, or environments change, and you still need coordination to hold.
              </p>
            </div>

            <div className="mt-4">
              <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                <div className="text-xs text-white/55">Now</div>
                <div className="mt-1 text-sm text-white/80">
                  Build a clean research narrative + ship polished demos.
                </div>
              </div>
            </div>
          </div>
          {/* end right */}
        </div>
      </motion.div>
    </section>
  );
}
