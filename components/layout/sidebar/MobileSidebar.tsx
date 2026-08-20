"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useActivePath } from "@/hooks";
import { siteConfig } from "@/config/site";
import type { NavLink, NavSection } from "@/types/navigation";
import { cn } from "@/lib/cn";
import {
  BORDER,
  BG,
  Z,
  RADIUS,
  TRANSITION,
  BACKDROP,
  INTERACTIVE,
  FOCUS,
  STATUS_DOT,
  TEXT,
  COLOR,
} from "@/constants/tokens";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  sections: NavSection[];
}

function MobileLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const isActive = useActivePath();
  const active = isActive(link.href, { exact: true });

  return (
    <li>
      <Link
        href={link.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center px-2.5 py-2 font-medium",
          RADIUS.sm,
          TEXT.body,
          TRANSITION.colors,
          active
            ? `${BG.accent} text-foreground`
            : `text-muted-foreground ${BG.mutedSoft} hover:text-foreground`,
        )}
        aria-current={active ? "page" : undefined}
      >
        {link.icon && <span className={cn("mr-2 text-xs text-muted-foreground")}>{link.icon}</span>}
        {link.label}
      </Link>
      {link.children && link.children.length > 0 && (
        <ul className={cn("ml-3 mt-0.5 flex flex-col gap-0.5 border-l pl-2", BORDER.default)}>
          {link.children.map((child) => (
            <MobileLink key={child.label} link={child} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function MobileSidebar({ open, onClose, sections }: MobileSidebarProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0",
          Z.sidebarOverlay,
          BG.overlay,
          BACKDROP.light,
          TRANSITION.opacity,
          "sm:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col",
          Z.chrome,
          BORDER.default,
          BG.base,
          TRANSITION.slide,
          "sm:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3",
            BORDER.default,
          )}
        >
          <Link href="/" className="group flex items-center gap-2.5" onClick={onClose}>
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center font-bold text-background",
                RADIUS.lg,
                BG.primary,
                TEXT.small,
              )}
            >
              {siteConfig.shortName}
            </span>
            <span className={cn("font-semibold tracking-tight text-foreground", TEXT.brand)}>
              {siteConfig.name}
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={cn(INTERACTIVE.iconButtonSm, FOCUS.ring)}
            aria-label="Close menu"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {sections.map((section) => (
            <div key={section.title} className="mb-3">
              <p className={cn("mb-1.5 px-2 font-medium uppercase tracking-wider", TEXT.small, COLOR.muted)}>
                {section.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {section.links.map((link) => (
                  <MobileLink key={link.label} link={link} onNavigate={onClose} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={cn("border-t px-4 py-3", BORDER.default)}>
          <div className={cn("flex items-center justify-between", TEXT.small, COLOR.muted)}>
            <span>Settings</span>
            <span className="flex items-center gap-1.5">
              <span className={STATUS_DOT.wrapper}>
                <span className={STATUS_DOT.ping} />
                <span className={STATUS_DOT.dot} />
              </span>
              v2.0
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
