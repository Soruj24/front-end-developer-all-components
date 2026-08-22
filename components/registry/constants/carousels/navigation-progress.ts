import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationProgress: RegistryEntry = entry({
    id: "navigation-progress",
    title: "Scroll Progress Indicator",
    description: "Gradient progress bar that tracks the page reading position.",
    source: `import { useEffect, useState } from "react";

export default function NavigationProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-info transition-[width] duration-150 ease-out"
          style={{ width: \`\${progress}%\` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Scroll the page to see the indicator track reading position ({Math.round(progress)}%).
      </p>
    </div>
  );
}`,
    });
