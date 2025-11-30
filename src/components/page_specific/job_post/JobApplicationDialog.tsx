"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { useUserProfile } from "@/hooks/query/useUserProfile";
import Link from "next/link";
import FileUploadField from "@/components/common/input/FileUploadField";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { getCourseByAbbr } from "@/lib/utils";

interface JobApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ApplicationData) => void;
  jobTitle: string;
  companyName: string;
}

export interface ApplicationData {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  postalCode: string;
  street: string;
  barangay: string;
  city: string;
  phoneNumber: string;
  program: string;
  technicalSkills: string[];
  // certifications: File[];
  resumePath: string | null;
  hoursRequired: string;
  proposedSchedule: string[];
}

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function JobApplicationDialog({
  open,
  onOpenChange,
  onSubmit,
  jobTitle,
  companyName,
}: JobApplicationDialogProps) {
  const { data: session } = useSession();
  const { data: userProfile, isLoading } = useUserProfile(
    session?.user?.user_id
  );
  console.log(userProfile);
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    postalCode: "",
    street: "",
    barangay: "",
    city: "",
    phoneNumber: "",
    program: "",
    technicalSkills: [],
    // certifications: [],
    resumePath: null,
    hoursRequired: "",
    proposedSchedule: [],
  });
  const [consent, setConsent] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      proposedSchedule: prev.proposedSchedule.includes(day)
        ? prev.proposedSchedule.filter((d) => d !== day)
        : [...prev.proposedSchedule, day],
    }));
  };

  // Update form data when user profile is loaded (only once)
  useEffect(() => {
    if (!userProfile || !session?.user?.email || isInitialized) return;

    console.log("User profile data loaded:", userProfile);

    setFormData({
      firstName: userProfile.first_name,
      lastName: userProfile.last_name,
      middleName: userProfile.middle_name || "",
      email: session.user.email,
      postalCode: userProfile.postal_code,
      street: userProfile.street_name,
      barangay: userProfile.barangay,
      city: userProfile.city_municipality,
      phoneNumber: userProfile.phone_number,
      program: userProfile.course || "",
      technicalSkills: userProfile.skills || [],
      // certifications: [],
      resumePath: userProfile.resume_path || null,
      hoursRequired: "",
      proposedSchedule: [],
    });
    setIsInitialized(true);
  }, [userProfile, session, isInitialized]);

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleUploadResume(file: File) {
    try {
      const fd = new FormData();
      fd.append("resume", file, file.name);
      const { data } = await api.post<{ path: string }>(
        `/onboarding/${session?.user?.user_id}/submit/5/step-five`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data?.path) {
        setFormData((prev) => ({ ...prev, resumePath: data.path }));
        toast.success("Resume uploaded successfully");
        return { path: data.path };
      }
    } catch (error) {
      toast.error("Failed to upload resume");
      console.error("Resume upload error:", error);
    }
  }

  async function handleClearResume() {
    try {
      // Clear from state optimistically
      setFormData((prev) => ({ ...prev, resumePath: null }));

      // Delete from server
      await api.post("/applicant/resume/delete", {
        user_id: session?.user?.user_id,
      });

      toast.success("Resume removed");
    } catch (error) {
      console.error("Failed to delete resume:", error);
      toast.error("Failed to remove resume");
    }
  }

  const handleSubmit = () => {
    if (!consent) return;

    console.log("Submitting application with data:", formData);
    onSubmit(formData);
    onOpenChange(false);
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.street &&
    formData.city &&
    formData.phoneNumber &&
    formData.program &&
    formData.resumePath &&
    formData.hoursRequired &&
    Number(formData.hoursRequired) > 0 &&
    formData.proposedSchedule.length > 0 &&
    consent;

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[90vw] max-w-5xl">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading your information...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-3 pb-6 border-b">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Apply as
            </p>
            <h2 className="text-3xl font-bold text-green-600">{jobTitle}</h2>
            <p className="text-base text-muted-foreground">
              at{" "}
              <span className="font-semibold text-foreground">
                {companyName}
              </span>
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Notice */}
          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md">
            <span className="text-sm text-blue-700 dark:text-blue-400">
              If your information is incorrect,{" "}
              <Link
                href="/profile"
                className="font-medium underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                edit it on your profile
              </Link>
              .
            </span>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
              Personal Information
            </h3>

            {/* Name Fields - Read Only */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Full Name</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Input
                    value={formData.firstName}
                    readOnly
                    disabled
                    className="bg-muted/50 cursor-not-allowed"
                  />
                  <span className="text-xs text-muted-foreground">
                    First Name
                  </span>
                </div>
                <div className="space-y-1">
                  <Input
                    value={formData.lastName}
                    readOnly
                    disabled
                    className="bg-muted/50 cursor-not-allowed"
                  />
                  <span className="text-xs text-muted-foreground">
                    Last Name
                  </span>
                </div>
                <div className="space-y-1">
                  <Input
                    value={formData.middleName}
                    readOnly
                    disabled
                    className="bg-muted/50 cursor-not-allowed"
                  />
                  <span className="text-xs text-muted-foreground">
                    Middle Name
                  </span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Address</Label>
              <Input
                type="email"
                placeholder="kaneki.ken@gmail.com"
                value={formData.email}
                readOnly
                disabled
                className="bg-muted/50 cursor-not-allowed"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Phone Number</Label>
              <Input
                type="tel"
                placeholder="09123456789"
                value={formData.phoneNumber}
                readOnly
                disabled
                className="bg-muted/50 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
              Address
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Postal Code</Label>
                <Input
                  placeholder="1100"
                  value={formData.postalCode}
                  readOnly
                  disabled
                  className="bg-muted/50 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Street</Label>
                <Input
                  placeholder="Blk. 123 Lot 32 Kuoang St."
                  value={formData.street}
                  readOnly
                  disabled
                  className="bg-muted/50 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Barangay</Label>
                <Input
                  placeholder="Marilag"
                  value={formData.barangay}
                  readOnly
                  disabled
                  className="bg-muted/50 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">City</Label>
                <Input
                  placeholder="Quezon City"
                  value={formData.city}
                  readOnly
                  disabled
                  className="bg-muted/50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
              Academic Information
            </h3>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Program</Label>
              <Input
                value={getCourseByAbbr(formData.program) || formData.program}
                readOnly
                disabled
                className="bg-muted/50 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Technical Skills</Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px] bg-muted/30">
                {formData.technicalSkills.length > 0 ? (
                  formData.technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2 py-1 bg-muted rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No skills listed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
              Attachments
            </h3>

            <FileUploadField
              id="resume"
              label="Resume (PDF, JPG, PNG)"
              accept=".pdf,.jpg,.jpeg,.png"
              currentPath={formData.resumePath}
              onUpload={handleUploadResume}
              onClear={handleClearResume}
              optional={false}
            />

            {/* Certifications section commented out for now
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Certifications (Optional)
              </Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="w-full justify-start h-11 bg-transparent" type="button">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Certifications
                </Button>
              </div>
            </div>
            */}
          </div>

          {/* Internship Details Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
              Internship Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Required Hours</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="400"
                    className="flex-1"
                    value={formData.hoursRequired}
                    onChange={(e) =>
                      handleInputChange("hoursRequired", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Preferred Schedule
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {weekDays.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={formData.proposedSchedule.includes(day)}
                        onCheckedChange={() => toggleDay(day)}
                      />
                      <label
                        htmlFor={day}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 py-4 px-2 bg-muted/30 rounded-lg border">
          <Checkbox
            id="consent"
            className="mt-1"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked as boolean)}
          />
          <label
            htmlFor="consent"
            className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
          >
            By applying, I consent to share my application details with the
            company and agree to be contacted regarding this internship
            opportunity.
          </label>
        </div>

        <DialogFooter className="flex gap-3 sm:justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="min-w-[120px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="min-w-[120px] bg-green-600 hover:bg-green-700"
          >
            Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
