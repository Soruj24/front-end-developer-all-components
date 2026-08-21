export const CLUSTER_SOURCE = [
  '"use client";',
  '',
  'import { forwardRef } from "react";',
  'import { cn } from "@/lib/cn";',
  '',
  'type ClusterJustify = "start" | "center" | "end";',
  'type ClusterAlign = "start" | "center" | "end" | "stretch";',
  '',
  'interface ClusterProps {',
  '  gap?: number;',
  '  justify?: ClusterJustify;',
  '  align?: ClusterAlign;',
  '  responsive?: boolean;',
  '  className?: string;',
  '  children?: React.ReactNode;',
  '}',
  '',
  'const JUSTIFY_STYLES: Record<ClusterJustify, string> = {',
  '  start: "justify-start",',
  '  center: "justify-center",',
  '  end: "justify-end",',
  '};',
  '',
  'const ALIGN_STYLES: Record<ClusterAlign, string> = {',
  '  start: "items-start",',
  '  center: "items-center",',
  '  end: "items-end",',
  '  stretch: "items-stretch",',
  '};',
  '',
  'const Cluster = forwardRef<HTMLDivElement, ClusterProps>(',
  '  ({ gap = 2, justify = "start", align, responsive = true, className, children }, ref) => {',
  '    const justifyClass = JUSTIFY_STYLES[justify];',
  '    const alignClass = align ? ALIGN_STYLES[align] : undefined;',
  '    const gapStyle = { gap: `${gap * 0.25}rem` };',
  '',
  '    return (',
  '      <div',
  '        ref={ref}',
  '        className={cn(',
  '          "flex flex-wrap",',
  '          justifyClass,',
  '          alignClass,',
  '          responsive && "max-sm:[&>*]:w-full",',
  '          className,',
  '        )}',
  '        style={gapStyle}',
  '        role="group"',
  '      >',
  '        {children}',
  '      </div>',
  '    );',
  '  },',
  ');',
  '',
  'Cluster.displayName = "Cluster";',
  'export { Cluster };',
].join('\n');

export const TAG_CLOUD_EXAMPLE = [
  '<Cluster gap={2}>',
  '  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">React</span>',
  '  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">TypeScript</span>',
  '  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Tailwind CSS</span>',
  '  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Next.js</span>',
  '  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">GraphQL</span>',
  '</Cluster>',
].join('\n');

export const ACTIONS_EXAMPLE = [
  '<Cluster gap={2}>',
  '  <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save</button>',
  '  <button className="rounded-md border bg-background px-4 py-2 text-sm font-medium">Cancel</button>',
  '  <button className="rounded-md border bg-background px-4 py-2 text-sm font-medium">Preview</button>',
  '</Cluster>',
].join('\n');

export const JUSTIFY_START_EXAMPLE = [
  '<Cluster gap={2} justify="start">',
  '  <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">Dashboard</div>',
  '  <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">Projects</div>',
  '  <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">Settings</div>',
  '</Cluster>',
].join('\n');

export const JUSTIFY_CENTER_EXAMPLE = [
  '<Cluster gap={2} justify="center">',
  '  <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">Dashboard</div>',
  '  <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">Projects</div>',
  '  <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">Settings</div>',
  '</Cluster>',
].join('\n');

export const JUSTIFY_END_EXAMPLE = [
  '<Cluster gap={2} justify="end">',
  '  <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">Dashboard</div>',
  '  <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">Projects</div>',
  '  <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">Settings</div>',
  '</Cluster>',
].join('\n');

export const GAP_VARIANTS_EXAMPLE = [
  '<Cluster gap={1}>...</Cluster>',
  '<Cluster gap={2}>...</Cluster>',
  '<Cluster gap={4}>...</Cluster>',
  '<Cluster gap={6}>...</Cluster>',
].join('\n');

export const MIXED_CONTENT_EXAMPLE = [
  '<Cluster gap={2}>',
  '  <span className="text-sm font-medium">Filter by:</span>',
  '  <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-600">Status</span>',
  '  <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600">Date</span>',
  '  <span className="text-xs text-muted-foreground">4 filters active</span>',
  '</Cluster>',
].join('\n');

export const TOOLBAR_EXAMPLE = [
  '<Cluster gap={3} align="center">',
  '  <button className="rounded bg-background px-3 py-1.5 text-xs font-medium shadow-sm">Bold</button>',
  '  <button className="rounded bg-background px-3 py-1.5 text-xs font-medium shadow-sm">Italic</button>',
  '  <div className="h-4 w-px bg-border" />',
  '  <button className="rounded bg-background px-3 py-1.5 text-xs font-medium shadow-sm">Align Left</button>',
  '</Cluster>',
].join('\n');

export const RESPONSIVE_EXAMPLE = [
  '<Cluster gap={2} responsive>',
  '  <button className="rounded-md bg-primary px-4 py-2 text-sm">Save</button>',
  '  <button className="rounded-md border px-4 py-2 text-sm">Cancel</button>',
  '  <button className="rounded-md border px-4 py-2 text-sm">Preview</button>',
  '</Cluster>',
  '<!-- On mobile: items stack full-width -->',
  '<!-- On desktop: items wrap in a cluster -->',
].join('\n');

export const ALIGN_EXAMPLE = [
  '<Cluster gap={3} align="center">',
  '  <span className="text-sm font-medium">Status:</span>',
  '  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs">Active</span>',
  '  <span className="text-xs text-muted-foreground">Updated 2 min ago</span>',
  '</Cluster>',
].join('\n');
