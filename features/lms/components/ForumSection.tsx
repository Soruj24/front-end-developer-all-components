import type { ForumPost } from "../types";

interface ForumSectionProps {
  posts: ForumPost[];
}

export function ForumSection({ posts }: ForumSectionProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Discussion Forum</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">View All</button>
      </div>
      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="flex items-start gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{post.title}</p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground dark:text-muted-foreground/70">
                <span>by {post.author}</span>
                <span>{post.replies} replies</span>
                <span>{post.time}</span>
              </div>
            </div>
            <svg className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </div>
        ))}
      </div>
    </div>
  );
}
