import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/60">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <div className="flex gap-4">
            <a className="hover:text-white" href={`mailto:${profile.email}`}>Email</a>
            <a className="hover:text-white" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-white" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
