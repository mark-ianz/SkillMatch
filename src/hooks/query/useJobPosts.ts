import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { JobPostingFormData } from "@/schema/job-posting.schema";
import { toast } from "sonner";
import { JobPost } from "@/types/job_post.types";
import { JobExploreFilters } from "@/types/job_explore.types";

// Query: Get all job posts with optional filters
export function useJobPosts(
  filters?: JobExploreFilters, 
  userId?: number, 
  roleName?: string | null,
  isSessionLoading?: boolean
) {
  return useQuery({
    queryKey: ["job-postings", filters, userId, roleName],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters) {
        filters.courses?.forEach((c: string) => params.append("course", c));
        filters.locations?.forEach((l: string) => params.append("location", l));
        filters.workArrangement?.forEach((w: string) => params.append("arrangement", w));
        filters.industries?.forEach((i: string) => params.append("industry", i));
        filters.jobCategories?.forEach((j: string) => params.append("jobCategory", j));
        if (filters.search) {
          params.append("search", filters.search);
        }
      }

      // Add userId and roleName for skill matching
      if (userId) {
        params.append("userId", String(userId));
      }
      if (roleName) {
        params.append("roleName", roleName);
      }

      const queryString = params.toString();
      const url = queryString ? `/explore?${queryString}` : "/explore";
      
      const { data } = await api.get(url);
      return data.job_posts as JobPost[];
    },
    enabled: !isSessionLoading, // Wait for session to load before fetching
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Mutation: Create a new job post
export function useCreateJobPost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: JobPostingFormData & { company_id: string | null }
    ) => {
      const { data } = await api.post("/company/job-postings/create", payload);
      return data.job_post;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Job posted successfully", {
        action: {
          label: "View Job Post",
          onClick: () => {
            window.location.href = `/view/job-postings/${data.job_post_id}`;
          },
        },
        actionButtonStyle: {
          fontSize: "0.875rem",
          color: "#4f6899",
          textDecoration: "underline",
          backgroundColor: "transparent",
          border: "none",
          padding: "0",
        },
      });
      // Invalidate job-postings so new job post appears
      qc.invalidateQueries({ queryKey: ["job-postings"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to post job");
    },
  });
}

// Query: Get job post suggestions based on categories and courses
export function useJobPostSuggestions(
  job_post_id: string,
  userId?: number,
  roleName?: string | null,
  isSessionLoading?: boolean
) {
  return useQuery({
    queryKey: ["job-post-suggestions", job_post_id, userId, roleName],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Add userId and roleName for skill matching
      if (userId) {
        params.append("userId", String(userId));
      }
      if (roleName) {
        params.append("roleName", roleName);
      }

      const queryString = params.toString();
      const url = queryString
        ? `/job-postings/${job_post_id}/suggestions?${queryString}`
        : `/job-postings/${job_post_id}/suggestions`;

      const { data } = await api.get<{ suggestions: JobPost[] }>(url);
      return data.suggestions;
    },
    enabled: !!job_post_id && !isSessionLoading,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Query: Get a single job post by ID
export function useJobPost(
  job_post_id: string,
  userId?: number,
  roleName?: string | null,
  isSessionLoading?: boolean
) {
  return useQuery({
    queryKey: ["job-post", job_post_id, userId, roleName],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Add userId and roleName for skill matching
      if (userId) {
        params.append("userId", String(userId));
      }
      if (roleName) {
        params.append("roleName", roleName);
      }

      const queryString = params.toString();
      const url = queryString
        ? `/job-postings/${job_post_id}?${queryString}`
        : `/job-postings/${job_post_id}`;

      const { data } = await api.get<{ job_post: JobPost }>(url);
      return data.job_post;
    },
    enabled: !!job_post_id && !isSessionLoading,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Mutation: Update job post status (close, disable, reactivate)
export function useUpdateJobPostStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      job_post_id,
      status_id,
    }: {
      job_post_id: string;
      status_id: 1 | 4 | 5 | 6; // 1 = active, 4 = disabled, 5 = filled, 6 = closed
    }) => {
      const { data } = await api.patch(
        `/company/job-postings/${job_post_id}/status`,
        { status_id }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      const statusLabel =
        variables.status_id === 6
          ? "closed"
          : variables.status_id === 5
          ? "marked as filled"
          : variables.status_id === 4
          ? "disabled"
          : "activated";
      toast.success(`Job post ${statusLabel} successfully`);
      // Invalidate relevant queries
      qc.invalidateQueries({ queryKey: ["job-post", variables.job_post_id] });
      qc.invalidateQueries({ queryKey: ["job-postings"] });
      qc.invalidateQueries({ queryKey: ["company-job-posts-with-stats"] });
    },
    onError: (error) => {
      console.error("Error updating job post status:", error);
      toast.error("Failed to update job post status");
    },
  });
}

// Mutation: Update job post details
export function useUpdateJobPost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      job_post_id,
      data,
    }: {
      job_post_id: string;
      data: JobPostingFormData;
    }) => {
      const response = await api.put(
        `/company/job-postings/${job_post_id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success("Job post updated successfully", {
        action: {
          label: "View Job Post",
          onClick: () => {
            window.location.href = `/company/job-postings/${variables.job_post_id}`;
          },
        },
        actionButtonStyle: {
          fontSize: "0.875rem",
          color: "#4f6899",
          textDecoration: "underline",
          backgroundColor: "transparent",
          border: "none",
          padding: "0",
        },
      });
      // Invalidate relevant queries
      qc.invalidateQueries({ queryKey: ["job-post", variables.job_post_id] });
      qc.invalidateQueries({ queryKey: ["job-postings"] });
      qc.invalidateQueries({ queryKey: ["company-job-posts-with-stats"] });
    },
    onError: (error) => {
      console.error("Error updating job post:", error);
      toast.error("Failed to update job post");
    },
  });
}
