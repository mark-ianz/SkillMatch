import { z } from "zod";
import { onboardingStepOneSchema } from "./onboarding";

export const createUserInputSchema = onboardingStepOneSchema
  .extend({
    street_name: z
      .string({ error: "Street address must be a string" })
      .min(1, { error: "Street address is required" }),
    barangay: z
      .string({ error: "Barangay must be a string" })
      .min(1, { error: "Barangay is required" }),
    city_municipality: z
      .string({ error: "City/Municipality must be a string" })
      .min(1, { error: "City/Municipality is required" }),
    municipality: z
      .string({ error: "Municipality must be a string" })
      .min(1, { error: "Municipality is required" }),

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
