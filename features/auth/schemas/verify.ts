import { z } from "zod";

export const verifyEmailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;