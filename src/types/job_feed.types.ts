export type JobFeedFilters = {
  programs: string[];
  locations: string[];
  workArrangement: string[];
  skills: string[];
  isPaid?: boolean;
};

export type FeedType = "job-posts" | "companies";
