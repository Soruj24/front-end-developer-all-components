import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineFeed: RegistryEntry = entry({
    id: "timeline-feed",
    title: "Notifications, Activity Stream & Git History",
    description: "Social notifications, team activity, and commit history.",
    source: `export default function TimelineFeed() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { text: "Alex liked your post", time: "2m", dot: true },
          { text: "New comment on your photo", time: "15m", dot: true },
          { text: "Sarah started following you", time: "1h", dot: false },
          { text: "Your post reached 100 likes", time: "3h", dot: false },
        ].map((item, i) => (
          <div key={i} className="relative mb-3 last:mb-0">
            {item.dot && <span className="absolute -left-[7px] mt-1.5 h-2 w-2 rounded-full bg-blue-500" />}
            <div className="text-xs">{item.text}</div>
            <div className="text-[10px] text-zinc-400">{item.time}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {[
          { user: "Alex", action: "pushed to main", time: "2m ago" },
          { user: "Sarah", action: "opened PR #42", time: "15m ago" },
          { user: "Bob", action: "deployed to prod", time: "1h ago" },
          { user: "Carol", action: "created issue #128", time: "3h ago" },
          { user: "Dave", action: "merged PR #40", time: "5h ago" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-[9px] dark:bg-zinc-800">{item.user[0]}</span>
            <span><span className="font-medium">{item.user}</span> {item.action}</span>
            <span className="ml-auto text-[10px] text-zinc-400">{item.time}</span>
          </div>
        ))}
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { msg: "fix: resolve login redirect", branch: "main", hash: "a1b2c3" },
          { msg: "feat: add user dashboard", branch: "feature/dash", hash: "d4e5f6" },
          { msg: "chore: update dependencies", branch: "main", hash: "g7h8i9" },
          { msg: "feat: implement search", branch: "feature/search", hash: "j0k1l2" },
        ].map((item, i) => (
          <div key={i} className="relative mb-3 last:mb-0">
            <span className="absolute -left-5 mt-1 h-2.5 w-2.5 rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-400">{item.hash}</span>
              <span className="text-xs">{item.msg}</span>
            </div>
            <span className="text-[10px] text-zinc-400">{item.branch}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
