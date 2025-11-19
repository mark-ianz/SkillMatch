"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Calendar,
  Users,
  Briefcase,
  DollarSign,
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
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ScheduleInterviewDialog } from "@/components/page_specific/company/view_job_post/ScheduleInterviewDialog";

// Sample job post data
const jobPost = {
  job_post_id: "aB1cD2eF3gH4iJ5kL6mN",
  job_title: "Next.js Developer Intern",
  work_arrangement: "Hybrid",
  job_categories: ["Information Technology / Web Development"],
  job_overview:
    "A Next.js Developer Intern assists in building and improving web applications using Next.js and modern web technologies. The intern collaborates with senior developers, contributes to UI components, integrates APIs, and learns best practices in real-world development.",
  available_positions: 2,
  courses_required: [
    "Bachelor of Science in Information Technology",
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Information Systems",
  ],
  job_responsibilities: [
    "Assist in building responsive UI using Next.js and React",
    "Help integrate API endpoints and handle data fetching",
    "Debug and test application features across browsers",
    "Collaborate with the development team and follow Agile workflows",
    "Maintain documentation and follow coding standards.",
  ],
  technical_skills: [
    "react",
    "next.js",
    "javascript",
    "typescript",
    "html",
    "css",
    "tailwind css",
    "git",
    "api handling",
    "restful api",
  ],
  soft_skills: ["communication", "teamwork", "problem solving", "adaptability"],
  preferred_qualifications:
    "Experience with Tailwind CSS or Figma, basic knowledge of deployment (Vercel)",
  is_paid: true,
  allowance_description: "₱6,000 monthly allowance",
  city_municipality: "Quezon City",
  barangay: "Bagumbayan",
  created_at: "2025-11-09T22:08:12.000Z",
};

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
  HIRED: [],
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
  HIRED: { label: "Hired", icon: CheckCircle2, color: "text-emerald-600" },
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
    <div className="container max-w-5xl bg-background">

      <div>
        {/* Back Button */}
        <Link href="/company/jobs">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Posts
          </Button>
        </Link>

        {/* Job Details Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">
                  {jobPost.job_title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge className="bg-green-600">Active</Badge>
                  <Badge variant="outline">
                    <Briefcase className="mr-1 h-3 w-3" />
                    {jobPost.work_arrangement}
                  </Badge>
                  {jobPost.is_paid && (
                    <Badge variant="outline">
                      <DollarSign className="mr-1 h-3 w-3" />
                      Paid
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Edit Job</Button>
                <Button variant="outline">Close Posting</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {applicantsByStatus.ALL.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Applicants
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">
                  {jobPost.available_positions}
                </p>
                <p className="text-sm text-muted-foreground">Positions</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">
                  {applicantsByStatus.SHORTLISTED.length}
                </p>
                <p className="text-sm text-muted-foreground">Shortlisted</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">
                  {applicantsByStatus.HIRED.length}
                </p>
                <p className="text-sm text-muted-foreground">Hired</p>
              </div>
            </div>

            {/* Job Information */}
            <div>
              <h3 className="font-semibold mb-3">Job Overview</h3>
              <p className="text-muted-foreground">{jobPost.job_overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Location</h3>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>
                    {jobPost.barangay}, {jobPost.city_municipality}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Allowance</h3>
                <p className="text-muted-foreground">
                  {jobPost.allowance_description}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Technical Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {jobPost.technical_skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Courses Required</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {jobPost.courses_required.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Applicants Section with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
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
                <TabsTrigger value="HIRED" className="flex items-center gap-2">
                  Hired
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.HIRED.length}
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
      </div>

      <ScheduleInterviewDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        onSubmit={handleScheduleSubmit}
        applicantName={selectedApplicant?.name || ""}
      />
    </div>
  );
}
