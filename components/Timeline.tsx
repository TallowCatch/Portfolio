import { timeline } from "@/content/timeline";

export function Timeline() {
  return (
    <section className="space-y-4">
      <h2 className="section-title">Timeline</h2>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="space-y-5">
          {timeline.map((t, i) => (
            <div key={`${t.year}-${i}`} className="grid gap-3 md:grid-cols-[110px_1fr]">
              <div className="text-sm font-semibold text-white/70">{t.year}</div>
              <div className="relative pl-5">
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-white/70" />
                <div className="text-sm font-semibold text-white/85">{t.title}</div>
                <div className="mt-1 text-sm text-white/65">{t.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
