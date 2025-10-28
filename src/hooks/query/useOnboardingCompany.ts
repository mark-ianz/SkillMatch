import { api } from "@/lib/axios";
import { EmployerOnboardingStepOneSchema, EmployerOnboardingStepTwoSchema, EmployerOnboardingStepThreeSchema } from "@/schema/onboarding";
import useOnboardingStore from "@/store/OnboardingStore";
import { useMutation } from "@tanstack/react-query";

const nextStep = useOnboardingStore.getState().nextStep;
const farthestStep = useOnboardingStore.getState().farthestStep;

export function useUpdateStepOneOnboardingCompany(company_id: number | undefined | null) {
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

export function useUpdateStepTwoOnboardingCompany(company_id: number | undefined | null) {
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

export function useUpdateStepThreeOnboardingCompany(company_id: number | undefined | null) {
  return useMutation({
    mutationKey: ["onboarding", company_id, "step-three"],
    mutationFn: async (stepThreeData: EmployerOnboardingStepThreeSchema) => {
      await api.post(`/onboarding/${company_id}/submit/${farthestStep}/step-three/company`, {
        ...stepThreeData,
      });
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}