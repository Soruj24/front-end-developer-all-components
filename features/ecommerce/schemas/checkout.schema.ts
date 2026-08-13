import { z } from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().optional(),
  address1: z.string().min(1, "Address is required").max(200),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required").regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  country: z.string().min(1, "Country is required"),
  saveAddress: z.boolean().optional(),
});

export const cardSchema = z.object({
  method: z.literal("card"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^[\d\s]{13,19}$/, "Invalid card number"),
  cardName: z.string().min(1, "Cardholder name is required").max(100),
  expiry: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvv: z
    .string()
    .min(3, "CVV must be 3-4 digits")
    .max(4)
    .regex(/^\d{3,4}$/, "Invalid CVV"),
  saveCard: z.boolean().optional(),
});

export const paymentSchema = z.discriminatedUnion("method", [
  cardSchema,
  z.object({ method: z.literal("paypal") }),
  z.object({ method: z.literal("apple-pay") }),
  z.object({ method: z.literal("google-pay") }),
]);

export type AddressFormData = z.infer<typeof addressSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
