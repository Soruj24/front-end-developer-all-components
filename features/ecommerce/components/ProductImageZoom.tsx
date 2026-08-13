"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface ProductImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImageZoom({ src, alt, className }: ProductImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50 bg-muted/30 cursor-crosshair",
        className
      )}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative aspect-square">
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-cover transition-transform duration-200",
            isZoomed && "scale-150"
          )}
          style={
            isZoomed
              ? { transformOrigin: `${position.x}% ${position.y}%` }
              : undefined
          }
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {isZoomed && (
        <div className="absolute bottom-3 right-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          Zoom {Math.round(position.x)}, {Math.round(position.y)}%
        </div>
      )}
    </div>
  );
}
