import { OnboardingFullInfo } from "@/types/user.types";
import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OnboardingStepOneSchema } from "@/schema/onboarding";
import useSignupStore from "@/store/SignupStore";

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
  const setCityMunicipality = useSignupStore((state) => state.setCityMunicipality);
  const setBarangay = useSignupStore((state) => state.setBarangay);


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
      setStreetName(data.street_name)
      setSubdivision(data.subdivision);
      setPostalCode(data.postal_code);
      setCityMunicipality(data.city_municipality || "");
      setBarangay(data.barangay || "");

      console.log(data)

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
