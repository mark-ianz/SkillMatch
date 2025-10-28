"use client";

import React from "react";
import FileUploadField from "@/components/common/input/FileUploadField";
import useCompanyStore from "@/store/CompanyStore";
import { Button } from "@/components/ui/button";
import { employerOnboardingStepTwoSchema } from "@/schema/onboarding";
import { formatZodError } from "@/lib/utils";
import useOnboardingStore from "@/store/OnboardingStore";
import { useUpdateStepTwoOnboardingCompany } from "@/hooks/query/useOnboardingCompany";
import { useUploadCompanyDocument } from "@/hooks/query/useDocuments";
import useRequireCompany from "@/hooks/useRequireCompany";

export default function Step2() {
  const company_id = useRequireCompany();

  const { mutate, isPending } = useUpdateStepTwoOnboardingCompany(company_id);

  // Document Mutate functions
  const { mutateAsync: mutateUploadLoi } = useUploadCompanyDocument(
    company_id,
    "loi_path"
  );
  const { mutateAsync: mutateUploadMou } = useUploadCompanyDocument(
    company_id,
    "mou_path"
  );
  const { mutateAsync: mutateUploadCp } = useUploadCompanyDocument(
    company_id,
    "cp_path"
  );

  const mou_path = useCompanyStore((s) => s.mou_path ?? null);
  const loi_path = useCompanyStore((s) => s.loi_path ?? null);
  const cp_path = useCompanyStore((s) => s.cp_path ?? null);

  const setError = useOnboardingStore.getState().setError;
  const setMouPath = useCompanyStore.getState().setMouPath;
  const setLoiPath = useCompanyStore.getState().setLoiPath;
  const setCompanyProfilePath =
    useCompanyStore.getState().setCompanyProfilePath;

  function handleNext() {
    setError(null);
    // get all paths
    const paths = {
      mou_path: useCompanyStore.getState().mou_path,
      loi_path: useCompanyStore.getState().loi_path,
      cp_path: useCompanyStore.getState().cp_path,
    };

    const { error, data } = employerOnboardingStepTwoSchema.safeParse(paths);

    if (!error) {
      mutate(data);
      return;
    }
    setError(formatZodError(error));
  }

  async function handleMouUpload(file: File) {
    const { path } = await mutateUploadMou(file);
    setMouPath(path);
  }

  async function handleLoiUpload(file: File) {
    const { path } = await mutateUploadLoi(file);
    setLoiPath(path);
  }

  async function handleCpUpload(file: File) {
    const { path } = await mutateUploadCp(file);
    setCompanyProfilePath(path);
  }

  return (
    <div className="flex flex-col gap-6">
      <FileUploadField
        id="mou"
        label={"Memorandum of Understanding"}
        accept=".pdf,.jpg,.jpeg,.png"
        currentPath={mou_path}
        onUpload={handleMouUpload}
        onClear={() => setMouPath("")}
      />

      <FileUploadField
        id="loi"
        label={"Letter of Intent"}
        accept=".pdf,.jpg,.jpeg,.png"
        currentPath={loi_path}
        onUpload={handleLoiUpload}
        onClear={() => setLoiPath("")}
      />

      <FileUploadField
        id="company_profile"
        label={"Company Profile"}
        accept=".pdf,.jpg,.jpeg,.png"
        currentPath={cp_path}
        onUpload={handleCpUpload}
        onClear={() => setCompanyProfilePath("")}
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
