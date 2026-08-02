"use client";

import { useState } from "react";

const stories = [
  { id: 1, name: "Your Story", isYou: true },
  { id: 2, name: "Alex Rivera", online: true },
  { id: 3, name: "Sarah Chen", online: true },
  { id: 4, name: "James Wilson", online: false },
  { id: 5, name: "Priya Patel", online: true },
  { id: 6, name: "Emily Davis", online: false },
  { id: 7, name: "Michael Brown", online: true },
  { id: 8, name: "Olivia Taylor", online: false },
];

const feedPosts = [
  { id: 1, user: "Alex Rivera", handle: "@alexriv", avatar: "AR", time: "2h ago", content: "Just shipped the new design system! So excited about the component library we've been building. It's going to be a game changer for our team's productivity. #DesignSystems #UI", likes: 342, comments: 28, shares: 15, verified: true },
  { id: 2, user: "Sarah Chen", handle: "@sarahchen", avatar: "SC", time: "4h ago", content: "Beautiful morning hike in the mountains. Sometimes you need to disconnect to reconnect with yourself.", likes: 891, comments: 42, shares: 33, verified: true, image: true },
  { id: 3, user: "James Wilson", handle: "@jwilson", avatar: "JW", time: "6h ago", content: "Can anyone recommend a good book on distributed systems? Looking for something practical, not too theoretical.", likes: 56, comments: 19, shares: 3, verified: false },
  { id: 4, user: "TechDaily", handle: "@techdaily", avatar: "TD", time: "8h ago", content: "BREAKING: New JavaScript framework just dropped. It promises zero-config setup, built-in state management, and edge-native deployment. The race never stops! #JavaScript #WebDev", likes: 1247, comments: 203, shares: 589, verified: true },
];

const trendingTopics = [
  { tag: "#ReactJs", posts: "142K" },
  { tag: "#WebDev", posts: "89K" },
  { tag: "#AI", posts: "234K" },
  { tag: "#DesignSystems", posts: "45K" },
  { tag: "#OpenSource", posts: "67K" },
  { tag: "#NextJS", posts: "103K" },
  { tag: "#TypeScript", posts: "78K" },
  { tag: "#CyberSecurity", posts: "56K" },
];

const notifications = [
  { id: 1, user: "Priya Patel", action: "liked your post", time: "12m ago", unread: true },
  { id: 2, user: "Michael Brown", action: "commented: 'Great work!'", time: "34m ago", unread: true },
  { id: 3, user: "Emily Davis", action: "started following you", time: "1h ago", unread: true },
  { id: 4, user: "Olivia Taylor", action: "mentioned you in a comment", time: "3h ago", unread: false },
  { id: 5, user: "Daniel Kim", action: "shared your post", time: "5h ago", unread: false },
];

const messages = [
  { id: 1, user: "Priya Patel", avatar: "PP", preview: "Are you coming to the meetup tonight?", time: "2m ago", online: true },
  { id: 2, user: "Michael Brown", avatar: "MB", preview: "Thanks for the feedback on the PR!", time: "15m ago", online: true },
  { id: 3, user: "Emily Davis", avatar: "ED", preview: "Let me check the calendar and get back to you", time: "1h ago", online: false },
  { id: 4, user: "Olivia Taylor", avatar: "OT", preview: "The design looks amazing!", time: "3h ago", online: false },
  { id: 5, user: "Daniel Kim", avatar: "DK", preview: "Can we schedule a call for tomorrow?", time: "5h ago", online: true },
];

const comments = [
  { id: 1, user: "Priya Patel", avatar: "PP", text: "This is so true! I've been saying this for years.", time: "1h ago", likes: 24 },
  { id: 2, user: "Michael Brown", avatar: "MB", text: "Great perspective. Have you considered the counter-argument though?", time: "45m ago", likes: 12 },
  { id: 3, user: "Emily Davis", avatar: "ED", text: "Love this! Sharing with my team right now.", time: "20m ago", likes: 8 },
];

const suggestedUsers = [
  { name: "Daniel Kim", handle: "@dankim", followers: "2.4K", mutual: 5 },
  { name: "Lisa Wang", handle: "@lisaw", followers: "8.1K", mutual: 12 },
  { name: "Ryan O'Brien", handle: "@ryanob", followers: "1.2K", mutual: 3 },
  { name: "Maya Gupta", handle: "@mayag", followers: "14K", mutual: 8 },
];

const polls = [
  { id: 1, question: "What's your preferred CSS approach?", options: ["Tailwind CSS", "Styled Components", "CSS Modules", "Vanilla CSS"], votes: [245, 180, 95, 42], total: 562 },
  { id: 2, question: "Remote work vs Office: which do you prefer?", options: ["Remote forever", "Hybrid", "Full office", "No preference"], votes: [412, 298, 87, 53], total: 850 },
];

const liveStreams = [
  { user: "Sarah Chen", avatar: "SC", title: "Live Coding: Building a Real-Time Chat App", viewers: "2.3K", category: "Technology" },
  { user: "Alex Rivera", avatar: "AR", title: "Design Review: Critiquing UI submissions", viewers: "891", category: "Design" },
];

const reels = [
  { id: 1, user: "@techbytes", likes: "45K", description: "VS Code tips you need to know" },
  { id: 2, user: "@design_hub", likes: "32K", description: "CSS art in under 60 seconds" },
  { id: 3, user: "@dev_memes", likes: "89K", description: "Debugging in production be like" },
  { id: 4, user: "@codewithme", likes: "23K", description: "Building a navbar with Framer Motion" },
  { id: 5, user: "@ui_library", likes: "56K", description: "Micro-interaction tutorial" },
  { id: 6, user: "@frontend_focus", likes: "41K", description: "Responsive grid in 30 seconds" },
];

const exploreItems = [
  { label: "Design", posts: "1.2M" },
  { label: "Photography", posts: "892K" },
  { label: "Travel", posts: "2.1M" },
  { label: "Food", posts: "3.4M" },
  { label: "Music", posts: "1.8M" },
  { label: "Gaming", posts: "2.7M" },
  { label: "Fitness", posts: "954K" },
  { label: "Art", posts: "1.5M" },
];

const savedItems = [
  { title: "CSS Grid Guide", type: "Article", date: "Saved 2 days ago" },
  { title: "React Hooks Cheatsheet", type: "Resource", date: "Saved 5 days ago" },
  { title: "Design System Tokens", type: "Reference", date: "Saved 1 week ago" },
  { title: "API Design Best Practices", type: "Article", date: "Saved 2 weeks ago" },
  { title: "Accessibility Checklist", type: "Resource", date: "Saved 3 weeks ago" },
  { title: "Animation Principles", type: "Reference", date: "Saved 1 month ago" },
];

const hashtags = [
  { tag: "reactjs", posts: "1.4M", top: true },
  { tag: "tailwindcss", posts: "892K", top: true },
  { tag: "typescript", posts: "756K", top: false },
  { tag: "nextjs", posts: "623K", top: false },
  { tag: "nodejs", posts: "512K", top: false },
  { tag: "figma", posts: "445K", top: false },
  { tag: "a11y", posts: "234K", top: false },
  { tag: "webperf", posts: "189K", top: false },
  { tag: "testing", posts: "156K", top: false },
  { tag: "devops", posts: "134K", top: false },
  { tag: "docker", posts: "98K", top: false },
  { tag: "graphql", posts: "87K", top: false },
];

const groups = [
  { name: "React Developers", members: "45K", category: "Technology", privacy: "Public" },
  { name: "UI/UX Design Community", members: "32K", category: "Design", privacy: "Public" },
  { name: "Remote Workers Hub", members: "28K", category: "Lifestyle", privacy: "Private" },
  { name: "Open Source Contributors", members: "18K", category: "Technology", privacy: "Public" },
];

const events = [
  { title: "React Conf 2026", date: "Aug 15, 2026", attendees: "2.4K", type: "Virtual" },
  { title: "Design Systems Meetup", date: "Aug 22, 2026", attendees: "456", type: "In-Person" },
  { title: "Hackathon: AI for Good", date: "Sep 5, 2026", attendees: "1.1K", type: "Hybrid" },
  { title: "TypeScript Deep Dive", date: "Sep 12, 2026", attendees: "789", type: "Virtual" },
];

const sponsored = [
  { brand: "CloudTech Pro", tagline: "Scale your infrastructure seamlessly. Get started free.", cta: "Learn More" },
  { brand: "DesignCraft Studio", tagline: "Premium UI kits and templates for modern web apps.", cta: "Shop Now" },
];

function VerifiedBadge() {
  return (
    <svg className="h-4 w-4 shrink-0 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
    </svg>
  );
}

function LikeIcon({ filled }: { filled?: boolean }) {
  return (
    <svg className={`h-5 w-5 ${filled ? "text-red-500" : "text-muted-foreground dark:text-muted-foreground/70"}`} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg className="h-5 w-5 text-muted-foreground dark:text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="h-5 w-5 text-muted-foreground dark:text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled?: boolean }) {
  return (
    <svg className={`h-5 w-5 ${filled ? "text-blue-500" : "text-muted-foreground dark:text-muted-foreground/70"}`} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}

function Avatar({ initials, online, className }: { initials: string; online?: boolean; className?: string }) {
  return (
    <div className={`relative shrink-0 ${className || ""}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
        {initials}
      </div>
      {online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />}
    </div>
  );
}

function ActionBar({ likes, comments, shares, liked }: { likes: number; comments: number; shares: number; liked?: boolean }) {
  return (
    <div className="flex items-center justify-between border-t border-border pt-3 dark:border-border">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-red-500 dark:text-muted-foreground/70">
          <LikeIcon filled={liked} />
          <span>{likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-blue-500 dark:text-muted-foreground/70">
          <CommentIcon />
          <span>{comments}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-green-500 dark:text-muted-foreground/70">
          <ShareIcon />
          <span>{shares}</span>
        </button>
      </div>
      <button className="transition-colors hover:text-blue-500">
        <BookmarkIcon />
      </button>
    </div>
  );
}

export default function SocialMediaPage() {
  const [activeTab, setActiveTab] = useState("for-you");
  const [newPostText, setNewPostText] = useState("");
  const [pollVotes, setPollVotes] = useState<Record<number, number>>({});
  const [blockModal, setBlockModal] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Social</h1>
          <p className="text-sm text-muted-foreground">Connect, share, and discover.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-full bg-muted p-2.5 text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span>
          </button>
          <button className="rounded-full bg-muted p-2.5 text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <Avatar initials="JD" className="cursor-pointer" />
        </div>
      </div>

      <div className="flex gap-1 rounded-xl border border-border bg-muted p-1 dark:border-border dark:bg-muted">
        {["for-you", "following", "trending"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100"
                : "text-muted-foreground hover:text-muted-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-200"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="flex-1 space-y-8">
          <div className="rounded-xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
            <div className="flex gap-3">
              <Avatar initials="JD" />
              <div className="flex-1">
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={2}
                  className="w-full resize-none rounded-lg border border-border bg-muted/40 p-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
                />
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-blue-500 dark:text-muted-foreground/70 dark:hover:bg-muted">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-green-500 dark:text-muted-foreground/70 dark:hover:bg-muted">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-yellow-500 dark:text-muted-foreground/70 dark:hover:bg-muted">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </button>
                    <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-purple-500 dark:text-muted-foreground/70 dark:hover:bg-muted">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <button
                    disabled={!newPostText.trim()}
                    className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-4">
              {stories.map((story) => (
                <div key={story.id} className="flex shrink-0 flex-col items-center gap-1.5">
                  <div className={`rounded-full p-0.5 ${story.isYou ? "" : "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"}`}>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${story.isYou ? "bg-muted" : "bg-zinc-800"} text-lg font-bold text-white`}>
                      {story.isYou ? (
                        <div className="relative">
                          <Avatar initials="JD" className="h-16 w-16" />
                          <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white dark:border-zinc-900">
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </span>
                        </div>
                      ) : (
                        story.name.split(" ").map((n: string) => n[0]).join("")
                      )}
                    </div>
                  </div>
                  <span className="max-w-[72px] truncate text-center text-xs font-medium text-muted-foreground">{story.name}</span>
                </div>
              ))}
            </div>
          </div>

          {feedPosts.map((post) => (
            <div key={post.id} className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
              <div className="mb-3 flex items-center gap-3">
                <Avatar initials={post.avatar} />
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">{post.user}</span>
                    {post.verified && <VerifiedBadge />}
                  </div>
                  <span className="text-xs text-muted-foreground">{post.handle} · {post.time}</span>
                </div>
                <button className="text-muted-foreground/70 transition-colors hover:text-muted-foreground dark:hover:text-zinc-200">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
              <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{post.content}</p>
              {post.image && (
                <div className="mt-3 overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
                  <div className="flex aspect-video items-center justify-center">
                    <svg className="h-16 w-16 text-blue-300 dark:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="mt-3">
                <ActionBar likes={post.likes} comments={post.comments} shares={post.shares} />
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Comments</h3>
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4 dark:border-border">
              <Avatar initials="JD" />
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
                />
                <button className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <Avatar initials={c.avatar} />
                  <div className="flex-1">
                    <div className="rounded-xl bg-muted/40 px-4 py-3 dark:bg-muted">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{c.user}</span>
                        <span className="text-xs text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-4 px-4">
                      <button className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-red-500">
                        <LikeIcon /> <span>{c.likes}</span>
                      </button>
                      <button className="text-xs text-muted-foreground transition-colors hover:text-blue-500">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Polls</h3>
            <div className="space-y-6">
              {polls.map((poll) => (
                <div key={poll.id}>
                  <p className="mb-3 text-sm font-medium text-foreground">{poll.question}</p>
                  <div className="space-y-2">
                    {poll.options.map((opt, i) => {
                      const pct = poll.total > 0 ? Math.round((poll.votes[i] / poll.total) * 100) : 0;
                      const selected = pollVotes[poll.id] === i;
                      return (
                        <button
                          key={opt}
                          onClick={() => setPollVotes((v) => ({ ...v, [poll.id]: i }))}
                          className={`relative w-full overflow-hidden rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                            selected
                              ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30"
                              : "border-border bg-muted/40 hover:border-foreground/20 dark:border-border dark:bg-muted dark:hover:border-foreground/20"
                          }`}
                        >
                          <div
                            className="absolute inset-0 bg-blue-100 transition-all dark:bg-blue-900/20"
                            style={{ width: `${selected ? pct : 0}%` }}
                          />
                          <span className="relative flex items-center justify-between">
                            <span className="text-zinc-800 dark:text-zinc-200">{opt}</span>
                            <span className="text-xs font-medium text-muted-foreground">{pct}%</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{poll.total} votes</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Live Streams</h3>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {liveStreams.map((stream) => (
                <div key={stream.user} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 text-white">
                  <div className="mb-6 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase">Live</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-300">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {stream.viewers}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar initials={stream.avatar} />
                    <div>
                      <p className="text-sm font-medium">{stream.user}</p>
                      <p className="text-xs text-muted-foreground/70">{stream.category}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-zinc-200">{stream.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Reels / Shorts</h3>
              <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">See all</button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {reels.map((reel) => (
                <div key={reel.id} className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900">
                  <div className="flex h-full flex-col items-center justify-center p-3 text-center">
                    <svg className="mb-2 h-8 w-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[10px] leading-tight text-white/80">{reel.description}</p>
                    <p className="mt-1 text-[10px] font-medium text-white/60">{reel.user}</p>
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-white/70">
                    <LikeIcon /> {reel.likes}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Explore</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {exploreItems.map((item) => (
                <div key={item.label} className="group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white transition-transform hover:scale-[1.02]">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="mt-1 text-xs text-white/70">{item.posts} posts</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Saved Items</h3>
              <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">Manage</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {savedItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    <BookmarkIcon filled />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                    <p className="text-[10px] text-muted-foreground/70">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="w-full space-y-6 xl:w-80">
          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-2xl font-bold text-blue-600 dark:bg-zinc-900">JD</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <h3 className="text-base font-semibold text-foreground">John Doe</h3>
                <VerifiedBadge />
              </div>
              <p className="text-xs text-muted-foreground">@johndoe</p>
              <p className="mt-2 text-sm text-muted-foreground">Full-stack developer passionate about UI/UX and open source.</p>
            </div>
            <div className="mt-4 grid grid-cols-3 divide-x divide-zinc-200 border-y border-border py-3 dark:divide-zinc-700 dark:border-border">
              {[
                { label: "Posts", value: "342" },
                { label: "Followers", value: "12.4K" },
                { label: "Following", value: "891" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-sm font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Edit Profile
            </button>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Notifications</h3>
            <div className="space-y-2">
              {notifications.map((n) => (
                <div key={n.id} className={`flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/40 dark:hover:bg-muted ${n.unread ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}>
                  <Avatar initials={n.user.split(" ").map((s) => s[0]).join("")} className="h-8 w-8" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{n.user}</span> {n.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                  {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Messages</h3>
              <button className="rounded-full bg-muted p-1.5 text-muted-foreground transition-colors hover:bg-muted dark:hover:bg-muted">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              {messages.map((msg) => (
                <div key={msg.id} className="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/40 dark:hover:bg-muted">
                  <Avatar initials={msg.avatar} online={msg.online} className="h-9 w-9" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{msg.user}</span>
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{msg.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Suggested for you</h3>
            <div className="space-y-3">
              {suggestedUsers.map((user) => (
                <div key={user.handle} className="flex items-center gap-3">
                  <Avatar initials={user.name.split(" ").map((s) => s[0]).join("")} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.handle} · {user.mutual} mutual</p>
                  </div>
                  <button className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Trending</h3>
              <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">Change</button>
            </div>
            <div className="space-y-3">
              {trendingTopics.slice(0, 5).map((topic) => (
                <div key={topic.tag} className="cursor-pointer">
                  <p className="text-sm font-medium text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400">{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Hashtag Explorer</h3>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((h) => (
                <button
                  key={h.tag}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    h.top
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
                  }`}
                >
                  #{h.tag}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Top hashtags: {hashtags.filter((h) => h.top).map((h) => `#${h.tag}`).join(", ")}</p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Groups</h3>
            <div className="space-y-3">
              {groups.map((g) => (
                <div key={g.name} className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 text-white text-sm font-bold">
                    {g.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{g.name}</p>
                    <p className="text-xs text-muted-foreground">{g.members} members · {g.privacy}</p>
                  </div>
                  <button className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Upcoming Events</h3>
            <div className="space-y-3">
              {events.map((ev) => (
                <div key={ev.title} className="flex gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                  <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    <span className="text-[10px] font-bold leading-none">{ev.date.split(" ")[1]}</span>
                    <span className="text-[10px] leading-none">{ev.date.split(" ")[0]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{ev.title}</p>
                    <p className="text-xs text-muted-foreground">{ev.date} · {ev.type}</p>
                    <p className="text-xs text-muted-foreground/70">{ev.attendees} attending</p>
                  </div>
                  <button className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700">
                    RSVP
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Sponsored</h3>
            <div className="space-y-3">
              {sponsored.map((ad) => (
                <div key={ad.brand} className="overflow-hidden rounded-lg border border-border">
                  <div className="flex h-24 items-center justify-center bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-900/40 dark:to-orange-900/40">
                    <span className="text-2xl font-bold text-amber-700 dark:text-amber-300">{ad.brand[0]}</span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground/70">Sponsored</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">{ad.brand}</p>
                    <p className="text-xs text-muted-foreground">{ad.tagline}</p>
                    <button className="mt-2 w-full rounded-lg bg-muted py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted">
                      {ad.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Post Insights</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5 dark:bg-muted">
                <span className="text-xs text-muted-foreground">Impressions</span>
                <span className="text-sm font-semibold text-foreground">12,847</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5 dark:bg-muted">
                <span className="text-xs text-muted-foreground">Reach</span>
                <span className="text-sm font-semibold text-foreground">8,342</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5 dark:bg-muted">
                <span className="text-xs text-muted-foreground">Profile Visits</span>
                <span className="text-sm font-semibold text-foreground">1,234</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5 dark:bg-muted">
                <span className="text-xs text-muted-foreground">New Followers</span>
                <span className="text-sm font-semibold text-green-600">+89</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Audience Insights</h3>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Ages 18-24</span>
                  <span className="font-medium text-foreground">34%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[34%] rounded-full bg-blue-500" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Ages 25-34</span>
                  <span className="font-medium text-foreground">41%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[41%] rounded-full bg-purple-500" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Ages 35-44</span>
                  <span className="font-medium text-foreground">18%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[18%] rounded-full bg-green-500" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Ages 45+</span>
                  <span className="font-medium text-foreground">7%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[7%] rounded-full bg-amber-500" />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3 text-xs dark:border-border">
                <span className="text-muted-foreground">Top Location</span>
                <span className="font-medium text-foreground">United States</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Gender Split</span>
                <span className="font-medium text-foreground">Male 58% / Female 42%</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Content Scheduler</h3>
            <div className="space-y-2">
              {[
                { day: "Today", time: "3:00 PM", content: "Product launch teaser" },
                { day: "Tomorrow", time: "10:00 AM", content: "Team spotlight: Design" },
                { day: "Wed", time: "12:00 PM", content: "Weekly tech tip video" },
                { day: "Thu", time: "4:30 PM", content: "Case study highlight" },
                { day: "Fri", time: "11:00 AM", content: "Weekend poll" },
              ].map((s) => (
                <div key={s.day + s.time} className="flex items-center gap-3 rounded-lg border border-border p-2.5 dark:border-border">
                  <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <span className="text-[9px] leading-none">{s.day}</span>
                    <span className="text-[9px] leading-none">{s.time}</span>
                  </div>
                  <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{s.content}</p>
                  <button className="shrink-0 text-muted-foreground/70 transition-colors hover:text-blue-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full rounded-lg border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-zinc-400 hover:text-muted-foreground dark:border-border dark:text-muted-foreground/70 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
              + Schedule New Post
            </button>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Collaboration Requests</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar initials="DK" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">Daniel Kim</p>
                  <p className="text-xs text-muted-foreground">Wants to collaborate on a project</p>
                </div>
                <div className="flex gap-1">
                  <button className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700">Accept</button>
                  <button className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Decline</button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar initials="LW" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">Lisa Wang</p>
                  <p className="text-xs text-muted-foreground">Proposes a joint live stream</p>
                </div>
                <div className="flex gap-1">
                  <button className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700">Accept</button>
                  <button className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Decline</button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Activity Status</h3>
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>
              <span className="text-sm text-muted-foreground">Online now</span>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { mood: "Productive", emoji: "🚀", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
                { mood: "Creative", emoji: "🎨", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
                { mood: "Social", emoji: "💬", color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" },
              ].map((m) => (
                <button key={m.mood} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${m.color}`}>
                  <span>{m.emoji}</span>
                  <span className="font-medium">{m.mood}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Tags & Mentions</h3>
            <div className="flex flex-wrap gap-2">
              {["@alexriv", "@sarahchen", "@jwilson", "@techdaily"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  {tag}
                  <button className="text-blue-400 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-300">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {["#ReactJs", "#WebDev", "#DesignSystems", "#OpenSource"].map((t) => (
                <span key={t} className="text-xs text-blue-500 transition-colors hover:text-blue-600 hover:underline cursor-pointer">{t}</span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Safety & Moderation</h3>
            <div className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-lg p-2.5 text-sm text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 dark:text-muted-foreground dark:hover:bg-red-900/20 dark:hover:text-red-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <span>Block User</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg p-2.5 text-sm text-muted-foreground transition-colors hover:bg-amber-50 hover:text-amber-600 dark:text-muted-foreground dark:hover:bg-amber-900/20 dark:hover:text-amber-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                <span>Report Content</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg p-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:text-muted-foreground dark:hover:bg-muted">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Privacy Settings</span>
              </button>
              <button onClick={() => setBlockModal(true)} className="flex w-full items-center gap-3 rounded-lg p-2.5 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Restrict Account</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Account Switcher</h3>
            <div className="space-y-2">
              {[
                { name: "John Doe", handle: "@johndoe", active: true },
                { name: "Design Portfolio", handle: "@johndoe.design", active: false },
                { name: "Dev Tips", handle: "@johndoe.dev", active: false },
              ].map((acc) => (
                <div key={acc.handle} className={`flex cursor-pointer items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/40 dark:hover:bg-muted ${acc.active ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}>
                  <Avatar initials={acc.name.split(" ").map((s) => s[0]).slice(0, 2).join("")} className="h-9 w-9" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{acc.name}</p>
                    <p className="text-xs text-muted-foreground">{acc.handle}</p>
                  </div>
                  {acc.active && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                </div>
              ))}
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-zinc-400 hover:text-muted-foreground dark:border-border dark:text-muted-foreground/70 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Account
            </button>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Analytics Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Followers", value: "12.4K", change: "+5.2%", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
                { label: "Engagement Rate", value: "4.8%", change: "+0.6%", color: "text-green-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                { label: "Posts This Week", value: "12", change: "-2", color: "text-red-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
                { label: "Avg. Reach", value: "2.1K", change: "+12%", color: "text-green-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-lg ${stat.bg} p-3`}>
                  <p className="text-[10px] font-medium text-muted-foreground dark:text-muted-foreground/70">{stat.label}</p>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className={`text-[10px] font-medium ${stat.color}`}>{stat.change}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {blockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setBlockModal(false)}>
          <div className="w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-xl dark:border-border dark:bg-zinc-900" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg className="h-7 w-7 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h3 className="mb-2 text-center text-lg font-semibold text-foreground">Block User?</h3>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              They won't be able to find your profile, posts, or send you messages. This action can be undone later.
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 rounded-lg border border-border p-3 dark:border-border">
                <input type="checkbox" className="h-4 w-4 rounded border-border text-blue-600" />
                <span className="text-sm text-muted-foreground">Also report this account</span>
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-border p-3 dark:border-border">
                <input type="checkbox" className="h-4 w-4 rounded border-border text-blue-600" />
                <span className="text-sm text-muted-foreground">Block future accounts from this user</span>
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setBlockModal(false)} className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">
                Cancel
              </button>
              <button className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700">
                Block
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 border-t border-border pt-6 dark:border-border">
        <button className="text-xs text-muted-foreground transition-colors hover:text-muted-foreground dark:hover:text-zinc-300">About</button>
        <span className="text-muted-foreground">·</span>
        <button className="text-xs text-muted-foreground transition-colors hover:text-muted-foreground dark:hover:text-zinc-300">Privacy</button>
        <span className="text-muted-foreground">·</span>
        <button className="text-xs text-muted-foreground transition-colors hover:text-muted-foreground dark:hover:text-zinc-300">Terms</button>
        <span className="text-muted-foreground">·</span>
        <button className="text-xs text-muted-foreground transition-colors hover:text-muted-foreground dark:hover:text-zinc-300">Cookies</button>
        <span className="text-muted-foreground">·</span>
        <button className="text-xs text-muted-foreground transition-colors hover:text-muted-foreground dark:hover:text-zinc-300">© 2026 Social</button>
      </div>
    </div>
  );
}
