import InputWithLabel from "@/components/common/input/InputWithLabel";
import SelectWithLabel from "@/components/common/input/SelectWithLabel";
import { useGetOnboarding } from "@/hooks/query/useUser";
import useSignupStore from "@/store/SignupStore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { format, parseISO } from "date-fns";

export default function Step1() {
  const session = useSession();

  // Signup Store Values
  const firstName = useSignupStore((state) => state.first_name);
  const middleName = useSignupStore((state) => state.middle_name);
  const lastName = useSignupStore((state) => state.last_name);
  const email = useSignupStore((state) => state.email);
  const birthdate = useSignupStore((state) => state.birthdate);
  const phoneNumber = useSignupStore((state) => state.phone_number);
  const gender = useSignupStore((state) => state.gender);

  // Signup Store Setters
  const setFirstName = useSignupStore((state) => state.setFirstName);
  const setMiddleName = useSignupStore((state) => state.setMiddleName);
  const setLastName = useSignupStore((state) => state.setLastName);
  const setEmail = useSignupStore((state) => state.setEmail);
  const setBirthdate = useSignupStore((state) => state.setBirthdate);
  const setPhoneNumber = useSignupStore((state) => state.setPhoneNumber);
  const setGender = useSignupStore((state) => state.setGender);
  const setFarthestStep = useSignupStore((state) => state.setFarthestStep);
  const setCurrentStep = useSignupStore((state) => state.setCurrentStep);

  const { data: onboardingData } = useGetOnboarding(session.data?.user.user_id);

  useEffect(() => {
    if (onboardingData) {
      setFirstName(onboardingData.first_name);
      setMiddleName(onboardingData.middle_name);
      setLastName(onboardingData.last_name);
      setEmail(onboardingData.email);
      setBirthdate(onboardingData.birthdate);
      setPhoneNumber(onboardingData.phone_number);
      setGender(onboardingData.gender);
      setFarthestStep(onboardingData.step);
      setCurrentStep(onboardingData.step);
    }
  }, [
    onboardingData,
    setFirstName,
    setMiddleName,
    setLastName,
    setEmail,
    setBirthdate,
    setPhoneNumber,
    setGender,
    setFarthestStep,
    setCurrentStep,
  ]);

  console.log(birthdate);

  return (
    <div className="flex flex-col gap-6">
      <RowContainer>
        <InputWithLabel
          readOnly
          containerClassName="grow"
          label="First Name"
          id="first-name"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputWithLabel
          readOnly={!!onboardingData?.middle_name}
          containerClassName="grow"
          label="Middle Name"
          id="middle-name"
          type="text"
          placeholder="Enter your middle name"
          value={middleName || ""}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <InputWithLabel
          readOnly
          containerClassName="grow"
          label="Last Name"
          id="last-name"
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </RowContainer>

      <RowContainer>
        <InputWithLabel
          readOnly
          containerClassName="grow"
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputWithLabel
          containerClassName="grow"
          label="Phone Number"
          id="phone-number"
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </RowContainer>

      <RowContainer>
        <SelectWithLabel
          containerClassName="w-1/2"
          selectTriggerClassName="w-full"
          id="gender"
          label="Gender"
          value={gender}
          onChange={setGender as (gender: string) => void}
          items={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "prefer not to say", label: "Prefer not to say" },
          ]}
        />
        <InputWithLabel
          containerClassName="w-1/2"
          label="Birthdate"
          id="birthdate"
          type="date"
          value={
            birthdate
              ? format(parseISO(birthdate.toString()), "yyyy-MM-dd")
              : ""
          }
          placeholder="Enter your birthdate"
          readOnly
        />
      </RowContainer>
    </div>
  );
}

function RowContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4">{children}</div>;
}
