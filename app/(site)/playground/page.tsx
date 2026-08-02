import { Suspense } from "react";
import { Playground } from "@/features/playground";

export const metadata = {
  title: "Playground",
  description:
    "Full IDE for building UI components: multi-file editor with syntax highlighting, live esbuild preview across devices, console, terminal, and one-click export.",
};

function Fallback() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div
        className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground"
        aria-label="Loading"
      />
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <Playground />
    </Suspense>
  );
}
