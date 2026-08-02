const LABELS = ["Weak", "Weak", "Fair", "Good", "Strong"] as const;

function scorePassword(password: string): number {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 4);
}

const BAR_COLORS = {
  danger: "bg-danger",
  warning: "bg-warning",
  primary: "bg-primary",
  success: "bg-success",
} as const;

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;

  const score = scorePassword(password);
  const label = LABELS[score];
  const barColor =
    score <= 1
      ? BAR_COLORS.danger
      : score === 2
        ? BAR_COLORS.warning
        : score === 3
          ? BAR_COLORS.primary
          : BAR_COLORS.success;

  return (
    <div>
      <div
        role="meter"
        aria-label="Password strength"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={score}
        aria-valuetext={label}
        className="flex gap-1.5"
      >
        {[0, 1, 2, 3].map((segment) => (
          <span
            key={segment}
            className={`h-1 flex-1 rounded-full transition-colors ${segment < score ? barColor : "bg-border"}`}
          />
        ))}
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Password strength: <span className="font-medium text-foreground">{label}</span>
      </p>
    </div>
  );
}
