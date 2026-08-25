"use client";

import { Item } from "@/components/ui/Item";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const ITEM_SOURCE = `"use client";

import { cn } from "@/lib/cn";
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
        "flex items-center gap-3 rounded-xl px-3 py-2.5",
        "transition-colors duration-200",
        onClick && "cursor-pointer hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none active:bg-muted/80",
        className,
      )}
    >
      {icon && <div className="flex shrink-0 text-muted-foreground">{icon}</div>}
      <div className="flex min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-none text-foreground">{label}</p>
        {description && (
          <p className="mt-1 truncate text-xs leading-none text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0">{actions}</div>}
    </div>
  );
}

export default Item;
export { Item };`;

function Icon({ path }: { path: string }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

const HOME = "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6";
const SETTINGS = "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z";
const USER = "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z";
const BELL = "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9";
const MAIL = "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
const FOLDER = "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z";

export default function ItemPage() {
  return (
    <ComponentDocPage
      name="Item"
      category="Data Display"
      description="A versatile component for displaying content with media, title, description, and actions."
    >
      <PreviewPanel filename="item-preview.tsx">
        <div className="flex w-full max-w-sm flex-col gap-1">
          <Item icon={<Icon path={HOME} />} label="Home" description="Go to homepage" />
          <Item icon={<Icon path={SETTINGS} />} label="Settings" description="Manage preferences" />
          <Item icon={<Icon path={USER} />} label="Profile" description="View your account" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={ITEM_SOURCE} filename="components/ui/Item/Item.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple items with just a label."
          code={`import { Item } from "@/components/ui/Item";

<div className="flex flex-col gap-1">
  <Item label="Profile" />
  <Item label="Settings" />
  <Item label="Notifications" />
</div>`}
          filename="basic.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-1">
            <Item label="Profile" />
            <Item label="Settings" />
            <Item label="Notifications" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Add leading icons for visual context."
          code={`import { Item } from "@/components/ui/Item";

<div className="flex flex-col gap-1">
  <Item icon={<HomeIcon />} label="Home" />
  <Item icon={<SettingsIcon />} label="Settings" />
  <Item icon={<UserIcon />} label="Profile" />
</div>`}
          filename="icons.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-1">
            <Item icon={<Icon path={HOME} />} label="Home" />
            <Item icon={<Icon path={SETTINGS} />} label="Settings" />
            <Item icon={<Icon path={USER} />} label="Profile" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Description"
          description="Add a secondary description line."
          code={`import { Item } from "@/components/ui/Item";

<Item
  icon={<SettingsIcon />}
  label="General"
  description="Manage your account settings and preferences"
/>`}
          filename="description.tsx"
        >
          <div className="w-full max-w-sm">
            <Item
              icon={<Icon path={SETTINGS} />}
              label="General"
              description="Manage your account settings and preferences"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Interactive"
          description="Clickable items with hover and focus states."
          code={`import { Item } from "@/components/ui/Item";

<div className="flex flex-col gap-1">
  <Item label="Click me" onClick={() => {}} />
  <Item label="Also clickable" onClick={() => {}} />
  <Item label="Not interactive" />
</div>`}
          filename="interactive.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-1">
            <Item label="Click me" onClick={() => {}} />
            <Item label="Also clickable" onClick={() => {}} />
            <Item label="Not interactive" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Actions"
          description="Add trailing action buttons."
          code={`import { Item } from "@/components/ui/Item";

<Item icon={<StarIcon />} label="Favorite" actions={<button>...</button>} />`}
          filename="actions.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-1">
            <Item icon={<StarIcon />} label="Favorite" actions={<button className="rounded-lg p-1.5 hover:bg-muted"><StarIcon /></button>} />
            <Item icon={<Icon path={MAIL} />} label="Messages" actions={<span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">3</span>} />
            <Item icon={<Icon path={BELL} />} label="Notifications" actions={<button className="rounded-lg p-1.5 hover:bg-muted"><TrashIcon /></button>} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Navigation Menu"
          description="Use as a navigation menu with icons and chevrons."
          code={`import { Item } from "@/components/ui/Item";

<div className="flex flex-col gap-1">
  <Item icon={<HomeIcon />} label="Home" onClick={() => {}} actions={<ChevronRightIcon />} />
  <Item icon={<FolderIcon />} label="Projects" onClick={() => {}} actions={<ChevronRightIcon />} />
  <Item icon={<UserIcon />} label="Account" onClick={() => {}} actions={<ChevronRightIcon />} />
</div>`}
          filename="navigation.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-1 rounded-2xl border border-border bg-card p-2">
            <Item icon={<Icon path={HOME} />} label="Home" onClick={() => {}} actions={<ChevronRightIcon />} />
            <Item icon={<Icon path={FOLDER} />} label="Projects" onClick={() => {}} actions={<ChevronRightIcon />} />
            <Item icon={<Icon path={USER} />} label="Account" onClick={() => {}} actions={<ChevronRightIcon />} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Selected State"
          description="Indicate the currently selected item."
          code={`import { Item } from "@/components/ui/Item";

<div className="flex flex-col gap-1">
  <Item icon={<CheckIcon />} label="Option A" className="bg-primary/5 text-primary" />
  <Item label="Option B" />
  <Item label="Option C" />
</div>`}
          filename="selected.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-1 rounded-2xl border border-border bg-card p-2">
            <Item icon={<CheckIcon />} label="Option A" className="bg-primary/5 text-primary" />
            <Item label="Option B" />
            <Item label="Option C" />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
