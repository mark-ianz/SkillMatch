import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CompanyProfile } from "@/types/company.types";

export const useCompanies = () => {
  return useQuery<CompanyProfile[]>({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await api.get<{ companies: CompanyProfile[] }>(
        "/company/all"
      );
      return data.companies;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
