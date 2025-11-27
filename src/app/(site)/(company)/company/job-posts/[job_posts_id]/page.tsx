"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Building2,
  AlertCircle,
  Eye,
  Download,
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
import { ScheduleInterviewDialog } from "@/components/page_specific/company/view_job_post/ScheduleInterviewDialog";
import Location from "@/components/page_specific/explore/job-posts/sub-components/Location";
import {
  useJobPostApplications,
  useScheduleInterview,
  useUpdateCompanyStatus,
  useSelectApplicant,
  useRejectApplication,
} from "@/hooks/query/useApplications";
import { useJobPost } from "@/hooks/query/useJobPosts";
import { ApplicationWithUserDetails } from "@/types/application.types";
import { getCourseByAbbr } from "@/lib/utils";

// Status configuration matching database IDs
const statusConfig: Record<
  number,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    key: string;
  }
> = {
  8: {
    label: "Applied",
    icon: FileText,
    color: "text-blue-600",
    key: "APPLIED",
  },
  13: {
    label: "Shortlisted",
    icon: UserCheck,
    color: "text-purple-600",
    key: "SHORTLISTED",
  },
  14: {
    label: "On Hold",
    icon: Clock,
    color: "text-orange-600",
    key: "ON_HOLD",
  },
  9: {
    label: "Interview Scheduled",
    icon: CalendarCheck,
    color: "text-indigo-600",
    key: "INTERVIEW_SCHEDULED",
  },
  10: {
    label: "Selected",
    icon: Send,
    color: "text-cyan-600",
    key: "SELECTED",
  },
  11: {
    label: "Offer Accepted",
    icon: CheckCircle2,
    color: "text-green-600",
    key: "OFFER_ACCEPTED",
  },
  12: {
    label: "Selection Offer Declined",
    icon: XCircle,
    color: "text-gray-600",
    key: "OFFER_DECLINED",
  },
  3: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-600",
    key: "REJECTED",
  },
};

export default function JobDetailsPage() {
  const params = useParams();
  const job_post_id = params.job_posts_id as string;

  // Fetch job post data
  const {
    data: jobPost,
    isLoading: isLoadingJobPost,
    error: jobPostError,
  } = useJobPost(job_post_id);

  // Fetch applicants data
  const {
    data: applicants,
    isLoading,
    error,
  } = useJobPostApplications(job_post_id);

  console.log(applicants, error, jobPost);
  // Mutations
  const scheduleInterviewMutation = useScheduleInterview();
  const updateStatusMutation = useUpdateCompanyStatus();
  const selectApplicantMutation = useSelectApplicant();
  const rejectApplicationMutation = useRejectApplication();

  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    useState<ApplicationWithUserDetails | null>(null);

  const handleScheduleInterview = (applicant: ApplicationWithUserDetails) => {
    setSelectedApplicant(applicant);
    setScheduleDialogOpen(true);
  };

  const handleScheduleSubmit = (data: {
    type: "virtual" | "in-person";
    date: Date;
    time: string;
    meetLink?: string;
    location?: string;
    notes?: string;
  }) => {
    if (!selectedApplicant) return;

    const interviewDateTime = new Date(data.date);
    const [hours, minutes] = data.time.split(":");
    interviewDateTime.setHours(parseInt(hours), parseInt(minutes));

    scheduleInterviewMutation.mutate({
      application_id: selectedApplicant.application_id,
      interview_date: interviewDateTime.toISOString(),
      interview_type: data.type,
      interview_link: data.meetLink,
      interview_notes: data.notes,
    });

    setScheduleDialogOpen(false);
  };

  const handleStatusChange = (application_id: string, status_id: number) => {
    updateStatusMutation.mutate({
      application_id,
      company_status_id: status_id as 8 | 13 | 14 | 9 | 10 | 3,
    });
  };

  const handleSelectApplicant = (application_id: string) => {
    if (!confirm("Are you sure you want to select this applicant?"))
      return;

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);

    selectApplicantMutation.mutate({
      application_id,
      offer_deadline: deadline.toISOString(),
    });
  };

  const handleReject = (application_id: string) => {
    rejectApplicationMutation.mutate({
      application_id,
      rejection_reason: "Position filled / Not suitable at this time",
    });
  };

  // Organize applicants by status
  const organizeByStatus = (apps: ApplicationWithUserDetails[] | undefined) => {
    const organized: Record<string, ApplicationWithUserDetails[]> = {
      ALL: [],
      APPLIED: [],
      SHORTLISTED: [],
      ON_HOLD: [],
      INTERVIEW_SCHEDULED: [],
      SELECTED: [],
      OFFER_ACCEPTED: [],
      OFFER_DECLINED: [],
      REJECTED: [],
    };

    if (!apps || apps.length === 0) return organized;

    organized.ALL = apps;

    apps.forEach((app) => {
      // Check if offer was accepted or declined
      const isOfferAccepted = app.application_status_id === 11;
      const isOfferDeclined = app.application_status_id === 12;

      // Handle accepted selection offers
      if (isOfferAccepted) {
        organized.OFFER_ACCEPTED.push(app);
      }
      // Handle declined selection offers
      else if (isOfferDeclined) {
        organized.OFFER_DECLINED.push(app);
      }
      // Handle other statuses (not accepted/declined)
      else {
        const config =
          statusConfig[app.company_status_id as keyof typeof statusConfig];
        if (config && organized[config.key]) {
          organized[config.key].push(app);
        }
      }
    });

    return organized;
  };

  const applicantsByStatus = organizeByStatus(applicants);

  // Loading state
  if (isLoading || isLoadingJobPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || jobPostError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <Link href="/company/job-posts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Job Posts
              </Button>
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {jobPostError
                ? "Failed to load job post details."
                : "Failed to load job post applications."}{" "}
              Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // No job post found
  if (!jobPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <Link href="/company/job-posts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Job Posts
              </Button>
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Job post not found.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const renderApplicantCard = (applicant: ApplicationWithUserDetails) => {
    const statusInfo =
      statusConfig[applicant.company_status_id as keyof typeof statusConfig];
    const StatusIcon = statusInfo?.icon || FileText;
    const statusColor = statusInfo?.color || "text-gray-600";

    const handleDownloadResume = () => {
      if (!applicant.resume_path) {
        alert("No resume available for this applicant");
        return;
      }

      // Extract original file extension from path
      const originalFileName =
        applicant.resume_path.split("/").pop() || "resume";
      const fileExtension = originalFileName.includes(".")
        ? originalFileName.substring(originalFileName.lastIndexOf("."))
        : "";

      // Create formal filename: LastName_FirstName_Resume.ext
      const nameParts = applicant.user_name.trim().split(" ");
      const lastName = nameParts[nameParts.length - 1];
      const firstName = nameParts[0];
      const formalFileName = `${lastName}_${firstName}_Resume${fileExtension}`;

      // Create anchor element to force download
      const link = document.createElement("a");
      link.href = applicant.resume_path;
      link.download = formalFileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <Card
        key={applicant.application_id}
        className="hover:shadow-md transition-shadow"
      >
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={undefined} alt={applicant.user_name} />
              <AvatarFallback className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                {applicant.user_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{applicant.user_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {getCourseByAbbr(applicant.course!) ||
                      "Course not specified"}
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
                    <DropdownMenuItem
                      onClick={() =>
                        applicant.resume_path &&
                        window.open(applicant.resume_path, "_blank")
                      }
                      disabled={!applicant.resume_path}
                    >
                      View Resume
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDownloadResume}
                      disabled={!applicant.resume_path}
                    >
                      Download Resume
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleScheduleInterview(applicant)}
                    >
                      Schedule Interview
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleStatusChange(applicant.application_id, 13)
                      }
                    >
                      Move to Shortlisted
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleStatusChange(applicant.application_id, 14)
                      }
                    >
                      Put on Hold
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleSelectApplicant(applicant.application_id)}
                    >
                      Select Applicant
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleReject(applicant.application_id)}
                    >
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{applicant.user_email}</span>
                </div>
                {applicant.phone_number && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{applicant.phone_number}</span>
                  </div>
                )}
                {applicant.address && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{applicant.address}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {applicant.skills && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-50 text-green-700 border-green-200"
                  >
                    Skills: {applicant.skills.split(",").slice(0, 3).join(", ")}
                  </Badge>
                )}
                <Badge variant="outline" className={`text-xs ${statusColor}`}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {statusInfo?.label || "Unknown Status"}
                </Badge>
                {/* Show offer response status */}
                {applicant.application_status_id === 11 && (
                  <Badge className="text-xs bg-green-600 text-white">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Offer Accepted
                  </Badge>
                )}
                {applicant.application_status_id === 12 && (
                  <Badge
                    variant="outline"
                    className="text-xs border-gray-400 text-gray-700"
                  >
                    <XCircle className="mr-1 h-3 w-3" />
                    Selection Offer Declined
                  </Badge>
                )}
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
                      src={jobPost.company_image || ""}
                      alt={jobPost.company_name}
                      className="w-20 h-20 rounded-lg object-cover border shadow-sm"
                    />
                  </div>

                  {/* Company Info & Job Title */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {jobPost.company_name}
                      </h3>
                      {jobPost.industry && jobPost.industry.length > 0 && (
                        <>
                          {jobPost.industry.map((ind, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              <Building2 className="mr-1 h-3 w-3" />
                              {ind}
                            </Badge>
                          ))}
                        </>
                      )}
                    </div>
                    <h1 className="text-3xl font-semibold text-balance mb-3">
                      {jobPost.job_title}
                    </h1>

                    {/* Company Quick Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <Location
                        barangay={jobPost.barangay}
                        city_municipality={jobPost.city_municipality}
                      />
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
                    <XCircle className="mr-2 h-4 w-4" />
                    Close Posting
                  </Button>
                </div>
              </div>

              {/* Job Status & Details */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-green-600">Active</Badge>
                <Badge variant="outline">
                  <Briefcase className="mr-1 h-3 w-3" />
                  {jobPost.work_arrangement}
                </Badge>
                <Badge variant="outline">
                  {jobPost.is_paid ? "Paid" : "Unpaid"}
                </Badge>
                <Badge variant="outline">
                  {jobPost.available_positions}{" "}
                  {jobPost.available_positions === 1 ? "Position" : "Positions"}
                </Badge>
                {jobPost.job_categories.map((category, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>

              <Separator />

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  {jobPost.job_overview}
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
                      {jobPost.barangay}, {jobPost.city_municipality}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    Allowance
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {jobPost.allowance_description || "Not specified"}
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
                {jobPost.technical_skills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Technical Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {jobPost.technical_skills.map((skill, index) => (
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
                {jobPost.soft_skills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Soft Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {jobPost.soft_skills.map((skill, index) => (
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
                    {jobPost.courses_required.map((course, index) => (
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
                {jobPost.preferred_qualifications && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Preferred Qualifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {jobPost.preferred_qualifications}
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
                  {jobPost.job_responsibilities.map((responsibility, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span className="flex-shrink-0 mt-1">•</span>
                      <span className="leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
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
              <TabsList className="h-auto w-full">
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
                  value="SELECTED"
                  className="flex items-center gap-2"
                >
                  Selected
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.SELECTED.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="OFFER_ACCEPTED"
                  className="flex items-center gap-2"
                >
                  Accepted
                  <Badge variant="secondary">
                    {applicantsByStatus.OFFER_ACCEPTED.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="OFFER_DECLINED"
                  className="flex items-center gap-2"
                >
                  Declined
                  <Badge variant="secondary" className="ml-1">
                    {applicantsByStatus.OFFER_DECLINED.length}
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
                    ].map((applicant: ApplicationWithUserDetails) =>
                      renderApplicantCard(applicant)
                    )
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
        applicantName={selectedApplicant?.user_name || ""}
      />
    </div>
  );
}
