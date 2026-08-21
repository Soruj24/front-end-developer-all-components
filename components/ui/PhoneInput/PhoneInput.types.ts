import type { ReactNode } from "react";

export interface Country {
  /** ISO 3166-1 alpha-2 code. */
  code: string;
  /** Country name. */
  name: string;
  /** Dial code prefix. */
  dial: string;
  /** Flag emoji. */
  flag: string;
}

export type PhoneInputSize = "sm" | "md" | "lg";

export type PhoneInputValidation = "none" | "valid" | "invalid";

export interface PhoneInputProps {
  /** Phone number value. */
  value?: string;
  /** Called when the phone number changes. */
  onChange?: (value: string) => void;
  /** Default country code. */
  defaultCountry?: string;
  /** Available countries. Falls back to built-in list. */
  countries?: Country[];
  /** Placeholder text. */
  placeholder?: string;
  /** Disable the input. */
  disabled?: boolean;
  /** Visual size. */
  size?: PhoneInputSize;
  /** Show country selector dropdown. */
  showCountrySelect?: boolean;
  /** Validation state. */
  validation?: PhoneInputValidation;
  /** Called when the selected country changes. */
  onCountryChange?: (country: Country) => void;
  /** Additional CSS classes for the root element. */
  className?: string;
  /** Accessible label. */
  label?: string;
  /** Optional helper text below the input. */
  helperText?: string;
  /** Icon displayed at the end of the input. */
  endIcon?: ReactNode;
}

export const DEFAULT_COUNTRIES: Country[] = [
  { code: "US", name: "United States", dial: "+1", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "CA", name: "Canada", dial: "+1", flag: "\u{1F1E8}\u{1F1E6}" },
  { code: "AU", name: "Australia", dial: "+61", flag: "\u{1F1E6}\u{1F1FA}" },
  { code: "DE", name: "Germany", dial: "+49", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "FR", name: "France", dial: "+33", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "JP", name: "Japan", dial: "+81", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "IN", name: "India", dial: "+91", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "KR", name: "South Korea", dial: "+82", flag: "\u{1F1F0}\u{1F1F7}" },
  { code: "CN", name: "China", dial: "+86", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "\u{1F1F2}\u{1F1FD}" },
  { code: "IT", name: "Italy", dial: "+39", flag: "\u{1F1EE}\u{1F1F9}" },
  { code: "ES", name: "Spain", dial: "+34", flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "\u{1F1F3}\u{1F1F1}" },
];
