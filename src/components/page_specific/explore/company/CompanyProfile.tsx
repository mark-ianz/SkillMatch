"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bookmark,
  Copy,
  Globe,
  Mail,
  Facebook,
  Building2,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useFeedStore } from "@/store/FeedStore";

export function CompanyProfile({ className }: {className?: string;}) {
  const selected_company = useFeedStore((state) => state.selected_company);

  const handleBookmark = () => {
    console.log("Bookmark clicked");
  };

  const handleCopyLink = () => {
    console.log("Copy link clicked");
  };

  const createdDate = selected_company?.created_at
    ? new Date(selected_company?.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently Added";

  return (
    <Card className={cn("p-6 border-0 shadow-sm overflow-hidden", className)}>
      <div className="space-y-6">
        <div className="flex items-start gap-6">
          {/* Square Company Logo */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-border">
            {selected_company?.company_image ? (
              <Image
                src={selected_company?.company_image || "/placeholder.svg"}
                alt={`${selected_company?.company_name} logo`}
                fill
                className="object-contain p-4"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 className="w-12 h-12 text-muted-foreground/40" />
              </div>
            )}
          </div>

          {/* Company Name and Actions */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl font-bold text-foreground text-balance leading-tight">
                {selected_company?.company_name}
              </h1>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className="h-9 w-9"
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyLink}
                  className="h-9 w-9"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {selected_company?.industry && selected_company?.industry.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selected_company?.industry.map((ind, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-sm font-medium px-3 py-1"
                  >
                    {ind}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {selected_company?.description && (
        <>
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-skillmatch-dark uppercase tracking-wider">
              About Company
            </h2>
            <p className="text-base text-skillmatch-dark leading-relaxed whitespace-pre-wrap">
              {selected_company?.description}
            </p>
          </div>
          <Separator />
        </>
      )}

      <div className="space-y-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Contact Information
        </h2>

        <div className="space-y-4">
          {selected_company?.company_email && (
            <div className="flex items-start gap-4">
              <div className="mt-0.5 p-2 rounded-lg bg-muted">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <a
                  href={`mailto:${selected_company?.company_email}`}
                  className="text-sm text-primary hover:underline break-all"
                >
                  {selected_company?.company_email}
                </a>
              </div>
            </div>
          )}

          {selected_company?.website && (
            <div className="flex items-start gap-4">
              <div className="mt-0.5 p-2 rounded-lg bg-muted">
                <Globe className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Website</p>
                <a
                  href={selected_company?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {selected_company?.website}
                </a>
              </div>
            </div>
          )}

          {selected_company?.facebook_page && (
            <div className="flex items-start gap-4">
              <div className="mt-0.5 p-2 rounded-lg bg-muted">
                <Facebook className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Facebook</p>
                <a
                  href={selected_company?.facebook_page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Facebook Page
                </a>
              </div>
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className="mt-0.5 p-2 rounded-lg bg-muted">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Joined</p>
              <p className="text-sm text-foreground">{createdDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
