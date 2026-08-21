export interface PasswordGeneratorProps {
  /** Default password length. */
  length?: number;
  /** Include uppercase letters. */
  includeUppercase?: boolean;
  /** Include numbers. */
  includeNumbers?: boolean;
  /** Include symbols. */
  includeSymbols?: boolean;
  /** Show the options panel. */
  showOptions?: boolean;
  /** Show the strength indicator. */
  showStrength?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Called when a new password is generated. */
  onGenerate?: (password: string) => void;
}
