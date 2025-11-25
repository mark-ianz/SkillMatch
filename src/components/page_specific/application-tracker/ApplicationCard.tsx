import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  Clock,
  Building2,
  FileText,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface Application {
  id: string;
  job_title: string;
  company_name: string;
  company_image: string;
  work_arrangement: string;
  city_municipality: string;
  barangay: string;
  applied_date: string;
  status: string;
  last_update: string;
  interview_date?: string;
  interview_type?: string;
  interview_link?: string;
  offer_deadline?: string;
}

interface StatusConfig {
  label: string;
  icon: React.ElementType;
  color: string;
  dotColor: string;
}

interface ApplicationCardProps {
  application: Application;
  statusConfig: StatusConfig;
}

export function ApplicationCard({
  application,
  statusConfig,
}: ApplicationCardProps) {
  const StatusIcon = statusConfig.icon || FileText;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          {/* Company Logo */}
          <Avatar className="h-14 w-14 rounded-lg">
            <AvatarImage
              src={application.company_image || "/placeholder.svg"}
              alt={application.company_name}
            />
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white">
              {application.company_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          {/* Application Details */}
          <div className="flex-1 space-y-3">
            <div>
              <Link href={`/jobs/${application.id}`}>
                <h3 className="text-lg font-semibold hover:text-green-600 transition-colors">
                  {application.job_title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {application.company_name}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{application.work_arrangement}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {application.barangay}, {application.city_municipality}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  Applied{" "}
                  {new Date(application.applied_date).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={statusConfig.color}>
                <div
                  className={`h-2 w-2 rounded-full mr-2 ${statusConfig.dotColor}`}
                />
                <StatusIcon className="mr-1 h-3.5 w-3.5" />
                {statusConfig.label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Updated{" "}
                {new Date(application.last_update).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Interview Details */}
            {application.status === "INTERVIEW_SCHEDULED" &&
              application.interview_date && (
                <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-indigo-900 mb-1">
                        Upcoming Interview
                      </p>
                      <p className="text-sm text-indigo-700">
                        {new Date(application.interview_date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      {application.interview_type === "virtual" &&
                        application.interview_link && (
                          <a
                            href={application.interview_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline mt-2"
                          >
                            Join Google Meet
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-700"
                    >
                      {application.interview_type === "virtual"
                        ? "Virtual"
                        : "In-Person"}
                    </Badge>
                  </div>
                </div>
              )}

            {/* Offer Details */}
            {application.status === "OFFER_SENT" &&
              application.offer_deadline && (
                <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-orange-900 mb-1">
                        Offer Received
                      </p>
                      <p className="text-sm text-orange-700">
                        Respond by{" "}
                        {new Date(application.offer_deadline).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              )}

            {/* Success Message */}
            {application.status === "OFFER_ACCEPTED" && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-green-900">
                  Offer Accepted!
                </p>
                <p className="text-sm text-green-700">
                  You&apos;ll receive onboarding details from the company soon.
                </p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="md:ml-auto">
            <Link href={`/applications/${application.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
