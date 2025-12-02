"use client";

import { CompanyPost as CompanyPostType } from "@/types/company_post.types";
import { cn } from "@/lib/utils";
import DateDifference from "@/components/common/DateDifference";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface CompanyPostPreviewProps {
  post: CompanyPostType;
  className?: string;
}

export function CompanyPostPreview({
  post,
  className,
}: CompanyPostPreviewProps) {
  return (
    <div
      className={cn(
        "group shadow-sm cursor-pointer rounded-lg border border-border/40 bg-background p-4 transition-all",
        "hover:border-skillmatch-primary-green hover:scale-[1.01]",
        className,
      )}
    >
      <div className="flex gap-4">
        {/* Left side - Square image thumbnail */}
        <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-md flex items-center justify-center overflow-hidden relative">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
          )}
        </div>

        {/* Right side - Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header with company info */}
          <div className="flex items-center gap-2 mb-2">
            {post.company_image && (
              <Avatar className="w-6 h-6">
                <AvatarImage src={post.company_image} alt={post.company_name} />
                <AvatarFallback className="text-xs">
                  {post.company_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <p className="font-semibold text-xs text-muted-foreground truncate group-hover:text-primary transition-colors">
              {post.company_name}
            </p>
          </div>

          {/* Post title */}
          <h3 className="text-sm font-bold text-foreground mb-1 line-clamp-2">
            {post.title}
          </h3>

          {/* Post content preview */}
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {post.content}
          </p>

          {/* Footer - Date and image indicator */}
          <div className="flex items-center gap-2 mt-auto text-xs text-muted-foreground">
            <DateDifference date={post.created_at} />
            {post.cover_image && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Image attached
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
