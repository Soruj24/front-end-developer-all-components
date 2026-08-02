import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfAnimated: RegistryEntry = entry({
    id: "nf-animated",
    title: "Animated 404s",
    description: "A pulsing 404 and a drifting page with floating emoji keyframe animations.",
    source: `export default function NfAnimated() {
  const floatingItems = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    emoji: ["🌟", "✨", "💫", "⭐", "🌙", "☄️", "🌈", "🎈", "💡", "🔮"][i % 10],
    x: Math.random() * 90 + 5,
    y: Math.random() * 80 + 10,
    size: 12 + Math.random() * 20,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        <h1 className="animate-pulse text-8xl font-bold text-indigo-500" style={{ animationDuration: "3s" }}>404</h1>
        <p className="mt-2 animate-pulse text-sm text-zinc-500" style={{ animationDuration: "3s", animationDelay: "0.5s" }}>This page is resting.</p>
        <button className="mt-5 animate-pulse rounded-lg bg-indigo-500 px-5 py-2 text-sm font-medium text-white">Go Home</button>
      </div>
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        {floatingItems.map((item) => (
          <span
            key={item.id}
            className="pointer-events-none absolute"
            style={{
              left: \`\${item.x}%\`,
              top: \`\${item.y}%\`,
              fontSize: \`\${item.size}px\`,
              animation: \`float-\${item.id} \${item.duration}s ease-in-out \${item.delay}s infinite alternate\`,
              opacity: 0.6,
            }}
          >
            {item.emoji}
          </span>
        ))}
        <style>{floatingItems.map((item) => \`
          @keyframes float-\${item.id} {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-\${10 + (item.id % 20)}px) rotate(\${item.id % 2 === 0 ? 10 : -10}deg); }
          }
        \`).join("\\n")}</style>
        <div className="relative z-10">
          <h1 className="text-7xl font-bold text-zinc-300 dark:text-zinc-600">404</h1>
          <p className="text-sm text-zinc-500">Page drifted away</p>
          <button className="mt-4 inline-block rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Go Home</button>
        </div>
      </div>
    </div>
  );
}`,
  });
