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
      company_name: "Ambatubas Corporation",
      company_image:
        "https://lh3.googleusercontent.com/a/ACg8ocKzIYPJnTrYfs4NUAEU2SHc7E3hHYLNDApbJ5TL-HqfCsQrcn-u=s96-c",
      website: null,
      facebook_page: null,
      company_email: "aleck.biong@ambatumbas.com",
      job_post_id: 1,
      company_id: 8,
      job_title: "Frontend Developer Intern",
      work_arrangement: "On-site",
      job_category: ["IT", "Web Development"],
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
      created_at: "2025-11-02T21:09:35.000Z",
      updated_at: "2025-11-02T21:09:35.000Z",
      technical_skills: [
        "data analysis",
        "data modeling",
        "data warehousing",
        "etl processes",
      ],
      available_positions: 2,
      program_required: ["BS Computer Science", "BS Information Technology"],
      barangay: "Fort Bonifacio",
      city_municipality: "Taguig City",
      postal_code: "1102",
      street_name: "123 Developer St.",
    },
    {
      company_name: "Ambatubas Corporation",
      company_image:
        "https://lh3.googleusercontent.com/a/ACg8ocKzIYPJnTrYfs4NUAEU2SHc7E3hHYLNDApbJ5TL-HqfCsQrcn-u=s96-c",
      website: null,
      facebook_page: null,
      company_email: "zylle.palajoren@ambatumbas.com",
      job_post_id: 2,
      company_id: 8,
      job_title: "Marketing Intern",
      work_arrangement: "Hybrid",
      job_category: ["Marketing", "Digital Marketing"],
      job_overview:
        "The Marketing Intern will play an essential role in supporting the marketing team across various digital initiatives. This includes assisting in the planning and execution of social media campaigns, creating engaging content tailored for different platforms, and contributing fresh, creative ideas to strengthen brand presence. The intern will work closely with the team to ensure consistent messaging across channels, analyze engagement data to help refine strategies, and provide support in marketing operations such as email campaigns and campaign performance tracking. This role offers hands-on experience in digital marketing and exposure to real-world marketing tools and processes, making it an excellent opportunity to learn and grow in a fast-paced environment.",
      job_responsibilities: [
        "Create social media posts",
        "Monitor engagement",
        "Help with email campaigns",
      ],
      soft_skills: ["Creativity", "Communication", "Time management"],
      preferred_qualifications: "Basic Photoshop skills",
      is_paid: false,
      allowance_description: null,
      created_at: "2025-11-02T21:09:35.000Z",
      updated_at: "2025-11-02T21:09:35.000Z",
      technical_skills: ["sql tuning", "database optimization"],
      program_required: ["BS Marketing", "BS Business Administration"],
      available_positions: 3,
      barangay: "Kasilawan",
      city_municipality: "Makati City",
      postal_code: "1102",
      street_name: "123 Marketing St.",
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
        <JobPostFullInfo data={job_posts_dummy[1]} />
      </div>
    </main>
  );
}
