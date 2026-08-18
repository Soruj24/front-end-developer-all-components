"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add empty-state`;

const usageCode = `import { EmptyState } from "@/components/_empty-state"

<EmptyState
  icon={<MailIcon />}
  title="No items yet"
  description="Get started by creating your first item."
  cta="Create Item"
/>`;

function MailIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

function BellIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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

function FolderIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
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

function BoxIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
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

function StarIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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

function GalleryIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

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

function CheckboxIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

function CalendarIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

function BookmarkIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
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

function TicketIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
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

function BellSlashIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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

function LightningIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

type EmptyState = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  color: string;
  accent: string;
  animated?: boolean;
  illustration?: boolean;
  interactive?: boolean;
  customIllustration?: boolean;
  uploadZone?: boolean;
  suggestions?: string[];
  buttonVariant?: "primary" | "outline" | "ghost";
};

const contentStates: EmptyState[] = [
  { id: "no-items", icon: <MailIcon />, title: "No items yet", description: "You haven't added any items yet. Get started by creating your first item.", cta: "Create Item", color: "bg-primary-soft text-primary", accent: "bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90", animated: false, illustration: false, interactive: false },
  { id: "no-projects", icon: <FolderIcon />, title: "Create your first project", description: "Projects help you organize your work. Start one today.", cta: "New Project", color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400", accent: "bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400", animated: false, illustration: false, interactive: true },
  { id: "no-products", icon: <BoxIcon />, title: "Add your first product", description: "List your products and start selling today.", cta: "Add Product", color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400", accent: "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400", animated: true, illustration: false, interactive: true },
  { id: "no-orders", icon: <ReceiptIcon />, title: "Place your first order", description: "Browse our catalog and find something you love.", cta: "Browse Products", color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400", accent: "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400", animated: false, illustration: false, interactive: false, buttonVariant: "outline" },
  { id: "no-invoices", icon: <DocumentIcon />, title: "No invoices yet", description: "Invoices you create or receive will show up here.", cta: "Create Invoice", color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400", accent: "bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400", animated: false, illustration: false, interactive: true },
  { id: "no-drafts", icon: <PencilIcon />, title: "Start a draft", description: "Your saved drafts will appear here. Begin writing now.", cta: "New Draft", color: "bg-warning-soft text-warning", accent: "bg-warning hover:bg-warning/90 dark:bg-warning dark:hover:bg-warning/90", animated: false, illustration: false, interactive: true, buttonVariant: "ghost" },
  { id: "no-tasks", icon: <CheckboxIcon />, title: "All tasks completed", description: "Great job! You've finished everything on your list.", cta: "Add New Task", color: "bg-success-soft text-success", accent: "bg-success hover:bg-success/90 dark:bg-success dark:hover:bg-success/90", animated: true, illustration: false, interactive: true },
  { id: "no-events", icon: <CalendarIcon />, title: "No upcoming events", description: "Your calendar is clear. Schedule something new.", cta: "Create Event", color: "bg-danger-soft text-danger", accent: "bg-danger hover:bg-danger/90 dark:bg-danger dark:hover:bg-danger/90", animated: false, illustration: false, interactive: true },
];

const peopleStates: EmptyState[] = [
  { id: "no-customers", icon: <UsersIcon />, title: "Invite customers", description: "Share your platform with customers to get started.", cta: "Send Invites", color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400", accent: "bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400", animated: false, illustration: false, interactive: false, buttonVariant: "ghost" },
  { id: "no-team-members", icon: <UserGroupIcon />, title: "Invite your team", description: "Collaborate with your team members on projects.", cta: "Invite Members", color: "bg-primary-soft text-primary", accent: "bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
  { id: "no-connections", icon: <NetworkIcon />, title: "Connect with others", description: "Build your network by connecting with people you know.", cta: "Find People", color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400", accent: "bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
  { id: "no-messages", icon: <ChatBubbleIcon />, title: "Start a conversation", description: "No messages yet. Reach out to someone to start chatting.", cta: "New Message", color: "bg-primary-soft text-primary", accent: "bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90", animated: false, illustration: true, interactive: true },
  { id: "no-comments", icon: <SpeechBubbleIcon />, title: "No comments yet", description: "Be the first to share your thoughts on this post.", cta: "Add a Comment", color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400", accent: "bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-400", animated: false, illustration: true, interactive: true },
  { id: "notifications-muted", icon: <BellSlashIcon />, title: "Notifications are muted", description: "You won't receive any notifications while mute is enabled.", cta: "Enable Notifications", color: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400", accent: "bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400", animated: true, illustration: false, interactive: true },
  { id: "no-subscriptions", icon: <BellRingIcon />, title: "No active subscriptions", description: "Subscribe to plans or services to access premium features.", cta: "View Plans", color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400", accent: "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400", animated: false, illustration: false, interactive: false, buttonVariant: "ghost" },
];

const dataStates: EmptyState[] = [
  { id: "no-data", icon: <ChartIcon />, title: "No data to display", description: "Once data is collected, charts and metrics will appear here.", cta: "Refresh Data", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400", accent: "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-400", animated: true, illustration: false, interactive: false, buttonVariant: "outline" },
  { id: "no-activity", icon: <TimelineIcon />, title: "No recent activity", description: "Your activity feed is empty. Actions you take will show up here.", cta: "Explore", color: "bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400", accent: "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-400", animated: false, illustration: false, interactive: false, buttonVariant: "ghost" },
  { id: "no-history", icon: <ClockIcon />, title: "History will appear here", description: "Your browsing and action history will show up as you use the app.", cta: "Start Browsing", color: "bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400", accent: "bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-400", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
  { id: "no-payments", icon: <CreditCardIcon />, title: "No payment history", description: "Your past payments and transactions will be listed here.", cta: "Make a Payment", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400", accent: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400", animated: true, illustration: false, interactive: false, buttonVariant: "ghost" },
  { id: "no-results", icon: <SearchIcon />, title: "No results found", description: "Try adjusting your search or filters to find what you're looking for.", cta: "Clear Filters", color: "bg-warning-soft text-warning", accent: "bg-warning hover:bg-warning/90 dark:bg-warning dark:hover:bg-warning/90", animated: false, illustration: false, interactive: false, suggestions: ["Check your spelling", "Use fewer keywords", "Try a different category"] },
  { id: "no-reviews", icon: <StarIcon />, title: "Be the first to review", description: "Share your experience and help others make informed decisions.", cta: "Write a Review", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400", accent: "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-400", animated: true, illustration: false, interactive: false, buttonVariant: "outline" },
  { id: "no-badges", icon: <AwardIcon />, title: "Earn badges", description: "Complete achievements to unlock badges and show off your skills.", cta: "View Achievements", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400", accent: "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-400", animated: true, illustration: false, interactive: false, buttonVariant: "ghost" },
  { id: "no-achievements", icon: <TrophyIcon />, title: "Complete goals", description: "Achievements and milestones you unlock will be displayed here.", cta: "Set a Goal", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400", accent: "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-400", animated: false, illustration: false, interactive: true },
  { id: "no-favorites", icon: <HeartIcon />, title: "Save your favorites", description: "Items you favorite will appear here for quick access.", cta: "Browse Items", color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400", accent: "bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-400", animated: true, illustration: false, interactive: false, buttonVariant: "ghost" },
];

const visualStates: EmptyState[] = [
  { id: "no-images", icon: <GalleryIcon />, title: "No images yet", description: "Your gallery is empty. Upload your first image to get started.", cta: "Upload Images", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400", accent: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400", animated: false, illustration: true, interactive: false, buttonVariant: "ghost" },
  { id: "no-bookmarks", icon: <BookmarkIcon />, title: "Bookmark pages", description: "Save pages you love by tapping the bookmark icon.", cta: "Discover Content", color: "bg-primary-soft text-primary", accent: "bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
  { id: "no-tickets", icon: <TicketIcon />, title: "No support tickets", description: "Your support requests and their status will appear here.", cta: "Open a Ticket", color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400", accent: "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400", animated: false, illustration: true, interactive: false, buttonVariant: "outline" },
  { id: "no-files", icon: <DocumentIcon />, title: "No files uploaded", description: "Upload documents, images, or other files to get started.", cta: "Upload Files", color: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400", accent: "bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400", animated: false, illustration: false, interactive: true, uploadZone: true },
  { id: "custom-illustration", icon: <LightningIcon />, title: "Ready when you are", description: "This space is waiting for your content. Start building something amazing.", cta: "Get Started", color: "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-400", accent: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-400 dark:hover:to-pink-400", animated: true, illustration: true, interactive: false, customIllustration: true },
  { id: "no-notifications", icon: <BellIcon />, title: "All caught up", description: "You have no unread notifications. We'll let you know when something new arrives.", cta: "View History", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400", accent: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400", animated: true, illustration: false, interactive: false },
];

function EmptyStateCard({ state }: { state: EmptyState }) {
  const [success, setSuccess] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);

  const handleClick = () => {
    if (state.interactive) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }
  };

  const btnBase = "rounded-md px-4 py-2 text-sm font-medium transition-all duration-200";
  const primaryBtn = `${btnBase} text-white ${state.accent}`;
  const outlineBtn = `${btnBase} border-2 ${state.color.replace("text-", "border-").replace("bg-", "")} hover:${state.accent} hover:text-white`;
  const ghostBtn = `${btnBase} ${state.color} hover:opacity-80`;

  const buttonStyle = state.buttonVariant === "outline" ? outlineBtn : state.buttonVariant === "ghost" ? ghostBtn : primaryBtn;

  return (
    <div className="group relative flex flex-col items-center gap-4 rounded-xl border border-border p-8 text-center transition-all duration-300 hover:border-foreground/20 hover:shadow-lg dark:border-border dark:hover:border-foreground/20 dark:hover:shadow-zinc-900/30">
      {state.animated && !success && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      {state.illustration && (
        <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800">
          {state.customIllustration ? (
            <svg className="h-16 w-16 text-muted-foreground" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" className="animate-[spin_8s_linear_infinite] origin-center" />
              <circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="2" className="animate-[pulse_2s_ease-in-out_infinite]" />
              <path d="M40 25V40L48 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
              <rect x="30" y="52" width="20" height="4" rx="2" fill="currentColor" className="animate-[pulse_2s_ease-in-out_infinite_1s]" />
            </svg>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted dark:bg-muted animate-pulse" />
              <div className="h-8 w-8 rounded-full bg-muted dark:bg-muted animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="h-8 w-8 rounded-full bg-muted dark:bg-muted animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          )}
        </div>
      )}

      {state.uploadZone && (
        <div
          onMouseEnter={() => setUploadHover(true)}
          onMouseLeave={() => setUploadHover(false)}
          className={`flex h-20 w-full items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${
            uploadHover
              ? "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-900/20"
              : "border-border"
          }`}
        >
          <svg className={`h-8 w-8 transition-colors duration-300 ${uploadHover ? "text-indigo-500" : "text-muted-foreground/70 dark:text-muted-foreground"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
      )}

      {!state.illustration && !state.uploadZone && (
        <div className={`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 ${state.color} ${
          state.animated && !success ? "animate-bounce" : ""
        }`}>
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
          <p className="mt-1 text-sm text-muted-foreground">Your item has been added.</p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{state.title}</h2>
          <p className="max-w-xs text-sm text-muted-foreground dark:text-muted-foreground/70">{state.description}</p>

          {state.suggestions && (
            <div className="flex flex-wrap justify-center gap-1.5">
              {["Check spelling", "Use fewer keywords", "Try another category"].map((s) => (
                <span key={s} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
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

export default function EmptyStatePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Empty States</h1>
          <Badge variant="primary">20+ examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Empty state patterns for content, people, data, and visual contexts.
          Use the tabs to switch between the live preview, source code, CLI,
          installation, and dependency details for each example.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="empty-state-content">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contentStates.map((s) => (
            <EmptyStateCard key={s.id} state={s} />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="empty-state-people">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {peopleStates.map((s) => (
            <EmptyStateCard key={s.id} state={s} />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="empty-state-data">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dataStates.map((s) => (
            <EmptyStateCard key={s.id} state={s} />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="empty-state-visual">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visualStates.map((s) => (
            <EmptyStateCard key={s.id} state={s} />
          ))}
        </div>
      </ComponentPreview>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">description</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">cta</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">buttonVariant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;primary&quot; | &quot;outline&quot; | &quot;ghost&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;primary&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">suggestions</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
