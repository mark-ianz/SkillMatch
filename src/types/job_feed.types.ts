export type JobFeedFilters = {
  courses: string[];
  locations: string[];
  workArrangement: string[];
  isPaid?: boolean;
};

export type ExploreType = "job-posts" | "companies";
