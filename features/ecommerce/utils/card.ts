export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb" | "unknown";

interface CardPattern {
  brand: CardBrand;
  pattern: RegExp;
  lengths: number[];
  cvvLength: number;
}

const CARD_PATTERNS: CardPattern[] = [
  { brand: "visa", pattern: /^4/, lengths: [16, 18, 19], cvvLength: 3 },
  { brand: "mastercard", pattern: /^(5[1-5]|2[2-7])/, lengths: [16], cvvLength: 3 },
  { brand: "amex", pattern: /^3[47]/, lengths: [15], cvvLength: 4 },
  { brand: "discover", pattern: /^(6011|65|644|645|646|647|648|649)/, lengths: [16, 19], cvvLength: 3 },
  { brand: "diners", pattern: /^(30[0-5]|36|38)/, lengths: [14, 16], cvvLength: 3 },
  { brand: "jcb", pattern: /^35/, lengths: [16, 19], cvvLength: 3 },
];

export function detectCardBrand(number: string): CardBrand {
  const cleaned = number.replace(/\s/g, "");
  for (const { brand, pattern } of CARD_PATTERNS) {
    if (pattern.test(cleaned)) return brand;
  }
  return "unknown";
}

export function getCardBrandLengths(brand: CardBrand): number[] {
  const entry = CARD_PATTERNS.find((p) => p.brand === brand);
  return entry?.lengths ?? [16];
}

export function getCvvLength(brand: CardBrand): number {
  const entry = CARD_PATTERNS.find((p) => p.brand === brand);
  return entry?.cvvLength ?? 3;
}

export function luhnCheck(number: string): boolean {
  const cleaned = number.replace(/\s/g, "");
  if (!/^\d+$/.test(cleaned)) return false;
  if (cleaned.length < 13) return false;

  let sum = 0;
  let alternate = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let n = parseInt(cleaned[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  return sum % 10 === 0;
}

export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/[^\d]/g, "");
  const brand = detectCardBrand(cleaned);

  if (brand === "amex") {
    const parts = [cleaned.slice(0, 4), cleaned.slice(4, 10), cleaned.slice(10, 15)];
    return parts.filter(Boolean).join(" ");
  }

  const parts: string[] = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.slice(i, i + 4));
  }
  return parts.join(" ");
}

export function formatExpiry(value: string): string {
  const cleaned = value.replace(/[^\d]/g, "");
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }
  return cleaned;
}

export function isExpiredDate(expiry: string): boolean {
  const [monthStr, yearStr] = expiry.split("/");
  if (!monthStr || !yearStr) return true;
  const month = parseInt(monthStr, 10);
  const year = parseInt("20" + yearStr, 10);
  const now = new Date();
  const expDate = new Date(year, month);
  return expDate < now;
}

export const BRAND_LABELS: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  diners: "Diners Club",
  jcb: "JCB",
  unknown: "Card",
};
