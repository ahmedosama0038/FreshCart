import { z } from "zod";

export const CheckoutSchema = z.object({
  details: z
    .string()
    .nonempty(' detail is required')
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long"),

  city: z
    .string()
    .nonempty('city is required')
    .trim()
    .min(3, "City name must be at least 3 characters")
    .max(50, "City name is too long"),

  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^01[0-9]{9}$/,
      "Please enter a valid Egyptian phone number (01xxxxxxxxx)"
    ),
});

export type  CheckoutSchemaValues= z.infer<typeof CheckoutSchema >