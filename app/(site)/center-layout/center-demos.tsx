"use client";

import { Center } from "@/components/ui/Center";

function Box({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-border/60 bg-muted/30 px-6 py-3 text-sm font-medium text-foreground ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function BothDemo() {
  return (
    <Center className="h-64 rounded-lg border border-border/60 bg-muted/20">
      <Box className="bg-primary/10 text-primary">Centered Content</Box>
    </Center>
  );
}

export function HorizontalDemo() {
  return (
    <Center axis="x" className="h-48 flex-col gap-2 rounded-lg border border-border/60 bg-muted/20 p-4">
      <Box className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Top-aligned, horizontally centered</Box>
      <Box className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Second item</Box>
    </Center>
  );
}

export function VerticalDemo() {
  return (
    <Center axis="y" className="h-48 gap-4 rounded-lg border border-border/60 bg-muted/20 p-4">
      <Box className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Vertically centered</Box>
      <Box className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Next to it</Box>
    </Center>
  );
}

export function PaddingDemo() {
  return (
    <Center padding className="h-48 rounded-lg border border-border/60 bg-muted/20">
      <Box className="w-full max-w-sm bg-purple-500/10 text-center text-purple-600 dark:text-purple-400">
        Centered with padding and max-width
      </Box>
    </Center>
  );
}

export function AbsoluteDemo() {
  return (
    <div className="relative h-48 rounded-lg border border-border/60 bg-muted/20">
      <Center inset>
        <Box className="bg-blue-500/10 text-blue-600 dark:text-blue-400">Absolute Center</Box>
      </Center>
      <span className="absolute right-3 top-3 text-xs text-muted-foreground">relative parent</span>
    </div>
  );
}

export function FlexboxDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Center className="rounded-lg border border-border/60 bg-muted/20 p-4">
        <Box className="bg-rose-500/10 text-xs text-rose-600 dark:text-rose-400">Flex Center</Box>
      </Center>
      <Center className="rounded-lg border border-border/60 bg-muted/20 p-4">
        <div className="flex flex-col items-center gap-1">
          <Box className="bg-rose-500/10 text-xs text-rose-600 dark:text-rose-400">Stacked</Box>
          <span className="text-[10px] text-muted-foreground">subtitle</span>
        </div>
      </Center>
    </div>
  );
}

export function HeroDemo() {
  return (
    <Center className="h-64 rounded-lg border border-border/60 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="flex flex-col items-center gap-3 text-center">
        <h3 className="text-lg font-semibold text-foreground">Welcome to Our Platform</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Build beautiful interfaces with our comprehensive design system and component library.
        </p>
        <div className="flex gap-2">
          <div className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">Get Started</div>
          <div className="rounded-lg border border-border/60 bg-background px-4 py-2 text-xs font-medium">Learn More</div>
        </div>
      </div>
    </Center>
  );
}
