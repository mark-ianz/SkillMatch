import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserSettings,
  updatePersonalInfo,
  updateProfilePicture,
  updatePassword,
  updateResume,
  updateAvailability,
  updateSkills,
  updateEducation,
  UpdatePersonalInfoPayload,
  UpdatePasswordPayload,
  UpdateAvailabilityPayload,
  UpdateSkillsPayload,
  UpdateEducationPayload,
} from "@/services/user-settings.client";
import { toast } from "sonner";

// Query: Get user settings
export function useUserSettings() {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: getUserSettings,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Mutation: Update personal information
export function useUpdatePersonalInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePersonalInfoPayload) => updatePersonalInfo(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["user-settings"], data.data);
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to update personal information");
    },
  });
}

// Mutation: Update profile picture
export function useUpdateProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => updateProfilePicture(file),
    onSuccess: (data) => {
      queryClient.setQueryData(["user-settings"], data.data);
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to update profile picture");
    },
  });
}

// Mutation: Update password
export function useUpdatePassword() {
  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => updatePassword(payload),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to update password");
    },
  });
}

// Mutation: Update resume
export function useUpdateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => updateResume(file),
    onSuccess: (data) => {
      queryClient.setQueryData(["user-settings"], data.data);
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to update resume");
    },
  });
}

// Mutation: Update availability
export function useUpdateAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAvailabilityPayload) => updateAvailability(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["user-settings"], data.data);
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to update availability");
    },
  });
}

// Mutation: Update skills
export function useUpdateSkills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSkillsPayload) => updateSkills(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["user-settings"], data.data);
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to update skills");
    },
  });
}

// Mutation: Update education
export function useUpdateEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateEducationPayload) => updateEducation(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["user-settings"], data.data);
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to update education details");
    },
  });
}
