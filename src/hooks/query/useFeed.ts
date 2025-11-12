import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CompanyPost } from "@/types/company_post.types";
import { CompanyProfile } from "@/types/company.types";

export const useCompanyPostsFeed = () => {
  return useQuery<CompanyPost[]>({
    queryKey: ["company-posts-feed"],
    queryFn: async () => {
      const { data } = await api.get<CompanyPost[]>("/feed/company-posts");
      return data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useSuggestedCompanies = () => {
  return useQuery<CompanyProfile[]>({
    queryKey: ["suggested-companies"],
    queryFn: async () => {
      const { data } = await api.get<CompanyProfile[]>("/feed/suggested-companies");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
