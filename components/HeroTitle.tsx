"use client";

import { motion } from "framer-motion";

export function HeroTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-3xl border border-white/10 bg-black/45 p-6 md:p-8 backdrop-blur"
    >
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 max-w-3xl text-white/70 md:text-lg">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
