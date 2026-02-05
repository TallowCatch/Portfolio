import Link from "next/link";
import { projects } from "@/content/projects";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies"
import { GraphBackground } from "@/components/GraphBackground";
import { HeroWhoAmI } from "@/components/HeroWhoAmI";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import LeadershipPage from "@/components/LeadershipPage";
import SkillConstellations from "@/components/SkillConstellations";

export default function HomePage() {
  const featured = projects.filter((p) =>
    ["rednet-ml", "awrp", "rant", "hemayah", "firewall-configuration"].includes(p.slug)
  );

  return (
    <div className="relative">
      <GraphBackground />

      <div className="space-y-10 section-wrap">
        <HeroWhoAmI />

        {/* Featured */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          {/* <h2 className="section-title">Featured Case Studies</h2> */}

          {/* <Link
            href="/projects"
            className="text-sm text-white/70 underline decoration-white/20 hover:decoration-white/60"
          >
            View all
          </Link> */}
        </div>

        <FeaturedCaseStudies />

        {/* <div className="flex flex-wrap justify-center gap-4">
          {featured.map((p) => (
            <div key={p.slug} className="w-full md:w-[calc(50%-0.5rem)]">
              <ProjectCard p={p} />
            </div>
          ))}
        </div> */}
      </section>


        {/* Skills */}
        <section className="space-y-4">
          <h2 className="section-title">Skills & Systems</h2>
          <SkillConstellations />
        </section>

        {/* Timeline */}
        <Timeline />

        {/* Leadership (one-pager section) */}
        <section className="space-y-4">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="section-title">Leading, Presenting, and Building</h2>
            <p className="pl-4 max-w-2xl text-white/70">
              A look at the environments where I’m most alive: defending ideas on stage,
              collaborating in technical teams, and staying grounded through the routines that
              keep me sharp.
            </p>
          </div>

            {/* Optional link if you later make a dedicated gallery page */}
            {/* <Link
              href="/leadership"
              className="text-sm text-white/70 underline decoration-white/20 hover:decoration-white/60"
            >
              View gallery
            </Link> */}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <LeadershipPage />
          </div>
        </section>
      </div>
    </div>
  );
}
