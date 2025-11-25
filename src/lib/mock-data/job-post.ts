import { JobPost } from "@/types/job_post.types";

export const mockJobPost: JobPost = {
  // Company Info (from CompanyPreview)
  company_id: "comp_001",
  company_name: "TechNova Solutions Inc.",
  company_image: "/tech-company-logo.jpg",
  industry: ["Information Technology", "Software Development"],
  description:
    "Leading software development company specializing in enterprise solutions and web technologies.",
  created_at: "2024-01-15T08:00:00Z",

  // Company Address
  street_name: "123 Commonwealth Avenue",
  barangay: "Diliman",
  city_municipality: "Quezon City",
  postal_code: "1101",

  // Job Post Info
  job_post_id: "job_001",
  job_title: "Frontend Developer Intern",
  courses_required: [
    "BS Computer Science",
    "BS Information Technology",
    "BS Software Engineering",
  ],
  job_categories: ["Web Development", "Frontend Development", "UI/UX"],
  available_positions: 3,
  job_post_status_id: 1, // Active
  job_post_status: "active",

  // Work Details
  job_overview:
    "We are seeking motivated Frontend Developer interns to join our dynamic web development team. You will work on real-world projects, collaborate with experienced developers, and gain hands-on experience with modern frontend technologies. This internship offers an excellent opportunity to develop your skills in React, TypeScript, and modern web development practices.",
  job_responsibilities: [
    "Develop and maintain responsive web applications using React and TypeScript",
    "Collaborate with designers to implement UI/UX designs",
    "Write clean, maintainable, and well-documented code",
    "Participate in code reviews and team meetings",
    "Debug and troubleshoot frontend issues",
    "Assist in optimizing application performance",
  ],
  preferred_qualifications:
    "Experience with React, basic understanding of Git, strong problem-solving skills, and excellent communication abilities. Portfolio or GitHub projects demonstrating frontend development skills are a plus.",
  work_arrangement: "Hybrid",
  is_paid: true,
  allowance_description: "₱8,000 - ₱12,000 monthly allowance plus transportation and meal allowances",

  // Skills
  soft_skills: [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Adaptability",
  ],
  technical_skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Tailwind CSS",
    "Git",
    "REST APIs",
  ],

  updated_at: "2024-01-15T08:00:00Z",

  // Optional matching fields
  skill_match_count: 5,
  course_matched: true,
};

// Additional mock job posts for variety
export const mockJobPosts: JobPost[] = [
  mockJobPost,
  {
    ...mockJobPost,
    job_post_id: "job_002",
    job_title: "Backend Developer Intern",
    job_categories: ["Web Development", "Backend Development", "API Development"],
    available_positions: 2,
    job_overview:
      "Join our backend team to work on scalable server-side applications and APIs. Learn Node.js, database management, and cloud deployment practices.",
    technical_skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST APIs",
      "TypeScript",
      "Git",
    ],
    allowance_description: "₱10,000 - ₱15,000 monthly allowance",
  },
  {
    ...mockJobPost,
    job_post_id: "job_003",
    job_title: "UI/UX Designer Intern",
    job_categories: ["Design", "UI/UX", "Product Design"],
    courses_required: [
      "BS Multimedia Arts",
      "BS Computer Science",
      "BS Information Technology",
    ],
    available_positions: 1,
    job_overview:
      "Create beautiful and intuitive user interfaces for our web and mobile applications. Work closely with developers and product managers.",
    technical_skills: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Prototyping",
      "User Research",
      "Wireframing",
    ],
    work_arrangement: "Remote",
    allowance_description: "₱7,000 - ₱10,000 monthly allowance",
  },
];
