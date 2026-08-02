import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const emptyStateData: RegistryEntry = entry({
    id: "empty-state-data",
    title: "Data & Activity",
    description:
      "Empty states for charts, activity, history, payments, search results, reviews, badges, achievements, and favorites.",
    source: `import { useState } from "react";

function ChartIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3h14M9 3v2a4 4 0 004 4h2m-7 0H5a2 2 0 00-2 2v2a2 2 0 002 2h2m7-10v2a4 4 0 01-4 4h-2m7-6h2a2 2 0 012 2v2a2 2 0 01-2 2h-2m-7 6v6m4-6v6m-6 0h12" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-600 animate-pulse" />
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-600 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-600 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
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

          {state.suggestions && (
            <div className="flex flex-wrap justify-center gap-1.5">
              {["Check spelling", "Use fewer keywords", "Try another category"].map((s) => (
                <span key={s} className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {s}
                </span>
              ))}
            </div>
          )}

          <button onClick={handleClick} className={buttonStyle}>
            {state.cta}
          </button>
        </>
      )}
    </div>
  );
}

export default function EmptyStateData() {
  const states = [
    { id: "no-data", icon: <ChartIcon />, title: "No data to display", description: "Once data is collected, charts and metrics will appear here.", cta: "Refresh Data", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400", accent: "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-400", animated: true, illustration: false, interactive: false, buttonVariant: "outline" },
    { id: "no-activity", icon: <TimelineIcon />, title: "No recent activity", description: "Your activity feed is empty. Actions you take will show up here.", cta: "Explore", color: "bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400", accent: "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-400", animated: false, illustration: false, interactive: false, buttonVariant: "ghost" },
    { id: "no-history", icon: <ClockIcon />, title: "History will appear here", description: "Your browsing and action history will show up as you use the app.", cta: "Start Browsing", color: "bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400", accent: "bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-400", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
    { id: "no-payments", icon: <CreditCardIcon />, title: "No payment history", description: "Your past payments and transactions will be listed here.", cta: "Make a Payment", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400", accent: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400", animated: true, illustration: false, interactive: false, buttonVariant: "ghost" },
    { id: "no-results", icon: <SearchIcon />, title: "No results found", description: "Try adjusting your search or filters to find what you're looking for.", cta: "Clear Filters", color: "bg-amber-100 text-warning dark:bg-amber-900/30 dark:text-warning", accent: "bg-warning hover:bg-amber-700 dark:bg-warning dark:hover:bg-amber-400", animated: false, illustration: false, interactive: false, suggestions: ["Check your spelling", "Use fewer keywords", "Try a different category"] },
    { id: "no-reviews", icon: <StarIcon />, title: "Be the first to review", description: "Share your experience and help others make informed decisions.", cta: "Write a Review", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400", accent: "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-400", animated: true, illustration: false, interactive: false, buttonVariant: "outline" },
    { id: "no-badges", icon: <AwardIcon />, title: "Earn badges", description: "Complete achievements to unlock badges and show off your skills.", cta: "View Achievements", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400", accent: "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-400", animated: true, illustration: false, interactive: false, buttonVariant: "ghost" },
    { id: "no-achievements", icon: <TrophyIcon />, title: "Complete goals", description: "Achievements and milestones you unlock will be displayed here.", cta: "Set a Goal", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400", accent: "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-400", animated: false, illustration: false, interactive: true },
    { id: "no-favorites", icon: <HeartIcon />, title: "Save your favorites", description: "Items you favorite will appear here for quick access.", cta: "Browse Items", color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400", accent: "bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-400", animated: true, illustration: false, interactive: false, buttonVariant: "ghost" },
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
