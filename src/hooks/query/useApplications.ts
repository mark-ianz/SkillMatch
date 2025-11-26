import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  Application,
  ApplicationWithJobDetails,
  ApplicationWithUserDetails,
  CompanyApplicationStatusId,
} from "@/types/application.types";

// ==================== USER HOOKS ====================

// Query: Get all applications for current user
export function useUserApplications() {
  return useQuery({
    queryKey: ["user-applications"],
    queryFn: async () => {
      const { data } = await api.get<{ applications: ApplicationWithJobDetails[] }>(
        "/applications"
      );
      return data.applications;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Query: Get single application details
export function useApplication(application_id: string) {
  return useQuery({
    queryKey: ["application", application_id],
    queryFn: async () => {
      const { data } = await api.get<{ application: ApplicationWithJobDetails }>(
        `/applications/${application_id}`
      );
      return data.application;
    },
    enabled: !!application_id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Mutation: Apply to a job
export function useApplyToJob() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { 
      job_post_id: string; 
      required_hours: number;
      preferred_schedule: string;
      resume_path?: string;
    }) => {
      const { data } = await api.post<{ application: Application; message: string }>(
        "/applications",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Application submitted successfully");
      qc.invalidateQueries({ queryKey: ["user-applications"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || "Failed to apply to job";
      toast.error(message);
    },
  });
}

// Mutation: Withdraw application
export function useWithdrawApplication() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (application_id: string) => {
      const { data } = await api.delete(`/applications/${application_id}`);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Application withdrawn successfully");
      qc.invalidateQueries({ queryKey: ["user-applications"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || "Failed to withdraw application";
      toast.error(message);
    },
  });
}

// Mutation: Respond to offer
export function useRespondToOffer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { application_id: string; response: "accept" | "decline" }) => {
      const { data } = await api.post(
        `/applications/${payload.application_id}/offer`,
        { response: payload.response }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      qc.invalidateQueries({ queryKey: ["user-applications"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || "Failed to respond to offer";
      toast.error(message);
    },
  });
}

// ==================== COMPANY HOOKS ====================

// Query: Get all applications for a job post
export function useJobPostApplications(job_post_id: string) {
  return useQuery({
    queryKey: ["job-post-applications", job_post_id],
    queryFn: async () => {
      const { data } = await api.get<{ applications: ApplicationWithUserDetails[] }>(
        `/company/job-post/${job_post_id}/applications`
      );
      return data.applications;
    },
    enabled: !!job_post_id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Mutation: Update company status
export function useUpdateCompanyStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      application_id: string;
      company_status_id: CompanyApplicationStatusId;
      company_notes?: string;
    }) => {
      const { data } = await api.patch(
        `/company/applications/${payload.application_id}/status`,
        {
          company_status_id: payload.company_status_id,
          company_notes: payload.company_notes,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Status updated successfully");
      qc.invalidateQueries({ queryKey: ["job-post-applications"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || "Failed to update status";
      toast.error(message);
    },
  });
}

// Mutation: Schedule interview
export function useScheduleInterview() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      application_id: string;
      interview_date: string;
      interview_type: "virtual" | "in-person";
      interview_link?: string;
      interview_code?: string;
      interview_notes?: string;
    }) => {
      const { data } = await api.post(
        `/company/applications/${payload.application_id}/interview`,
        {
          interview_date: payload.interview_date,
          interview_type: payload.interview_type,
          interview_link: payload.interview_link,
          interview_code: payload.interview_code,
          interview_notes: payload.interview_notes,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Interview scheduled successfully");
      qc.invalidateQueries({ queryKey: ["job-post-applications"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || "Failed to schedule interview";
      toast.error(message);
    },
  });
}

// Mutation: Send offer
export function useSendOffer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      application_id: string;
      offer_deadline: string;
    }) => {
      const { data } = await api.post(
        `/company/applications/${payload.application_id}/offer`,
        { offer_deadline: payload.offer_deadline }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Offer sent successfully");
      qc.invalidateQueries({ queryKey: ["job-post-applications"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || "Failed to send offer";
      toast.error(message);
    },
  });
}

// Mutation: Reject application
export function useRejectApplication() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      application_id: string;
      rejection_reason?: string;
    }) => {
      const { data } = await api.post(
        `/company/applications/${payload.application_id}/reject`,
        { rejection_reason: payload.rejection_reason }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Application rejected successfully");
      qc.invalidateQueries({ queryKey: ["job-post-applications"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || "Failed to reject application";
      toast.error(message);
    },
  });
}
