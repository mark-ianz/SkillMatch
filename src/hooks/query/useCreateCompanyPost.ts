import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CompanyPostFormData } from "@/schema/company-post.schema";
import { toast } from "sonner";
import { CompanyPost } from "@/types/company_post.types";

type CreateCompanyPostPayload = CompanyPostFormData & {
  company_id: string | null;
  cover_image_file?: File | null;
};

export function useCreateCompanyPost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCompanyPostPayload) => {
      try {
        const { cover_image_file, ...restPayload } = payload;

        // If there's a file, send as FormData
        if (cover_image_file) {
          const formData = new FormData();
          formData.append("title", restPayload.title);
          formData.append("content", restPayload.content);
          if (restPayload.company_id) {
            formData.append("company_id", restPayload.company_id.toString());
          }
          formData.append("cover_image", cover_image_file);

          const { data } = await api.post<{ company_post: CompanyPost }>("/company/post/create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return data.company_post;
        }

        // Otherwise send as JSON
        const { data } = await api.post<{ company_post: CompanyPost }>("/company/post/create", restPayload);
        return data.company_post;
      } catch (error: unknown) {
        // Extract error message and throw a more user-friendly error
        const err = error as { response?: { data?: { error?: string } }; message?: string };
        const errorMessage = 
          err?.response?.data?.error || 
          err?.message || 
          "Failed to publish post. Please try again.";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      console.log(data);
      // Show success toast with "View Post" link
      // Had to render it on the client side due to be able to add HTML element inside the toast

      // Invalidate feed and company posts queries so new post appears
      qc.invalidateQueries({ queryKey: ["feed"] });
      qc.invalidateQueries({ queryKey: ["company-posts"] });
    },
    onError: (error: unknown) => {
      // Error is already formatted from mutationFn, just display it
      const errorMessage = error instanceof Error ? error.message : "Failed to publish post. Please try again.";
      toast.error(errorMessage);
    },
  });
}

export default useCreateCompanyPost;
