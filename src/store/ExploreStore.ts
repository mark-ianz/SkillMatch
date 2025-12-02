import { CompanyProfile } from "@/types/company.types";
import { ExploreType } from "@/types/job_explore.types";
import { JobPost } from "@/types/job_post.types";
import { create } from "zustand";

interface ExploreStoreState {
  exploreType: ExploreType;
  selected_job_post: JobPost | null;
  selected_company: CompanyProfile | null;
  isJobPostsLoading: boolean;
  isCompaniesLoading: boolean;
  setExploreType: (exploreType: ExploreType) => void;
  setSelectedCompany: (company: CompanyProfile | null) => void;
  setSelectedJobPost: (job_post: JobPost | null) => void;
  setIsJobPostsLoading: (isLoading: boolean) => void;
  setIsCompaniesLoading: (isLoading: boolean) => void;
}

export const useExploreStore = create<ExploreStoreState>((set) => ({
  exploreType: "job-postings",
  selected_company: null,
  selected_job_post: null,
  isJobPostsLoading: false,
  isCompaniesLoading: false,
  setExploreType: (exploreType) =>
    set({
      exploreType,
      // Clear selections when switching Explore types
      selected_company: null,
      selected_job_post: null,
    }),
  setSelectedCompany: (company) => set({ selected_company: company }),
  setSelectedJobPost: (job_post) => set({ selected_job_post: job_post }),
  setIsJobPostsLoading: (isLoading) => set({ isJobPostsLoading: isLoading }),
  setIsCompaniesLoading: (isLoading) => set({ isCompaniesLoading: isLoading }),
}));
