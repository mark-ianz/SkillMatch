import { CompanyProfile } from "@/types/company.types";
import { ExploreType } from "@/types/job_explore.types";
import { JobPost } from "@/types/job_post.types";
import { create } from "zustand";

interface ExploreStoreState {
  exploreType: ExploreType;
  selected_job_post: JobPost | null;
  selected_company: CompanyProfile | null;
  setExploreType: (exploreType: ExploreType) => void;
  setSelectedCompany: (company: CompanyProfile | null) => void;
  setSelectedJobPost: (job_post: JobPost | null) => void;
}

export const useExploreStore = create<ExploreStoreState>((set) => ({
  exploreType: "job-posts",
  selected_company: null,
  selected_job_post: null,
  setExploreType: (exploreType) =>
    set({
      exploreType,
      // Clear selections when switching Explore types
      selected_company: null,
      selected_job_post: null,
    }),
  setSelectedCompany: (company) => set({ selected_company: company }),
  setSelectedJobPost: (job_post) => set({ selected_job_post: job_post }),
}));
