"use client";

import { Stack, Inline } from "@/components/ui/Stack";
import { ArrowDown, ArrowRight, Minus } from "lucide-react";

function Item({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex h-10 items-center justify-center rounded-md border border-border/60 bg-muted/30 px-4 text-sm font-medium text-foreground ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function VerticalDemo() {
  return (
    <Stack direction="vertical" gap={4}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  );
}

export function HorizontalDemo() {
  return (
    <Stack direction="horizontal" gap={3}>
      <Item className="w-24">Left</Item>
      <Item className="w-24">Center</Item>
      <Item className="w-24">Right</Item>
    </Stack>
  );
}

export function DividerDemo() {
  return (
    <Stack
      direction="vertical"
      gap={0}
      separator={<div className="h-px bg-border/60" />}
      className="overflow-hidden rounded-lg border border-border/60"
    >
      <div className="flex h-12 items-center px-4 text-sm font-medium">Profile</div>
      <div className="flex h-12 items-center px-4 text-sm font-medium">Notifications</div>
      <div className="flex h-12 items-center px-4 text-sm font-medium">Security</div>
      <div className="flex h-12 items-center px-4 text-sm font-medium">Integrations</div>
    </Stack>
  );
}

export function FillDemo() {
  return (
    <Stack direction="horizontal" gap={2}>
      <Item className="flex-1">Auto</Item>
      <Item className="w-32">Fixed</Item>
      <Item className="flex-1">Auto</Item>
    </Stack>
  );
}

export function NestedDemo() {
  return (
    <Stack direction="vertical" gap={4} className="rounded-lg border border-border/60 p-4">
      <Stack direction="horizontal" gap={3} align="center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-medium text-blue-600 dark:text-blue-400">A</div>
        <Stack direction="vertical" gap={0}>
          <span className="text-sm font-medium text-foreground">User Name</span>
          <span className="text-xs text-muted-foreground">user@example.com</span>
        </Stack>
      </Stack>
      <Stack direction="horizontal" gap={3} align="center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-xs font-medium text-green-600 dark:text-green-400">B</div>
        <Stack direction="vertical" gap={0}>
          <span className="text-sm font-medium text-foreground">Another User</span>
          <span className="text-xs text-muted-foreground">another@example.com</span>
        </Stack>
      </Stack>
    </Stack>
  );
}

export function SpacingDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {([1, 4, 8] as const).map((gap) => (
        <Stack key={gap} direction="vertical" gap={2}>
          <span className="text-xs font-medium text-muted-foreground">gap-{gap}</span>
          <Stack direction="vertical" gap={gap} className="rounded-lg border border-border/60 p-3">
            <Item className="h-8 text-xs">1</Item>
            <Item className="h-8 text-xs">2</Item>
            <Item className="h-8 text-xs">3</Item>
          </Stack>
        </Stack>
      ))}
    </div>
  );
}

export function WrapDemo() {
  return (
    <Inline gap={2} wrap>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex h-8 items-center justify-center rounded-md border border-border/60 bg-muted/30 px-3 text-xs font-medium text-foreground">
          Tag {i + 1}
        </div>
      ))}
    </Inline>
  );
}

export function AlignDemo() {
  return (
    <Stack direction="horizontal" gap={3} align="center" justify="between">
      <Item className="h-8 text-xs">Start</Item>
      <Item className="h-12 text-xs">Center</Item>
      <Item className="h-6 text-xs">End</Item>
    </Stack>
  );
}
