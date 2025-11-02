"use client";

import React from "react";
import ProfileBanner from "@/components/page_specific/profile/ProfileBanner";
import ShortcutsCard from "@/components/page_specific/profile/ShortcutsCard";
import { JobPostFullInfo } from "@/components/page_specific/job_post/JobPostFullInfo";
import { JobPost } from "@/types/job_post.types";

export default function TestPage() {
  const dummy = {
    name: "Ken Kaneki",
    idNumber: "23-1234",
    course: "Bachelor of Science in Industrial Engineering (BSIE)",
    location: "Novaliches, Quezon City",
    // avatarSrc: '/profile/ken.png',
  };

  const job_posts_dummy: JobPost[] = [
    {
      company_name: "asdasd",
      company_image:
        "https://lh3.googleusercontent.com/a/ACg8ocKzIYPJnTrYfs4NUAEU2SHc7E3hHYLNDApbJ5TL-HqfCsQrcn-u=s96-c",
      website: null,
      facebook_page: null,
      company_email: "asdasd@asd.asdasd",
      job_post_id: 1,
      company_id: 8,
      job_title: "Frontend Developer Intern",
      work_arrangement: "On-site",
      location: "Makati City, Metro Manila",
      job_category: "IT",
      job_overview:
        "Assist our frontend team in building web pages and UI components.",
      job_responsibilities: [
        "Assist developers",
        "Join daily stand-ups",
        "Write basic HTML/CSS/JS",
      ],
      soft_skills: ["Teamwork", "Communication", "Adaptability"],
      preferred_qualifications: "Experience with React is a plus",
      is_paid: false,
      allowance_description: null,
      shift_type: "Day shift",
      working_days: "Monday-Friday",
      hours_per_week: 20,
      created_at: "2025-11-02T21:09:35.000Z",
      updated_at: "2025-11-02T21:09:35.000Z",
      technical_skills: [
        "data analysis",
        "data modeling",
        "data warehousing",
        "etl processes",
      ],
    },
    {
      company_name: "asdasd",
      company_image:
        "https://lh3.googleusercontent.com/a/ACg8ocKzIYPJnTrYfs4NUAEU2SHc7E3hHYLNDApbJ5TL-HqfCsQrcn-u=s96-c",
      website: null,
      facebook_page: null,
      company_email: "asdasd@asd.asdasd",
      job_post_id: 2,
      company_id: 8,
      job_title: "Marketing Intern",
      work_arrangement: "Hybrid",
      location: "Quezon City, Metro Manila",
      job_category: "Marketing",
      job_overview:
        "Support the marketing team in social media campaigns and content creation.",
      job_responsibilities: [
        "Create social media posts",
        "Monitor engagement",
        "Help with email campaigns",
      ],
      soft_skills: ["Creativity", "Communication", "Time management"],
      preferred_qualifications: "Basic Photoshop skills",
      is_paid: false,
      allowance_description: null,
      shift_type: "Flexible hours",
      working_days: "Monday-Friday",
      hours_per_week: 15,
      created_at: "2025-11-02T21:09:35.000Z",
      updated_at: "2025-11-02T21:09:35.000Z",
      technical_skills: ["sql tuning", "database optimization"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="mb-6 text-2xl font-semibold">
        Testing Page for Components
      </h1>
      <div className="flex flex-col gap-4">
        <ProfileBanner data={dummy} />
        <ShortcutsCard />
        <JobPostFullInfo data={job_posts_dummy[0]} />
      </div>
    </main>
  );
}
