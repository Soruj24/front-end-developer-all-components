import { pricingCalculatorSaas } from "./pricing-calculator-saas";
import { pricingCalculatorStorage } from "./pricing-calculator-storage";
import { pricingCalculatorHeadless } from "./pricing-calculator-headless";

import type { RegistryEntry } from "../../types";

/** Pricing Calculator examples. Each is one preview block on the Pricing Calculator page. */
export const pricingCalculators: RegistryEntry[] = [
  pricingCalculatorSaas,
  pricingCalculatorStorage,
  pricingCalculatorHeadless,
];
