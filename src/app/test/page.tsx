"use client";

import React from "react";
import ProfileBanner from "@/components/page_specific/profile/ProfileBanner";
import ShortcutsCard from "@/components/page_specific/profile/ShortcutsCard";
import { JobPostFullInfo } from "@/components/page_specific/job_post/JobPostFullInfo";
import { JobPost } from "@/types/job_post.types";
import { CompanyPost } from "@/components/page_specific/company_post/CompanyPost";
import { CompanyPost as CompanyPostType } from "@/types/company_post.types";
import placeholder_image from "@/images/placeholder_image.avif";

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

  const examplePosts: CompanyPostType[] = [
    {
      post_id: "1",
      company_id: 1,
      company_name: "Tech Solutions Inc.",
      title: "Exciting Announcement! 🚀",
      content:
        "We are thrilled to announce that we are now accepting applications for our Summer Internship Program!\n\nWe are looking for talented individuals who are passionate about technology and want to make a real impact. Join our team and gain valuable experience working on real-world projects.\n\nApplications are now open!",
      cover_image:
        "https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/337895376_700307248514071_3788767865118634847_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHuVPD17Y3gCFcrXqcJ9K7Y52J06uQiE73nYnTq5CITvby-oTSFq57guCrMz_sGVGe_nuOljACwEPJimjMrA3Qh&_nc_ohc=72T5BVht4aMQ7kNvwHSDDe9&_nc_oc=Adn1BE_EuL1xGtMaY7UBsmh86CcS8XRN7x3vX616eEX7jk67NuS1fClC-gUG3yvfyqI&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=KHRB-ojqLR3a0ylna9NeJg&oh=00_Afhp8unyc8a18DNYL0vMRSfxmvdT94uv-dtlYlse63oMcw&oe=691393CF",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      post_id: "2",
      company_id: 1,
      company_name: "Tech Solutions Inc.",
      title: "Team Milestone Achievement",
      content:
        "Our development team just shipped a major feature that will revolutionize how our clients manage their projects. Thanks to everyone involved in making this possible!\n\nThis is a testament to the hard work and dedication of our amazing team members.",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-8 space-y-5">
      <h1 className="mb-6 text-2xl font-semibold">
        Testing Page for Components
      </h1>
      <div className="flex flex-col gap-4">
        <ProfileBanner data={dummy} />
        <ShortcutsCard />
        <JobPostFullInfo data={job_posts_dummy[1]} />
      </div>
      <div className="flex gap-4">
        {examplePosts.map((post) => (
          <CompanyPost post={post} key={post.post_id} />
        ))}
      </div>
    </main>
  );
}
