import { comments } from "../constants/social-data";
import { Avatar } from "./Avatar";
import { ActionButton } from "./ActionButton";

export function CommentSection() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Comments</h3>
      <div className="mb-4 flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
        <button className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <Avatar user={c.user} size="sm" />
            <div className="flex-1">
              <div className="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.user.name}</span>
                  <span className="text-xs text-zinc-400">{c.time}</span>
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{c.text}</p>
              </div>
              <div className="mt-1 flex items-center gap-4 px-4">
                <ActionButton icon="like" count={c.likes} />
                <button className="text-xs text-zinc-500 transition-colors hover:text-blue-500">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
