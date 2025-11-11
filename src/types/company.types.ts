import { EmployerOnboardingStepOneSchema } from "@/schema/onboarding";
import { Address } from "./user.types";

export type Company = EmployerOnboardingStepOneSchema & {
  company_id: string;
  city: string;
  barangay: string;
  date_founded: string;
  about_company: string;
  industry: string[] | null;
  description: string | null;
  company_image: string | null | undefined;
  website: string;
  facebook_page: string;
  instagram_page: string;
  twitter_page: string;
  mou_path: string;
  loi_path: string;
  cp_path: string;
  business_permit_path: string;
  mayor_permit_path: string;
  dti_permit_path: string;
  bir_cert_of_registration_path: string;
  created_at: Date;
};

export type CompanyProfile = CompanyAddress & Pick<
  Company,
  | "company_id"
  | "company_name"
  | "industry"
  | "description"
  | "company_image"
  | "website"
  | "facebook_page"
  | "company_email"
  | "created_at"
>;

export type CompanyPreview = Pick<
  Company,
  "company_id" | "company_name" | "company_image" | "industry" | "description" | "created_at"
>;

export type CompanyAddress = Pick<
  Address,
  "street_name" | "barangay" | "city_municipality" | "postal_code"
>;
