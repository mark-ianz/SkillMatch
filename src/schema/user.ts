import { z } from "zod";

const createUserInputSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, "Last name is required"),
    gender: z.enum(["male", "female", "prefer not to say"]),
    birthdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid birthdate",
    }),
    street_address: z.string().min(1),
    barangay: z.string().min(1),
    city: z.string().min(1),
    municipality: z.string().min(1),
    phone_number: z.string().min(1),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirm_password: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
    auth_provider: z.enum(["local", "google", "facebook"]).default("local"),
    oauth_id: z.string().optional(),
    role_id: z.number().default(3), // Default role_id to 3 (OJT Student)
    status_id: z.number().default(1), // Default status_id to 1 (active)
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
  });

export type CreateUserInput = z.infer<typeof createUserInputSchema>;
export { createUserInputSchema };
