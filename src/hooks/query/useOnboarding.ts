import { OnboardingFullInfo } from "@/types/user.types";
import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OnboardingStepOneSchema } from "@/schema/onboarding";

export function useGetOnboarding(userId: number | undefined) {
  return useQuery({
    queryKey: ["onboarding", userId],
    queryFn: async () => {
      const { data } = await api.get<OnboardingFullInfo>(
        `/onboarding/${userId}`
      );
      return data;
    },
  });
}

export function useUpdateStepOneOnboarding(
  userId: number | undefined,
  farthestStep: number
) {
  return useMutation({
    mutationKey: ["onboarding", userId, "step-one"],
    mutationFn: async (stepOneData: OnboardingStepOneSchema) => {
      console.log("farthestStep", farthestStep);
      await api.post(`/onboarding/${userId}/submit/${farthestStep}/step-one`, {
        ...stepOneData,
      });
      return;
    },
  });
}
