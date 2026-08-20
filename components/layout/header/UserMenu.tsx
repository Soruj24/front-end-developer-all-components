"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import {
  FOCUS,
  TRANSITION,
  Z,
  RADIUS,
  BORDER,
  BG,
  TEXT,
} from "@/constants/tokens";

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
          BORDER.default,
          BG.muted,
          "text-xs font-medium text-muted-foreground",
          "hover:bg-muted/80",
          TRANSITION.colors,
          FOCUS.ring,
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
            "absolute right-0 top-full mt-1 w-56 overflow-hidden",
            Z.chrome,
            RADIUS.lg,
            BORDER.default,
            "bg-popover shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
          )}
          role="menu"
        >
          <div className={cn("border-b px-3 py-2.5", BORDER.default)}>
            <p className={cn("font-medium text-foreground", TEXT.body)}>
              {userName}
            </p>
            {role === "admin" && (
              <span
                className={cn(
                  "mt-1 inline-flex items-center rounded-md bg-primary/10 px-1.5 py-0.5 font-medium text-primary",
                  TEXT.tiny,
                )}
              >
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
                  "flex items-center px-2.5 py-1.5",
                  RADIUS.sm,
                  "text-muted-foreground",
                  BG.mutedSoft,
                  "hover:text-foreground",
                  TRANSITION.colors,
                  TEXT.body,
                )}
                role="menuitem"
              >
                {item.label}
              </a>
            ))}
          </div>

          {role === "admin" && ADMIN_ITEMS.length > 0 && (
            <div className={cn("border-t p-1", BORDER.default)}>
              {ADMIN_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center px-2.5 py-1.5",
                    RADIUS.sm,
                    "text-muted-foreground",
                    BG.mutedSoft,
                    "hover:text-foreground",
                    TRANSITION.colors,
                    TEXT.body,
                  )}
                  role="menuitem"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          <div className={cn("border-t p-1", BORDER.default)}>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLogout?.();
              }}
              className={cn(
                "flex w-full items-center px-2.5 py-1.5",
                RADIUS.sm,
                "text-muted-foreground",
                BG.mutedSoft,
                "hover:text-foreground",
                TRANSITION.colors,
                TEXT.body,
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
