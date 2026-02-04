import Image from "next/image";
import Link from "next/link";

const pics = [
  { src: "/leadership/speaking-1.jpg", alt: "Speaking" },
  { src: "/leadership/mun-podium.jpg", alt: "UoBDMUN podium" },
  { src: "/leadership/formal-group.jpg", alt: "Formal group" },
  { src: "/leadership/uobd-group-1.jpg", alt: "UoB Dubai group" },
];

export default function LeadershipPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Leadership</h1>
          <p className="mt-2 text-white/70">
            Student leadership + public speaking + community building.
          </p>
        </div>
        <Link href="/" className="text-sm text-white/70 underline decoration-white/20 hover:decoration-white/60">
          Home
        </Link>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {pics.map((p) => (
          <div key={p.src} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <Image src={p.src} alt={p.alt} width={1400} height={900} className="h-[320px] w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
