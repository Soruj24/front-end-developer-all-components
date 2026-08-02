"use client";

import { useState } from "react";
import type { RegistryComment } from "@/features/registry";
import { relativeTime, formatNumber } from "@/features/registry";
import { useLocalStorage } from "@/hooks";
import { HeartIcon, CommentIcon } from "./icons";

const seed: Omit<RegistryComment, "id">[] = [
  {
    author: "Maya R.",
    avatarColor: "from-blue-400 to-indigo-500",
    content: "Used this on two production apps. The keyboard focus handling is flawless.",
    createdAt: "2026-06-12T00:00:00.000Z",
    likes: 24,
  },
  {
    author: "Devon K.",
    avatarColor: "from-emerald-400 to-teal-500",
    content: "Dark mode support is genuinely impressive — no layout shifts at all.",
    createdAt: "2026-05-30T00:00:00.000Z",
    likes: 11,
  },
];

export function ComponentComments({ componentSlug }: { componentSlug: string }) {
  const [comments, setComments] = useLocalStorage<RegistryComment[]>(
    `registry-comments-${componentSlug}`,
    seed.map((item, index) => ({ id: `seed-${index}`, ...item }))
  );
  const [draft, setDraft] = useState("");
  const [author, setAuthor] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    const next: RegistryComment = {
      id: `local-${Date.now()}`,
      author: author.trim() || "Anonymous",
      avatarColor: "from-violet-400 to-purple-500",
      content: draft.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setComments([next, ...comments]);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={submit} className="flex flex-col gap-2.5 rounded-xl border border-border p-4">
        <input
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Your name (optional)"
          className="h-9 rounded-lg border border-border bg-background px-3 text-xs outline-none focus:border-ring/60"
        />
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Share your experience with this component..."
          rows={3}
          className="resize-none rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-ring/60"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!draft.trim()}
            className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Post comment
          </button>
        </div>
      </form>

      <div className="flex flex-col divide-y divide-border">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 py-4 first:pt-0">
            <div className={`h-9 w-9 shrink-0 rounded-full bg-gradient-to-br ${comment.avatarColor}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{comment.author}</span>
                <span className="text-[11px] text-muted-foreground">
                  {relativeTime(comment.createdAt)}
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                {comment.content}
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <HeartIcon className="h-3 w-3" />
                {formatNumber(comment.likes)}
              </span>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            <CommentIcon className="mx-auto mb-2 h-6 w-6" />
            Be the first to comment.
          </p>
        )}
      </div>
    </div>
  );
}
