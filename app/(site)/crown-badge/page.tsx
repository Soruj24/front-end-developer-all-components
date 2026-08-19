"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Shield, CheckCircle, XCircle, Mail, Users, Heart, Clock, Settings, MoreVertical } from "lucide-react";

const CROWN_BADGE_SOURCE = "use client";

function BadgeDemo({ label, variant }: { label: string; variant?: "default" | "secondary" | "destructive" }) {
  const variants = {
    default: "bg-foreground text-background",
    secondary: "bg-muted text-foreground",
    destructive: "bg-red-600 text-white",
  };
  const cls = variants[variant || "default"];
  return (
    <span className={cls} className="rounded-md px-3 py-1.5 text-sm font-medium">
      {label}
    </span>
  );
}

function BadgeGroupDemo() {
  const badges = [
    { label: "Primary", variant: "default" },
    { label: "Secondary", variant: "secondary" },
    { label: "Error", variant: "destructive" },
    { label: "New", variant: "default" },
    { label: "Pending", variant: "default" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => <BadgeDemo label={b.label} variant={b.variant} key={b.label} />)}
    </div>
  );
}

export default function CrownBadgePage() {
  return (
    <ComponentDocPage
      name="Crown Badge"
      category="Feedback"
      description="Badges with Crown icon styling for status indication and counting."
    >
      <PreviewPanel filename="crown-badge.tsx">
        <BadgeDemo label="New" variant="default" />
        <BadgeDemo label="5" variant="default" />
      </PreviewPanel>

      <SourceCodeViewer
        source={CROWN_BADGE_SOURCE}
        filename="components/ui/CrownBadge/CrownBadge.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock title="Basic Badges" description="Default, secondary, and destructive badges." code={CROWN_BADGE_SOURCE}>
          <BadgeDemo label="New" variant="default" />
          <BadgeDemo label="5" variant="default" />
          <BadgeDemo label="Error" variant="destructive" />
        </ExampleBlock>

        <ExampleBlock title="Badge Group" description="Multiple badges in a horizontal group." code={CROWN_BADGE_SOURCE}>
          <BadgeGroupDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}