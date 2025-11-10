export type JobFeedFilters = {
  courses: string[];
  locations: string[];
  workArrangement: string[];
  industries: string[];
  jobCategories: string[];
  search?: string;
  isPaid?: boolean;
};

export type ExploreType = "job-posts" | "companies";
