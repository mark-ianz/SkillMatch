import { EmployerOnboardingStepOneSchema } from "@/schema/onboarding";

export type Company = EmployerOnboardingStepOneSchema & {
  company_id: string;
  mou_path: string;
  loi_path: string;
  cp_path: string;
  business_permit_path: string;
  mayor_permit_path: string;
  dti_permit_path: string;
  bir_cert_of_registration_path: string;
  created_at: Date;
}