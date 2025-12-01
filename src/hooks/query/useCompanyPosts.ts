import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CompanyPost } from "@/types/company_post.types";
import { CompanyPostFormData } from "@/schema/company-post.schema";
import { toast } from "sonner";

// Fetch company's own posts
export function useCompanyOwnPosts(company_id: string | null) {
  return useQuery({
    queryKey: ["company-own-posts", company_id],
    queryFn: async () => {
      if (!company_id) throw new Error("Company ID required");
      const { data } = await api.get<{ posts: CompanyPost[] }>(
        `/company/post/my-posts?company_id=${company_id}`
      );
      return data.posts;
    },
    enabled: !!company_id,
  });
}

type UpdateCompanyPostPayload = CompanyPostFormData & {
  post_id: string;
  company_id: string;
  cover_image_file?: File | null;
  remove_image?: boolean;
};

// Update company post
export function useUpdateCompanyPost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateCompanyPostPayload) => {
      const { post_id, company_id, cover_image_file, remove_image, ...restPayload } = payload;

      if (cover_image_file) {
        const formData = new FormData();
        formData.append("title", restPayload.title);
        formData.append("content", restPayload.content);
        formData.append("company_id", company_id);
        formData.append("cover_image", cover_image_file);
        if (remove_image) {
          formData.append("remove_image", "true");
        }

        const { data } = await api.put<{ company_post: CompanyPost }>(
          `/company/post/${post_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return data.company_post;
      }

      const { data } = await api.put<{ company_post: CompanyPost }>(
        `/company/post/${post_id}`,
        { ...restPayload, company_id, remove_image }
      );
      return data.company_post;
    },
    onSuccess: (data, variables) => {
      toast.success("Post updated successfully!");
      qc.invalidateQueries({ queryKey: ["company-own-posts", variables.company_id] });
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to update post:", error);
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to update post. Please try again.";
      toast.error(errorMessage);
    },
  });
}

// Delete company post
export function useDeleteCompanyPost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      post_id,
      company_id,
    }: {
      post_id: string;
      company_id: string;
    }) => {
      const { data } = await api.delete<{ success: boolean }>(
        `/company/post/${post_id}?company_id=${company_id}`
      );
      return data;
    },
    onSuccess: (_, variables) => {
      toast.success("Post deleted successfully!");
      qc.invalidateQueries({ queryKey: ["company-own-posts", variables.company_id] });
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (error: unknown) => {
      console.error("Failed to delete post:", error);
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to delete post. Please try again.";
      toast.error(errorMessage);
    },
  });
}
