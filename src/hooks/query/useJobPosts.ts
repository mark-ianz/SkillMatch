import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { JobPostingFormData } from "@/schema/job-posting.schema";
import { toast } from "sonner";

// Query: Get all job posts
export function useJobPosts() {
  return useQuery({
    queryKey: ["job-posts"],
    queryFn: async () => {
      const { data } = await api.get("/company/job-post/all");
      return data.job_posts;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Mutation: Create a new job post
export function useCreateJobPost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: JobPostingFormData & { company_id: number | null }
    ) => {
      const { data } = await api.post("/company/job-post/create", payload);
      return data.job_post;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Job posted successfully");
      // Invalidate job-posts so new job post appears
      qc.invalidateQueries({ queryKey: ["job-posts"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to post job");
    },
  });
}