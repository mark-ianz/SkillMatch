import z from "zod";

const MAX_NAME_CHAR = Number(process.env.NEXT_PUBLIC_MAX_NAME_CHAR);
const MIN_NAME_CHAR = Number(process.env.NEXT_PUBLIC_MIN_NAME_CHAR);
const MAX_PHONE_NUMBER_CHAR = Number(
  process.env.NEXT_PUBLIC_MAX_PHONE_NUMBER_CHAR
);

export const onboardingStepOneSchema = z.object({
  first_name: z
    .string()
    .trim()
    .max(MAX_NAME_CHAR, {
      error: `First name must be less than ${MAX_NAME_CHAR} characters`,
    })
    .min(MIN_NAME_CHAR, { error: "First name is required" })
    .refine(
      (first_name) => {
        if (first_name === "") return true;
        return /^[a-zA-Z\s]+$/.test(first_name);
      },
      {
        error: "First name must only contain letters",
      }
    ),
  middle_name: z
    .string()
    .trim()
    .nullable()
    .refine((val: string | null) => !val || /^[a-zA-Z\s]+$/.test(val), {
      error: "Middle name must only contain letters",
    })
    .refine((val: string | null) => !val || val.length <= MAX_NAME_CHAR, {
      error: `Middle name must be less than ${MAX_NAME_CHAR} characters`,
    }),
  last_name: z
    .string()
    .trim()
    .max(MAX_NAME_CHAR, {
      error: `Last name must be less than ${MAX_NAME_CHAR} characters`,
    })
    .min(MIN_NAME_CHAR, { error: "Last name is required" })
    .refine(
      (last_name) => {
        if (last_name === "") return true;
        return /^[a-zA-Z\s]+$/.test(last_name);
      },
      {
        error: "Last name must only contain letters",
      }
    ),
  email: z.email({ message: "Invalid email." }).trim(),
  phone_number: z
    .string()
    .trim()
    .length(MAX_PHONE_NUMBER_CHAR, {
      error: `Contact number must be ${MAX_PHONE_NUMBER_CHAR} digits`,
    })
    .refine((p) => !p || /^\d+$/.test(p), {
      error: "Contact number must only contain digits",
    }),
  gender: z.enum(["male", "female", "prefer not to say"], {
    error: "Gender is required",
  }),
  birthdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    error: "Invalid birthdate",
  }),
});

export const onboardingStepTwoSchema = z.object({
  house_number: z
    .string()
    .trim()
    .min(1, { message: "House number is required" })
    .max(10, { message: "House number must be less than 10 characters" })
    .optional(),
  street_name: z
    .string()
    .trim()
    .min(1, { message: "Street name is required" })
    .max(100, { message: "Street name must be less than 100 characters" })
    .optional(),
  subdivision: z
    .string()
    .nullable()
    .refine((val) => !val || val.length <= 100, {
      message: "Subdivision must be less than 100 characters",
    }),
  postal_code: z
    .string()
    .trim()
    .length(4, { message: "Postal code must be 4 digits" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Postal code must only contain digits",
    }),
  city_municipality: z
    .string()
    .trim()
    .min(1, { message: "City/Municipality is required" }),
  barangay: z.string().trim().min(1, { message: "Barangay is required" }),
});

export const onboardingStepThreeSchema = z.object({
  college: z.string().trim().min(1, { message: "College is required" }),
  course: z.string().trim().min(1, { message: "Course is required" }),
  year_level: z.string().trim().min(1, { message: "Year level is required" }),
  expected_graduation_year: z
    .string()
    .trim()
    .min(1, { message: "Expected graduation year is required" }),
});

export type OnboardingStepOneSchema = z.infer<typeof onboardingStepOneSchema>;
export type OnboardingStepTwoSchema = z.infer<typeof onboardingStepTwoSchema>;
export type OnboardingStepThreeSchema = z.infer<
  typeof onboardingStepThreeSchema
>;
