import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  OnboardingStepOneSchema,
  OnboardingStepThreeSchema,
  OnboardingStepTwoSchema,
} from "@/schema/onboarding";
import useSignupStore from "@/store/SignupStore";
import { OnboardingFullInfo } from "@/types/onboarding.types";

type UploadResult = { path: string };

const nextStep = useSignupStore.getState().nextStep;
const farthestStep = useSignupStore.getState().farthestStep;

export function useGetOnboarding(userId: number | undefined) {
  // Step 1: Personal Details
  const setFirstName = useSignupStore((state) => state.setFirstName);
  const setMiddleName = useSignupStore((state) => state.setMiddleName);
  const setLastName = useSignupStore((state) => state.setLastName);
  const setEmail = useSignupStore((state) => state.setEmail);
  const setBirthdate = useSignupStore((state) => state.setBirthdate);
  const setPhoneNumber = useSignupStore((state) => state.setPhoneNumber);
  const setGender = useSignupStore((state) => state.setGender);

  // Step 2: Address
  const setHouseNumber = useSignupStore((state) => state.setHouseNumber);
  const setStreetName = useSignupStore((state) => state.setStreetName);
  const setSubdivision = useSignupStore((state) => state.setSubdivision);
  const setPostalCode = useSignupStore((state) => state.setPostalCode);
  const setCityMunicipality = useSignupStore(
    (state) => state.setCityMunicipality
  );
  const setBarangay = useSignupStore((state) => state.setBarangay);

  // Step 3: Academic Details
  const setCollege = useSignupStore((state) => state.setCollege);
  const setCourse = useSignupStore((state) => state.setCourse);
  const setYearLevel = useSignupStore((state) => state.setYearLevel);
  const setExpectedGraduationYear = useSignupStore(
    (state) => state.setExpectedGraduationYear
  );

  // Step 4: Skills
  const setSkills = useSignupStore((state) => state.setSkills);

  // Step 5: Resume
  const setResumePath = useSignupStore((state) => state.setResumePath);

  return useQuery({
    queryKey: ["onboarding", userId],
    queryFn: async () => {
      const { data } = await api.get<OnboardingFullInfo>(
        `/onboarding/${userId}`
      );

      // Set the zustand store with the fetched data
      // TODO: consider making a single action in zustand to set all these values
      // TODO: pero temporarily lang muna 'to kase di pa complete lahat ng states and actions sa store
      setFirstName(data.first_name);
      setMiddleName(data.middle_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setBirthdate(data.birthdate);
      setPhoneNumber(data.phone_number);
      setGender(data.gender);

      // Address
      setHouseNumber(data.house_number);
      setStreetName(data.street_name);
      setSubdivision(data.subdivision);
      setPostalCode(data.postal_code);
      setCityMunicipality(data.city_municipality || "");
      setBarangay(data.barangay || "");

      // Academic Details
      setCollege(data.college || "");
      setCourse(data.course || "");
      setYearLevel(data.year_level || "4th year");
      setExpectedGraduationYear(data.expected_graduation_year || "");

      // Skills
      setSkills(data.skills || []);

      // Resume
      setResumePath(data.resume_path || null);
      console.log(data);

      return data;
    },
  });
}

export function useUpdateStepOneOnboarding(userId: number | undefined) {
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

export function useUpdateStepTwoOnboarding(userId: number | undefined) {
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

export function useUpdateStepThreeOnboarding(userId: number | undefined) {
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

export function useUpdateStepFiveOnboarding(userId: number | undefined) {
  const nextStep = useSignupStore.getState().nextStep;
  const setResumePath = useSignupStore.getState().setResumePath;

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
