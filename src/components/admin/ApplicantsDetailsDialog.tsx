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
} from "lucide-react";
import { ApplicantProfileAndUser } from "@/types/applicant_profile.types";
import { Account } from "@/types/user.types";
import { getCourseByAbbr } from "@/lib/utils";

interface ApplicantDetailsDialogProps {
  student: ApplicantProfileAndUser & Account;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApplicantDetailsDialog({
  student,
  open,
  onOpenChange,
}: ApplicantDetailsDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Applicant Details</DialogTitle>
          <DialogDescription>
            View student account information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Student Number</p>
                <p className="font-medium">{student.student_number}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{`${student.first_name} ${student.last_name}`}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  Course
                </p>
                <p className="font-medium">{`${getCourseByAbbr(student.course)} (${student.course})`}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Year Level</p>
                <p className="font-medium">{student.year_level || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  Required Hours
                </p>
                <p className="font-medium">
                  {student.required_hours
                    ? `${student.required_hours} hrs`
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  Preferred Schedule
                </p>
                <p className="font-medium">
                  {student.preferred_schedule?.split(",").join(", ") || "N/A"}
                </p>
              </div>
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
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>
              {student.phone_number && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{student.phone_number}</p>
                  </div>
                </div>
              )}
              {student.city_municipality && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{student.city_municipality}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Account Status */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account Status</h3>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="font-medium">
                  {format(new Date(student.created_at), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
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
