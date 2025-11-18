import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { JobPost } from "@/types/job_post.types";
import { CompanyProfile } from "@/types/company.types";
import { CompanyPost } from "@/types/company_post.types";
import { toast } from "sonner";

interface SavedJob extends JobPost {
  saved_at: string;
}

interface SavedCompany extends CompanyProfile {
  saved_at: string;
  open_positions: number;
}

interface SavedPost extends CompanyPost {
  saved_at: string;
}

// ===== JOBS =====

export function useSavedJobs() {
  return useQuery<SavedJob[]>({
    queryKey: ["saved-jobs"],
    queryFn: async () => {
      const { data } = await axios.get("/api/saved/jobs");
      return data.savedJobs;
    },
  });
}

export function useIsJobSaved(job_post_id: string) {
  const { data: savedJobs } = useSavedJobs();
  return savedJobs?.some((job) => job.job_post_id === job_post_id) || false;
}

export function useSaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (job_post_id: string) => {
      const { data } = await axios.post("/api/saved/jobs", { job_post_id });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
      toast.success("Job saved successfully");
    },
    onError: () => {
      toast.error("Failed to save job");
    },
  });
}

export function useUnsaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (job_post_id: string) => {
      const { data } = await axios.delete(`/api/saved/jobs?job_post_id=${job_post_id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
      toast.success("Job removed from saved items");
    },
    onError: () => {
      toast.error("Failed to remove job");
    },
  });
}

// ===== COMPANIES =====

export function useSavedCompanies() {
  return useQuery<SavedCompany[]>({
    queryKey: ["saved-companies"],
    queryFn: async () => {
      const { data } = await axios.get("/api/saved/companies");
      return data.savedCompanies;
    },
  });
}

export function useIsCompanySaved(company_id: string) {
  const { data: savedCompanies } = useSavedCompanies();
  return savedCompanies?.some((company) => company.company_id === company_id) || false;
}

export function useSaveCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (company_id: string) => {
      const { data } = await axios.post("/api/saved/companies", { company_id });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-companies"] });
      toast.success("Company saved successfully");
    },
    onError: () => {
      toast.error("Failed to save company");
    },
  });
}

export function useUnsaveCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (company_id: string) => {
      const { data } = await axios.delete(`/api/saved/companies?company_id=${company_id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-companies"] });
      toast.success("Company removed from saved items");
    },
    onError: () => {
      toast.error("Failed to remove company");
    },
  });
}

// ===== POSTS =====

export function useSavedPosts() {
  return useQuery<SavedPost[]>({
    queryKey: ["saved-posts"],
    queryFn: async () => {
      const { data } = await axios.get("/api/saved/posts");
      return data.savedPosts;
    },
  });
}

export function useIsPostSaved(post_id: string) {
  const { data: savedPosts } = useSavedPosts();
  return savedPosts?.some((post) => post.post_id === post_id) || false;
}

export function useSavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post_id: string) => {
      const { data } = await axios.post("/api/saved/posts", { post_id });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
      toast.success("Post saved successfully");
    },
    onError: () => {
      toast.error("Failed to save post");
    },
  });
}

export function useUnsavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post_id: string) => {
      const { data } = await axios.delete(`/api/saved/posts?post_id=${post_id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
      toast.success("Post removed from saved items");
    },
    onError: () => {
      toast.error("Failed to remove post");
    },
  });
}
