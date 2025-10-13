import InputWithLabel from "@/components/common/input/InputWithLabel";
import SelectWithLabel from "@/components/common/input/SelectWithLabel";
import {
  useGetOnboarding,
  useUpdateStepOneOnboarding,
} from "@/hooks/query/useOnboarding";
import useSignupStore from "@/store/SignupStore";
import { useSession } from "next-auth/react";
import React from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { onboardingStepOneSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import { formatZodError } from "@/lib/utils";
import RowContainer from "../../../../components/common/input/RowContainer";
import StepContainer from "../../../../components/page_specific/onboarding/StepContainer";

export default function Step1() {
  const session = useSession();
  const setError = useSignupStore((state) => state.setError);
  const nextStep = useSignupStore((state) => state.nextStep);
  const farthestStep = useSignupStore((state) => state.farthestStep);

  const { mutate } = useUpdateStepOneOnboarding(
    session.data?.user.user_id,
    farthestStep
  );

  // Signup Store Values
  const first_name = useSignupStore((state) => state.first_name);
  const middle_name = useSignupStore((state) => state.middle_name);
  const last_name = useSignupStore((state) => state.last_name);
  const email = useSignupStore((state) => state.email);
  const birthdate = useSignupStore((state) => state.birthdate);
  const phone_number = useSignupStore((state) => state.phone_number);
  const gender = useSignupStore((state) => state.gender);

  // Signup Store Setters
  const setFirstName = useSignupStore((state) => state.setFirstName);
  const setMiddleName = useSignupStore((state) => state.setMiddleName);
  const setLastName = useSignupStore((state) => state.setLastName);
  const setEmail = useSignupStore((state) => state.setEmail);
  const setPhoneNumber = useSignupStore((state) => state.setPhoneNumber);
  const setGender = useSignupStore((state) => state.setGender);

  // Submit handler
  async function handleNextStep() {
    // get all the data from Step 1 on the store
    const first_name = useSignupStore.getState().first_name;
    const middle_name = useSignupStore.getState().middle_name;
    const last_name = useSignupStore.getState().last_name;
    const email = useSignupStore.getState().email;
    const phone_number = useSignupStore.getState().phone_number;
    const gender = useSignupStore.getState().gender;
    const birthdate = useSignupStore.getState().birthdate;

    // validate the data
    try {
      // clear previous errors
      setError(null);

      const parsed = onboardingStepOneSchema.parse({
        first_name,
        middle_name,
        last_name,
        email,
        phone_number,
        gender,
        birthdate,
      });

      // update the user info on the backend
      mutate(parsed);
    } catch (error) {
      // catch the zod error
      if (error instanceof ZodError) {
        setError(formatZodError(error));
        return;
      }
    }

    // increment the step on the store
    nextStep();
  }

  return (
    <StepContainer>
      <RowContainer>
        <InputWithLabel
          required={true}
          readOnly
          containerClassName="grow"
          label="First Name"
          id="first-name"
          type="text"
          placeholder="Enter your first name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputWithLabel
          optional={true}
          readOnly={!!middle_name}
          containerClassName="grow"
          label="Middle Name"
          id="middle-name"
          type="text"
          placeholder="Enter your middle name"
          value={middle_name || ""}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <InputWithLabel
          required={true}
          readOnly
          containerClassName="grow"
          label="Last Name"
          id="last-name"
          type="text"
          placeholder="Enter your last name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
      </RowContainer>

      <RowContainer>
        <InputWithLabel
          required={true}
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
          required={true}
          containerClassName="grow"
          label="Phone Number"
          id="phone-number"
          type="text"
          placeholder="Enter your phone number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </RowContainer>

      <RowContainer>
        <SelectWithLabel
          required={true}
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
          required={true}
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
      <Button type="button" className="ml-auto w-24" onClick={handleNextStep}>
        Next
      </Button>
    </StepContainer>
  );
}
