import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfGradient: RegistryEntry = entry({
    id: "nf-gradient",
    title: "Gradient 404s",
    description: "A colorful gradient headline and multi-color letter 404s.",
    source: `export default function NfGradient() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        <h1 className="text-8xl font-bold leading-none" style={{ background: "linear-gradient(135deg, #f97316, #ec4899, #6366f1, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>404</h1>
        <p className="mt-2 text-sm text-zinc-500">Colorful error</p>
        <button className="mt-5 rounded-lg bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 px-6 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105">Go Home</button>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        <h1 className="text-7xl font-extrabold">
          {Array.from("404").map((ch, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                color: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"][i * 2 % 7],
                textShadow: \`0 0 20px \${["#ef4444", "#f97316", "#eab308"][i]}55\`,
                transform: \`rotate(\${(i - 1) * 5}deg)\`,
              }}
            >
              {ch}
            </span>
          ))}
        </h1>
        <p className="mt-2 text-sm font-medium text-zinc-500">This page is missing in color</p>
        <button className="mt-5 rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Go Home</button>
      </div>
    </div>
  );
}`,
  });
