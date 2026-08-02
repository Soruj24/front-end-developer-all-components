import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationProgress: RegistryEntry = entry({
    id: "navigation-progress",
    title: "Progress Indicator",
    description: "Gradient scroll-progress bar tied to page scroll.",
    source: `import { useEffect, useState } from "react";

export default function NavigationProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150" style={{ width: \`\${scrollProgress}%\` }} />
      </div>
      <p className="text-xs text-zinc-400">Scroll the page to see the progress bar move.</p>
    </div>
  );
}`,
  });
