"use client";

import { CompanyPost as CompanyPostType } from "@/types/company_post.types";
import { cn } from "@/lib/utils";
import DateDifference from "@/components/common/DateDifference";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import placeholder_image from "@/images/placeholder_image.avif";

interface CompanyPostPreviewProps {
  post: CompanyPostType;
  className?: string;
  isSelected?: boolean;
}

export function CompanyPostPreview({
  post,
  className,
  isSelected = false,
}: CompanyPostPreviewProps) {
  return (
    <div
      className={cn(
        "group shadow-sm cursor-pointer rounded-lg border border-border/40 bg-background p-5 transition-all hover:border-border hover:shadow-sm",
        className,
        isSelected
          ? "border-skillmatch-primary-green hover:border-skillmatch-primary-green"
          : "border-border/40 hover:border-border"
      )}
    >
      {/* Header with company info */}
      <div className="flex items-center gap-3 mb-3">
        {post.company_image && (
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.company_image} alt={post.company_name} />
            <AvatarFallback>
              {post.company_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex-1">
          <p className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors">
            {post.company_name}
          </p>
          <DateDifference
            className="text-xs text-muted-foreground"
            date={post.created_at}
          />
        </div>
      </div>

      {/* Post title */}
      <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2">
        {post.title}
      </h3>

      {/* Post content preview */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {post.content}
      </p>

      {/* Cover image preview */}
      {post.cover_image && (
        <div className="relative w-full h-32 border rounded-md overflow-hidden">
          <Image
            src={post.cover_image || placeholder_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
