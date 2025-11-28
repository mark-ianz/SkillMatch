import { NextResponse } from "next/server";
import { JobPostingServices } from "@/services/job-posting.services";
import { jobPostingSchema } from "@/schema/job-posting.schema";
import { formatZodError } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error, success } = jobPostingSchema.safeParse(body);
    if (!success) {
      return NextResponse.json(
        { error: formatZodError(error) },
        { status: 422 }
      );
    }

    // TODO: determine company_id from auth/session; for now require in body
    const company_id = body.company_id;
    if (!company_id) {
      return NextResponse.json(
        { error: "Missing company_id" },
        { status: 401 }
      );
    }

    try {
      const created = await JobPostingServices.createJobPost(data, company_id);
      return NextResponse.json({ job_post: created }, { status: 201 });
    } catch (err) {
      console.error("Failed to create job post", err);
      return NextResponse.json(
        { error: "Failed to create job post" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Invalid request to create job post", err);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
