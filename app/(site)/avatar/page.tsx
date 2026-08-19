"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const AVATAR_SOURCE = `import { HTMLAttributes, forwardRef } from "react";

type Size = "sm" | "md" | "lg" | "xl";
type Status = "online" | "offline" | "away" | "busy";

const sizeClasses: Record<Size, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusClasses: Record<Status, string> = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  away: "bg-warning",
  busy: "bg-danger",
};

const statusSizeClasses: Record<Size, string> = {
  sm: "h-2 w-2 right-0 bottom-0",
  md: "h-2.5 w-2.5 right-0 bottom-0",
  lg: "h-3 w-3 right-0 bottom-0",
  xl: "h-3.5 w-3.5 right-0.5 bottom-0.5",
};

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
  src?: string;
  alt: string;
  fallback: string;
  status?: Status;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", size = "md", src, alt, fallback, status, ...props }, ref) => (
    <div
      ref={ref}
      className={\`relative inline-flex items-center justify-center rounded-full bg-muted \${sizeClasses[size]} \${className}\`}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full rounded-full object-cover" />
      ) : (
        <span className="font-medium text-muted-foreground">{fallback}</span>
      )}
      {status && (
        <span
          className={\`absolute rounded-full border-2 border-background \${statusClasses[status]} \${statusSizeClasses[size]}\`}
        />
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";

export default Avatar;
export { Avatar };`;

const SIZES_SOURCE = `import Avatar from "@/components/ui/Avatar";

<div className="flex items-end gap-4">
  <Avatar size="sm" alt="User" fallback="SM" />
  <Avatar size="md" alt="User" fallback="MD" />
  <Avatar size="lg" alt="User" fallback="LG" />
  <Avatar size="xl" alt="User" fallback="XL" />
</div>`;

const STATUS_SOURCE = `import Avatar from "@/components/ui/Avatar";

<div className="flex items-end gap-4">
  <Avatar size="lg" alt="Alice" fallback="AK" status="online" />
  <Avatar size="lg" alt="Bob" fallback="BM" status="away" />
  <Avatar size="lg" alt="Carol" fallback="CL" status="busy" />
  <Avatar size="lg" alt="Dave" fallback="DV" status="offline" />
</div>`;

const FALLBACK_SOURCE = `import Avatar from "@/components/ui/Avatar";

<div className="flex items-end gap-4">
  <Avatar size="lg" alt="User" fallback="JD" />
  <Avatar size="lg" src="https://valid.url/photo.jpg" alt="User" fallback="AK" />
  <Avatar size="xl" src="https://invalid.url/img.jpg" alt="User" fallback="ML" />
</div>`;

const SIZES: Record<string, string> = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base", xl: "h-16 w-16 text-lg" };
const STATUS_CLR: Record<string, string> = { online: "bg-success", offline: "bg-muted-foreground", away: "bg-warning", busy: "bg-danger" };
const STATUS_SZ: Record<string, string> = { sm: "h-2 w-2", md: "h-2.5 w-2.5", lg: "h-3 w-3", xl: "h-3.5 w-3.5" };

function A({ size = "md", src, alt, fallback, status }: { size?: string; src?: string; alt: string; fallback: string; status?: string }) {
  const [fail, setFail] = useState(false);
  const show = src && !fail;
  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-muted ${SIZES[size]}`}>
      {show ? <img src={src} alt={alt} className="h-full w-full rounded-full object-cover" onError={() => setFail(true)} /> : <span className="font-medium text-muted-foreground">{fallback}</span>}
      {status && <span className={`absolute rounded-full border-2 border-background ${STATUS_CLR[status]} ${STATUS_SZ[size]} right-0 bottom-0`} />}
    </div>
  );
}

export default function AvatarPage() {
  return (
    <ComponentDocPage name="Avatar" category="Data Display" description="User avatars with image support, initials fallback, size variants, and online status indicators.">
      <PreviewPanel filename="avatar-preview.tsx">
        <div className="flex items-end gap-4">
          <A size="sm" alt="User" fallback="SM" />
          <A size="md" alt="User" fallback="MD" />
          <A size="lg" alt="User" fallback="LG" status="online" />
          <A size="xl" src="https://i.pravatar.cc/150?u=a" alt="User" fallback="XL" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={AVATAR_SOURCE} filename="components/ui/Avatar.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Sizes" description="Four size options: sm, md, lg, and xl." code={SIZES_SOURCE} filename="sizes.tsx">
          <div className="flex items-end gap-4">
            <A size="sm" alt="User" fallback="SM" />
            <A size="md" alt="User" fallback="MD" />
            <A size="lg" alt="User" fallback="LG" />
            <A size="xl" alt="User" fallback="XL" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Status" description="Online status indicators with four states." code={STATUS_SOURCE} filename="status.tsx">
          <div className="flex items-end gap-4">
            <A size="lg" alt="Alice" fallback="AK" status="online" />
            <A size="lg" alt="Bob" fallback="BM" status="away" />
            <A size="lg" alt="Carol" fallback="CL" status="busy" />
            <A size="lg" alt="Dave" fallback="DV" status="offline" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Fallback" description="Shows initials when image fails to load." code={FALLBACK_SOURCE} filename="fallback.tsx">
          <div className="flex items-end gap-4">
            <A size="lg" alt="User" fallback="JD" />
            <A size="lg" src="https://i.pravatar.cc/150?u=ok" alt="User" fallback="AK" />
            <A size="xl" src="https://invalid.url/img.jpg" alt="User" fallback="ML" />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
