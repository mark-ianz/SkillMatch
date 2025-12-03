import { api } from "@/lib/axios";
import {
  EmployerOnboardingStepOneSchema,
  EmployerOnboardingStepTwoSchema,
  EmployerOnboardingStepThreeSchema,
  EmployerOnboardingStepFourSchema,
  EmployerOnboardingStepFiveSchema,
  OnboardingPasswordSchema,
} from "@/schema/onboarding";
import useCompanyStore from "@/store/onboarding/company.onboarding.store";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";
import { OnboardingCompanyFullInfo } from "@/types/onboarding.types";
import { useMutation, useQuery } from "@tanstack/react-query";

const nextStep = useOnboardingStore.getState().nextStep;
const farthestStep = useOnboardingStore.getState().farthestStep;

export function useGetOnboardingCompany(company_id: string | undefined) {
  const setCompany = useCompanyStore((state) => state.setCompany);

  // Onboarding step state
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const setFarthestStep = useOnboardingStore((state) => state.setFarthestStep);
  const setType = useOnboardingStore((state) => state.setType);

  return useQuery({
    queryKey: ["onboarding", company_id],
    queryFn: async () => {
      const { data } = await api.get<OnboardingCompanyFullInfo>(
        `/onboarding/company`
      );

      console.log(data)

      // Set type to company to ensure correct MAX_STEP
      setType("company");

      // Set company data
      setCompany({
        company_name: data.company_name || "",
        company_email: data.company_email || "",
        telephone_number: data.telephone_number || "",
        phone_number: data.phone_number || "",
        city_municipality: data.city_municipality || "",
        barangay: data.barangay || "",
        date_founded: data.date_founded || "",
        description: data.description || "",
        industry: data.industry || [],
        company_image: data.company_image || "",
        website: data.website || "",
        facebook_page: data.facebook_page || "",
        instagram_page: data.instagram_page || "",
        twitter_page: data.twitter_page || "",
        mou_path: data.mou_path || "",
        loi_path: data.loi_path || "",
        cp_path: data.cp_path || "",
        business_permit_path: data.business_permit_path || "",
        mayor_permit_path: data.mayor_permit_path || "",
        dti_permit_path: data.dti_permit_path || "",
        bir_cert_of_registration_path: data.bir_cert_of_registration_path || "",
      });

      // Step state
      setFarthestStep(data.step || 1);
      setCurrentStep(data.step || 1);
      return data;
    },
  });
}

export function useUpdateStepOneOnboardingCompany(
  company_id: string | undefined | null
) {
  return useMutation({
    mutationKey: ["onboarding", company_id, "step-one"],
    mutationFn: async (stepOneData: EmployerOnboardingStepOneSchema) => {
      await api.post(
        `/onboarding/${company_id}/submit/${farthestStep}/step-one/company`,
        {
          ...stepOneData,
        }
      );
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}

export function useUpdateStepTwoOnboardingCompany(
  company_id: string | undefined | null
) {
  return useMutation({
    mutationKey: ["onboarding", company_id, "step-two"],
    mutationFn: async (stepTwoData: EmployerOnboardingStepTwoSchema) => {
      await api.post(
        `/onboarding/${company_id}/submit/${farthestStep}/step-two/company`,
        {
          ...stepTwoData,
        }
      );
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}

export function useUpdateStepThreeOnboardingCompany(
  company_id: string | undefined | null
) {
  return useMutation({
    mutationKey: ["onboarding", company_id, "step-three"],
    mutationFn: async (stepThreeData: EmployerOnboardingStepThreeSchema) => {
      await api.post(
        `/onboarding/${company_id}/submit/${farthestStep}/step-three/company`,
        {
          ...stepThreeData,
        }
      );
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}

export function useUpdateStepFourOnboardingCompany(
  company_id: string | undefined | null
) {
  return useMutation({
    mutationKey: ["onboarding", company_id, "step-four"],
    mutationFn: async (stepFourData: EmployerOnboardingStepFourSchema) => {
      await api.post(
        `/onboarding/${company_id}/submit/${farthestStep}/step-four/company`,
        {
          ...stepFourData,
        }
      );
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}

export function useUpdateStepFiveOnboardingCompany(
  company_id: string | undefined | null
) {
  return useMutation({
    mutationKey: ["onboarding", company_id, "step-five"],
    mutationFn: async (stepFiveData: EmployerOnboardingStepFiveSchema) => {
      await api.post(
        `/onboarding/${company_id}/submit/${farthestStep}/step-five/company`,
        {
          ...stepFiveData,
        }
      );
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}

export function useUpdateStepSixOnboardingCompany(
  company_id: string | undefined | null
) {
  return useMutation({
    mutationKey: ["onboarding", company_id, "step-six"],
    mutationFn: async (data: OnboardingPasswordSchema) => {
      await api.post(
        `/onboarding/${company_id}/submit/${farthestStep}/step-six/company`,
        {
          ...data,
        }
      );
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}
