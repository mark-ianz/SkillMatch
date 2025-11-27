"use client";

import { useParams, useRouter } from "next/navigation";
import { useApplication, useRespondToOffer } from "@/hooks/query/useApplications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Briefcase,
  Calendar,
  FileText,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { statusConfig } from "@/components/page_specific/application-tracker/applicationStatusConfig";
import { useState } from "react";

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const application_id = params.application_id as string;

  const { data: application, isLoading } = useApplication(application_id);
  const respondToOfferMutation = useRespondToOffer();

  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [declineMessage, setDeclineMessage] = useState("");

  const handleAcceptOffer = () => {
    respondToOfferMutation.mutate({
      application_id,
      response: "accept",
    });
  };

  const handleDeclineOffer = () => {
    respondToOfferMutation.mutate(
      {
        application_id,
        response: "decline",
      },
      {
        onSuccess: () => {
          setShowDeclineDialog(false);
          setDeclineMessage("");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container max-w-4xl py-8">
        <Card className="p-12">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Application not found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The application you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button onClick={() => router.push("/ojt/application-tracker")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const config = statusConfig[application.application_status_id.toString() as keyof typeof statusConfig];
  const StatusIcon = config?.icon || FileText;

  return (
    <div className="container max-w-4xl py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push("/ojt/application-tracker")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Applications
      </Button>

      {/* Header Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-20 w-20 rounded-xl">
              <AvatarImage
                src={application.company_image || undefined}
                alt={application.company_name}
              />
              <AvatarFallback className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white text-2xl">
                {application.company_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Link
                href={`/view/job-post/${application.job_post_id}`}
                target="_blank"
                className="text-2xl font-bold hover:text-green-600 transition-colors inline-flex items-center gap-2"
              >
                {application.job_title}
                <ExternalLink className="h-5 w-5" />
              </Link>

              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{application.company_name}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
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
              </div>

              <div className="mt-4">
                <Badge variant="outline" className={config?.color}>
                  <div
                    className={`h-2 w-2 rounded-full mr-2 ${config?.dotColor}`}
                  />
                  <StatusIcon className="mr-1 h-3.5 w-3.5" />
                  {config?.label}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Application Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Applied */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 p-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="h-full w-0.5 bg-border mt-2" />
              </div>
              <div className="flex-1 pb-4">
                <p className="font-medium">Application Submitted</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(application.applied_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Interview Scheduled */}
            {application.interview_date && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-indigo-100 p-2">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                  </div>
                  {application.selected_date && (
                    <div className="h-full w-0.5 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium">Interview Scheduled</p>
                  <p className="text-sm text-muted-foreground">
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
                  <Badge
                    variant="secondary"
                    className="mt-2 bg-indigo-100 text-indigo-700"
                  >
                    {application.interview_type === "virtual"
                      ? "Virtual Interview"
                      : "In-Person Interview"}
                  </Badge>
                  {application.interview_type === "virtual" &&
                    application.interview_link && (
                      <div className="mt-2">
                        <a
                          href={application.interview_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                        >
                          Join Google Meet
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  {application.interview_notes && (
                    <div className="mt-2 p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium mb-1">Notes:</p>
                      <p className="text-sm text-muted-foreground">
                        {application.interview_notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Selected */}
            {application.selected_date && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-orange-100 p-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  {application.offer_response_date && (
                    <div className="h-full w-0.5 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium">Selection Offer Received</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(application.selected_date!).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                  {application.offer_deadline && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Respond by:{" "}
                      {new Date(application.offer_deadline).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  )}
                  {application.application_status_id === 10 && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleAcceptOffer}
                        disabled={respondToOfferMutation.isPending}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        {respondToOfferMutation.isPending ? "Accepting..." : "Accept Offer"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowDeclineDialog(true)}
                        disabled={respondToOfferMutation.isPending}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Decline Offer
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Offer Response */}
            {application.offer_response_date && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`rounded-full p-2 ${
                      application.application_status_id === 11
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {application.application_status_id === 11 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {application.application_status_id === 11
                      ? "Selection Offer Accepted"
                      : "Selection Offer Declined"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(application.offer_response_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                  {application.application_status_id === 11 && (
                    <div className="mt-2 p-3 bg-green-50 rounded-md border border-green-200">
                      <p className="text-sm text-green-900">
                        Congratulations! You&apos;ll receive onboarding details from the
                        company soon.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rejected */}
            {application.application_status_id === 3 && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-red-100 p-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Application Rejected</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(application.last_update).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {application.rejection_reason && (
                    <div className="mt-2 p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium mb-1">Reason:</p>
                      <p className="text-sm text-muted-foreground">
                        {application.rejection_reason}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Application Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Application Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Required Hours
              </p>
              <p className="text-sm font-semibold">
                {application.required_hours} hours
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Preferred Schedule
              </p>
              <div className="flex flex-wrap gap-1">
                {application.preferred_schedule.split(",").map((day) => (
                  <Badge key={day} variant="secondary" className="text-xs">
                    {day.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Resume
            </p>
            {application.resume_path ? (
              <a
                href={application.resume_path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline"
              >
                <FileText className="h-4 w-4" />
                View Resume
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">No resume attached</p>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Application ID</p>
              <p className="font-mono">{application.application_id}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Last Updated</p>
              <p>
                {new Date(application.last_update).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decline Offer Dialog */}
      <Dialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Decline Job Offer</DialogTitle>
            <DialogDescription>
              Are you sure you want to decline this offer from {application?.company_name}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="decline-message">
                Message (Optional)
              </Label>
              <Textarea
                id="decline-message"
                placeholder="Share your reason for declining (optional)..."
                value={declineMessage}
                onChange={(e) => setDeclineMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeclineDialog(false);
                setDeclineMessage("");
              }}
              disabled={respondToOfferMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeclineOffer}
              disabled={respondToOfferMutation.isPending}
            >
              {respondToOfferMutation.isPending ? "Declining..." : "Decline Offer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
