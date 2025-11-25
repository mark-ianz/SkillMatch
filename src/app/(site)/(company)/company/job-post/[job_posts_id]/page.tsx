"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Mail,
  Phone,
  FileText,
  MoreVertical,
  UserCheck,
  Clock,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Send,
  MapPin,
  Briefcase,
  Users,
  Edit,
  CloverIcon as CloseIcon,
  Building2,
  Globe,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { mockCompany } from "@/lib/mock-data/company";
import { mockJobPost } from "@/lib/mock-data/job-post";
import { ScheduleInterviewDialog } from "@/components/page_specific/company/view_job_post/ScheduleInterviewDialog";
import Location from "@/components/page_specific/explore/job-posts/sub-components/Location";

// Sample applicants organized by status
const applicantsByStatus = {
  ALL: [
    {
      id: "1",
      name: "Maria Santos",
      email: "maria.santos@qcu.edu.ph",
      phone: "+63 912 345 6789",
      course: "BS Information Technology",
      year_level: "3rd Year",
      gpa: 3.8,
      status: "APPLIED",
      applied_date: "2025-11-15T10:30:00.000Z",
      skill_match: 8,
      avatar: "",
    },
    {
      id: "2",
      name: "Juan Dela Cruz",
      email: "juan.delacruz@qcu.edu.ph",
      phone: "+63 923 456 7890",
      course: "BS Computer Science",
      year_level: "4th Year",
      gpa: 3.6,
      status: "SHORTLISTED",
      applied_date: "2025-11-14T14:20:00.000Z",
      skill_match: 9,
      avatar: "",
    },
    {
      id: "3",
      name: "Ana Reyes",
      email: "ana.reyes@qcu.edu.ph",
      phone: "+63 934 567 8901",
      course: "BS Information Systems",
      year_level: "3rd Year",
      gpa: 3.9,
      status: "INTERVIEW_SCHEDULED",
      applied_date: "2025-11-13T09:15:00.000Z",
      skill_match: 10,
      avatar: "",
      interview_date: "2025-11-20T14:00:00.000Z",
      interview_type: "virtual",
      interview_link: "https://meet.google.com/abc-defg-hij",
    },
  ],
  APPLIED: [],
  SHORTLISTED: [],
  ON_HOLD: [],
  INTERVIEW_SCHEDULED: [],
  INTERVIEW_COMPLETED: [],
  OFFER_SENT: [],
  OFFER_ACCEPTED: [],
  OFFER_DECLINED: [],
  REJECTED: [],
};

// Populate status-specific arrays
applicantsByStatus.ALL.forEach((applicant) => {
  if (applicantsByStatus[applicant.status as keyof typeof applicantsByStatus]) {
    (
      applicantsByStatus[
        applicant.status as keyof typeof applicantsByStatus
      ] as any[]
    ).push(applicant);
  }
});

const statusConfig = {
  APPLIED: { label: "Applied", icon: FileText, color: "text-blue-600" },
  SHORTLISTED: {
    label: "Shortlisted",
    icon: UserCheck,
    color: "text-purple-600",
  },
  ON_HOLD: { label: "On Hold", icon: Clock, color: "text-orange-600" },
  INTERVIEW_SCHEDULED: {
    label: "Interview Scheduled",
    icon: CalendarCheck,
    color: "text-indigo-600",
  },
  INTERVIEW_COMPLETED: {
    label: "Interview Completed",
    icon: CheckCircle2,
    color: "text-teal-600",
  },
  OFFER_SENT: { label: "Offer Sent", icon: Send, color: "text-cyan-600" },
  OFFER_ACCEPTED: {
    label: "Offer Accepted",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  OFFER_DECLINED: {
    label: "Offer Declined",
    icon: XCircle,
    color: "text-gray-600",
  },
  REJECTED: { label: "Rejected", icon: XCircle, color: "text-red-600" },
};

export default function JobDetailsPage() {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  const handleScheduleInterview = (applicant: any) => {
    setSelectedApplicant(applicant);
    setScheduleDialogOpen(true);
  };

  const handleScheduleSubmit = (data: any) => {
    console.log("[v0] Schedule interview:", {
      applicant: selectedApplicant,
      ...data,
    });
    setScheduleDialogOpen(false);
  };

  const renderApplicantCard = (applicant: any) => {
    const StatusIcon =
      statusConfig[applicant.status as keyof typeof statusConfig]?.icon ||
      FileText;
    const statusColor =
      statusConfig[applicant.status as keyof typeof statusConfig]?.color ||
      "text-gray-600";

    return (
      <Card key={applicant.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={applicant.avatar || "/placeholder.svg"}
                alt={applicant.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                {applicant.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{applicant.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {applicant.course} - {applicant.year_level}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                    <DropdownMenuItem>Download Resume</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleScheduleInterview(applicant)}
                    >
                      Schedule Interview
                    </DropdownMenuItem>
                    <DropdownMenuItem>Move to Shortlisted</DropdownMenuItem>
                    <DropdownMenuItem>Put on Hold</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Send Offer</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{applicant.email}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{applicant.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  GPA: {applicant.gpa}
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-xs bg-green-50 text-green-700 border-green-200"
                >
                  {applicant.skill_match}/10 Skills Match
                </Badge>
                <Badge variant="outline" className={`text-xs ${statusColor}`}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {statusConfig[applicant.status as keyof typeof statusConfig]
                    ?.label || applicant.status}
                </Badge>
              </div>

              {applicant.interview_date && (
                <div className="mt-2 p-2 bg-indigo-50 rounded-md border border-indigo-100">
                  <p className="text-xs font-medium text-indigo-900">
                    Interview:{" "}
                    {new Date(applicant.interview_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                  {applicant.interview_type === "virtual" &&
                    applicant.interview_link && (
                      <a
                        href={applicant.interview_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:underline"
                      >
                        Join Google Meet
                      </a>
                    )}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Applied on{" "}
                {new Date(applicant.applied_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 px-4 max-w-7xl">
        {/* Back Button */}
        <Link href="/company/jobs">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Posts
          </Button>
        </Link>

        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Improved Company Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Company Logo */}
                  <div className="relative">
                    <Image
                      width={80}
                      height={80}
                      src={mockCompany.company_image || "/placeholder.svg"}
                      alt={mockCompany.company_name}
                      className="w-20 h-20 rounded-lg object-cover border shadow-sm"
                    />
                  </div>

                  {/* Company Info & Job Title */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {mockCompany.company_name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        <Building2 className="mr-1 h-3 w-3" />
                        {mockCompany.industry}
                      </Badge>
                    </div>
                    <h1 className="text-3xl font-semibold text-balance mb-3">
                      {mockJobPost.job_title}
                    </h1>

                    {/* Company Quick Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <Location
                        barangay={mockCompany.barangay}
                        city_municipality={mockCompany.city_municipality}
                      />
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>Est. {mockCompany.date_founded}</span>
                      </div>
                      <a
                        href={mockCompany.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        <span className="hover:underline">Website</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Job
                  </Button>
                  <Button variant="outline" size="sm">
                    <CloseIcon className="mr-2 h-4 w-4" />
                    Close Posting
                  </Button>
                </div>
              </div>

              {/* Job Status & Details */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-green-600">Active</Badge>
                <Badge variant="outline">
                  <Briefcase className="mr-1 h-3 w-3" />
                  {mockJobPost.work_arrangement}
                </Badge>
                <Badge variant="outline">
                  {mockJobPost.is_paid ? "Paid" : "Unpaid"}
                </Badge>
                <Badge variant="outline">
                  {mockJobPost.available_positions}{" "}
                  {mockJobPost.available_positions === 1
                    ? "Position"
                    : "Positions"}
                </Badge>
                {mockJobPost.job_categories.map((category, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>

              <Separator />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-2xl font-bold text-blue-600">
                    {applicantsByStatus.ALL.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total Applicants
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="text-2xl font-bold text-purple-600">
                    {applicantsByStatus.SHORTLISTED.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Shortlisted
                  </p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <p className="text-2xl font-bold text-indigo-600">
                    {applicantsByStatus.INTERVIEW_SCHEDULED.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Interviews
                  </p>
                </div>
              </div>

              <Separator />

              {/* Job Overview */}
              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide">
                  Overview
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {mockJobPost.job_overview}
                </p>
              </div>

              {/* Job Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    Location
                  </h3>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      {mockJobPost.barangay}, {mockJobPost.city_municipality}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    Allowance
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {mockJobPost.allowance_description}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Requirements Section */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide">
                  Requirements
                </h2>

                {/* Technical Skills */}
                {mockJobPost.technical_skills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Technical Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mockJobPost.technical_skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soft Skills */}
                {mockJobPost.soft_skills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Soft Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mockJobPost.soft_skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses Required */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Courses Required
                  </p>
                  <ul className="space-y-1">
                    {mockJobPost.courses_required.map((course, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="flex-shrink-0">•</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preferred Qualifications */}
                {mockJobPost.preferred_qualifications && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Preferred Qualifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mockJobPost.preferred_qualifications}
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Responsibilities */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide">
                  Responsibilities
                </h2>
                <ul className="space-y-2">
                  {mockJobPost.job_responsibilities.map(
                    (responsibility, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <span className="flex-shrink-0 mt-1">•</span>
                        <span className="leading-relaxed">
                          {responsibility}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applicants Section with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Applicants Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ALL" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
                <TabsTrigger value="ALL" className="flex items-center gap-2">
                  All
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.ALL.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="APPLIED"
                  className="flex items-center gap-2"
                >
                  Applied
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.APPLIED.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="SHORTLISTED"
                  className="flex items-center gap-2"
                >
                  Shortlisted
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.SHORTLISTED.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="ON_HOLD"
                  className="flex items-center gap-2"
                >
                  On Hold
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.ON_HOLD.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="INTERVIEW_SCHEDULED"
                  className="flex items-center gap-2"
                >
                  Interview
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.INTERVIEW_SCHEDULED.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="OFFER_SENT"
                  className="flex items-center gap-2"
                >
                  Offer Sent
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.OFFER_SENT.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="REJECTED"
                  className="flex items-center gap-2"
                >
                  Rejected
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.REJECTED.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              {Object.keys(applicantsByStatus).map((status) => (
                <TabsContent
                  key={status}
                  value={status}
                  className="mt-6 space-y-4"
                >
                  {applicantsByStatus[status as keyof typeof applicantsByStatus]
                    .length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        No applicants in this category
                      </p>
                    </div>
                  ) : (
                    applicantsByStatus[
                      status as keyof typeof applicantsByStatus
                    ].map((applicant: any) => renderApplicantCard(applicant))
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <ScheduleInterviewDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        onSubmit={handleScheduleSubmit}
        applicantName={selectedApplicant?.name || ""}
      />
    </div>
  );
}
