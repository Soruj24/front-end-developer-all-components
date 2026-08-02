import { Suspense } from "react";
import { Playground } from "@/components/playground";

export const metadata = {
  title: "Playground",
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
