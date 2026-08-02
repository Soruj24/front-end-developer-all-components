import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const emptyStatePeople: RegistryEntry = entry({
    id: "empty-state-people",
    title: "People & Notifications",
    description:
      "Empty states for customers, team members, connections, messages, comments, subscriptions, and muted notifications.",
    source: `import { useState } from "react";

function UsersIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );
}

function UserGroupIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function SpeechBubbleIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  );
}

function BellSlashIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function BellRingIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
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
          <button onClick={handleClick} className={buttonStyle}>
            {state.cta}
          </button>
        </>
      )}
    </div>
  );
}

export default function EmptyStatePeople() {
  const states = [
    { id: "no-customers", icon: <UsersIcon />, title: "Invite customers", description: "Share your platform with customers to get started.", cta: "Send Invites", color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400", accent: "bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400", animated: false, illustration: false, interactive: false, buttonVariant: "ghost" },
    { id: "no-team-members", icon: <UserGroupIcon />, title: "Invite your team", description: "Collaborate with your team members on projects.", cta: "Invite Members", color: "bg-primary-soft text-primary dark:bg-blue-900/30 dark:text-blue-400", accent: "bg-primary hover:bg-primary/90 dark:bg-blue-500 dark:hover:bg-blue-400", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
    { id: "no-connections", icon: <NetworkIcon />, title: "Connect with others", description: "Build your network by connecting with people you know.", cta: "Find People", color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400", accent: "bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
    { id: "no-messages", icon: <ChatBubbleIcon />, title: "Start a conversation", description: "No messages yet. Reach out to someone to start chatting.", cta: "New Message", color: "bg-primary-soft text-primary dark:bg-blue-900/30 dark:text-blue-400", accent: "bg-primary hover:bg-primary/90 dark:bg-blue-500 dark:hover:bg-blue-400", animated: false, illustration: true, interactive: true },
    { id: "no-comments", icon: <SpeechBubbleIcon />, title: "No comments yet", description: "Be the first to share your thoughts on this post.", cta: "Add a Comment", color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400", accent: "bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-400", animated: false, illustration: true, interactive: true },
    { id: "notifications-muted", icon: <BellSlashIcon />, title: "Notifications are muted", description: "You won't receive any notifications while mute is enabled.", cta: "Enable Notifications", color: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400", accent: "bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400", animated: true, illustration: false, interactive: true },
    { id: "no-subscriptions", icon: <BellRingIcon />, title: "No active subscriptions", description: "Subscribe to plans or services to access premium features.", cta: "View Plans", color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400", accent: "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400", animated: false, illustration: false, interactive: false, buttonVariant: "ghost" },
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
