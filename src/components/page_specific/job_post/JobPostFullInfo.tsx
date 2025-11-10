"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFeedStore } from "@/store/FeedStore";
import { Bookmark, Briefcase, Copy, MapPin } from "lucide-react";
import Image from "next/image";

export function JobPostFullInfo({ className }: { className?: string }) {
  const selected_job_post = useFeedStore((state) => state.selected_job_post);

  const handleApply = () => {
    // TODO: Implement apply functionality
    console.log("Apply clicked for job:", selected_job_post?.job_post_id);
  };

  const handleBookmark = () => {
    // TODO: Implement bookmark functionality
    console.log("Bookmark clicked");
  };

  const handleCopyLink = () => {
    // TODO: Implement copy link functionality
    console.log("Copy link clicked");
  };

  const fullAddress = `${selected_job_post?.street_name}, ${selected_job_post?.barangay}, ${selected_job_post?.city_municipality} ${selected_job_post?.postal_code}`;

  return (
    <Card className={cn("border-1 shadow-sm p-6 w-full", className)}>
      <div className="space-y-3">
        {/* Company header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {selected_job_post?.company_image && (
              <Image
                width={48}
                height={48}
                src={selected_job_post?.company_image || "/placeholder.svg"}
                alt={selected_job_post?.company_name}
                className="w-12 h-12 rounded-full object-cover mb-3"
              />
            )}
            <h1 className="text-3xl font-semibold text-skillmatch-dark text-balance">
              {selected_job_post?.job_title}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {selected_job_post?.company_name}
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
            <span>{selected_job_post?.work_arrangement}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>
              {selected_job_post?.available_positions} position
              {selected_job_post?.available_positions &&
              selected_job_post?.available_positions > 1
                ? "s"
                : ""}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {selected_job_post?.job_categories &&
            selected_job_post?.job_categories.map((category, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          {!selected_job_post?.is_paid && (
            <Badge variant="outline" className="text-xs">
              Unpaid
            </Badge>
          )}
        </div>

        {selected_job_post?.allowance_description && (
          <Badge variant="secondary" className="text-xs font-medium mt-2">
            {selected_job_post.allowance_description}
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
          {selected_job_post?.job_overview}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-skillmatch-dark uppercase tracking-wide">
          Requirements
        </h2>

        <div className="flex flex-col gap-4">
          {selected_job_post?.program_required &&
            selected_job_post?.program_required.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Program Required
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected_job_post?.program_required.map((program, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          {selected_job_post?.technical_skills &&
            selected_job_post?.technical_skills.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Technical Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected_job_post?.technical_skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          {selected_job_post?.soft_skills &&
            selected_job_post?.soft_skills.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Soft Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected_job_post?.soft_skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
        </div>

        {selected_job_post?.preferred_qualifications && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-medium text-muted-foreground">
              Preferred Qualifications
            </p>
            <p className="text-sm text-skillmatch-dark">
              {selected_job_post?.preferred_qualifications}
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
          {selected_job_post?.job_responsibilities.map(
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
