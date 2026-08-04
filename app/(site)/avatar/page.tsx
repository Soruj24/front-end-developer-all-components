"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";

const sizes = [
  { name: "sm", class: "h-8 w-8 text-xs" },
  { name: "md", class: "h-10 w-10 text-sm" },
  { name: "lg", class: "h-14 w-14 text-lg" },
  { name: "xl", class: "h-20 w-20 text-2xl" },
];

const statusColors: Record<string, string> = {
  online: "bg-success",
  offline: "bg-zinc-400",
  away: "bg-yellow-500",
  busy: "bg-danger",
};

const statusSizes: Record<string, string> = {
  sm: "h-2.5 w-2.5 ring-1.5",
  md: "h-3 w-3 ring-2",
  lg: "h-3.5 w-3.5 ring-2",
  xl: "h-4 w-4 ring-2",
};

function AvatarImage({ src, initials, className }: { src: string; initials: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`overflow-hidden rounded-full ${className ?? ""}`}>
      {!failed ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 font-medium text-white">
          {initials}
        </div>
      )}
    </div>
  );
}

export default function AvatarPage() {
  const [status, setStatus] = useState<string>("online");

  const statusList = [
    { key: "online", label: "Online", color: "bg-success" },
    { key: "offline", label: "Offline", color: "bg-zinc-400" },
    { key: "away", label: "Away", color: "bg-yellow-500" },
    { key: "busy", label: "Busy", color: "bg-danger" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Avatar</h1>
          <Badge variant="primary">8 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Avatars with initials, images, status indicators, groups, and badges.
          Each example is interactive — use the tabs to inspect source, CLI,
          installation, and dependencies.
        </p>
      </header>

      <ComponentPreview id="avatar-sizes-initials">
        <div className="flex flex-wrap items-end gap-6">
          {sizes.map((s) => (
            <div key={s.name} className={`flex items-center justify-center rounded-full bg-muted font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground ${s.class}`}>
              JD
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="avatar-sizes-image">
        <div className="flex flex-wrap items-end gap-6">
          {sizes.map((s) => (
            <div key={s.name} className={`overflow-hidden rounded-full bg-muted ${s.class}`}>
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 font-medium text-white">
                {s.name === "xl" || s.name === "lg" ? "AK" : ""}
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="avatar-group">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {["JD", "AK", "ML", "RS"].map((initials, i) => (
              <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-muted text-sm font-medium text-muted-foreground dark:border-zinc-900 dark:bg-muted dark:text-muted-foreground">
                {initials}
              </div>
            ))}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-muted text-sm font-medium text-muted-foreground dark:border-zinc-900 dark:bg-muted dark:text-muted-foreground/70">
              +3
            </div>
          </div>
        </div>
        <div className="flex -space-x-3">
          {sizes.slice(0, 3).map((s, i) => (
            <div key={i} className={`overflow-hidden rounded-full border-2 border-white dark:border-zinc-900 ${s.class}`}>
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-400 to-orange-500 font-medium text-white">
                {["ML", "RS", "JD"][i]}
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="avatar-status">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end gap-8">
            {sizes.slice(0, 3).map((s) => (
              <div key={s.name} className="relative">
                <div className={`flex items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ${s.class}`}>
                  JD
                </div>
                <span className={`absolute bottom-0 right-0 rounded-full ${statusColors[status]} ${statusSizes[s.name]} ring-2 ring-background`}></span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {statusList.map((s) => (
              <button
                key={s.key}
                onClick={() => setStatus(s.key)}
                className={`rounded-full px-3 py-1 text-sm ${
                  status === s.key
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="avatar-fallback">
        <div className="flex flex-wrap items-end gap-6">
          <AvatarImage src="https://i.pravatar.cc/150?u=success" initials="AK" className="h-14 w-14" />
          <AvatarImage src="https://invalid-url.example.com/photo.jpg" initials="AK" className="h-14 w-14" />
          <AvatarImage src="https://invalid-url.example.com/photo2.jpg" initials="ML" className="h-10 w-10 text-sm" />
          <AvatarImage src="https://i.pravatar.cc/150?u=jd" initials="JD" className="h-20 w-20 text-2xl" />
        </div>
        <p className="text-xs text-muted-foreground">The second avatar has an invalid image URL so it falls back to initials.</p>
      </ComponentPreview>

      <ComponentPreview id="avatar-badge-overlay">
        <div className="flex flex-wrap items-end gap-8">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-lg font-medium text-white">
              JD
            </div>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-danger-foreground ring-2 ring-background">3</span>
          </div>
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-medium text-white">
              AK
            </div>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-background">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-orange-500 text-2xl font-medium text-white">
              ML
            </div>
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-success text-xs font-bold text-success-foreground ring-2 ring-background">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="avatar-with-label">
        <div className="flex flex-wrap items-end gap-8">
          {[
            { initials: "JD", name: "John Doe", color: "from-blue-400 to-purple-500" },
            { initials: "AK", name: "Alice Kim", color: "from-emerald-400 to-cyan-500" },
            { initials: "ML", name: "Mike Lee", color: "from-pink-400 to-orange-500" },
            { initials: "RS", name: "Rachel Sun", color: "from-yellow-400 to-red-500" },
          ].map((person, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${person.color} text-lg font-medium text-white`}>
                {person.initials}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{person.name}</p>
                <p className="text-xs text-muted-foreground">@{(person.name.toLowerCase().replace(" ", "."))}</p>
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="avatar-presence">
        <div className="flex flex-col gap-4">
          {[
            { initials: "JD", name: "John Doe", status: "online", color: "from-blue-400 to-purple-500", text: "Active now" },
            { initials: "AK", name: "Alice Kim", status: "away", color: "from-emerald-400 to-cyan-500", text: "Away for 10m" },
            { initials: "ML", name: "Mike Lee", status: "busy", color: "from-pink-400 to-orange-500", text: "In a meeting" },
            { initials: "RS", name: "Rachel Sun", status: "offline", color: "from-yellow-400 to-red-500", text: "Offline" },
          ].map((person, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="relative">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${person.color} text-sm font-medium text-white`}>
                  {person.initials}
                </div>
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${statusColors[person.status]} ring-2 ring-background`}></span>
              </div>
              <div>
                <p className="text-sm font-medium">{person.name}</p>
                <p className="text-xs text-muted-foreground">{person.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>
    </div>
  );
}
