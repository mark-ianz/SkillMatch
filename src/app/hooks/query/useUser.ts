import { OnboardingFullInfo } from "@/app/types/user.types";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetOnboarding(userId: number | undefined) {
  return useQuery({
    queryKey: ["onboarding", userId],
    queryFn: async () => {
      const { data } = await api.get<OnboardingFullInfo>(`/onboarding/${userId}`);
      return data;
    },
  });
}
