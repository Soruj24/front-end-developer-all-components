"use client";

import { useState } from "react";
import { Rating } from "@/components/ui/Rating";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const RATING_SOURCE = `"use client";

import { forwardRef } from "react";

type RatingSize = "sm" | "md" | "lg";

const sizeClasses: Record<RatingSize, string> = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

export interface RatingProps {
  value: number;
  max?: number;
  size?: RatingSize;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ value, max = 5, size = "md", onChange, disabled }, ref) => {
    return (
      <div
        ref={ref}
        className={\`inline-flex items-center gap-0.5 \${sizeClasses[size]} \${disabled ? "opacity-60" : ""}\`}
        role={onChange ? "radiogroup" : "img"}
        aria-label={\`Rating: \${value} out of \${max}\`}
      >
        {Array.from({ length: max }, (_, i) => {
          const filled = i < Math.floor(value);
          const half = !filled && i < value;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled || !onChange}
              onClick={() => onChange?.(i + 1)}
              className={\`transition-colors \${onChange && !disabled ? "cursor-pointer hover:scale-110" : "cursor-default"} \${filled ? "text-warning" : half ? "text-warning" : "text-subtle"}\`}
              aria-label={\`\${i + 1} star\${i + 1 > 1 ? "s" : ""}\`}
              role={onChange ? "radio" : undefined}
              aria-checked={onChange ? i < value : undefined}
            >
              {filled ? "★" : half ? "★" : "☆"}
            </button>
          );
        })}
      </div>
    );
  }
);
Rating.displayName = "Rating";

export default Rating;
export { Rating };`;

const BASIC_CODE = `import { Rating } from "@/components/ui/Rating";

<Rating value={3} />`;

const INTERACTIVE_CODE = `import { useState } from "react";
import { Rating } from "@/components/ui/Rating";

function InteractiveRating() {
  const [value, setValue] = useState(0);
  return <Rating value={value} onChange={setValue} />;
}`;

const DISABLED_CODE = `import { Rating } from "@/components/ui/Rating";

<Rating value={4} disabled />`;

const SIZE_CODE = `import { Rating } from "@/components/ui/Rating";

<Rating value={3} size="sm" />
<Rating value={3} size="md" />
<Rating value={3} size="lg" />`;

export default function RatingStarsPage() {
  const [value, setValue] = useState(3);

  return (
    <ComponentDocPage
      name="Rating"
      category="Forms"
      description="Star rating with hover preview, read-only mode, and accessible keyboard interaction."
    >
      <PreviewPanel filename="rating-demo.tsx">
        <div className="flex flex-col items-center gap-4 py-4">
          <Rating value={3} onChange={setValue} />
          <span className="text-sm text-muted-foreground">Value: {value}</span>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={RATING_SOURCE}
        filename="Rating.tsx"
        defaultExpanded
      />

      <ExampleBlock title="Basic" code={BASIC_CODE}>
        <div className="flex justify-center py-2">
          <Rating value={3} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Interactive" code={INTERACTIVE_CODE}>
        <div className="flex flex-col items-center gap-2 py-2">
          <Rating value={value} onChange={setValue} />
          <span className="text-sm text-muted-foreground">{value}/5</span>
        </div>
      </ExampleBlock>

      <ExampleBlock title="Disabled" code={DISABLED_CODE}>
        <div className="flex justify-center py-2">
          <Rating value={4} disabled />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes" code={SIZE_CODE}>
        <div className="flex flex-col items-center gap-3 py-2">
          <Rating value={3} size="sm" />
          <Rating value={3} size="md" />
          <Rating value={3} size="lg" />
        </div>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
