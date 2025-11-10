export type JobFeedFilters = {
  courses: string[];
  locations: string[];
  workArrangement: string[];
  skills: string[];
  isPaid?: boolean;
};

export type ExploreType = "job-posts" | "companies";
