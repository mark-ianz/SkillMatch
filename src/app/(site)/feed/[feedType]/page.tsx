"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { JobPost } from "@/types/job_post.types";
import { FeedType } from "@/types/job_feed.types";
import { SidebarProfile } from "@/components/page_specific/job_feed/SidebarProfile";
import { JobFeedFilter } from "@/components/page_specific/job_feed/JobFeedFilter";
import { JobFeedHeader } from "@/components/page_specific/job_feed/JobFeedHeader";
import { JobPostPreview } from "@/components/page_specific/job_feed/JobPostPreview";
import { JobPostFullInfo } from "@/components/page_specific/job_post/JobPostFullInfo";
import MainLayout from "@/components/layout/MainLayout";

// Example job data
const EXAMPLE_JOBS: Partial<JobPost>[] = [
  {
    job_post_id: 1,
    company_id: 1,
    company_name: "JT Engineering Corps.",
    job_title: "Industrial Engineering Intern",
    work_arrangement: "On-site",
    job_category: ["IT", "Engineering"],
    job_overview:
      "Join our engineering team to gain hands-on experience in industrial processes.",
    job_responsibilities: [
      "Assist in designing industrial systems",
      "Support process improvement initiatives",
      "Conduct technical analysis and reporting",
    ],
    soft_skills: ["Communication", "Teamwork", "Problem Solving"],
    technical_skills: ["AutoCAD", "MATLAB", "Data Analysis"],
    preferred_qualifications: "Experience with manufacturing systems",
    is_paid: true,
    program_required: ["BS Industrial Engineering"],
    available_positions: 2,
    street_name: "123 Engineering St",
    barangay: "Rockville",
    city_municipality: "Quezon City",
    postal_code: "1234",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 2,
    company_id: 2,
    company_name: "Infor Philippines",
    job_title: "Quality Engineering (QA) Intern",
    work_arrangement: "Hybrid",
    job_category: ["IT", "QA"],
    job_overview:
      "Help ensure product quality through comprehensive testing and analysis.",
    job_responsibilities: [
      "Execute test cases and document results",
      "Identify and report software defects",
      "Assist in test automation",
    ],
    soft_skills: ["Attention to Detail", "Communication", "Analytical Skills"],
    technical_skills: ["Selenium", "Test Automation", "SQL"],
    is_paid: true,
    program_required: ["BS Information Technology"],
    available_positions: 3,
    street_name: "456 IT Avenue",
    barangay: "Makati",
    city_municipality: "Metro Manila",
    postal_code: "1200",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 3,
    company_id: 3,
    company_name: "TechStart Solutions",
    job_title: "Junior Web Developer Intern",
    work_arrangement: "Remote",
    job_category: ["IT", "Development"],
    job_overview:
      "Build modern web applications with a passionate development team.",
    job_responsibilities: [
      "Develop frontend components with React",
      "Implement responsive designs",
      "Collaborate with the design team",
    ],
    soft_skills: ["Creativity", "Collaboration", "Time Management"],
    technical_skills: ["React", "JavaScript", "CSS"],
    is_paid: false,
    program_required: ["BS Computer Science", "BS Information Technology"],
    available_positions: 5,
    street_name: "789 Tech Park",
    barangay: "Taguig",
    city_municipality: "Metro Manila",
    postal_code: "1630",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 4,
    company_id: 1,
    company_name: "JT Engineering Corps.",
    job_title: "Industrial Engineering Intern",
    work_arrangement: "On-site",
    job_category: ["IT", "Engineering"],
    job_overview:
      "Join our engineering team to gain hands-on experience in industrial processes.",
    job_responsibilities: [
      "Assist in designing industrial systems",
      "Support process improvement initiatives",
      "Conduct technical analysis and reporting",
    ],
    soft_skills: ["Communication", "Teamwork", "Problem Solving"],
    technical_skills: ["AutoCAD", "MATLAB", "Data Analysis"],
    preferred_qualifications: "Experience with manufacturing systems",
    is_paid: true,
    program_required: ["BS Industrial Engineering"],
    available_positions: 2,
    street_name: "123 Engineering St",
    barangay: "Rockville",
    city_municipality: "Quezon City",
    postal_code: "1234",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 5,
    company_id: 2,
    company_name: "Infor Philippines",
    job_title: "Quality Engineering (QA) Intern",
    work_arrangement: "Hybrid",
    job_category: ["IT", "QA"],
    job_overview:
      "Help ensure product quality through comprehensive testing and analysis.",
    job_responsibilities: [
      "Execute test cases and document results",
      "Identify and report software defects",
      "Assist in test automation",
    ],
    soft_skills: ["Attention to Detail", "Communication", "Analytical Skills"],
    technical_skills: ["Selenium", "Test Automation", "SQL"],
    is_paid: true,
    program_required: ["BS Information Technology"],
    available_positions: 3,
    street_name: "456 IT Avenue",
    barangay: "Makati",
    city_municipality: "Metro Manila",
    postal_code: "1200",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 6,
    company_id: 3,
    company_name: "TechStart Solutions",
    job_title: "Junior Web Developer Intern",
    work_arrangement: "Remote",
    job_category: ["IT", "Development"],
    job_overview:
      "Build modern web applications with a passionate development team.",
    job_responsibilities: [
      "Develop frontend components with React",
      "Implement responsive designs",
      "Collaborate with the design team",
    ],
    soft_skills: ["Creativity", "Collaboration", "Time Management"],
    technical_skills: ["React", "JavaScript", "CSS"],
    is_paid: false,
    program_required: ["BS Computer Science", "BS Information Technology"],
    available_positions: 5,
    street_name: "789 Tech Park",
    barangay: "Taguig",
    city_municipality: "Metro Manila",
    postal_code: "1630",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 7,
    company_id: 1,
    company_name: "JT Engineering Corps.",
    job_title: "Industrial Engineering Intern",
    work_arrangement: "On-site",
    job_category: ["IT", "Engineering"],
    job_overview:
      "Join our engineering team to gain hands-on experience in industrial processes.",
    job_responsibilities: [
      "Assist in designing industrial systems",
      "Support process improvement initiatives",
      "Conduct technical analysis and reporting",
    ],
    soft_skills: ["Communication", "Teamwork", "Problem Solving"],
    technical_skills: ["AutoCAD", "MATLAB", "Data Analysis"],
    preferred_qualifications: "Experience with manufacturing systems",
    is_paid: true,
    program_required: ["BS Industrial Engineering"],
    available_positions: 2,
    street_name: "123 Engineering St",
    barangay: "Rockville",
    city_municipality: "Quezon City",
    postal_code: "1234",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 8,
    company_id: 2,
    company_name: "Infor Philippines",
    job_title: "Quality Engineering (QA) Intern",
    work_arrangement: "Hybrid",
    job_category: ["IT", "QA"],
    job_overview:
      "Help ensure product quality through comprehensive testing and analysis.",
    job_responsibilities: [
      "Execute test cases and document results",
      "Identify and report software defects",
      "Assist in test automation",
    ],
    soft_skills: ["Attention to Detail", "Communication", "Analytical Skills"],
    technical_skills: ["Selenium", "Test Automation", "SQL"],
    is_paid: true,
    program_required: ["BS Information Technology"],
    available_positions: 3,
    street_name: "456 IT Avenue",
    barangay: "Makati",
    city_municipality: "Metro Manila",
    postal_code: "1200",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 9,
    company_id: 3,
    company_name: "TechStart Solutions",
    job_title: "Junior Web Developer Intern",
    work_arrangement: "Remote",
    job_category: ["IT", "Development"],
    job_overview:
      "Build modern web applications with a passionate development team.",
    job_responsibilities: [
      "Develop frontend components with React",
      "Implement responsive designs",
      "Collaborate with the design team",
    ],
    soft_skills: ["Creativity", "Collaboration", "Time Management"],
    technical_skills: ["React", "JavaScript", "CSS"],
    is_paid: false,
    program_required: ["BS Computer Science", "BS Information Technology"],
    available_positions: 5,
    street_name: "789 Tech Park",
    barangay: "Taguig",
    city_municipality: "Metro Manila",
    postal_code: "1630",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 10,
    company_id: 1,
    company_name: "JT Engineering Corps.",
    job_title: "Industrial Engineering Intern",
    work_arrangement: "On-site",
    job_category: ["IT", "Engineering"],
    job_overview:
      "Join our engineering team to gain hands-on experience in industrial processes.",
    job_responsibilities: [
      "Assist in designing industrial systems",
      "Support process improvement initiatives",
      "Conduct technical analysis and reporting",
    ],
    soft_skills: ["Communication", "Teamwork", "Problem Solving"],
    technical_skills: ["AutoCAD", "MATLAB", "Data Analysis"],
    preferred_qualifications: "Experience with manufacturing systems",
    is_paid: true,
    program_required: ["BS Industrial Engineering"],
    available_positions: 2,
    street_name: "123 Engineering St",
    barangay: "Rockville",
    city_municipality: "Quezon City",
    postal_code: "1234",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 11,
    company_id: 2,
    company_name: "Infor Philippines",
    job_title: "Quality Engineering (QA) Intern",
    work_arrangement: "Hybrid",
    job_category: ["IT", "QA"],
    job_overview:
      "Help ensure product quality through comprehensive testing and analysis.",
    job_responsibilities: [
      "Execute test cases and document results",
      "Identify and report software defects",
      "Assist in test automation",
    ],
    soft_skills: ["Attention to Detail", "Communication", "Analytical Skills"],
    technical_skills: ["Selenium", "Test Automation", "SQL"],
    is_paid: true,
    program_required: ["BS Information Technology"],
    available_positions: 3,
    street_name: "456 IT Avenue",
    barangay: "Makati",
    city_municipality: "Metro Manila",
    postal_code: "1200",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    job_post_id: 12,
    company_id: 3,
    company_name: "TechStart Solutions",
    job_title: "Junior Web Developer Intern",
    work_arrangement: "Remote",
    job_category: ["IT", "Development"],
    job_overview:
      "Build modern web applications with a passionate development team.",
    job_responsibilities: [
      "Develop frontend components with React",
      "Implement responsive designs",
      "Collaborate with the design team",
    ],
    soft_skills: ["Creativity", "Collaboration", "Time Management"],
    technical_skills: ["React", "JavaScript", "CSS"],
    is_paid: false,
    program_required: ["BS Computer Science", "BS Information Technology"],
    available_positions: 5,
    street_name: "789 Tech Park",
    barangay: "Taguig",
    city_municipality: "Metro Manila",
    postal_code: "1630",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function FeedPage({
  params,
}: {
  params: Promise<{ feedType: FeedType }>;
}) {
  const [selectedJobId, setSelectedJobId] = useState(
    EXAMPLE_JOBS[0].job_post_id
  );
  const searchParams = useSearchParams();
  const feedType = use(params).feedType;

  useEffect(() => {
    // TODO: Implement actual feed fetching based on feedType and filters
    console.log("Feed type:", feedType);
    console.log("Search params:", Object.fromEntries(searchParams));
  }, [feedType, searchParams]);

  const selectedJob = EXAMPLE_JOBS.find(
    (job) => job.job_post_id === selectedJobId
  );

  return (
    <MainLayout className="items-center pb-20" wrapperClassName="py-4">
      {/* <div className="min-h-screen bg-background"> */}
      <div className="flex gap-6 w-full mt-4">
        {/* Left Sidebar */}
        <div className="flex-2 sticky space-y-6 h-fit">
          <SidebarProfile />
          <JobFeedFilter className="sticky top-28" feedType={feedType} />
        </div>

        {/* Middle Feed */}
        <div className="flex-3 flex flex-col space-y-4">
          <JobFeedHeader feedType={feedType} />

          {/* Job List - Scrollable */}
          <div
            className="overflow-y-auto space-y-3"
            /*  style={{
              maxHeight: sidebarHeight ? `${sidebarHeight}px` : undefined,
            }} */
          >
            {EXAMPLE_JOBS.map((job) => (
              <div
                key={job.job_post_id}
                onClick={() => setSelectedJobId(job.job_post_id)}
                className={`cursor-pointer transition-all`}
              >
                <JobPostPreview
                  className={
                    selectedJobId === job.job_post_id
                      ? "border-skillmatch-primary-green hover:border-skillmatch-primary-green"
                      : ""
                  }
                  data={job as JobPost}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="flex-4 sticky top-28 bottom-4 pb-20 h-fit">
          {selectedJob && (
            <div className="max-h-[calc(100vh-9rem)] overflow-y-auto border pb-4 rounded-lg">
              <JobPostFullInfo className="border-0 shadow-none" data={selectedJob as JobPost} />
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </MainLayout>
  );
}
