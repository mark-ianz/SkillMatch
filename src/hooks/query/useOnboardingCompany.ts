import { api } from "@/lib/axios";
import { EmployerOnboardingStepOneSchema, EmployerOnboardingStepTwoSchema } from "@/schema/onboarding";
import useOnboardingStore from "@/store/OnboardingStore";
import { useMutation } from "@tanstack/react-query";

const nextStep = useOnboardingStore.getState().nextStep;
const farthestStep = useOnboardingStore.getState().farthestStep;

export function useUpdateStepOneOnboardingCompany(company_id: number | undefined) {
  return useMutation({
    mutationKey: ["onboarding", company_id, "step-one"],
    mutationFn: async (stepOneData: EmployerOnboardingStepOneSchema) => {
      await api.post(`/onboarding/${company_id}/submit/${farthestStep}/step-one/company`, {
        ...stepOneData,
      });
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}

export function useUpdateStepTwoOnboardingCompany(company_id: number | undefined) {
  return useMutation({
    mutationKey: ["onboarding", company_id, "step-two"],
    mutationFn: async (stepTwoData: EmployerOnboardingStepTwoSchema) => {
      await api.post(`/onboarding/${company_id}/submit/${farthestStep}/step-two/company`, {
        ...stepTwoData,
      });
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}