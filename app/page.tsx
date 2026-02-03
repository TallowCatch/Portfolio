import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectGraph } from "@/components/ProjectGraph";

export default function HomePage() {
  const featured = projects.filter(p =>
    ["rednet-ml", "awrp", "rant", "hemayah", "firewall-configuration"].includes(p.slug)
  );

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          {profile.name}
        </h1>
        <p className="max-w-2xl text-white/70 md:text-lg">
          {profile.tagline}
        </p>

        <div className="flex flex-wrap gap-2">
          {profile.focusAreas.map((x) => (
            <span
              key={x}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
            >
              {x}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="/Ameer-Alhashemi-CV.pdf"
            className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm hover:bg-white/[0.1]"
          >
            Download CV (PDF)
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm hover:bg-white/[0.06]"
          >
            GitHub
          </a>
        </div>
      </section>

      <ProjectGraph />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Featured case studies</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>
    </div>
  );
}
