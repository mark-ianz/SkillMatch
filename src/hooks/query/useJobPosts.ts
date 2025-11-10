import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { JobPostingFormData } from "@/schema/job-posting.schema";
import { toast } from "sonner";
import { JobPost } from "@/types/job_post.types";
import { JobFeedFilters } from "@/types/job_feed.types";

// Query: Get all job posts with optional filters
export function useJobPosts(filters?: JobFeedFilters) {
  return useQuery({
    queryKey: ["job-posts", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters) {
        filters.courses?.forEach((c) => params.append("course", c));
        filters.locations?.forEach((l) => params.append("location", l));
        filters.workArrangement?.forEach((w) => params.append("arrangement", w));
        filters.industries?.forEach((i) => params.append("industry", i));
        filters.jobCategories?.forEach((j) => params.append("jobCategory", j));
        if (filters.isPaid !== undefined) {
          params.append("paid", String(filters.isPaid));
        }
        if (filters.search) {
          params.append("search", filters.search);
        }
      }

      const queryString = params.toString();
      const url = queryString ? `/feed?${queryString}` : "/feed";
      
      const { data } = await api.get(url);
      return data.job_posts as JobPost[];
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