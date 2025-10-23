import { Company } from "@/types/company.types";
import { create } from "zustand";

export type CompanyStoreState = Partial<Company> & {
  setCompany: (data: Partial<Company>) => void;
};

const useCompanyStore = create<CompanyStoreState>((set) => ({
  company_name: "",
  company_email: "",
  telephone_number: "",
  phone_number: "",
  website: "",
  facebook_page: "",
  setCompany: (data) => set(data),
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
