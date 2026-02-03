import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Ameer <span className="text-white/60">/ portfolio</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-white/80">
          <Link href="/projects" className="hover:text-white">Projects</Link>
          <a href="/Ameer-Alhashemi-CV.pdf" className="hover:text-white">CV (PDF)</a>
          <a
            href="https://github.com/TallowCatch"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
