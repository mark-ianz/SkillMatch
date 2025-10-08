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

export type OnboardingStepOneSchema = z.infer<typeof onboardingStepOneSchema>;
