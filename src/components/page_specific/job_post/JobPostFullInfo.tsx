"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { JobPost } from "@/types/job_post.types";
import { Bookmark, Briefcase, Copy, MapPin } from "lucide-react";
import Image from "next/image";

export function JobPostFullInfo({ job, className }: { job: JobPost; className?: string }) {
  const handleApply = () => {
    // TODO: Implement apply functionality
    console.log("Apply clicked for job:", job?.job_post_id);
  };

  const handleBookmark = () => {
    // TODO: Implement bookmark functionality
    console.log("Bookmark clicked");
  };

  const handleCopyLink = () => {
    // TODO: Implement copy link functionality
    console.log("Copy link clicked");
  };

  const fullAddress = `${job?.street_name}, ${job?.barangay}, ${job?.city_municipality} ${job?.postal_code}`;

  return (
    <Card className={cn("border-1 shadow-sm p-6 w-full", className)}>
      <div className="space-y-3">
        {/* Company header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {job?.company_image && (
              <Image
                width={48}
                height={48}
                src={job?.company_image || "/placeholder.svg"}
                alt={job?.company_name}
                className="w-12 h-12 rounded-full object-cover mb-3"
              />
            )}
            <h1 className="text-3xl font-semibold text-skillmatch-dark text-balance">
              {job?.job_title}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {job?.company_name}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className="rounded-lg h-10 w-10"
            >
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyLink}
              className="rounded-lg h-10 w-10"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Job meta information */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{fullAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>{job?.work_arrangement}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>
              {job?.available_positions} position
              {job?.available_positions &&
              job?.available_positions > 1
                ? "s"
                : ""}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {job?.job_categories &&
            job?.job_categories.map((category, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          {!job?.is_paid && (
            <Badge variant="outline" className="text-xs">
              Unpaid
            </Badge>
          )}
        </div>

        {job?.allowance_description && (
          <Badge variant="secondary" className="text-xs font-medium mt-2">
            {job.allowance_description}
          </Badge>
        )}
      </div>

      {/* Divider */}
      <div className="border-t" />

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
          {job?.courses_required &&
            job?.courses_required.length > 0 && (
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

          {job?.technical_skills &&
            job?.technical_skills.length > 0 && (
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

          {job?.soft_skills &&
            job?.soft_skills.length > 0 && (
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
      <div className="border-t" />

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-skillmatch-dark uppercase tracking-wide">
          Responsibilities
        </h2>

        <ul className="space-y-1">
          {job?.job_responsibilities.map(
            (responsibility, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-skillmatch-dark">
                <span className="text-muted-foreground flex-shrink-0 mt-1">
                  •
                </span>
                <span className="leading-relaxed">{responsibility}</span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t" />

      <Button
        onClick={handleApply}
        className="w-full h-11 text-base font-medium"
      >
        Apply Now
      </Button>
    </Card>
  );
}
