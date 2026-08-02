import { z } from "zod";
import { createOpenAiCompatibleAdapter } from "./openaiCompatible";
import type { ProviderAdapter } from "./adapter";

export const customProviderSchema = z.object({
  id: z.string().min(1).max(64).regex(/^[a-z0-9][a-z0-9_-]*$/),
  label: z.string().min(1).max(64),
  baseURL: z.string().url(),
  apiKey: z.string().optional(),
  modelIds: z.array(z.string().min(1).max(128)).min(1).max(50),
});

export type CustomProviderInput = z.infer<typeof customProviderSchema>;

/**
 * Builds an adapter for a user-added (BYOK) provider. The API key is held in
 * the provider record and passed at request time; nothing is written to env.
 */
export function createCustomProviderAdapter(input: CustomProviderInput): ProviderAdapter {
  return createOpenAiCompatibleAdapter({
    id: input.id,
    label: input.label,
    kind: "custom",
    description: `Custom provider configured by the user (${input.baseURL}).`,
    baseURL: input.baseURL,
    requiresKey: false,
    modelIds: input.modelIds,
  });
}

/** Custom provider record stored in settings (key kept for BYOK at call time). */
export interface CustomProviderRecord extends CustomProviderInput {
  enabled: boolean;
  default: boolean;
  createdAt: number;
}
