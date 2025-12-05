"use client";

import { Globe } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CompanyProfile } from "@/types/company.types";
import CompanyEmptyImage from "./CompanyEmptyImage";

interface CompanyPreviewProps {
  company: CompanyProfile;
  timePosted?: string;
  className?: string;
  isSelected?: boolean;
}

export function CompanyPreview({
  company,
  timePosted,
  className,
  isSelected = false,
}: CompanyPreviewProps) {
  return (
    <div
      className={cn(
        "flex gap-5 group cursor-pointer rounded-lg border bg-background p-5 hover:border-skillmatch-primary-green hover:shadow-sm hover:scale-[1.01] transition-all ",
        isSelected && "border-skillmatch-primary-green",
        className
      )}
    >
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-border/50">
        {company.company_image ? (
          <Image
            src={company.company_image}
            alt={`${company.company_name} logo`}
            fill
            className="object-cover"
          />
        ) : (
          <CompanyEmptyImage />
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {company.company_name}
          </h3>
          <p className="text-xs text-muted-foreground">{timePosted}</p>
        </div>

        {company.industry && company.industry.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {company.industry.slice(0, 3).map((ind, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs font-medium"
              >
                {ind}
              </Badge>
            ))}
            {company.industry.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{company.industry.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {company.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {company.description}
          </p>
        )}

        {company.website && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {company.website.replace(/^https?:\/\/(www\.)?/, "")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
