import { EmployerOnboardingStepOneSchema } from "@/schema/onboarding";
import { Address } from "./user.types";

export type Company = EmployerOnboardingStepOneSchema & {
  company_id: number;
  company_image: string | null | undefined;
  mou_path: string;
  loi_path: string;
  cp_path: string;
  business_permit_path: string;
  mayor_permit_path: string;
  dti_permit_path: string;
  bir_cert_of_registration_path: string;
  created_at: Date;
};

export type CompanyProfile = Pick<
  Company,
  | "company_id"
  | "company_name"
  | "company_image"
  | "website"
  | "facebook_page"
  | "company_email"
>;

export type CompanyPreview = Pick<
  Company,
  "company_id" | "company_name" | "company_image"
>;

export type CompanyAddress = Pick<
  Address,
  "street_name" | "barangay" | "city_municipality" | "postal_code"
>;
