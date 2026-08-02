import { TextareaHTMLAttributes, forwardRef, useId, useState } from "react";

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
          className={`flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-danger focus:border-danger focus:ring-danger"
              : "border-input focus:border-ring focus:ring-ring"
          } ${className}`}
          onChange={handleChange}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? (
            <p className="text-sm text-danger">{error}</p>
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
