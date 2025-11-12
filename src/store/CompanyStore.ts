import { Company } from "@/types/company.types";
import { create } from "zustand";

export type CompanyStoreState = Partial<Company> & {
  setCompany: (data: Partial<Company>) => void;
  setCompanyName: (company_name: string) => void;
  setCompanyEmail: (company_email: string) => void;
  setTelephoneNumber: (telephone_number: string) => void;
  setPhoneNumber: (phone_number: string) => void;
  setCityMunicipality: (city_municipality: string) => void;
  setBarangay: (barangay: string) => void;
  setDateFounded: (date_founded: string) => void;
  setDescription: (description: string) => void;
  setIndustry: (industry: string[]) => void;
  setCompanyImage: (company_image: string) => void;
  setWebsite: (website: string) => void;
  setFacebookPage: (facebook_page: string) => void;
  setInstagramPage: (instagram_page: string) => void;
  setTwitterPage: (twitter_page: string) => void;
  setMouPath: (mou_path: string) => void;
  setLoiPath: (loi_path: string) => void;
  setCompanyProfilePath: (cp_path: string) => void;
  setBusinessPermitPath: (business_permit_path: string) => void;
  setMayorPermitPath: (mayor_permit_path: string) => void;
  setDtiPermitPath: (dti_permit_path: string) => void;
  setBirCertRegistrationPath: (bir_cert_of_registration_path: string) => void;
};

const useCompanyStore = create<CompanyStoreState>((set) => ({
  company_name: "",
  company_email: "",
  telephone_number: "",
  phone_number: "",
  city_municipality: "",
  barangay: "",
  date_founded: "",
  description: "",
  industry: [],
  company_image: "",
  website: "",
  facebook_page: "",
  instagram_page: "",
  twitter_page: "",
  mou_path: "",
  loi_path: "",
  cp_path: "",
  business_permit_path: "",
  mayor_permit_path: "",
  dti_permit_path: "",
  bir_cert_of_registration_path: "",
  setCompany: (data) => set(data),
  setCompanyName: (company_name) => set({ company_name }),
  setCompanyEmail: (company_email) => set({ company_email }),
  setTelephoneNumber: (telephone_number) => set({ telephone_number }),
  setPhoneNumber: (phone_number) => set({ phone_number }),
  setCityMunicipality: (city_municipality) => set({ city_municipality }),
  setBarangay: (barangay) => set({ barangay }),
  setDateFounded: (date_founded) => set({ date_founded }),
  setDescription: (description) => set({ description }),
  setIndustry: (industry) => set({ industry }),
  setCompanyImage: (company_image) => set({ company_image }),
  setWebsite: (website) => set({ website }),
  setFacebookPage: (facebook_page) => set({ facebook_page }),
  setInstagramPage: (instagram_page) => set({ instagram_page }),
  setTwitterPage: (twitter_page) => set({ twitter_page }),
  setMouPath: (mou_path) => set({ mou_path }),
  setLoiPath: (loi_path) => set({ loi_path }),
  setCompanyProfilePath: (cp_path) => set({ cp_path }),
  setBusinessPermitPath: (business_permit_path) => set({ business_permit_path }),
  setMayorPermitPath: (mayor_permit_path) => set({ mayor_permit_path }),
  setDtiPermitPath: (dti_permit_path) => set({ dti_permit_path }),
  setBirCertRegistrationPath: (bir_cert_of_registration_path) => set({ bir_cert_of_registration_path }),
  clearEmployer: () =>
    set({
      company_name: "",
      company_email: "",
      telephone_number: "",
      phone_number: "",
      city_municipality: "",
      barangay: "",
      date_founded: "",
      description: "",
      industry: [],
      company_image: "",
      website: "",
      facebook_page: "",
      instagram_page: "",
      twitter_page: "",
      mou_path: "",
      loi_path: "",
      cp_path: "",
      business_permit_path: "",
      mayor_permit_path: "",
      dti_permit_path: "",
      bir_cert_of_registration_path: "",
    }),
}));

export default useCompanyStore;
