import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const emptyStateContent: RegistryEntry = entry({
    id: "empty-state-content",
    title: "Content & Creation",
    description:
      "Empty states for items, projects, products, orders, invoices, drafts, tasks, and events.",
    source: `import { useState } from "react";

function MailIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

function PencilIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

function CheckboxIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

export default function EmptyStateContent() {
  const states = [
    { id: "no-items", icon: <MailIcon />, title: "No items yet", description: "You haven't added any items yet. Get started by creating your first item.", cta: "Create Item", color: "bg-indigo-100 text-primary dark:bg-indigo-900/30 dark:text-indigo-400", accent: "bg-primary hover:bg-primary/90 dark:bg-indigo-500 dark:hover:bg-indigo-400", animated: false, illustration: false, interactive: false },
    { id: "no-projects", icon: <FolderIcon />, title: "Create your first project", description: "Projects help you organize your work. Start one today.", cta: "New Project", color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400", accent: "bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400", animated: false, illustration: false, interactive: true },
    { id: "no-products", icon: <BoxIcon />, title: "Add your first product", description: "List your products and start selling today.", cta: "Add Product", color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400", accent: "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400", animated: true, illustration: false, interactive: true },
    { id: "no-orders", icon: <ReceiptIcon />, title: "Place your first order", description: "Browse our catalog and find something you love.", cta: "Browse Products", color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400", accent: "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400", animated: false, illustration: false, interactive: false, buttonVariant: "outline" },
    { id: "no-invoices", icon: <DocumentIcon />, title: "No invoices yet", description: "Invoices you create or receive will show up here.", cta: "Create Invoice", color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400", accent: "bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400", animated: false, illustration: false, interactive: true },
    { id: "no-drafts", icon: <PencilIcon />, title: "Start a draft", description: "Your saved drafts will appear here. Begin writing now.", cta: "New Draft", color: "bg-amber-100 text-warning dark:bg-amber-900/30 dark:text-warning", accent: "bg-warning hover:bg-amber-700 dark:bg-warning dark:hover:bg-amber-400", animated: false, illustration: false, interactive: true, buttonVariant: "ghost" },
    { id: "no-tasks", icon: <CheckboxIcon />, title: "All tasks completed", description: "Great job! You've finished everything on your list.", cta: "Add New Task", color: "bg-green-100 text-success dark:bg-green-900/30 dark:text-green-400", accent: "bg-success hover:bg-success/90 dark:bg-success-soft0 dark:hover:bg-green-400", animated: true, illustration: false, interactive: true },
    { id: "no-events", icon: <CalendarIcon />, title: "No upcoming events", description: "Your calendar is clear. Schedule something new.", cta: "Create Event", color: "bg-red-100 text-danger dark:bg-red-900/30 dark:text-red-400", accent: "bg-danger hover:bg-danger/90 dark:bg-danger dark:hover:bg-red-400", animated: false, illustration: false, interactive: true },
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
