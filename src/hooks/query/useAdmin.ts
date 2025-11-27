import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CompanyWithStatus } from "@/types/admin.types";

export function useAdminCompanies(statusFilter?: string) {
  return useQuery({
    queryKey: ["admin-companies", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      const response = await api.get<CompanyWithStatus[]>(
        `/admin/companies?${params.toString()}`
      );
      return response.data;
    },
  });
}

export function useUpdateCompanyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      company_id,
      status_id,
    }: {
      company_id: string;
      status_id: number;
    }) => {
      const response = await api.patch(`/admin/companies/${company_id}`, {
        status_id,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-companies"] });
    },
  });
}

export function useAdminCompanyDetails(company_id: string) {
  return useQuery({
    queryKey: ["admin-company", company_id],
    queryFn: async () => {
      const response = await api.get<CompanyWithStatus>(
        `/admin/companies/${company_id}`
      );
      return response.data;
    },
    enabled: !!company_id,
  });
}
