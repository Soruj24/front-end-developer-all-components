"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";

interface BlogBookmarkButtonProps {
  postId: string;
  className?: string;
}

export function BlogBookmarkButton({
  postId,
  className,
}: BlogBookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("blog-bookmarks") || "[]"
    );
    setBookmarked(bookmarks.includes(postId));
  }, [postId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(
      localStorage.getItem("blog-bookmarks") || "[]"
    );
    let updated: string[];
    if (bookmarked) {
      updated = bookmarks.filter((id: string) => id !== postId);
    } else {
      updated = [...bookmarks, postId];
    }
    localStorage.setItem("blog-bookmarks", JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-9 w-9 text-muted-foreground",
        bookmarked
          ? "text-primary hover:text-primary/80"
          : "hover:text-foreground",
        className
      )}
      onClick={toggleBookmark}
    >
      <svg
        className={cn("h-4 w-4", bookmarked && "fill-current")}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </Button>
  );
}
