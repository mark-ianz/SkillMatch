"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  MapPin,
  Calendar,
  Phone,
  User,
} from "lucide-react";
import { getCourseByAbbr } from "@/lib/utils";

interface ApplicantData {
  student_number?: string | null;
  first_name: string;
  last_name: string;
  email: string;
  course: string;
  year_level?: string | null;
  required_hours?: number | null;
  preferred_schedule?: string | null;
  phone_number?: string | null;
  city_municipality?: string | null;
  created_at?: string | Date;
}

interface ApplicantProfileDialogProps {
  applicant: ApplicantData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApplicantProfileDialog({
  applicant,
  open,
  onOpenChange,
}: ApplicantProfileDialogProps) {
  if (!applicant) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <User className="h-6 w-6" />
            Applicant Profile
          </DialogTitle>
          <DialogDescription>
            View applicant information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {applicant.student_number && (
                <div>
                  <p className="text-sm text-muted-foreground">Student Number</p>
                  <p className="font-medium">{applicant.student_number}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{`${applicant.first_name} ${applicant.last_name}`}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Course</p>
                <p className="font-medium">{`${getCourseByAbbr(applicant.course)} (${applicant.course})`}</p>
              </div>
              {applicant.year_level && (
                <div>
                  <p className="text-sm text-muted-foreground">Year Level</p>
                  <p className="font-medium">{applicant.year_level}</p>
                </div>
              )}
              {applicant.required_hours && (
                <div>
                  <p className="text-sm text-muted-foreground">Required Hours</p>
                  <p className="font-medium">{applicant.required_hours} hrs</p>
                </div>
              )}
              {applicant.preferred_schedule && (
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Schedule</p>
                  <p className="font-medium">
                    {applicant.preferred_schedule.split(",").join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{applicant.email}</p>
                </div>
              </div>
              {applicant.phone_number && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{applicant.phone_number}</p>
                  </div>
                </div>
              )}
              {applicant.city_municipality && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{applicant.city_municipality}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {applicant.created_at && (
            <>
              <Separator />
              {/* Account Status */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Account Status</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">
                      {format(new Date(applicant.created_at), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
