"use client";

interface IndustryCardProps {
  title: string;
  tag: string;
  bg: string;
}

export function IndustryCard({ title, tag, bg }: IndustryCardProps) {
  return (
    <div className={`flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br p-6 text-center text-white ${bg}`}>
      <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium">{tag}</span>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-sm text-white/80">Build something amazing today.</p>
      <button className="mt-2 rounded-lg bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm hover:bg-white/30">Get Started</button>
    </div>
  );
}
