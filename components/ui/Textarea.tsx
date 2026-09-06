import { TextareaHTMLAttributes, forwardRef, useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, showCount, maxLength, ...props }, ref) => {
    const uid = useId();
    const textareaId = props.id ?? uid;
    const [charCount, setCharCount] = useState(
      typeof props.defaultValue === "string" ? props.defaultValue.length : 0
    );

    const displayCount = props.value !== undefined ? String(props.value).length : charCount;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          maxLength={maxLength}
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "transition-colors duration-200",
            "hover:border-muted-foreground/30",
            "focus:outline-none focus:border-ring/60 focus:ring-2 focus:ring-ring/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-destructive focus:border-destructive focus:ring-destructive/20"
              : "",
            className,
          )}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? (
            <p id={`${textareaId}-error`} role="alert" className="text-xs text-destructive">{error}</p>
          ) : (
            <div />
          )}
          {showCount && (
            <p className="ml-auto text-xs text-muted-foreground">
              {displayCount}{maxLength ? ` / ${maxLength}` : ""}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
export { Textarea };
