import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export type CompanySettings = {
  company_id: string;
  company_name: string;
  company_email: string;
  phone_number: string;
  telephone_number: string;
  city_municipality: string;
  barangay: string;
  date_founded: string;
  description: string;
  industry: string[];
  company_image: string | null;
  website: string;
  facebook_page: string;
  instagram_page: string;
  twitter_page: string;
  has_password: boolean;
};

export function useCompanySettings() {
  return useQuery<CompanySettings>({
    queryKey: ["company-settings"],
    queryFn: async () => {
      const { data } = await api.get<CompanySettings>("/company/settings");
      return data;
    },
  });
}

type UpdateCompanyProfilePayload = {
  company_name: string;
  description: string;
  industry: string[];
  date_founded: string;
};

export function useUpdateCompanyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCompanyProfilePayload) => {
      const response = await api.patch("/company/settings/profile", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-settings"] });
      toast.success("Company profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update company profile");
    },
  });
}

export function useUpdateCompanyLogo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("logo", file);
      const response = await api.patch("/company/settings/logo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-settings"] });
      queryClient.invalidateQueries({ queryKey: ["header-profile", "company"] });
      toast.success("Company logo updated successfully");
    },
    onError: () => {
      toast.error("Failed to update company logo");
    },
  });
}

type UpdateContactInfoPayload = {
  phone_number: string;
  telephone_number: string;
  website: string;
  facebook_page: string;
  instagram_page: string;
  twitter_page: string;
};

export function useUpdateContactInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateContactInfoPayload) => {
      const response = await api.patch("/company/settings/contact", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-settings"] });
      toast.success("Contact information updated successfully");
    },
    onError: () => {
      toast.error("Failed to update contact information");
    },
  });
}

// Alias for consistency with component naming
export const useUpdateCompanyContact = useUpdateContactInfo;

type UpdateLocationPayload = {
  city_municipality: string;
  barangay: string;
};

export function useUpdateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateLocationPayload) => {
      const response = await api.patch("/company/settings/location", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-settings"] });
      toast.success("Location updated successfully");
    },
    onError: () => {
      toast.error("Failed to update location");
    },
  });
}

type UpdatePasswordPayload = {
  currentPassword?: string;
  newPassword: string;
};

export function useUpdateCompanyPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdatePasswordPayload) => {
      const response = await api.patch("/company/settings/password", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-settings"] });
      toast.success("Password updated successfully");
    },
    onError: () => {
      toast.error("Failed to update password");
    },
  });
}
