export const ZERO_GRAVITY_SOURCE = `"use client";

export function BasicGravity() {
  return (
    <div className="relative h-48 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-b from-blue-50 to-indigo-50 shadow-sm dark:border-zinc-700 dark:from-blue-950/50 dark:to-indigo-950/50">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="absolute rounded-full bg-gradient-to-br from-blue-400 to-violet-500 shadow-lg" style={{ left: \`\${i * 18}%\`, top: \`\${30 + (i % 3) * 20}%\`, width: \`\${12 + i * 4}px\`, height: \`\${12 + i * 4}px\`, animation: \`float \${2 + i * 0.5}s ease-in-out infinite\`, animationDelay: \`\${i * 0.2}s\` }} />
      ))}
      <style>{\`@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }\`}</style>
    </div>
  );
}`;
