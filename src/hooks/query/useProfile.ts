import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface HeaderProfile {
  avatarUrl: string | null;
  name: string;
  email: string;
}

// Fetch header profile (Applicant or Company)
export function useHeaderProfile(type: "applicant" | "company" | null) {
  return useQuery({
    queryKey: ["header-profile", type],
    queryFn: async () => {
      if (!type) return null;
      const response = await api.get<HeaderProfile>(`/profile/header?type=${type}`);
      return response.data;
    },
    enabled: !!type, // Only run query if type is provided
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
