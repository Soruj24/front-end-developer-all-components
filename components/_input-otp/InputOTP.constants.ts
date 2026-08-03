export const INPUT_OTP_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const INPUT_OTP_STYLES: Record<string, string> = {
  base: "flex items-center gap-1",
  input: "border rounded-md bg-background text-center font-mono transition-colors focus:outline-none",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
};
