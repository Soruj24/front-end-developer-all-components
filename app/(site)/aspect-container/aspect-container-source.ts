export const ASPECTCONTAINER_SOURCE = `"use client";

interface AspectContainerProps {
  ratio?: string;
  rounded?: boolean;
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function AspectContainer({
  ratio = "16/9",
  rounded = false,
  bordered = false,
  className = "",
  children,
}: AspectContainerProps) {
  const [width, height] = ratio.split("/");
  return (
    <div
      className={
        "relative w-full overflow-hidden " +
        (rounded ? "rounded-lg " : "") +
        (bordered ? "border border-border " : "") +
        className
      }
      style={{ aspectRatio: width + " / " + height }}
    >
      {children}
    </div>
  );
}`;

export const RATIO4X3_EXAMPLE = `<AspectContainer ratio="4/3" rounded bordered>
  <img src="/media.jpg" alt="Media" className="h-full w-full object-cover" />
</AspectContainer>`;

export const RATIO1X1_EXAMPLE = `<AspectContainer ratio="1/1" rounded bordered>
  <img src="/avatar.jpg" alt="Avatar" className="h-full w-full object-cover" />
</AspectContainer>`;

export const RESPONSIVE_EXAMPLE = `<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
  <AspectContainer ratio="21/9" rounded bordered>
    <div className="h-full w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20" />
  </AspectContainer>
  <AspectContainer ratio="16/9" rounded bordered>
    <div className="h-full w-full bg-gradient-to-r from-violet-500/20 to-pink-500/20" />
  </AspectContainer>
  <AspectContainer ratio="4/3" rounded bordered>
    <div className="h-full w-full bg-gradient-to-r from-green-500/20 to-teal-500/20" />
  </AspectContainer>
  <AspectContainer ratio="1/1" rounded bordered>
    <div className="h-full w-full bg-gradient-to-r from-rose-500/20 to-red-500/20" />
  </AspectContainer>
  <AspectContainer ratio="3/4" rounded bordered>
    <div className="h-full w-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20" />
  </AspectContainer>
  <AspectContainer ratio="9/16" rounded bordered>
    <div className="h-full w-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
  </AspectContainer>
</div>`;

export const IMAGEGRID_EXAMPLE = `<div className="grid grid-cols-3 gap-3">
  <AspectContainer ratio="1/1" rounded bordered>
    <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
  </AspectContainer>
  <AspectContainer ratio="1/1" rounded bordered>
    <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
  </AspectContainer>
  <AspectContainer ratio="1/1" rounded bordered>
    <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
  </AspectContainer>
</div>`;