"use client";

import type { SVGProps } from "react";
import { getIcon } from "../constants/icons";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

/** Renders a stroke icon by name from the props-editor icon set. */
export function Icon({ name, className = "", ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d={getIcon(name)} />
    </svg>
  );
}
