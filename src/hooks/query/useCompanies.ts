import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CompanyProfile } from "@/types/company.types";
import { CompanyFeedFilters } from "@/types/job_explore.types";
import { JobPost } from "@/types/job_post.types";

export const useGetAllCompanies = (filters?: CompanyFeedFilters) => {
  return useQuery<CompanyProfile[]>({
    queryKey: ["companies", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters) {
        filters.industries?.forEach((i) => params.append("industry", i));
        if (filters.search) {
          params.append("search", filters.search);
        }
      }

      const queryString = params.toString();
      const url = queryString ? `/company/all?${queryString}` : "/company/all";

      const { data } = await api.get<{ companies: CompanyProfile[] }>(url);
      return data.companies;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetCompanyWithJobs = (company_id: string) => {
  return useQuery<{
    company_profile: CompanyProfile;
    job_posted: JobPost[];
  }>({
    queryKey: ["company", company_id, "with-jobs"],
    queryFn: async () => {
      const { data } = await api.get<{
        company_profile: CompanyProfile;
        job_posted: JobPost[];
      }>(`/company/${company_id}`);
      return data;
    },
    enabled: !!company_id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
