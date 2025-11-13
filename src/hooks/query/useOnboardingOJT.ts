import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  OnboardingPasswordSchema,
  OnboardingStepOneSchema,
  OnboardingStepThreeSchema,
  OnboardingStepTwoSchema,
} from "@/schema/onboarding";
import useOJTProfileStore from "@/store/onboarding/ojt.onboarding.store";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";
import { OnboardingStudentFullInfo } from "@/types/onboarding.types";

type UploadResult = { path: string };

const nextStep = useOnboardingStore.getState().nextStep;
const farthestStep = useOnboardingStore.getState().farthestStep;

export function useGetOnboardingOJT(userId: number | undefined) {
  const setUser = useOJTProfileStore((state) => state.setUser);
  const setOJTProfile = useOJTProfileStore((state) => state.setOJTProfile);
  const setAcademicDetails = useOJTProfileStore(
    (state) => state.setAcademicDetails
  );
  const setSkills = useOJTProfileStore((state) => state.setSkills);
  // Onboarding step state
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const setFarthestStep = useOnboardingStore((state) => state.setFarthestStep);
  const setType = useOnboardingStore((state) => state.setType);

  return useQuery({
    queryKey: ["onboarding", userId],
    queryFn: async () => {
      const { data } = await api.get<OnboardingStudentFullInfo>(
        `/onboarding/${userId}`
      );

      // Set type to OJT to ensure correct MAX_STEP
      setType("ojt");

      // Set user data
      setUser({
        user_id: data.user_id,
        email: data.email,
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        gender: data.gender,
        birthdate: data.birthdate,
        phone_number: data.phone_number,
        role_id: data.role_id,
        status_id: data.status_id,
        created_at: data.created_at,
        house_number: data.house_number,
        street_name: data.street_name,
        subdivision: data.subdivision,
        postal_code: data.postal_code,
        barangay: data.barangay,
        city_municipality: data.city_municipality,
      });
      // Set OJT profile data
      setOJTProfile({
        ojt_id: data.ojt_id,
        user_id: data.user_id,
        college: data.college || "",
        course: data.course || "",
        year_level: data.year_level,
        expected_graduation_year: data.expected_graduation_year || "",
        resume_path: data.resume_path || "",
        visibility: data.visibility || "",
        created_at: data.created_at,
      });
      setAcademicDetails({
        college: data.college,
        course: data.course,
        year_level: data.year_level,
        expected_graduation_year: data.expected_graduation_year,
      });
      setSkills(data.skills || []);
      // Step state
      setFarthestStep(data.step || 1);
      setCurrentStep(data.step || 1);
      return data;
    },
  });
}

export function useUpdateStepOneOnboardingOJT(userId: number | undefined) {
  return useMutation({
    mutationKey: ["onboarding", userId, "step-one"],
    mutationFn: async (stepOneData: OnboardingStepOneSchema) => {
      await api.post(`/onboarding/${userId}/submit/${farthestStep}/step-one`, {
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

export function useUpdateStepTwoOnboardingOJT(userId: number | undefined) {
  return useMutation({
    mutationKey: ["onboarding", userId, "step-two"],
    mutationFn: async (stepTwoData: OnboardingStepTwoSchema) => {
      await api.post(`/onboarding/${userId}/submit/${farthestStep}/step-two`, {
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

export function useUpdateStepThreeOnboardingOJT(userId: number | undefined) {
  return useMutation({
    mutationKey: ["onboarding", userId, "step-three"],
    mutationFn: async (stepThreeData: OnboardingStepThreeSchema) => {
      await api.post(
        `/onboarding/${userId}/submit/${farthestStep}/step-three`,
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

export function useUpdateStepFiveOnboardingOJT(userId: number | undefined) {
  const nextStep = useOnboardingStore.getState().nextStep;
  const setResumePath = useOJTProfileStore.getState().setResumePath;

  return useMutation({
    mutationKey: ["onboarding", userId, "upload-resume"],
    mutationFn: async (file: File) => {
      const fd = new FormData();
      fd.append("resume", file, file.name);
      const { data } = await api.post(
        `/onboarding/${userId}/submit/${farthestStep}/step-five`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data as UploadResult;
    },
    onSuccess: (data) => {
      if (data?.path) {
        setResumePath(data.path);
      }
      nextStep();
    },
  });
}

export function useUpdateStepSixOnboardingOJT(userId: number | undefined) {
  return useMutation({
    mutationKey: ["onboarding", userId, "step-six"],
    mutationFn: async (data: OnboardingPasswordSchema) => {
      await api.post(`/onboarding/${userId}/submit/${farthestStep}/step-six`, {
        ...data,
      });
      return;
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}
