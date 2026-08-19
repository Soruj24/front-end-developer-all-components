"use client";

import { Item } from "@/components/ui/Item";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const ITEM_SOURCE = `import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface ItemProps {
  icon?: ReactNode;
  label: string;
  description?: string;
  actions?: ReactNode;
  onClick?: () => void;
  className?: string;
}

function Item({ icon, label, description, actions, onClick, className }: ItemProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2",
        onClick && "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800",
        className,
      )}
    >
      {icon && <div className="flex-shrink-0 text-muted-foreground">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-none truncate">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 truncate">{description}</p>
        )}
      </div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
}

export default Item;
export { Item };`;

const BASIC_SOURCE = `import { Item } from "@/components/ui/Item";

<div className="flex flex-col gap-1">
  <Item label="Profile" />
  <Item label="Settings" />
  <Item label="Notifications" />
</div>`;

const VARIANT_SOURCE = `import { Item } from "@/components/ui/Item";

<div className="flex flex-col gap-1">
  <Item label="Default" />
  <Item label="Selected" onClick={() => {}} />
  <Item label="Disabled" className="opacity-50 pointer-events-none" />
</div>`;

const ICON_SOURCE = `import { Item } from "@/components/ui/Item";

<div className="flex flex-col gap-1">
  <Item icon={<HomeIcon />} label="Home" />
  <Item icon={<SettingsIcon />} label="Settings" />
  <Item icon={<UserIcon />} label="Profile" />
</div>`;

const DESCRIPTION_SOURCE = `import { Item } from "@/components/ui/Item";

<Item
  icon={<SettingsIcon />}
  label="General"
  description="Manage your account settings and preferences"
/>`;

function Icon({ path }: { path: string }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

const HOME = "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6";
const SETTINGS = "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z";
const USER = "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z";

export default function ItemPage() {
  return (
    <ComponentDocPage
      name="Item"
      category="Data Display"
      description="A versatile component for displaying content with media, title, description, and actions."
    >
      <PreviewPanel filename="item-preview.tsx">
        <div className="flex flex-col gap-1">
          <Item icon={<Icon path={HOME} />} label="Home" description="Go to homepage" />
          <Item icon={<Icon path={SETTINGS} />} label="Settings" description="Manage preferences" />
          <Item icon={<Icon path={USER} />} label="Profile" description="View your account" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={ITEM_SOURCE} filename="components/ui/Item.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic"
          description="Simple items with just a label."
          code={BASIC_SOURCE}
          filename="basic.tsx"
        >
          <div className="flex flex-col gap-1">
            <Item label="Profile" />
            <Item label="Settings" />
            <Item label="Notifications" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Add leading icons to items."
          code={ICON_SOURCE}
          filename="icons.tsx"
        >
          <div className="flex flex-col gap-1">
            <Item icon={<Icon path={HOME} />} label="Home" />
            <Item icon={<Icon path={SETTINGS} />} label="Settings" />
            <Item icon={<Icon path={USER} />} label="Profile" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Description"
          description="Add a secondary description line."
          code={DESCRIPTION_SOURCE}
          filename="description.tsx"
        >
          <div className="w-72">
            <Item
              icon={<Icon path={SETTINGS} />}
              label="General"
              description="Manage your account settings and preferences"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Interactive"
          description="Clickable items with hover states via onClick."
          code={VARIANT_SOURCE}
          filename="interactive.tsx"
        >
          <div className="flex flex-col gap-1">
            <Item label="Click me" onClick={() => {}} />
            <Item label="Also clickable" onClick={() => {}} />
            <Item label="Not interactive" />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
