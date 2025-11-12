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
  Instagram,
  Twitter,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CompanyProfile as CompanyProfileType } from "@/types/company.types";
import { formatDate } from "date-fns";
import Link from "next/link";

export function CompanyProfile({
  className,
  company,
}: {
  className?: string;
  company: CompanyProfileType;
}) {
  const handleBookmark = () => {
    console.log("Bookmark clicked");
  };

  const handleCopyLink = () => {
    console.log("Copy link clicked");
  };

  return (
    <Card className={cn("p-6 shadow-sm", className)}>
      <div className="space-y-6">
        <div className="flex items-start gap-6">
          {/* Square Company Logo */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-border">
            {company?.company_image ? (
              <Image
                src={company?.company_image || "/placeholder.svg"}
                alt={`${company?.company_name} logo`}
                fill
                className="object-contain"
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
              <h1 className="text-2xl font-semibold text-foreground text-balance leading-tight underline">
                <Link href={"/view/company?id=" + company.company_id}>
                  {company?.company_name}
                </Link>
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

            {company?.industry && company?.industry.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {company?.industry.map((ind, idx) => (
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

      {company?.description && (
        <>
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-skillmatch-dark uppercase tracking-wider">
              About Company
            </h2>
            <p className="text-sm text-skillmatch-dark leading-relaxed whitespace-pre-wrap">
              {company?.description}
            </p>
          </div>
          <Separator />
        </>
      )}

      {/* Contact Information Grid */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-foreground uppercase tracking-wider">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="mt-0.5 p-2.5 rounded-lg bg-muted">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                Email
              </p>
              <a
                href={`mailto:${company?.company_email}`}
                className="text-sm text-primary hover:underline break-all"
              >
                {company?.company_email}
              </a>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-start gap-4">
            <div className="mt-0.5 p-2.5 rounded-lg bg-muted">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                Mobile
              </p>
              <a
                href={`tel:${company?.phone_number}`}
                className="text-sm text-primary hover:underline"
              >
                {company?.phone_number}
              </a>
            </div>
          </div>

          {/* Telephone */}
          <div className="flex items-start gap-4">
            <div className="mt-0.5 p-2.5 rounded-lg bg-muted">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                Telephone
              </p>
              <a
                href={`tel:${company?.telephone_number}`}
                className="text-sm text-primary hover:underline"
              >
                {company?.telephone_number}
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="mt-0.5 p-2.5 rounded-lg bg-muted">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                Location
              </p>
              <p className="text-sm text-foreground">{`${company?.barangay}, ${company?.city_municipality}`}</p>
            </div>
          </div>

          {/* Website */}
          {company?.website && (
            <div className="flex items-start gap-4">
              <div className="mt-0.5 p-2.5 rounded-lg bg-muted">
                <Globe className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  Website
                </p>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {company.website}
                </a>
              </div>
            </div>
          )}

          {/* Date Founded */}
          <div className="flex items-start gap-4">
            <div className="mt-0.5 p-2.5 rounded-lg bg-muted">
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                Founded
              </p>
              <p className="text-sm text-foreground">
                {formatDate(
                  company?.date_founded || new Date(),
                  "MMMM dd, yyyy"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      {(company?.facebook_page ||
        company?.instagram_page ||
        company?.twitter_page) && (
        <>
          <Separator />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground uppercase tracking-wider">
              Connect With Us
            </h2>
            <div className="flex gap-3">
              {company?.facebook_page && (
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={company?.facebook_page}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {company?.instagram_page && (
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={company?.instagram_page}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {company?.twitter_page && (
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={company?.twitter_page}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
