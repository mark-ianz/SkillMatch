import { CompanyPostFormData } from "@/schema/company-post.schema";
import { create } from "zustand";

interface CompanyPostState {
  formData: Partial<CompanyPostFormData>;
  setFormData: (data: Partial<CompanyPostFormData>) => void;
  updateField: <K extends keyof CompanyPostFormData>(
    field: K,
    value: CompanyPostFormData[K]
  ) => void;
  reset: () => void;
}

const initialState: Partial<CompanyPostFormData> = {
  title: "",
  content: "",
  cover_image: null,
};

export const useCompanyPostStore = create<CompanyPostState>((set) => ({
  formData: initialState,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  reset: () => set({ formData: initialState }),
}));
