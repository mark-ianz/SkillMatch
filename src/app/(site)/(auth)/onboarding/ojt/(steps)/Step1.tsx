import InputWithLabel from "@/components/common/input/InputWithLabel";
import SelectWithLabel from "@/components/common/input/SelectWithLabel";
import { useSession } from "next-auth/react";
import React from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { onboardingStepOneSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import { formatZodError } from "@/lib/utils";
import RowContainer from "@/components/common/input/RowContainer";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { useUpdateStepOneOnboardingOJT } from "@/hooks/query/useOnboardingOJT";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";
import useOJTProfileStore from "@/store/onboarding/ojt.onboarding.store";

export default function Step1() {
  const session = useSession();
  const setError = useOnboardingStore((state) => state.setError);

  const { mutate, isPending } = useUpdateStepOneOnboardingOJT(
    session.data?.user.user_id
  );

  // Signup Store Values
  const first_name = useOJTProfileStore((state) => state.first_name);
  const middle_name = useOJTProfileStore((state) => state.middle_name);
  const last_name = useOJTProfileStore((state) => state.last_name);
  const email = useOJTProfileStore((state) => state.email);
  const birthdate = useOJTProfileStore((state) => state.birthdate);
  const phone_number = useOJTProfileStore((state) => state.phone_number);
  const gender = useOJTProfileStore((state) => state.gender);

  // Signup Store Setters
  const setFirstName = useOJTProfileStore((state) => state.setFirstName);
  const setMiddleName = useOJTProfileStore((state) => state.setMiddleName);
  const setLastName = useOJTProfileStore((state) => state.setLastName);
  const setEmail = useOJTProfileStore((state) => state.setEmail);
  const setPhoneNumber = useOJTProfileStore((state) => state.setPhoneNumber);
  const setGender = useOJTProfileStore((state) => state.setGender);

  // Submit handler
  async function handleNextStep() {
    // get all the current data from Step 1 on the store
    const first_name = useOJTProfileStore.getState().first_name;
    const middle_name = useOJTProfileStore.getState().middle_name;
    const last_name = useOJTProfileStore.getState().last_name;
    const email = useOJTProfileStore.getState().email;
    const phone_number = useOJTProfileStore.getState().phone_number;
    const gender = useOJTProfileStore.getState().gender;
    const birthdate = useOJTProfileStore.getState().birthdate;

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
  }

  return (
    <StepContainer>
      <RowContainer>
        <InputWithLabel
          required={true}
          readOnly
          containerClassName="grow"
          label="First Name"
          id="first_name"
          placeholder="Enter your first name"
          value={first_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
        />
        <InputWithLabel
          optional={true}
          readOnly={!!middle_name}
          containerClassName="grow"
          label="Middle Name"
          id="middle_name"
          placeholder="Enter your middle name"
          value={middle_name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMiddleName(e.target.value)
          }
        />
        <InputWithLabel
          required={true}
          readOnly
          containerClassName="grow"
          label="Last Name"
          id="last_name"
          placeholder="Enter your last name"
          value={last_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
        />
      </RowContainer>

      <RowContainer>
        <InputWithLabel
          required={true}
          containerClassName="grow"
          label="Phone Number"
          id="phone_number"
          placeholder="Enter your phone number"
          value={phone_number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhoneNumber(e.target.value)
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
      </RowContainer>

      <RowContainer>
        <SelectWithLabel
          required={true}
          containerClassName="w-1/2"
          selectTriggerClassName="w-full"
          id="gender"
          label="Gender"
          value={gender || "male"}
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
      <Button
        disabled={isPending}
        type="button"
        className="ml-auto w-24"
        onClick={handleNextStep}
      >
        Next
      </Button>
    </StepContainer>
  );
}
