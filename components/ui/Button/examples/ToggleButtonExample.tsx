"use client";

import { useState } from "react";
import { Button } from "../../Button";

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="h-4 w-4" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="h-4 w-4" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}

export function ToggleButtonExample() {
  const [starred, setStarred] = useState(false);
  const [bookmarked, setBookmarked] = useState(true);
  const [followed, setFollowed] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant={starred ? "primary" : "outline"}
        onClick={() => setStarred((v) => !v)}
      >
        <StarIcon filled={starred} />
        {starred ? "Starred" : "Star"}
      </Button>
      <Button
        variant={bookmarked ? "secondary" : "outline"}
        onClick={() => setBookmarked((v) => !v)}
      >
        <BookmarkIcon filled={bookmarked} />
        {bookmarked ? "Saved" : "Save"}
      </Button>
      <Button
        variant={followed ? "soft" : "outline"}
        onClick={() => setFollowed((v) => !v)}
      >
        {followed && <CheckIcon />}
        {followed ? "Following" : "Follow"}
      </Button>
    </div>
  );
}
