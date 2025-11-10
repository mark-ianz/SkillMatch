export type JobFeedFilters = {
  courses: string[];
  locations: string[];
  workArrangement: string[];
  industries: string[];
  jobCategories: string[];
  search?: string;
  isPaid?: boolean;
};

export type CompanyFeedFilters = {
  industries: string[];
  search?: string;
};

export type ExploreType = "job-posts" | "companies";
