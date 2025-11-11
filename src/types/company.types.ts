import { EmployerOnboardingStepOneSchema } from "@/schema/onboarding";
import { Address } from "./user.types";

export type Company = EmployerOnboardingStepOneSchema & {
  company_id: string;
  date_founded: string;
  description: string;
  industry: string[] | null;
  company_image: string | null | undefined;
  website: string;
  facebook_page: string;
  instagram_page: string;
  twitter_page: string;
  mou_path: string; // private
  loi_path: string; // private
  cp_path: string; // private
  business_permit_path: string; // private
  mayor_permit_path: string; // private
  dti_permit_path: string; // private
  bir_cert_of_registration_path: string; // private
  created_at: Date;
};

export type CompanyProfile = Omit<
  Company,
  | "mou_path"
  | "loi_path"
  | "cp_path"
  | "business_permit_path"
  | "mayor_permit_path"
  | "dti_permit_path"
  | "bir_cert_of_registration_path"
>;

export type CompanyPreview = Pick<
  Company,
  | "company_id"
  | "company_name"
  | "company_image"
  | "industry"
  | "description"
  | "created_at"
>;

export type CompanyAddress = Pick<
  Address,
  "street_name" | "barangay" | "city_municipality" | "postal_code"
>;
