export type JobFeedFilters = {
  courses: string[];
  locations: string[];
  workArrangement: string[];
  skills: string[];
  isPaid?: boolean;
};

export type FeedType = "job-posts" | "companies";
