"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface UserMenuProps {
  userName?: string;
  userAvatar?: string;
  role?: "user" | "admin";
  onLogout?: () => void;
  className?: string;
}

const USER_ITEMS = [
  { label: "Profile", href: "/profile" },
  { label: "My Components", href: "/components" },
  { label: "My Templates", href: "/templates" },
  { label: "Favorites", href: "/favorites" },
  { label: "Projects", href: "/projects" },
  { label: "Settings", href: "/settings" },
];

const ADMIN_ITEMS = [
  { label: "Admin Panel", href: "/admin" },
  { label: "Users", href: "/admin/users" },
];

export function UserMenu({
  userName = "User",
  userAvatar,
  role = "user",
  onLogout,
  className,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const initial = userName.charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          "border border-border/60 bg-muted",
          "text-xs font-medium text-muted-foreground",
          "hover:bg-muted/80 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
        aria-label="User menu"
        aria-expanded={open}
      >
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt={userName}
            width={32}
            height={32}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initial
        )}
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-lg",
            "border border-border/60 bg-popover shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
          )}
          role="menu"
        >
          <div className="border-b border-border/60 px-3 py-2.5">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            {role === "admin" && (
              <span className="inline-flex items-center rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary mt-1">
                Admin
              </span>
            )}
          </div>

          <div className="p-1">
            {USER_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center rounded-md px-2.5 py-1.5 text-sm",
                  "text-muted-foreground hover:bg-muted hover:text-foreground",
                  "transition-colors",
                )}
                role="menuitem"
              >
                {item.label}
              </a>
            ))}
          </div>

          {role === "admin" && ADMIN_ITEMS.length > 0 && (
            <div className="border-t border-border/60 p-1">
              {ADMIN_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center rounded-md px-2.5 py-1.5 text-sm",
                    "text-muted-foreground hover:bg-muted hover:text-foreground",
                    "transition-colors",
                  )}
                  role="menuitem"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          <div className="border-t border-border/60 p-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLogout?.();
              }}
              className={cn(
                "flex w-full items-center rounded-md px-2.5 py-1.5 text-sm",
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                "transition-colors",
              )}
              role="menuitem"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
