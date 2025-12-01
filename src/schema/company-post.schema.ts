import { z } from "zod";

export const companyPostSchema = z.object({
  title: z.string().min(1, "Post title is required").max(100, "Title must be 100 characters or less"),
  content: z.string().min(1, "Post content is required").max(3000, "Content must be 2000 characters or less"),
  cover_image: z.string().optional().nullable(),
});

export type CompanyPostFormData = z.infer<typeof companyPostSchema>;
