"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  ExternalLink,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Sample application data
const applications = [
  {
    id: "1",
    job_title: "Next.js Developer Intern",
    company_name: "TechNova Solutions Inc.",
    company_image: "/tech-company-logo.jpg",
    work_arrangement: "Hybrid",
    city_municipality: "Quezon City",
    barangay: "Bagumbayan",
    applied_date: "2025-11-15T10:30:00.000Z",
    status: "INTERVIEW_SCHEDULED",
    last_update: "2025-11-18T14:20:00.000Z",
    interview_date: "2025-11-20T14:00:00.000Z",
    interview_type: "virtual",
    interview_link: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    job_title: "UI/UX Designer Intern",
    company_name: "Creative Studio Co.",
    company_image: "/design-studio-logo.jpg",
    work_arrangement: "On-site",
    city_municipality: "Quezon City",
    barangay: "Commonwealth",
    applied_date: "2025-11-12T09:15:00.000Z",
    status: "APPLIED",
    last_update: "2025-11-12T09:15:00.000Z",
  },
  {
    id: "3",
    job_title: "Data Analyst Intern",
    company_name: "DataTech Analytics",
    company_image: "/data-company-logo.jpg",
    work_arrangement: "Remote",
    city_municipality: "Quezon City",
    barangay: "Batasan Hills",
    applied_date: "2025-11-08T16:45:00.000Z",
    status: "OFFER_SENT",
    last_update: "2025-11-17T11:30:00.000Z",
    offer_deadline: "2025-11-25T23:59:59.000Z",
  },
  {
    id: "4",
    job_title: "Frontend Developer Intern",
    company_name: "WebCraft Solutions",
    company_image: "",
    work_arrangement: "Hybrid",
    city_municipality: "Quezon City",
    barangay: "Tandang Sora",
    applied_date: "2025-10-28T13:20:00.000Z",
    status: "REJECTED",
    last_update: "2025-11-05T10:15:00.000Z",
  },
  {
    id: "5",
    job_title: "Mobile App Developer Intern",
    company_name: "AppVentures Inc.",
    company_image: "",
    work_arrangement: "On-site",
    city_municipality: "Quezon City",
    barangay: "Project 6",
    applied_date: "2025-11-01T11:00:00.000Z",
    status: "OFFER_ACCEPTED",
    last_update: "2025-11-16T15:40:00.000Z",
  },
];

const statusConfig = {
  APPLIED: {
    label: "Applied",
    icon: FileText,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dotColor: "bg-blue-600",
  },
  INTERVIEW_SCHEDULED: {
    label: "Interview Scheduled",
    icon: Calendar,
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    dotColor: "bg-indigo-600",
  },
  OFFER_SENT: {
    label: "Offer Sent",
    icon: AlertCircle,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    dotColor: "bg-orange-600",
  },
  OFFER_ACCEPTED: {
    label: "Offer Accepted",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700 border-green-200",
    dotColor: "bg-green-600",
  },
  OFFER_DECLINED: {
    label: "Offer Declined",
    icon: XCircle,
    color: "bg-gray-100 text-gray-700 border-gray-200",
    dotColor: "bg-gray-600",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    color: "bg-red-100 text-red-700 border-red-200",
    dotColor: "bg-red-600",
  },
  HIRED: {
    label: "Hired",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-600",
  },
};

export default function ApplicationTrackerPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredApplications =
    activeTab === "ALL"
      ? applications
      : applications.filter((app) => app.status === activeTab);

  return (
    <div className="container max-w-5xl bg-background">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Application Tracker</h1>
        <p className="text-muted-foreground">
          Track the status of all your job applications
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {applications.filter((a) => a.status === "APPLIED").length}
            </p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-indigo-600">
              {
                applications.filter((a) => a.status === "INTERVIEW_SCHEDULED")
                  .length
              }
            </p>
            <p className="text-xs text-muted-foreground">Interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">
              {applications.filter((a) => a.status === "OFFER_SENT").length}
            </p>
            <p className="text-xs text-muted-foreground">Offers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {
                applications.filter(
                  (a) => a.status === "OFFER_ACCEPTED" || a.status === "HIRED"
                ).length
              }
            </p>
            <p className="text-xs text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-6">
          <TabsTrigger value="ALL">
            All
            <Badge variant="secondary" className="ml-2">
              {applications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="APPLIED">
            Applied
            <Badge variant="secondary" className="ml-2">
              {applications.filter((a) => a.status === "APPLIED").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="INTERVIEW_SCHEDULED">
            Interview
            <Badge variant="secondary" className="ml-2">
              {
                applications.filter((a) => a.status === "INTERVIEW_SCHEDULED")
                  .length
              }
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="OFFER_SENT">
            Offers
            <Badge variant="secondary" className="ml-2">
              {applications.filter((a) => a.status === "OFFER_SENT").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="OFFER_ACCEPTED">
            Accepted
            <Badge variant="secondary" className="ml-2">
              {applications.filter((a) => a.status === "OFFER_ACCEPTED").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="REJECTED">
            Rejected
            <Badge variant="secondary" className="ml-2">
              {applications.filter((a) => a.status === "REJECTED").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="HIRED">
            Hired
            <Badge variant="secondary" className="ml-2">
              {applications.filter((a) => a.status === "HIRED").length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredApplications.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No applications found
                </h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "ALL"
                    ? "You haven't applied to any jobs yet."
                    : `You don't have any applications in "${
                        statusConfig[activeTab as keyof typeof statusConfig]
                          ?.label
                      }" status.`}
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => {
                const config =
                  statusConfig[application.status as keyof typeof statusConfig];
                const StatusIcon = config?.icon || FileText;

                return (
                  <Card
                    key={application.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        {/* Company Logo */}
                        <Avatar className="h-14 w-14 rounded-lg">
                          <AvatarImage
                            src={
                              application.company_image || "/placeholder.svg"
                            }
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
                                {application.barangay},{" "}
                                {application.city_municipality}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                Applied{" "}
                                {new Date(
                                  application.applied_date
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className={config?.color}>
                              <div
                                className={`h-2 w-2 rounded-full mr-2 ${config?.dotColor}`}
                              />
                              <StatusIcon className="mr-1 h-3.5 w-3.5" />
                              {config?.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Updated{" "}
                              {new Date(
                                application.last_update
                              ).toLocaleDateString("en-US", {
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
                                      {new Date(
                                        application.interview_date
                                      ).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
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
                                      {new Date(
                                        application.offer_deadline
                                      ).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
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
                                You&apos;ll receive onboarding details from the
                                company soon.
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
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
