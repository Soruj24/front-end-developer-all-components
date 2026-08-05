import { Suspense } from "react";
import { StudioProvider, StudioLayout } from "@/features/visual-studio";

export const metadata = {
  title: "Visual Component Studio",
  description:
    "Design-first visual editor for React components. Drag, customize, and export production-ready React + TypeScript + Tailwind CSS code without writing any code.",
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

export default function VisualStudioPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <StudioProvider>
        <StudioLayout />
      </StudioProvider>
    </Suspense>
  );
}
