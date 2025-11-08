import { z } from "zod";

export const companyPostSchema = z.object({
  title: z.string().min(1, "Post title is required"),
  content: z.string().min(1, "Post content is required"),
  cover_image: z.string().optional().nullable(),
});

export type CompanyPostFormData = z.infer<typeof companyPostSchema>;
