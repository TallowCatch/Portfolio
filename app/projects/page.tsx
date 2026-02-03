import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-white/70">
          Case studies focused on evaluation, robustness, and real implementation details.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </div>
  );
}
