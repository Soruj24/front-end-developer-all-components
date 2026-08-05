"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface SiteHeaderUserProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  className?: string;
}

export function SiteHeaderUser({
  isLoggedIn = false,
  userName = "User",
  userAvatar,
  className,
}: SiteHeaderUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className={cn(
          "hidden h-9 items-center rounded-full border border-zinc-800 px-4",
          "text-[13px] font-medium text-zinc-200",
          "transition-all hover:bg-zinc-800/60 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
          "md:inline-flex",
          className
        )}
      >
        Sign in
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "hidden h-9 w-9 items-center justify-center rounded-full",
          "bg-zinc-800 text-sm font-medium text-zinc-200",
          "transition-all duration-200",
          "hover:bg-zinc-700 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
          "lg:flex"
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span>{userName.charAt(0).toUpperCase()}</span>
        )}
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-1",
            "w-48 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5",
            "shadow-popover animate-scale-in"
          )}
          role="menu"
        >
          <div className="border-b border-zinc-800 px-3 py-2">
            <p className="text-[13px] font-medium text-zinc-200">{userName}</p>
          </div>
          <Link
            href="/account"
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex w-full items-center rounded-lg px-3 py-2",
              "text-[13px] font-medium text-zinc-400",
              "transition-colors hover:bg-zinc-800/60 hover:text-zinc-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            )}
            role="menuitem"
          >
            Account
          </Link>
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex w-full items-center rounded-lg px-3 py-2",
              "text-[13px] font-medium text-zinc-400",
              "transition-colors hover:bg-zinc-800/60 hover:text-zinc-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            )}
            role="menuitem"
          >
            Settings
          </Link>
          <div className="my-1 border-t border-zinc-800" />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex w-full items-center rounded-lg px-3 py-2",
              "text-[13px] font-medium text-red-400",
              "transition-colors hover:bg-red-500/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            )}
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
