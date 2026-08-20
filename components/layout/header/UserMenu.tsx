"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { LogOut, Star, Folder, Heart, Gear, User, Shield, FolderOpen } from "lucide-react";

interface UserMenuProps {
  role?: "user" | "admin";
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const NAV_ITEMS_USER = [
  { label: "My Components", href: "/components", icon: Folder },
  { label: "My Templates", href: "/templates", icon: Star },
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "Projects", href: "/projects", icon: Laptop },
  { label: "Settings", href: "/settings", icon: Gear },
  { label: "Logout", href: "/login", onClick: true, icon: LogOut },
];

const NAV_ITEMS_ADMIN = [
  { label: "My Components", href: "/components", icon: Folder },
  { label: "My Templates", href: "/templates", icon: Star },
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "Admin Panel", href: "/admin", icon: Shield },
  { label: "Users", href: "/admin/users", icon: User },
  { label: "Logout", href: "/login", onClick: true, icon: LogOut },
];

export function UserMenu({
  role = "user",
  userName = "User",
  userAvatar,
  onLogout,
}: UserMenuProps) {
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

  const navItems = role === "admin" ? NAV_ITEMS_ADMIN : NAV_ITEMS_USER;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-background",
          "hover:bg-muted transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
          <span className="text-sm font-medium">
            {userName.charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-1 w-56 rounded-xl border border-border bg-popover shadow-lg",
            "animate-fade-in-down"
          )}
          role="menu"
        >
          <div className="px-3 py-2 border-b border-border">
            <p className="text-sm font-medium text-foreground">{userName}</p>
          </div>
          {navItems.map((item) => {
            const isDivider = item.onClick === true;
            const otherProps = {
              ...item,
              onClick: item.onClick === true ? onLogout : undefined,
            };

            if (isDivider) {
              return (
                <div
                  key={item.label}
                  className="my-1 border-t border-border"
                />
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center rounded-sm px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                  "data-[state=active]:text-foreground"
                )}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                {item.icon &&
                  <item.icon
                    className="h-4 w-4 shrink-0 mr-2 stroke-current"
                  />}
                {item.label}
              </a>
            );
          })}
          {role === "admin" && (
            <div className="mt-2 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full justify-between text-xs text-muted-foreground py-1.5"
              >
                <span>Admin features available</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}