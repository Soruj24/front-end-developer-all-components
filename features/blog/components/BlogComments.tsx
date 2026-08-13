"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";
import type { BlogComment } from "../types/blog.types";

interface BlogCommentsProps {
  comments: BlogComment[];
  className?: string;
}

function CommentItem({
  comment,
  depth = 0,
}: {
  comment: BlogComment;
  depth?: number;
}) {
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount((c) => c - 1);
    } else {
      setLikeCount((c) => c + 1);
    }
    setLiked(!liked);
  };

  return (
    <div
      className={cn(
        "group",
        depth > 0 && "ml-8 border-l-2 border-border/50 pl-4"
      )}
    >
      <div className="rounded-lg bg-muted/30 p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            {comment.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">
              {comment.author}
            </span>
            <span className="ml-2 text-xs text-muted-foreground">
              {comment.date}
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {comment.content}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1 text-xs transition-colors",
              liked ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <svg
              className={cn("h-3.5 w-3.5", liked && "fill-current")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span>{likeCount}</span>
          </button>
          <button
            onClick={() => setShowReply(!showReply)}
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            <span>Reply</span>
          </button>
        </div>
      </div>

      {showReply && (
        <div className="mt-3 ml-8">
          <div className="flex gap-2">
            <textarea
              placeholder="Write a reply..."
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              rows={2}
            />
            <Button size="sm" className="shrink-0">
              Reply
            </Button>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function BlogComments({ comments, className }: BlogCommentsProps) {
  const [newComment, setNewComment] = useState("");

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Comments ({comments.length})
        </h2>
      </div>

      <div className="rounded-xl border border-border/50 bg-background p-5">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          rows={3}
        />
        <div className="mt-3 flex justify-end">
          <Button disabled={!newComment.trim()}>Post Comment</Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
