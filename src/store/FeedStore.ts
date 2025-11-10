import { CompanyProfile } from "@/types/company.types";
import { FeedType } from "@/types/job_feed.types";
import { JobPost } from "@/types/job_post.types";
import { create } from "zustand";

interface FeedStoreState {
  feedType: FeedType;
  selected_job_post: JobPost | null;
  selected_company: CompanyProfile | null;
  setFeedType: (feedType: FeedType) => void;
  setSelectedCompany: (company: CompanyProfile | null) => void;
  setSelectedJobPost: (job_post: JobPost | null) => void;
}

export const useFeedStore = create<FeedStoreState>((set) => ({
  feedType: "job-posts",
  selected_company: null,
  selected_job_post: null,
  setFeedType: (feedType) =>
    set({
      feedType,
      // Clear selections when switching feed types
      selected_company: null,
      selected_job_post: null,
    }),
  setSelectedCompany: (company) => set({ selected_company: company }),
  setSelectedJobPost: (job_post) => set({ selected_job_post: job_post }),
}));
