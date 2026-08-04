import { cn } from "@/lib/cn";

type AnimationType =
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "fade-in-left"
  | "fade-in-right"
  | "scale-in"
  | "slide-in-up"
  | "slide-in-down"
  | "slide-in-left"
  | "slide-in-right"
  | "spin"
  | "pulse"
  | "bounce";

interface AnimationProps {
  animation?: AnimationType;
  duration?: "fast" | "normal" | "slow";
  delay?: "none" | "short" | "medium" | "long";
  className?: string;
  children: React.ReactNode;
}

const animationClasses: Record<AnimationType, string> = {
  "fade-in": "animate-[fade-in_0.3s_ease-out]",
  "fade-in-up": "animate-[fade-in-up_0.4s_cubic-bezier(0.16,1,0.3,1)]",
  "fade-in-down": "animate-[fade-in-down_0.4s_cubic-bezier(0.16,1,0.3,1)]",
  "fade-in-left": "animate-[fade-in-left_0.4s_cubic-bezier(0.16,1,0.3,1)]",
  "fade-in-right": "animate-[fade-in-right_0.4s_cubic-bezier(0.16,1,0.3,1)]",
  "scale-in": "animate-[scale-in_0.2s_ease-out]",
  "slide-in-up": "animate-[slide-in-up_0.3s_ease-out]",
  "slide-in-down": "animate-[slide-in-down_0.3s_ease-out]",
  "slide-in-left": "animate-[slide-in-left_0.3s_ease-out]",
  "slide-in-right": "animate-[slide-in-right_0.3s_ease-out]",
  spin: "animate-spin",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
};

const durationClasses: Record<string, string> = {
  fast: "duration-150",
  normal: "duration-200",
  slow: "duration-400",
};

const delayClasses: Record<string, string> = {
  none: "delay-0",
  short: "delay-75",
  medium: "delay-150",
  long: "delay-300",
};

export function Animation({
  animation = "fade-in",
  duration = "normal",
  delay = "none",
  className,
  children,
}: AnimationProps) {
  return (
    <div
      className={cn(
        animationClasses[animation],
        durationClasses[duration],
        delayClasses[delay],
        className
      )}
    >
      {children}
    </div>
  );
}

export function FadeIn({
  children,
  className,
  delay = "none",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: "none" | "short" | "medium" | "long";
}) {
  return (
    <Animation animation="fade-in" delay={delay} className={className}>
      {children}
    </Animation>
  );
}

export function FadeInUp({
  children,
  className,
  delay = "none",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: "none" | "short" | "medium" | "long";
}) {
  return (
    <Animation animation="fade-in-up" delay={delay} className={className}>
      {children}
    </Animation>
  );
}

export function FadeInDown({
  children,
  className,
  delay = "none",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: "none" | "short" | "medium" | "long";
}) {
  return (
    <Animation animation="fade-in-down" delay={delay} className={className}>
      {children}
    </Animation>
  );
}

export function ScaleIn({
  children,
  className,
  delay = "none",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: "none" | "short" | "medium" | "long";
}) {
  return (
    <Animation animation="scale-in" delay={delay} className={className}>
      {children}
    </Animation>
  );
}

export function SlideInUp({
  children,
  className,
  delay = "none",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: "none" | "short" | "medium" | "long";
}) {
  return (
    <Animation animation="slide-in-up" delay={delay} className={className}>
      {children}
    </Animation>
  );
}

export function SlideInDown({
  children,
  className,
  delay = "none",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: "none" | "short" | "medium" | "long";
}) {
  return (
    <Animation animation="slide-in-down" delay={delay} className={className}>
      {children}
    </Animation>
  );
}
