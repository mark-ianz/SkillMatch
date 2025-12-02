import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import SavedItemsServices from "@/services/saved-items.services";

interface SavedJobFromDB {
  job_post_id: string;
  company_id: string;
  job_title: string;
  work_arrangement: string;
  job_categories: string[];
  job_overview: string;
  available_positions: number;
  courses_required: string[];
  job_post_status_id: number;
  job_responsibilities: string[];
  preferred_qualifications?: string | null;
  technical_skills: string[];
  soft_skills: string[];
  street_name: string;
  city_municipality: string;
  barangay: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
  company_name?: string;
  company_email?: string;
  company_image?: string;
  industry?: string[];
  saved_at: string;
}

// GET - Get all saved jobs
export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.user_id.toString();
    const savedJobs = await SavedItemsServices.getSavedJobs(userId) as SavedJobFromDB[];

    // Get user profile for course and skills matching
    const userProfile = await SavedItemsServices.getUserProfile(userId);
    const userSkills = userProfile?.skills
      ? userProfile.skills.split(",").map((s: string) => s.toLowerCase().trim())
      : [];
    const userCourse = userProfile?.course?.toLowerCase() || null;
    console.log({savedJobs, userSkills, userCourse});

    // Add matching data to each job
    const enrichedJobs = savedJobs.map((job) => {
      const technicalSkillsArray = job.technical_skills || [];
      const coursesRequiredArray = job.courses_required || [];

      // Calculate skill match count
      let matchCount = 0;
      if (userSkills.length > 0) {
        const postSkillsLowerCase = technicalSkillsArray.map((s: string) =>
          s.toLowerCase()
        );
        matchCount = userSkills.filter((userSkill: string) =>
          postSkillsLowerCase.includes(userSkill)
        ).length;
      }

      // Check if user's course matches any required courses
      const courseMatched = userCourse
        ? coursesRequiredArray.some(
            (requiredCourse: string) =>
              requiredCourse.toLowerCase() === userCourse
          )
        : false;

      return {
        ...job,
        skill_match_count: matchCount,
        course_matched: courseMatched,
      };
    });

    return NextResponse.json({ savedJobs: enrichedJobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch saved jobs" },
      { status: 500 }
    );
  }
}

// POST - Save a job
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { job_post_id } = await request.json();

    if (!job_post_id) {
      return NextResponse.json(
        { message: "Job post ID is required" },
        { status: 400 }
      );
    }

    const result = await SavedItemsServices.saveJob(
      session.user.user_id.toString(),
      job_post_id
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { message: "Failed to save job" },
      { status: 500 }
    );
  }
}

// DELETE - Unsave a job
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const job_post_id = searchParams.get("job_post_id");

    if (!job_post_id) {
      return NextResponse.json(
        { message: "Job post ID is required" },
        { status: 400 }
      );
    }

    const result = await SavedItemsServices.unsaveJob(
      session.user.user_id.toString(),
      job_post_id
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error unsaving job:", error);
    return NextResponse.json(
      { message: "Failed to unsave job" },
      { status: 500 }
    );
  }
}
