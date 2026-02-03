import { projects } from "@/content/projects";

export default function sitemap() {
  const base = "https://tallowport.xyz"; // change if you want
  const projectUrls = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    ...projectUrls,
  ];
}
