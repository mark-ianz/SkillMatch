"use client";

import React from "react";
import FileUploadField from "@/components/common/input/FileUploadField";
import useCompanyStore from "@/store/CompanyStore";
import { Button } from "@/components/ui/button";
import { employerOnboardingStepThreeSchema } from "@/schema/onboarding";
import { formatZodError } from "@/lib/utils";
import useOnboardingStore from "@/store/OnboardingStore";
import { useUpdateStepThreeOnboardingCompany } from "@/hooks/query/useOnboardingCompany";
import { useUploadCompanyDocument } from "@/hooks/query/useDocuments";
import useRequireCompany from "@/hooks/useRequireCompany";
import LoadingGeneric from "@/components/global/LoadingGeneric";

export default function Step3() {
  const company_id = useRequireCompany();

  const { mutate, isPending } = useUpdateStepThreeOnboardingCompany(company_id!);

  const { mutateAsync: mutateUploadBusinessPermit } = useUploadCompanyDocument(
    company_id!,
    "business_permit_path"
  );
  const { mutateAsync: mutateUploadMayorPermit } = useUploadCompanyDocument(
    company_id!,
    "mayor_permit_path"
  );
  const { mutateAsync: mutateUploadDti } = useUploadCompanyDocument(
    company_id!,
    "dti_permit_path"
  );
  const { mutateAsync: mutateUploadBir } = useUploadCompanyDocument(
    company_id!,
    "bir_cert_of_registration_path"
  );

  const business_permit_path = useCompanyStore((s) => s.business_permit_path ?? null);
  const mayor_permit_path = useCompanyStore((s) => s.mayor_permit_path ?? null);
  const dti_permit_path = useCompanyStore((s) => s.dti_permit_path ?? null);
  const bir_cert_of_registration_path = useCompanyStore((s) => s.bir_cert_of_registration_path ?? null);

  const setError = useOnboardingStore.getState().setError;
  const setBusinessPermitPath = useCompanyStore.getState().setBusinessPermitPath;
  const setMayorPermitPath = useCompanyStore.getState().setMayorPermitPath;
  const setDtiPermitPath = useCompanyStore.getState().setDtiPermitPath;
  const setBirCertRegistrationPath = useCompanyStore.getState().setBirCertRegistrationPath;

  if (company_id === null) return <LoadingGeneric/>;

  function handleNext() {
    setError(null);
    const paths = {
      business_permit_path: useCompanyStore.getState().business_permit_path,
      mayor_permit_path: useCompanyStore.getState().mayor_permit_path,
      dti_permit_path: useCompanyStore.getState().dti_permit_path,
      bir_cert_of_registration_path: useCompanyStore.getState().bir_cert_of_registration_path,
    };

    const { error, data } = employerOnboardingStepThreeSchema.safeParse(paths);

    if (!error) {
      mutate(data);
      return;
    }
    setError(formatZodError(error));
  }

  async function handleBusinessPermitUpload(file: File) {
    const { path } = await mutateUploadBusinessPermit(file);
    setBusinessPermitPath(path);
  }

  async function handleMayorPermitUpload(file: File) {
    const { path } = await mutateUploadMayorPermit(file);
    setMayorPermitPath(path);
  }

  async function handleDtiUpload(file: File) {
    const { path } = await mutateUploadDti(file);
    setDtiPermitPath(path);
  }

  async function handleBirUpload(file: File) {
    const { path } = await mutateUploadBir(file);
    setBirCertRegistrationPath(path);
  }

  return (
    <div className="flex flex-col gap-6">
      <FileUploadField
        id="business_permit"
        label={"Business Permit"}
        accept=".pdf,.jpg,.jpeg,.png"
        currentPath={business_permit_path}
        onUpload={handleBusinessPermitUpload}
        onClear={() => setBusinessPermitPath("")}
      />

      <FileUploadField
        id="mayor_permit"
        label={"Mayor's Permit"}
        accept=".pdf,.jpg,.jpeg,.png"
        currentPath={mayor_permit_path}
        onUpload={handleMayorPermitUpload}
        onClear={() => setMayorPermitPath("")}
      />

      <FileUploadField
        id="dti_permit"
        label={"DTI Permit"}
        accept=".pdf,.jpg,.jpeg,.png"
        currentPath={dti_permit_path}
        onUpload={handleDtiUpload}
        onClear={() => setDtiPermitPath("")}
      />

      <FileUploadField
        id="bir_cert"
        label={"BIR Certificate / Registration"}
        accept=".pdf,.jpg,.jpeg,.png"
        currentPath={bir_cert_of_registration_path}
        onUpload={handleBirUpload}
        onClear={() => setBirCertRegistrationPath("")}
      />

      <Button
        disabled={isPending}
        className="ml-auto w-24"
        type="button"
        variant={"default_employer"}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
}

