"use client";

import { createElement, type SVGProps } from "react";
import { getLucideIcon } from "../constants/icons";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

/** Renders a lucide-react icon by name from the props-editor icon set. */
export function Icon({ name, className = "", ...props }: IconProps) {
  const LucideIcon = getLucideIcon(name);
  if (!LucideIcon) return null;
  return createElement(LucideIcon, { className: `shrink-0 ${className}`, "aria-hidden": true, ...props });
}
