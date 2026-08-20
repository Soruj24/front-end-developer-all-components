"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";

const AVATAR_SOURCE = `import { HTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl";
type Status = "online" | "offline" | "away" | "busy";

const sizeClasses: Record<Size, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusDot: Record<Status, string> = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground/50",
  away: "bg-amber-500",
  busy: "bg-rose-500",
};

const statusSize: Record<Size, string> = {
  sm: "h-2 w-2 border",
  md: "h-2.5 w-2.5 border-[1.5px]",
  lg: "h-3 w-3 border-2",
  xl: "h-3.5 w-3.5 border-2",
};

const fallbackGradient = [
  "from-blue-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-violet-500 to-purple-500",
  "from-cyan-500 to-blue-500",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
  src?: string;
  alt: string;
  fallback: string;
  status?: Status;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", size = "md", src, alt, fallback, status, ...props }, ref) => {
    const [imgFailed, setImgFailed] = useState(false);
    const showImage = src && !imgFailed;
    const gradient = fallbackGradient[hashString(fallback) % fallbackGradient.length];

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
          "ring-2 ring-background transition-shadow duration-150",
          sizeClasses[size],
          className,
        )}
        aria-label={alt}
        role="img"
        {...props}
      >
        {showImage ? (
          <img src={src} alt={alt} className="h-full w-full rounded-full object-cover"
            onError={() => setImgFailed(true)} />
        ) : (
          <span className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white",
            gradient,
          )}>
            {fallback}
          </span>
        )}
        {status && (
          <span className={cn(
            "absolute bottom-0 right-0 rounded-full border-background",
            statusDot[status], statusSize[size],
            status === "online" && "animate-pulse",
          )} aria-label={\`Status: \${status}\`} />
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

export default Avatar;
export { Avatar };`;

const NAMES = [
  "Alice Johnson",
  "Bob Smith",
  "Carol Davis",
  "Dave Wilson",
  "Eve Martinez",
  "Frank Brown",
  "Grace Lee",
  "Henry Taylor",
];

const COLORS = [
  "from-blue-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-violet-500 to-purple-500",
  "from-cyan-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-teal-500 to-emerald-500",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function SizesExample() {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="sm" alt="Small" fallback="SM" />
        <span className="text-[10px] text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="md" alt="Medium" fallback="MD" />
        <span className="text-[10px] text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" alt="Large" fallback="LG" />
        <span className="text-[10px] text-muted-foreground">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="xl" alt="Extra Large" fallback="XL" />
        <span className="text-[10px] text-muted-foreground">xl</span>
      </div>
    </div>
  );
}

function StatusExample() {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" alt="Alice" fallback="AK" status="online" />
        <span className="text-[10px] text-muted-foreground">online</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" alt="Bob" fallback="BM" status="away" />
        <span className="text-[10px] text-muted-foreground">away</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" alt="Carol" fallback="CL" status="busy" />
        <span className="text-[10px] text-muted-foreground">busy</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" alt="Dave" fallback="DV" status="offline" />
        <span className="text-[10px] text-muted-foreground">offline</span>
      </div>
    </div>
  );
}

function FallbackExample() {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" alt="User" fallback="JD" />
        <span className="text-[10px] text-muted-foreground">Initials</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" alt="User" fallback="AB" />
        <span className="text-[10px] text-muted-foreground">Gradient</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          size="xl"
          src="https://invalid.url/img.jpg"
          alt="User"
          fallback="ML"
        />
        <span className="text-[10px] text-muted-foreground">Image failed</span>
      </div>
    </div>
  );
}

function GroupExample() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          Stacked (overflow hidden)
        </p>
        <div className="flex -space-x-3">
          {NAMES.slice(0, 5).map((name, i) => (
            <Avatar
              key={name}
              size="lg"
              alt={name}
              fallback={getInitials(name)}
              className={cn(
                "ring-2 ring-background transition-transform duration-150 hover:z-10 hover:scale-110",
              )}
              style={{ zIndex: 5 - i }}
            />
          ))}
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground ring-2 ring-background">
            +3
          </div>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          Stacked with status
        </p>
        <div className="flex -space-x-3">
          {[
            { name: "Alice", status: "online" as const },
            { name: "Bob", status: "away" as const },
            { name: "Carol", status: "busy" as const },
            { name: "Dave", status: "offline" as const },
          ].map((user, i) => (
            <Avatar
              key={user.name}
              size="lg"
              alt={user.name}
              fallback={getInitials(user.name)}
              status={user.status}
              className={cn(
                "ring-2 ring-background transition-transform duration-150 hover:z-10 hover:scale-110",
              )}
              style={{ zIndex: 5 - i }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorsExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {COLORS.map((gradient, i) => (
        <div key={gradient} className="flex flex-col items-center gap-1.5">
          <Avatar
            size="lg"
            alt={NAMES[i]}
            fallback={getInitials(NAMES[i])}
          />
          <span className="text-[10px] text-muted-foreground">
            {NAMES[i].split(" ")[0]}
          </span>
        </div>
      ))}
    </div>
  );
}

function PlaygroundDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [status, setStatus] = useState<string>("online");
  const [showImage, setShowImage] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center py-4">
        <Avatar
          size={size}
          alt="Playground User"
          fallback="PU"
          status={status !== "none" ? (status as "online" | "offline" | "away" | "busy") : undefined}
          src={showImage ? "https://i.pravatar.cc/150?u=playground" : undefined}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Size</p>
          <div className="flex gap-2">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  size === s
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:bg-muted",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Status</p>
          <div className="flex gap-2">
            {["none", "online", "away", "busy", "offline"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  status === s
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:bg-muted",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Source</p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowImage(false)}
              className={cn(
                "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                !showImage
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground hover:bg-muted",
              )}
            >
              Fallback
            </button>
            <button
              onClick={() => setShowImage(true)}
              className={cn(
                "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                showImage
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground hover:bg-muted",
              )}
            >
              Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AvatarPage() {
  return (
    <ComponentDocPage
      name="Avatar"
      category="Data Display"
      description="User avatars with image support, gradient initials fallback, size variants, status indicators, and stacked groups."
    >
      <PreviewPanel filename="avatar-preview.tsx">
        <div className="flex items-end gap-4">
          <Avatar size="sm" alt="User" fallback="SM" />
          <Avatar size="md" alt="User" fallback="MD" />
          <Avatar size="lg" alt="Alice" fallback="AK" status="online" />
          <Avatar
            size="xl"
            src="https://i.pravatar.cc/150?u=a"
            alt="User"
            fallback="XL"
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={AVATAR_SOURCE}
        filename="components/ui/Avatar.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Sizes"
          description="Four size options: sm (32px), md (40px), lg (48px), xl (64px)."
          code={`<Avatar size="sm" alt="User" fallback="SM" />
<Avatar size="md" alt="User" fallback="MD" />
<Avatar size="lg" alt="User" fallback="LG" />
<Avatar size="xl" alt="User" fallback="XL" />`}
        >
          <SizesExample />
        </ExampleBlock>

        <ExampleBlock
          title="Status Indicators"
          description="Online status dots with color coding and pulse animation for online."
          code={`<Avatar size="lg" alt="Alice" fallback="AK" status="online" />
<Avatar size="lg" alt="Bob" fallback="BM" status="away" />
<Avatar size="lg" alt="Carol" fallback="CL" status="busy" />
<Avatar size="lg" alt="Dave" fallback="DV" status="offline" />`}
        >
          <StatusExample />
        </ExampleBlock>

        <ExampleBlock
          title="Fallback"
          description="Gradient background with initials when no image or image fails to load."
          code={`<Avatar size="lg" alt="User" fallback="JD" />
<Avatar size="xl" src="https://invalid.url/img.jpg" alt="User" fallback="ML" />`}
        >
          <FallbackExample />
        </ExampleBlock>

        <ExampleBlock
          title="Group"
          description="Stacked avatar group with overlap and overflow count."
          code={`<div className="flex -space-x-3">
  <Avatar size="lg" alt="A" fallback="AK" className="ring-2 ring-background" />
  <Avatar size="lg" alt="B" fallback="BM" className="ring-2 ring-background" />
  <Avatar size="lg" alt="C" fallback="CL" className="ring-2 ring-background" />
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground ring-2 ring-background">+1</div>
</div>`}
        >
          <GroupExample />
        </ExampleBlock>

        <ExampleBlock
          title="Colors"
          description="Consistent gradient colors derived from the fallback string."
          code={`<Avatar size="lg" alt="Alice" fallback="AJ" />
<Avatar size="lg" alt="Bob" fallback="BS" />`}
        >
          <ColorsExample />
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Try different sizes, statuses, and image vs fallback."
          code={AVATAR_SOURCE}
        >
          <PlaygroundDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
