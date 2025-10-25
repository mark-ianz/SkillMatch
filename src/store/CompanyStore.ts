import { Company } from "@/types/company.types";
import { create } from "zustand";

export type CompanyStoreState = Partial<Company> & {
  setCompany: (data: Partial<Company>) => void;
  setCompanyName: (company_name: string) => void;
  setCompanyEmail: (company_email: string) => void;
  setTelephoneNumber: (telephone_number: string) => void;
  setPhoneNumber: (phone_number: string) => void;
  setWebsite: (website: string) => void;
  setFacebookPage: (facebook_page: string) => void;
};

const useCompanyStore = create<CompanyStoreState>((set) => ({
  company_name: "",
  company_email: "",
  telephone_number: "",
  phone_number: "",
  website: "",
  facebook_page: "",
  setCompany: (data) => set(data),
  setCompanyName: (company_name) => set({ company_name }),
  setCompanyEmail: (company_email) => set({ company_email }),
  setTelephoneNumber: (telephone_number) => set({ telephone_number }),
  setPhoneNumber: (phone_number) => set({ phone_number }),
  setWebsite: (website) => set({ website }),
  setFacebookPage: (facebook_page) => set({ facebook_page }),
  clearEmployer: () =>
    set({
      company_name: "",
      company_email: "",
      telephone_number: "",
      phone_number: "",
      website: "",
      facebook_page: "",
    }),
}));

export default useCompanyStore;
