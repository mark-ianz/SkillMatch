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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
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
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: student.first_name || "",
    last_name: student.last_name || "",
    course: student.course || "",
    year_level: student.year_level || "",
    required_hours: student.required_hours?.toString() || "",
  });

  const queryClient = useQueryClient();

  const updateApplicantMutation = useMutation({
    mutationFn: async (data: Partial<ApplicantProfileAndUser & Account>) => {
      await api.patch(`/admin/applicants/${student.user_id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-applicants"] });
      toast.success("Applicant updated successfully");
      setEditMode(false);
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Failed to update student");
    },
  });

  const handleSubmit = () => {
    const updates: Partial<ApplicantProfileAndUser & Account> = {};

    if (formData.first_name !== student.first_name) {
      updates.first_name = formData.first_name;
    }
    if (formData.last_name !== student.last_name) {
      updates.last_name = formData.last_name;
    }
    if (formData.course !== student.course) {
      updates.course = formData.course;
    }
    if (formData.year_level !== student.year_level) {
      updates.year_level = formData.year_level;
    }
    if (formData.required_hours !== student.required_hours?.toString()) {
      updates.required_hours = parseInt(formData.required_hours) || 0;
    }

    updateApplicantMutation.mutate(updates);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Applicant Details</DialogTitle>
          <DialogDescription>
            {editMode
              ? "Edit student information"
              : "View and manage student account"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              {!editMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              )}
            </div>

            {editMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData({ ...formData, last_name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year_level">Year Level</Label>
                    <Input
                      id="year_level"
                      value={formData.year_level}
                      onChange={(e) =>
                        setFormData({ ...formData, year_level: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="required_hours">Required Hours</Label>
                    <Input
                      id="required_hours"
                      type="number"
                      value={formData.required_hours}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          required_hours: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
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
            )}
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
          {editMode ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setEditMode(false);
                  setFormData({
                    first_name: student.first_name || "",
                    last_name: student.last_name || "",
                    course: student.course || "",
                    year_level: student.year_level || "",
                    required_hours: student.required_hours?.toString() || "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={updateApplicantMutation.isPending}
              >
                {updateApplicantMutation.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
