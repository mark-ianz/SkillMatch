import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function usePopularCategories() {
  return useQuery({
    queryKey: ["popular-categories"],
    queryFn: async () => {
      const { data } = await api.get<string[]>("/job-posts/popular-categories");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
