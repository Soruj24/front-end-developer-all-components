import { HTMLAttributes, forwardRef } from "react";

type Padding = "none" | "sm" | "md" | "lg";

const paddingClasses: Record<Padding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: Padding;
  /** Enables hover lift, border tint and press feedback for clickable cards. */
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", padding = "md", interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-xl border border-border bg-surface ${paddingClasses[padding]} ${
          interactive
            ? "cursor-pointer transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-lg active:scale-[0.99]"
            : ""
        } ${className}`}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col gap-1 ${className}`} {...props} />
    );
  }
);
CardHeader.displayName = "CardHeader";

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props} />
    );
  }
);
CardContent.displayName = "CardContent";

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`flex items-center gap-2 ${className}`} {...props} />
    );
  }
);
CardFooter.displayName = "CardFooter";

export default Card;
export { Card, CardHeader, CardContent, CardFooter };
