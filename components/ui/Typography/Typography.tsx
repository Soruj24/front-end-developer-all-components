"use client";

import { cn } from "@/lib/cn";
import { TypographyProps } from "./Typography.types";

const elementClasses = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",
  p: "leading-7",
  blockquote: "border-l-2 border-border pl-6 italic text-muted-foreground",
  code: "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
};

const defaultElement = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  blockquote: "blockquote",
  code: "code",
  lead: "p",
  large: "p",
  small: "p",
  muted: "p",
} as const;

export default function Typography({
  as = "p",
  className,
  children,
}: TypographyProps) {
  const Component = defaultElement[as] as keyof React.JSX.IntrinsicElements;
  return (
    <Component className={cn(elementClasses[as], className)}>
      {children}
    </Component>
  );
}
