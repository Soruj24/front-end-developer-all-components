import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const emptyStateVisual: RegistryEntry = entry({
    id: "empty-state-visual",
    title: "Visual & Upload",
    description:
      "Empty states with illustration blocks, a custom illustration, an upload dropzone, and notifications.",
    source: `import { useState } from "react";

function GalleryIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

import type { EmptyStateConfig } from "./emptyStateTypes";

function EmptyCard({ state }: { state: EmptyStateConfig }) {
  const [success, setSuccess] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);

  const handleClick = () => {
    if (state.interactive) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }
  };

  const btnBase = "rounded-md px-4 py-2 text-sm font-medium transition-all duration-200";
  const primaryBtn = \`\${btnBase} text-white \${state.accent}\`;
  const outlineBtn = \`\${btnBase} border-2 \${state.color.replace("text-", "border-").replace("bg-", "")} hover:\${state.accent} hover:text-white\`;
  const ghostBtn = \`\${btnBase} \${state.color} hover:opacity-80\`;

  const buttonStyle = state.buttonVariant === "outline" ? outlineBtn : state.buttonVariant === "ghost" ? ghostBtn : primaryBtn;

  return (
    <div className="group relative flex flex-col items-center gap-4 rounded-xl border border-zinc-200 p-8 text-center transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:shadow-zinc-900/30">
      {state.animated && !success && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      {state.illustration && (
        <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800">
          {state.customIllustration ? (
            <svg className="h-16 w-16 text-zinc-300 dark:text-zinc-600" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" className="animate-[spin_8s_linear_infinite] origin-center" />
              <circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="2" className="animate-[pulse_2s_ease-in-out_infinite]" />
              <path d="M40 25V40L48 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
              <rect x="30" y="52" width="20" height="4" rx="2" fill="currentColor" className="animate-[pulse_2s_ease-in-out_infinite_1s]" />
            </svg>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-600 animate-pulse" />
              <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-600 animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-600 animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          )}
        </div>
      )}

      {state.uploadZone && (
        <div
          onMouseEnter={() => setUploadHover(true)}
          onMouseLeave={() => setUploadHover(false)}
          className={\`flex h-20 w-full items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 \${uploadHover ? "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-900/20" : "border-zinc-300 dark:border-zinc-600"}\`}
        >
          <svg className={\`h-8 w-8 transition-colors duration-300 \${uploadHover ? "text-indigo-500" : "text-zinc-400 dark:text-zinc-500"}\`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
      )}

      {!state.illustration && !state.uploadZone && (
        <div className={\`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 \${state.color} \${state.animated && !success ? "animate-bounce" : ""}\`}>
          {success ? (
            <svg className="h-8 w-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            state.icon
          )}
        </div>
      )}

      {success ? (
        <div className="animate-[fade-slide_0.3s_ease-out]">
          <h2 className="text-lg font-semibold text-success dark:text-green-400">Success!</h2>
          <p className="mt-1 text-sm text-zinc-500">Your item has been added.</p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{state.title}</h2>
          <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">{state.description}</p>
          <button onClick={handleClick} className={buttonStyle}>
            {state.cta}
          </button>
        </>
      )}
    </div>
  );
}

export default function EmptyStateVisual() {
  const states = [
    { id: "no-images", icon: <GalleryIcon />, title: "No images yet", description: "Your gallery is empty. Upload your first image to get started.", cta: "Upload Images", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400", accent: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400", animated: false, illustration: true, interactive: false, buttonVariant: "ghost" },
    { id: "no-bookmarks", icon: <BookmarkIcon />, title: "Bookmark pages", description: "Save pages you love by tapping the bookmark icon.", cta: "Discover Content", color: "bg-indigo-100 text-primary dark:bg-indigo-900/30 dark:text-indigo-400", accent: "bg-primary hover:bg-primary/90 dark:bg-indigo-500 dark:hover:bg-indigo-400", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
    { id: "no-tickets", icon: <TicketIcon />, title: "No support tickets", description: "Your support requests and their status will appear here.", cta: "Open a Ticket", color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400", accent: "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
    { id: "no-files", icon: <DocumentIcon />, title: "No files uploaded", description: "Upload documents, images, or other files to get started.", cta: "Upload Files", color: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400", accent: "bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400", animated: false, illustration: false, interactive: true, uploadZone: true },
    { id: "custom-illustration", icon: <LightningIcon />, title: "Ready when you are", description: "This space is waiting for your content. Start building something amazing.", cta: "Get Started", color: "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-400", accent: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-400 dark:hover:to-pink-400", animated: true, illustration: true, interactive: false, customIllustration: true },
    { id: "no-notifications", icon: <BellIcon />, title: "All caught up", description: "You have no unread notifications. We'll let you know when something new arrives.", cta: "View History", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400", accent: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400", animated: true, illustration: false, interactive: false },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {states.map((s) => (
        <EmptyCard key={s.id} state={s} />
      ))}
    </div>
  );
}`,
  });
