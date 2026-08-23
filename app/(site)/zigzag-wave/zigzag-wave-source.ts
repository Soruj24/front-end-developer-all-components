export const ZIGZAG_WAVE_SOURCE = `"use client";

export function BasicWave() {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <svg key={i} className="w-full h-6 animate-[wave_2s_ease-in-out_infinite]" style={{ animationDelay: \`\${i * 0.3}s\`, opacity: 1 - i * 0.2 }} viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0 12 Q25 0 50 12 T100 12 T150 12 T200 12 T250 12 T300 12 T350 12 T400 12" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-900 dark:text-zinc-100" />
        </svg>
      ))}
    </div>
  );
}`;
