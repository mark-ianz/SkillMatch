import { create } from "zustand";

type CompanyProfile = {
  company_name: string;
  description: string;
  industry: string[];
  date_founded: string;
};

type ContactInfo = {
  company_email: string;
  phone_number: string;
  telephone_number: string;
  website: string;
  facebook_page: string;
  instagram_page: string;
  twitter_page: string;
};

type LocationInfo = {
  city_municipality: string;
  barangay: string;
};

type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type CompanySettingsStoreState = {
  // Company Profile
  companyProfile: CompanyProfile;
  setCompanyProfile: (profile: CompanyProfile) => void;
  updateCompanyProfileField: (field: keyof CompanyProfile, value: string | string[]) => void;

  // Company Logo
  companyLogo: File | null;
  companyLogoPreview: string | null;
  setCompanyLogo: (file: File | null) => void;
  setCompanyLogoPreview: (url: string | null) => void;

  // Contact Info
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  updateContactInfoField: (field: keyof ContactInfo, value: string) => void;

  // Location
  location: LocationInfo;
  setLocation: (location: LocationInfo) => void;
  updateLocationField: (field: keyof LocationInfo, value: string) => void;

  // Password
  passwordData: PasswordData;
  setPasswordData: (data: PasswordData) => void;
  updatePasswordField: (field: keyof PasswordData, value: string) => void;
  resetPasswordData: () => void;
};

const initialPasswordData: PasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const useCompanySettingsStore = create<CompanySettingsStoreState>((set) => ({
  // Company Profile
  companyProfile: {
    company_name: "",
    description: "",
    industry: [],
    date_founded: "",
  },
  setCompanyProfile: (profile) => set({ companyProfile: profile }),
  updateCompanyProfileField: (field, value) =>
    set((state) => ({
      companyProfile: {
        ...state.companyProfile,
        [field]: value,
      },
    })),

  // Company Logo
  companyLogo: null,
  companyLogoPreview: null,
  setCompanyLogo: (file) => set({ companyLogo: file }),
  setCompanyLogoPreview: (url) => set({ companyLogoPreview: url }),

  // Contact Info
  contactInfo: {
    company_email: "",
    phone_number: "",
    telephone_number: "",
    website: "",
    facebook_page: "",
    instagram_page: "",
    twitter_page: "",
  },
  setContactInfo: (info) => set({ contactInfo: info }),
  updateContactInfoField: (field, value) =>
    set((state) => ({
      contactInfo: {
        ...state.contactInfo,
        [field]: value,
      },
    })),

  // Location
  location: {
    city_municipality: "",
    barangay: "",
  },
  setLocation: (location) => set({ location }),
  updateLocationField: (field, value) =>
    set((state) => ({
      location: {
        ...state.location,
        [field]: value,
      },
    })),

  // Password
  passwordData: initialPasswordData,
  setPasswordData: (data) => set({ passwordData: data }),
  updatePasswordField: (field, value) =>
    set((state) => ({
      passwordData: {
        ...state.passwordData,
        [field]: value,
      },
    })),
  resetPasswordData: () => set({ passwordData: initialPasswordData }),
}));

export default useCompanySettingsStore;
