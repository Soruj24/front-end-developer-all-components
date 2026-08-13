"use client";

import { cn } from "@/lib/cn";

interface ProductWishlistButtonProps {
  isWishlisted: boolean;
  onToggle: () => void;
  className?: string;
  size?: "sm" | "md";
}

export function ProductWishlistButton({
  isWishlisted,
  onToggle,
  className,
  size = "md",
}: ProductWishlistButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        "flex items-center justify-center rounded-full transition-all",
        size === "sm" ? "h-8 w-8" : "h-10 w-10",
        isWishlisted
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-background/80 text-muted-foreground hover:bg-background hover:text-foreground",
        className
      )}
    >
      <svg
        className={cn(size === "sm" ? "h-4 w-4" : "h-5 w-5", isWishlisted && "fill-current")}
        fill={isWishlisted ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
