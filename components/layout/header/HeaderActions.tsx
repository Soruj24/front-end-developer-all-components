"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Sun, Moon, Laptop, Shield, Mail, LogOut } from "lucide-react";

interface HeaderActionsProps {
  className?: string;
  onThemeToggle?: (theme: "light" | "dark" | "system") => void;
  userName?: string;
  userAvatar?: string;
  role?: "user" | "admin";
}

export function HeaderActions({
  className,
  onThemeToggle,
  userName = "User",
  userAvatar,
  role = "user",
}: HeaderActionsProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(stored || system);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark", "system");
    if (theme === "system") {
      root.classList.add("system");
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () =>
    setTheme((prev) => {
      if (prev === "system") return "dark";
      if (prev === "dark") return "light";
      return "system";
    });

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Theme Switcher */}
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "relative h-8 w-8 rounded-full bg-border flex items-center justify-center",
          "hover:bg-border/70 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-2 focus-visible:ring-primary/50",
          theme === "system" ? "text-muted-foreground" : "text-foreground",
          "lg:flex"
        )}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "system"
          ? (
            <svg
              className="h-4 w-4"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          )
          : theme === "dark"
          ? (
            <svg
              className="h-4 w-4"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 15a9.003 9.003 0 008.354-11.354zM12 2a10 10 0 1010 10A9.997 9.997 0 0012 2z"
              />
            </svg>
          )
          : (
            <svg
              className="h-4 w-4"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          )}
      </button>

      {/* Notifications */}
      <button
        type="button"
        className={cn(
          "relative h-8 w-8 rounded-full flex items-center justify-center",
          "hover:bg-border/70 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-2 focus-visible:ring-primary/50"
        )}
        aria-label="Notifications"
      >
        <svg
          className="h-4 w-4 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 9l-6 6m6-6l6-6m7.132-5.632a7.96 7.96 0 01-1.48-.807 7.945 7.945 0 01-.807-1.491h.008c.0-.285.087-.528.257-.707a3.513 3.513 0 011.088-.233c.428.056.818.14 1.162.312a6.354 6.354 0 011.828 1.883m0 0l.187-.083a7.956 7.956 0 00-.816-1.306 7.954 7.954 0 00-1.306-.807h.007c-.0.285-.087.528-.257.707a3.512 3.512 0 01-1.088.233c-.428-.056-.818-.14-1.162-.312a6.355 6.355 0 01-1.828-1.883m-7.132 5.632a7.96 7.96 0 01-1.48.807 7.945 7.945 0 01-.807 1.491h.007c-.0.285-.087.528-.257.707a3.513 3.513 0 011.088.233c.428.056.818.14 1.162.312a6.354 6.354 0 011.828 1.883m0 0l-.187.083a7.955 7.955 0 00.816 1.306 7.954 7.954 0 001.306.807h.007c.0.285.087.528.257.707a3.512 3.512 0 011.088-.233c-.428.056-.818.14-1.162.312a6.355 6.355 0 01-1.828-1.883Z"
          />
        </svg>
        {role === "admin" && (
          <span className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-primary text-xs font-medium text-primary-foreground">
            3
          </span>
        )}
      </button>

      {/* User Menu */}
      <UserMenu
        role={role}
        userName={userName}
        userAvatar={userAvatar}
        onLogout={() => {}}
      />
    </div>
  );
}