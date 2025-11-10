import { z } from "zod";

export const jobPostingSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  courses_required: z
    .array(z.string())
    .min(1, "At least one course is required"),
  job_categories: z.array(z.string()),
  available_positions: z.number().min(1, "Must have at least 1 position"),
  job_overview: z.string().min(1, "Job overview is required"),
  job_responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"),
  preferred_qualifications: z.string().optional(),
  work_arrangement: z.enum(["Remote", "On-site", "Hybrid"] as const),
  is_paid: z.boolean(),
  allowance_description: z.string().nullable().optional(),
  soft_skills: z.array(z.string()),
  technical_skills: z.array(z.string()),
  street_name: z.string().min(1, "Street address is required"),
  barangay: z.string().min(1, "Barangay is required"),
  city_municipality: z.string().min(1, "City/Municipality is required"),
  postal_code: z.string().min(1, "Postal code is required"),
});

export type JobPostingFormData = z.infer<typeof jobPostingSchema>;
