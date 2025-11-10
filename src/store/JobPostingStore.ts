import { JobPost } from "@/types/job_post.types";
import { create } from "zustand";

interface JobPostingState {
  formData: Partial<JobPost>;
  setFormData: (data: Partial<JobPost>) => void;
  updateField: <K extends keyof JobPost>(field: K, value: JobPost[K]) => void;
  reset: () => void;
}

const initialState: Partial<JobPost> = {
  job_title: "",
  courses_required: [],
  job_categories: [],
  available_positions: 1,
  job_overview: "",
  job_responsibilities: [],
  preferred_qualifications: "",
  work_arrangement: "On-site",
  is_paid: false,
  allowance_description: null,
  soft_skills: [],
  technical_skills: [],
  street_name: "",
  barangay: "",
  city_municipality: "",
  postal_code: "",
};

export const useJobPostingStore = create<JobPostingState>((set) => ({
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
