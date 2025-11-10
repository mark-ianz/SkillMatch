import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CompanyProfile } from "@/types/company.types";
import { CompanyFeedFilters } from "@/types/job_feed.types";

export const useCompanies = (filters?: CompanyFeedFilters) => {
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
      const url = queryString ? `/company/feed?${queryString}` : "/company/feed";

      const { data } = await api.get<{ companies: CompanyProfile[] }>(url);
      return data.companies;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
