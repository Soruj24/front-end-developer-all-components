import { SelectHTMLAttributes, forwardRef, useId } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, placeholder, options, ...props }, ref) => {
    const uid = useId();
    const selectId = props.id ?? uid;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-colors focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-danger focus:border-danger focus:ring-danger"
              : "border-input focus:border-ring focus:ring-ring"
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

export default Select;
export { Select };
