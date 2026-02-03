import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h1>
        <p className="text-white/70 md:text-lg">{p.subtitle}</p>

        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm hover:bg-white/[0.06]"
            >
              {l.label}
            </a>
          ))}
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-semibold text-white/80">Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-white/70">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-semibold text-white/80">Highlights</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {p.highlights.map((h) => (
              <li key={h}><span className="text-white/40">• </span>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        {p.body.map((b) => (
          <div key={b.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold text-white/80">{b.label}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{b.text}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
