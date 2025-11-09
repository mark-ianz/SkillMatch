import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { JobPost } from "@/types/job_post.types";
import { Bookmark, Briefcase, Copy, MapPin } from "lucide-react";
import Image from "next/image";

export function JobPostFullInfo({
  data,
  className,
}: {
  data: JobPost;
  className?: string;
}) {
  const handleApply = () => {
    // TODO: Implement apply functionality
    console.log("Apply clicked for job:", data.job_post_id);
  };

  const handleBookmark = () => {
    // TODO: Implement bookmark functionality
    console.log("Bookmark clicked");
  };

  const handleCopyLink = () => {
    // TODO: Implement copy link functionality
    console.log("Copy link clicked");
  };

  const fullAddress = `${data.street_name}, ${data.barangay}, ${data.city_municipality} ${data.postal_code}`;

  return (
    <Card className={cn("border-1 shadow-sm p-6 w-full", className)}>
      <div className="space-y-3">
        {/* Company header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {data.company_image && (
              <Image
                width={48}
                height={48}
                src={data.company_image || "/placeholder.svg"}
                alt={data.company_name}
                className="w-12 h-12 rounded-full object-cover mb-3"
              />
            )}
            <h1 className="text-3xl font-semibold text-foreground text-balance">
              {data.job_title}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {data.company_name}
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
            <span>{data.work_arrangement}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>
              {data.available_positions} position
              {data.available_positions > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {data.job_category &&
            data.job_category.map((category, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          {!data.is_paid && (
            <Badge variant="outline" className="text-xs">
              Unpaid
            </Badge>
          )}
        </div>

        {data.allowance_description && (
          <Badge variant="secondary" className="text-xs font-medium mt-2">
            {data.allowance_description}
          </Badge>
        )}
      </div>

      {/* Divider */}
      <div className="border-t" />

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Overview
        </h2>
        <p className="text-sm leading-relaxed text-foreground">
          {data.job_overview}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Requirements
        </h2>

        <div className="flex flex-col gap-4">
          {data.program_required && data.program_required.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Program Required
              </p>
              <div className="flex flex-wrap gap-2">
                {data.program_required.map((program, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {program}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {data.technical_skills && data.technical_skills.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Technical Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {data.technical_skills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {data.soft_skills && data.soft_skills.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Soft Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {data.soft_skills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.preferred_qualifications && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-medium text-muted-foreground">
              Preferred Qualifications
            </p>
            <p className="text-sm text-foreground">
              {data.preferred_qualifications}
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t" />

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Responsibilities
        </h2>

        <ul className="space-y-1">
          {data.job_responsibilities.map((responsibility, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-foreground">
              <span className="text-muted-foreground flex-shrink-0 mt-1">
                •
              </span>
              <span className="leading-relaxed">{responsibility}</span>
            </li>
          ))}
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
