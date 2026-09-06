"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS, TEXT, Z } from "@/constants/tokens";

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
  { label: "Favorites", href: "/favorites" },
  { label: "Projects", href: "/projects" },
  { label: "Settings", href: "/account/settings" },
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
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const initial = userName.charAt(0).toUpperCase();

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md text-sm font-semibold transition-colors hover:bg-muted sm:h-8 sm:w-8",
          userAvatar ? "" : "bg-foreground text-background hover:bg-foreground/90",
          FOCUS.ring,
        )}
      >
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt={userName}
            width={32}
            height={32}
            className="h-8 w-8 rounded-md object-cover"
          />
        ) : (
          initial
        )}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account"
          className={cn(
            "absolute right-0 top-full z-50 mt-2 w-60 max-w-[85vw] overflow-hidden rounded-lg border border-border/60 bg-popover shadow-popover",
            Z.chrome,
          )}
        >
          <div className="border-b border-border/60 px-4 py-3">
            <p className={cn("truncate font-semibold text-foreground", TEXT.body)}>
              {userName}
            </p>
            <p className={cn("mt-0.5 truncate capitalize text-muted-foreground", TEXT.small)}>
              {role} plan
            </p>
          </div>

          <div className="p-1.5">
            {USER_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {role === "admin" && (
            <div className="border-t border-border/60 p-1.5">
              <Link
                href="/admin"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center rounded-md px-3 py-2 text-[13px] font-medium text-primary transition-colors hover:bg-primary-soft"
              >
                Admin Panel
              </Link>
            </div>
          )}

          <div className="border-t border-border/60 p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout?.();
              }}
              className="flex w-full items-center rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
