import { z } from "zod";

const createUserInputSchema = z
  .object({
    first_name: z
      .string({ error: "First name must be a string" })
      .min(1, { error: "First name is required" }),
    middle_name: z.string({ error: "Middle name must be a string" }).optional(),
    last_name: z
      .string({ error: "Last name must be a string" })
      .min(1, { error: "Last name is required" }),
    gender: z.enum(["male", "female", "prefer not to say"], {
      error: "Gender is required",
    }),
    birthdate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        error: "Invalid birthdate",
      }),
    street_address: z
      .string({ error: "Street address must be a string" })
      .min(1, { error: "Street address is required" }),
    barangay: z
      .string({ error: "Barangay must be a string" })
      .min(1, { error: "Barangay is required" }),
    city: z
      .string({ error: "City must be a string" })
      .min(1, { error: "City is required" }),
    municipality: z
      .string({ error: "Municipality must be a string" })
      .min(1, { error: "Municipality is required" }),
    phone_number: z
      .string({ error: "Phone number must be a string" })
      .min(1, { error: "Phone number is required" }),
    email: z.email(),
    password: z
      .string({ error: "Password must be a string" })
      .min(8, { error: "Password must be at least 8 characters long" }),
    confirm_password: z
      .string({ error: "Confirm Password must be a string" })
      .min(8, { error: "Confirm Password must be at least 8 characters long" }),
    auth_provider: z.enum(["local", "google", "facebook"]).default("local"),
    oauth_id: z.string().optional(),
    role_id: z.number().default(3), // Default role_id to 3 (OJT Student)
    status_id: z.number().default(1), // Default status_id to 1 (active)
  })
  .refine((data) => data.password === data.confirm_password, {
    error: "Passwords do not match",
  });

export type CreateUserInput = z.infer<typeof createUserInputSchema>;
export { createUserInputSchema };
