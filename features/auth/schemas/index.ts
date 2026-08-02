import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be 80 characters or fewer."),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters.")
    .max(24, "Username must be 24 characters or fewer.")
    .regex(
      /^[a-z0-9](?:[a-z0-9_-]*[a-z0-9])?$/,
      "Use letters, numbers, hyphens, and underscores."
    ),
  email: z.string().trim().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[a-zA-Z]/, "Must include at least one letter.")
    .regex(/[0-9]/, "Must include at least one number."),
  terms: z.boolean().refine((value) => value === true, "You must accept the Terms of Service."),
});
export type RegisterInput = z.infer<typeof registerSchema>;