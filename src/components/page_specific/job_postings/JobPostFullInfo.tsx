"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { JobPost } from "@/types/job_post.types";
import { Briefcase } from "lucide-react";
import Image from "next/image";
import { CopyLinkButton } from "@/components/common/button/CopyLinkButton";
import { Separator } from "@/components/ui/separator";
import MatchedBadges from "../explore/job-postings/sub-components/MatchedBadges";
import JobCategories from "../explore/job-postings/sub-components/JobCategories";
import Location from "../explore/job-postings/sub-components/Location";
import { JobStatusBadge } from "@/components/common/JobStatusBadge";
import { ApplyButton } from "./ApplyButton";
import LinkWithIcon from "@/components/global/LinkWithIcon";
import { SaveJobButton } from "./SaveJobButton";

export function JobPostFullInfo({
  job,
  className,
  apply_button_classname,
  isFullView = false,
}: {
  job: JobPost;
  className?: string;
  apply_button_classname?: string;
  isFullView?: boolean;
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const jobPostUrl = `${baseUrl}/view/job-postings/${job?.job_post_id}`;

  return (
    <>
      <Card className={cn("border-1 shadow-sm p-6 w-full", className)}>
        <div className="space-y-3">
          <MatchedBadges
            badgeClassName="text-sm"
            course_matched={job.course_matched}
            skill_match_count={job.skill_match_count}
          />

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Company logo and info */}
            <div className="flex gap-4 flex-1">
              {job?.company_image && (
                <Image
                  width={80}
                  height={80}
                  src={job?.company_image}
                  alt={job?.company_name || " Company Logo"}
                  className="w-20 h-20 rounded-xl object-cover border-2 border-border"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {!isFullView ? (
                    <LinkWithIcon
                      path={`/view/job-postings/${job.job_post_id}`}
                      text={job?.job_title}
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{job?.job_title}</h1>
                  )}
                  {job?.job_post_status && (
                    <JobStatusBadge status={job.job_post_status} />
                  )}
                </div>
                <LinkWithIcon
                  path={`/view/company/${job?.company_id}`}
                  text={job?.company_name || ""}
                  className="text-lg hover:underline font-medium"
                  hasIcon={false}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 md:self-start">
              <SaveJobButton
                jobPostId={job?.job_post_id}
                className="rounded-lg h-10 w-10"
              />
              <CopyLinkButton url={jobPostUrl} />
            </div>
          </div>

          <div className="space-y-2">
            {/* Job meta information */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Location
                barangay={job.barangay}
                city_municipality={job.city_municipality}
              />
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{job?.work_arrangement}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>
                  {job?.available_positions} slot
                  {job?.available_positions && job?.available_positions > 1
                    ? "s"
                    : ""}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <JobCategories
                job_categories={job.job_categories}
                className="text-sm"
              />
            </div>

            {/* Apply Button - Will not be shown if the role is admin and company */}
            <ApplyButton
              jobPostId={job.job_post_id}
              jobTitle={job.job_title}
              companyName={job.company_name!}
              className={cn(
                "w-full h-11 text-base font-medium",
                apply_button_classname
              )}
            />
          </div>
        </div>

        {/* Divider */}
        <Separator />

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-skillmatch-dark uppercase tracking-wide">
            Overview
          </h2>
          <p className="text-sm leading-relaxed text-skillmatch-dark">
            {job?.job_overview}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-skillmatch-dark uppercase tracking-wide">
            Requirements
          </h2>

          <div className="flex flex-col gap-4">
            {job?.courses_required && job?.courses_required.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Courses Required
                </p>
                <div className="flex flex-wrap gap-2">
                  {job?.courses_required.map((course, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {job?.technical_skills && job?.technical_skills.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Technical Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {job?.technical_skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {job?.soft_skills && job?.soft_skills.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Soft Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {job?.soft_skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {job?.preferred_qualifications && (
            <div className="space-y-2 pt-2">
              <p className="text-xs font-medium text-muted-foreground">
                Preferred Qualifications
              </p>
              <p className="text-sm text-skillmatch-dark">
                {job?.preferred_qualifications}
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <Separator />

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-skillmatch-dark uppercase tracking-wide">
            Responsibilities
          </h2>

          <ul className="space-y-1">
            {job?.job_responsibilities.map((responsibility, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-skillmatch-dark">
                <span className="text-muted-foreground flex-shrink-0 mt-1">
                  •
                </span>
                <span className="leading-relaxed">{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </>
  );
}
