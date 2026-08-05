import Image from "next/image";
import { currentUser, postInsights, audienceAges, scheduledPosts, collaborationRequests } from "../constants/social-data";
import { Avatar } from "./Avatar";
import { VerifiedBadge } from "./VerifiedBadge";

export function ProfileCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full">
        <Image src={currentUser.image} alt={currentUser.name} fill className="object-cover" sizes="80px" />
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{currentUser.name}</h3>
          <VerifiedBadge />
        </div>
        <p className="text-xs text-zinc-500">{currentUser.handle}</p>
        <p className="mt-2 text-sm text-zinc-500">{currentUser.bio}</p>
      </div>
      <div className="mt-4 grid grid-cols-3 divide-x divide-zinc-200 border-y border-zinc-100 py-3 dark:divide-zinc-800 dark:border-zinc-800">
        {[
          { label: "Posts", value: currentUser.posts },
          { label: "Followers", value: currentUser.followers },
          { label: "Following", value: currentUser.following },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
            <p className="text-[10px] text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Edit Profile</button>
    </div>
  );
}

export function NotificationsCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notifications</h3>
      <div className="space-y-2">
        {[
          { user: "Priya Patel", action: "liked your post", time: "12m ago", unread: true, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
          { user: "Michael Brown", action: "commented: 'Great work!'", time: "34m ago", unread: true, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
          { user: "Emily Davis", action: "started following you", time: "1h ago", unread: true, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
          { user: "Olivia Taylor", action: "mentioned you in a comment", time: "3h ago", unread: false, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face" },
          { user: "Daniel Kim", action: "shared your post", time: "5h ago", unread: false, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" },
        ].map((n, i) => (
          <div key={i} className={`flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${n.unread ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}>
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <Image src={n.image} alt={n.user} fill className="object-cover" sizes="32px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{n.user}</span> {n.action}
              </p>
              <p className="text-xs text-zinc-400">{n.time}</p>
            </div>
            {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MessagesCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Messages</h3>
        <button className="rounded-full bg-zinc-100 p-1.5 text-zinc-500 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div className="space-y-1">
        {[
          { user: "Priya Patel", preview: "Are you coming to the meetup tonight?", time: "2m ago", online: true, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
          { user: "Michael Brown", preview: "Thanks for the feedback on the PR!", time: "15m ago", online: true, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
          { user: "Emily Davis", preview: "Let me check the calendar and get back to you", time: "1h ago", online: false, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
          { user: "Olivia Taylor", preview: "The design looks amazing!", time: "3h ago", online: false, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face" },
          { user: "Daniel Kim", preview: "Can we schedule a call for tomorrow?", time: "5h ago", online: true, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" },
        ].map((msg, i) => (
          <div key={i} className="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <Image src={msg.image} alt={msg.user} fill className="object-cover" sizes="36px" />
              {msg.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{msg.user}</span>
                <span className="text-[10px] text-zinc-400">{msg.time}</span>
              </div>
              <p className="truncate text-xs text-zinc-500">{msg.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrendingCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Trending</h3>
        <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">Change</button>
      </div>
      <div className="space-y-3">
        {[
          { tag: "#ReactJs", posts: "142K" },
          { tag: "#WebDev", posts: "89K" },
          { tag: "#AI", posts: "234K" },
          { tag: "#DesignSystems", posts: "45K" },
          { tag: "#OpenSource", posts: "67K" },
        ].map((topic) => (
          <div key={topic.tag} className="cursor-pointer">
            <p className="text-sm font-medium text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400">{topic.tag}</p>
            <p className="text-xs text-zinc-500">{topic.posts} posts</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SuggestedUsersCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Suggested for you</h3>
      <div className="space-y-3">
        {[
          { name: "Daniel Kim", handle: "@dankim", followers: "2.4K", mutual: 5, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" },
          { name: "Lisa Wang", handle: "@lisaw", followers: "8.1K", mutual: 12, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face" },
          { name: "Ryan O'Brien", handle: "@ryanob", followers: "1.2K", mutual: 3, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face" },
          { name: "Maya Gupta", handle: "@mayag", followers: "14K", mutual: 8, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face" },
        ].map((user) => (
          <div key={user.handle} className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image src={user.image} alt={user.name} fill className="object-cover" sizes="40px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.name}</p>
              <p className="text-xs text-zinc-500">{user.handle} · {user.mutual} mutual</p>
            </div>
            <button className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/50">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PostInsightsCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Post Insights</h3>
      <div className="space-y-2">
        {postInsights.map((insight) => (
          <div key={insight.label} className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800/50">
            <span className="text-xs text-zinc-500">{insight.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{insight.value}</span>
              {insight.change && (
                <span className={`text-[10px] font-medium ${insight.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {insight.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AudienceInsightsCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Audience Insights</h3>
      <div className="space-y-3">
        {audienceAges.map((age) => (
          <div key={age.range}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Ages {age.range}</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{age.percentage}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className={`h-full rounded-full ${age.color}`} style={{ width: `${age.percentage}%` }} />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs dark:border-zinc-800">
          <span className="text-zinc-500">Top Location</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">United States</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">Gender Split</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Male 58% / Female 42%</span>
        </div>
      </div>
    </div>
  );
}

export function ContentSchedulerCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Content Scheduler</h3>
      <div className="space-y-2">
        {scheduledPosts.map((s) => (
          <div key={s.day + s.time} className="flex items-center gap-3 rounded-lg border border-zinc-100 p-2.5 dark:border-zinc-800">
            <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50 text-[10px] font-bold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <span className="leading-none">{s.day}</span>
              <span className="leading-none">{s.time}</span>
            </div>
            <p className="min-w-0 flex-1 truncate text-xs text-zinc-600 dark:text-zinc-300">{s.content}</p>
          </div>
        ))}
      </div>
      <button className="mt-3 w-full rounded-lg border border-dashed border-zinc-200 py-2 text-xs font-medium text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-300">
        + Schedule New Post
      </button>
    </div>
  );
}

export function CollaborationCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Collaboration Requests</h3>
      <div className="space-y-3">
        {collaborationRequests.map((req, i) => (
          <div key={i} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image src={req.user.image} alt={req.user.name} fill className="object-cover" sizes="36px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{req.user.name}</p>
                <p className="text-[10px] text-zinc-400">{req.time}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-zinc-500">{req.message}</p>
            <div className="mt-2 flex gap-2">
              <button className="flex-1 rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700">Accept</button>
              <button className="flex-1 rounded-lg border border-zinc-200 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/50">Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
