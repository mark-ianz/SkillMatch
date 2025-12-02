export type JobExploreFilters = {
  courses: string[];
  locations: string[];
  workArrangement: string[];
  industries: string[];
  jobCategories: string[];
  search?: string;
};

export type CompanyExploreFilters = {
  industries: string[];
  search?: string;
};

export type ExploreType = "job-postings" | "companies";
