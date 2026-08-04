"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add card`;

const usageCode = `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/_card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`;

const features = [
  "Unlimited projects",
  "Real-time collaboration",
  "Version control",
  "API access",
  "Priority support",
];

const notifications = [
  { icon: "📌", text: "New comment on your post", time: "2m ago" },
  { icon: "⭐", text: "You earned a new badge", time: "1h ago" },
  { icon: "👤", text: "Sarah followed you", time: "3h ago" },
];

const plans = [
  { name: "Starter", price: "$19", period: "/mo", features: ["5 projects", "10GB storage", "Basic support"], popular: false },
  { name: "Pro", price: "$49", period: "/mo", features: ["Unlimited projects", "100GB storage", "Priority support"], popular: true },
  { name: "Enterprise", price: "$99", period: "/mo", features: ["Everything in Pro", "1TB storage", "24/7 support"], popular: false },
];

const posts = [
  { title: "Getting Started with Next.js", author: "Sarah Chen", date: "Mar 15, 2026", read: "5 min", tag: "Development" },
  { title: "Tailwind CSS Best Practices", author: "Alex Rivera", date: "Mar 12, 2026", read: "8 min", tag: "Design" },
  { title: "TypeScript Tips & Tricks", author: "James Wilson", date: "Mar 10, 2026", read: "6 min", tag: "TypeScript" },
];

const team = [
  { name: "Alice Johnson", role: "CEO & Founder", bio: "Building the future of web development" },
  { name: "Bob Martinez", role: "CTO", bio: "Architecting scalable systems" },
  { name: "Carol Smith", role: "Design Lead", bio: "Crafting beautiful user experiences" },
];

const events = [
  { date: "15", month: "JUL", title: "Team Standup", time: "10:00 AM", loc: "Conference Room A", type: "meeting" },
  { date: "22", month: "JUL", title: "Product Launch", time: "2:00 PM", loc: "Main Auditorium", type: "deadline" },
  { date: "28", month: "JUL", title: "Team Outing", time: "11:00 AM", loc: "Central Park", type: "personal" },
];

const products = [
  { name: "Wireless Headphones", price: 79.99, rating: 4.5, reviews: 234, tag: "Electronics" },
  { name: "Leather Backpack", price: 129.99, rating: 4.8, reviews: 89, tag: "Accessories" },
  { name: "Smart Watch", price: 249.99, rating: 4.6, reviews: 412, tag: "Electronics" },
];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg className={`h-4 w-4 ${filled ? "text-warning" : "text-zinc-200 dark:text-muted-foreground"}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function CardsPage() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [interactiveSelected, setInteractiveSelected] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Cards</h1>
          <Badge variant="primary">15 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of card patterns — basic, interactive, form, pricing,
          product, and more. Use the tabs to switch between the live preview,
          source code, CLI, installation, and dependency details for each
          example.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="card-basic">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <span className="text-3xl">📄</span>
            <h2 className="mt-3 font-semibold">Basic Card</h2>
            <p className="mt-1 text-sm text-muted-foreground">A simple card with title and description. Perfect for minimal layouts.</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-5xl dark:from-blue-900 dark:to-purple-900">🖼️</div>
            <div className="p-4">
              <h2 className="font-semibold">Image Top</h2>
              <p className="mt-1 text-sm text-muted-foreground">Card with image at the top, content below.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="p-4">
              <h2 className="font-semibold">Image Bottom</h2>
              <p className="mt-1 text-sm text-muted-foreground">Image placed at the bottom for variety.</p>
            </div>
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 text-4xl dark:from-amber-900 dark:to-orange-900">⬇️</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-badge-avatar-stats">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <div className="flex items-start justify-between">
              <span className="text-3xl">🏷️</span>
              <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-blue-900/40 dark:text-blue-300">New</span>
            </div>
            <h2 className="mt-3 font-semibold">Badge Card</h2>
            <p className="mt-1 text-sm text-muted-foreground">Highlight status or category with a colorful badge.</p>
          </div>
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">AK</div>
              <div><p className="font-semibold">Alex Kim</p><p className="text-xs text-muted-foreground">Product Designer</p></div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">User card with avatar, name, and role.</p>
          </div>
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <span className="text-3xl">📊</span>
            <p className="mt-2 text-2xl font-bold">$84.2K</p>
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
            <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">↑ 12.5%</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-actions-horizontal">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <span className="text-3xl">⚡</span>
            <h2 className="mt-3 font-semibold">Actions Card</h2>
            <p className="mt-1 text-sm text-muted-foreground">Card with primary and secondary action buttons.</p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-md bg-zinc-900 px-4 py-1.5 text-sm text-white hover:bg-muted dark:bg-foreground dark:text-background">Save</button>
              <button className="rounded-md border px-4 py-1.5 text-sm hover:bg-muted dark:border-border">Cancel</button>
            </div>
          </div>
          <div className="flex overflow-hidden rounded-lg border border-border">
            <div className="flex w-32 shrink-0 items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-200 text-4xl dark:from-emerald-900 dark:to-teal-900">➡️</div>
            <div className="flex-1 p-4">
              <h2 className="font-semibold">Horizontal Left</h2>
              <p className="mt-1 text-sm text-muted-foreground">Image on the left, content on the right.</p>
            </div>
          </div>
          <div className="flex overflow-hidden rounded-lg border border-border">
            <div className="flex-1 p-4">
              <h2 className="font-semibold">Horizontal Right</h2>
              <p className="mt-1 text-sm text-muted-foreground">Content on the left, image on the right.</p>
            </div>
            <div className="flex w-32 shrink-0 items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200 text-4xl dark:from-rose-900 dark:to-pink-900">⬅️</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-overlay-gradient">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          <div className="group relative flex h-56 cursor-pointer items-end overflow-hidden rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 p-5 text-white">
              <span className="text-xs font-medium uppercase tracking-wider text-white/60">Featured</span>
              <h2 className="mt-1 text-xl font-bold">Overlay Card</h2>
              <p className="mt-1 text-sm text-white/80">Text overlaid on a dark gradient background.</p>
              <button className="mt-2 rounded-md bg-white/20 px-3 py-1 text-xs backdrop-blur hover:bg-white/30">Explore</button>
            </div>
          </div>
          <div className="flex h-56 flex-col justify-end rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 p-5 text-white">
            <span className="text-3xl">🌈</span>
            <h2 className="mt-2 text-xl font-bold">Gradient Card</h2>
            <p className="mt-1 text-sm text-white/80">Vibrant gradient with white text for impact.</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-elevated-flat-footer">
        <div className="grid w-full gap-6 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-5 shadow-lg dark:bg-zinc-900 dark:shadow-zinc-900/50">
            <span className="text-3xl">📦</span>
            <h2 className="mt-3 font-semibold">Elevated Card</h2>
            <p className="mt-1 text-sm text-muted-foreground">Shadow for visual depth and hierarchy.</p>
          </div>
          <div className="rounded-lg p-5">
            <span className="text-3xl">🧻</span>
            <h2 className="mt-3 font-semibold">Flat Card</h2>
            <p className="mt-1 text-sm text-muted-foreground">Borderless, shadowless minimal card.</p>
          </div>
          <div className="rounded-lg border border-border">
            <div className="border-b border-black/[.08] px-4 py-3 font-semibold dark:border-white/[.145]">Header</div>
            <div className="p-4 text-sm text-muted-foreground">Card body content goes here in the middle.</div>
            <div className="border-t border-black/[.08] px-4 py-3 text-xs text-muted-foreground/70 dark:border-white/[.145]">Footer</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-list">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <h2 className="font-semibold">Features List</h2>
            <ul className="mt-3 space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <h2 className="font-semibold">Notification List</h2>
            <div className="mt-3 space-y-3">
              {notifications.map((n, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-black/[.04] pb-3 last:border-0 last:pb-0 dark:border-white/[.06]">
                  <span>{n.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm">{n.text}</p>
                    <p className="text-xs text-muted-foreground/70">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-form">
        <div className="w-full max-w-md rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
          <h2 className="font-semibold">Contact Form</h2>
          <div className="mt-3 flex flex-col gap-3">
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Your name"
              className="rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-border dark:bg-transparent"
            />
            <input
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="Your email"
              className="rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-border dark:bg-transparent"
            />
            <button className="rounded-md bg-zinc-900 py-2 text-sm text-white hover:bg-muted dark:bg-foreground dark:text-background">Submit</button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-pricing">
        <div className="grid w-full gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.popular
                  ? "rounded-lg border border-primary bg-blue-50 p-5 dark:border-blue-400 dark:bg-blue-950"
                  : "rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]"
              }
            >
              {plan.popular && <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">Popular</span>}
              <h2 className="mt-2 font-semibold">{plan.name}</h2>
              <p className="mt-1 text-3xl font-bold">
                {plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
              </p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={
                  plan.popular
                    ? "mt-6 w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    : "mt-6 w-full rounded-md bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-muted dark:bg-foreground dark:text-background"
                }
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-rating-tags-product">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <span className="text-3xl">⭐</span>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} filled={s <= 4} />)}
              <span className="ml-1 text-xs text-muted-foreground">4.0 (128 reviews)</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Rating card with star ratings and review count.</p>
          </div>
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <span className="text-3xl">🔖</span>
            <h2 className="mt-2 font-semibold">Tags Card</h2>
            <p className="mt-1 text-sm text-muted-foreground">Content card with technology tags.</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["React", "TypeScript", "Tailwind", "Next.js"].map((t) => (
                <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium dark:bg-muted">{t}</span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-5xl dark:from-zinc-800 dark:to-zinc-700">🛍️</div>
            <div className="p-4">
              <span className="text-xs font-medium text-primary dark:text-blue-400">Electronics</span>
              <h2 className="mt-1 font-semibold">Wireless Headphones</h2>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xl font-bold">$79.99</span>
                <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-blog-profile">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-black/[.08] transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/[.145]">
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-4xl dark:from-zinc-800 dark:to-zinc-700">📰</div>
              <div className="p-4">
                <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary dark:bg-blue-900/40 dark:text-blue-300">{post.tag}</span>
                <h2 className="mt-2 font-semibold">{post.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{post.author} · {post.date} · {post.read}</p>
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-team-testimonial">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <div key={i} className="rounded-lg border border-black/[.08] p-5 text-center dark:border-white/[.145]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-lg font-bold text-white">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h2 className="mt-3 font-semibold">{member.name}</h2>
              <p className="text-xs text-primary dark:text-blue-400">{member.role}</p>
              <p className="mt-1 text-sm text-muted-foreground">{member.bio}</p>
              <div className="mt-3 flex justify-center gap-3">
                {["🐦", "💼", "📷"].map((s) => (
                  <span key={s} className="cursor-pointer text-muted-foreground/70 hover:text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145] sm:col-span-2 lg:col-span-1">
            <div className="flex gap-1">
              {Array(5).fill(0).map((_, i) => <Star key={i} filled />)}
            </div>
            <p className="mt-2 text-sm italic text-muted-foreground">&quot;This platform transformed how our team ships products.&quot;</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-bold text-white">SC</div>
              <div>
                <p className="text-sm font-medium">Sarah Chen</p>
                <p className="text-xs text-muted-foreground">CTO, TechStart</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-notification-compact-progress">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔔</span>
              <div className="flex-1">
                <p className="text-sm font-medium">New Update Available</p>
                <p className="text-xs text-muted-foreground">Version 3.2.1 is ready to install</p>
                <p className="mt-1 text-xs text-muted-foreground/70">2 minutes ago</p>
              </div>
              <button className="text-xs text-muted-foreground/70 hover:text-muted-foreground">✕</button>
            </div>
          </div>
          <div className="rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-bold text-white">AK</div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Alex Kim</p>
                <p className="truncate text-xs text-muted-foreground">Online</p>
              </div>
              <span className="ml-auto h-2 w-2 rounded-full bg-success" />
            </div>
          </div>
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Project Completion</span>
              <span className="text-sm font-bold">72%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">14 of 19 tasks completed</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-interactive-social">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          <div
            onClick={() => setInteractiveSelected((v) => !v)}
            className={
              interactiveSelected
                ? "cursor-pointer rounded-lg border border-primary bg-blue-50 p-5 shadow-md ring-1 ring-blue-500 dark:border-blue-400 dark:bg-blue-900/20"
                : "cursor-pointer rounded-lg border border-black/[.08] p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/[.145]"
            }
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔄</span>
              <div>
                <h2 className="font-semibold">Interactive Card</h2>
                <p className="text-sm text-muted-foreground">Click to select — hover to lift</p>
              </div>
            </div>
            {interactiveSelected && <span className="mt-2 inline-block rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">Selected</span>}
          </div>
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📣</span>
              <div>
                <h2 className="font-semibold">Social Proof</h2>
                <p className="text-sm text-muted-foreground">Likes, comments, and shares</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">❤️ {liked ? 43 : 42}</span>
              <span className="flex items-center gap-1">💬 18</span>
              <span className="flex items-center gap-1">🔄 7</span>
              <button onClick={() => setLiked((v) => !v)} className="ml-auto text-sm">{liked ? "❤️ Liked" : "🤍 Like"}</button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-calendar">
        <div className="grid w-full gap-6 sm:grid-cols-3">
          {events.map((event, i) => (
            <div key={i} className="flex gap-4 rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]">
              <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-muted py-2 dark:bg-muted">
                <span className="text-xs font-medium uppercase text-muted-foreground">{event.month}</span>
                <span className="text-xl font-bold">{event.date}</span>
              </div>
              <div className="flex-1">
                <div className={`mb-1 h-2 w-2 rounded-full ${event.type === "meeting" ? "bg-blue-500" : event.type === "deadline" ? "bg-danger" : "bg-success"}`} />
                <h2 className="font-semibold">{event.title}</h2>
                <p className="text-xs text-muted-foreground">{event.time}</p>
                <p className="text-xs text-muted-foreground/70">{event.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="card-product-grid">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <div key={i} className="rounded-lg border border-black/[.08] p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/[.145]">
              <div className="flex h-32 items-center justify-center rounded-md bg-gradient-to-br from-zinc-100 to-zinc-200 text-4xl dark:from-zinc-800 dark:to-zinc-700">📦</div>
              <span className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium dark:bg-muted">{p.tag}</span>
              <h2 className="mt-1 font-semibold">{p.name}</h2>
              <div className="flex items-center gap-1 text-xs text-muted-foreground/70">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className={`h-3 w-3 ${s <= Math.floor(p.rating) ? "text-warning" : "text-zinc-200 dark:text-muted-foreground"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span>({p.reviews})</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-bold">${p.price}</span>
                <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">Cart</button>
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Component</th>
                <th className="px-4 py-3 text-left font-medium">Props</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">Card</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">Root container</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">CardHeader</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">Header section</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">CardTitle</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">Title heading</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">CardContent</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">Body content</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">CardFooter</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">Footer actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
