import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetOnboarding(userId: number | undefined) {
  return useQuery({
    queryKey: ["onboarding", userId],
    queryFn: async () => {
      const res = await api.get(`/onboarding/${userId}`);
      return res.data;
    },
  });
}
