import { EmployerOnboardingStepOneSchema } from "@/schema/onboarding";
import { Address } from "./user.types";

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

export type CompanyProfile = {
  company_id: number;
  company_name: string;
  company_image: string | null;
  website: string | null;
  facebook_page: string | null;
  company_email: string;
};

export type CompanyAddress = Pick<Address, "street_name" | "barangay" | "city_municipality" | "postal_code">;