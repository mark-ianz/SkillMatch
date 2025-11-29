"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { toast } from "sonner";
import SelectCityMunicipality from "@/components/common/input/SelectCityMunicipality";
import SelectBarangay from "@/components/common/input/SelectBarangay";
import SearchSkill from "@/components/common/input/SearchSkill";
import {
  useUserSettings,
  useUpdatePersonalInfo,
  useUpdateProfilePicture,
  useUpdatePassword,
  useUpdateResume,
  useUpdateAvailability,
  useUpdateSkills,
  useUpdateEducation,
} from "@/hooks/query/useUserSettings";
import { format } from "date-fns";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MAXIMUM_SKILLS = parseInt(
  process.env.NEXT_PUBLIC_MAXIMUM_SKILLS as string
);

export default function OJTSettingsPage() {
  // Query and mutations
  const { data: settings, isLoading } = useUserSettings();
  const updatePersonalInfoMutation = useUpdatePersonalInfo();
  const updateProfilePictureMutation = useUpdateProfilePicture();
  const updatePasswordMutation = useUpdatePassword();
  const updateResumeMutation = useUpdateResume();
  const updateAvailabilityMutation = useUpdateAvailability();
  const updateSkillsMutation = useUpdateSkills();
  const updateEducationMutation = useUpdateEducation();

  console.log({settings})
  // Personal Info state
  const [personalInfo, setPersonalInfo] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    street_name: "",
    house_number: "",
    subdivision: "",
    postal_code: "",
    barangay: "",
    city_municipality: "",
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Profile picture state
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);

  // Resume state
  const [resume, setResume] = useState<File | null>(null);

  // Availability state
  const [availability, setAvailability] = useState({
    preferred_schedule: [] as string[],
    required_hours: 0,
  });

  // Skills state
  const [skills, setSkills] = useState<string[]>([]);

  // Education state
  const [education, setEducation] = useState({
    student_number: "",
    college: "",
    course: "",
    year_level: "3rd year" as "3rd year" | "4th year",
    expected_graduation_year: new Date().getFullYear().toString(),
  });

  // Initialize form states when settings are loaded
  useEffect(() => {
    if (settings) {
      setPersonalInfo({
        first_name: settings.first_name || "",
        middle_name: settings.middle_name || "",
        last_name: settings.last_name || "",
        phone_number: settings.phone_number || "",
        street_name: settings.street_name || "",
        house_number: settings.house_number || "",
        subdivision: settings.subdivision || "",
        postal_code: settings.postal_code || "",
        barangay: settings.barangay || "",
        city_municipality: settings.city_municipality || "",
      });

      setAvailability({
        preferred_schedule: settings.preferred_schedule
          ? settings.preferred_schedule.split(",")
          : [],
        required_hours: settings.required_hours || 0,
      });

      setSkills(settings.skills || []);

      setEducation({
        student_number: settings.student_number || "",
        college: settings.college || "",
        course: settings.course || "",
        year_level:
          (settings.year_level as "3rd year" | "4th year") || "3rd year",
        expected_graduation_year:
          settings.expected_graduation_year ||
          new Date().getFullYear().toString(),
      });

      setProfilePicturePreview(settings.ojt_image_path);
    }
  }, [settings]);

  // Update personal information
  const handleUpdatePersonalInfo = () => {
    updatePersonalInfoMutation.mutate(personalInfo);
  };

  // Update profile picture
  const handleUpdateProfilePicture = () => {
    if (!profilePicture) {
      toast.error("Please select an image");
      return;
    }

    updateProfilePictureMutation.mutate(profilePicture, {
      onSuccess: (data) => {
        setProfilePicturePreview(data.data.ojt_image_path);
        setProfilePicture(null);
      },
    });
  };

  // Update password
  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    updatePasswordMutation.mutate(
      {
        currentPassword: settings?.has_password
          ? passwordData.currentPassword
          : undefined,
        newPassword: passwordData.newPassword,
      },
      {
        onSuccess: () => {
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
      }
    );
  };

  // Update resume
  const handleUpdateResume = () => {
    if (!resume) {
      toast.error("Please select a resume file");
      return;
    }

    updateResumeMutation.mutate(resume, {
      onSuccess: () => {
        setResume(null);
      },
    });
  };

  // Update availability
  const handleUpdateAvailability = () => {
    updateAvailabilityMutation.mutate({
      preferred_schedule: availability.preferred_schedule.join(","),
      required_hours: availability.required_hours,
    });
  };

  // Update skills
  const handleUpdateSkills = () => {
    updateSkillsMutation.mutate({ skills });
  };

  // Update education
  const handleUpdateEducation = () => {
    updateEducationMutation.mutate(education);
  };

  // Toggle day selection
  const toggleDay = (day: string) => {
    if (availability.preferred_schedule.includes(day)) {
      setAvailability({
        ...availability,
        preferred_schedule: availability.preferred_schedule.filter(
          (d) => d !== day
        ),
      });
    } else {
      setAvailability({
        ...availability,
        preferred_schedule: [...availability.preferred_schedule, day],
      });
    }
  };

  // Handle profile picture file change
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <div className="container py-8">Loading settings...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      readOnly
                      id="first_name"
                      value={personalInfo.first_name}
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middle_name">Middle Name</Label>
                    <Input
                      readOnly
                      id="middle_name"
                      value={personalInfo.middle_name}
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      readOnly
                      id="last_name"
                      value={personalInfo.last_name}
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      id="phone_number"
                      value={personalInfo.phone_number}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          phone_number: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold">Address</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="street_name">Street Name</Label>
                      <Input
                        id="street_name"
                        value={personalInfo.street_name}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            street_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="house_number">House Number</Label>
                      <Input
                        id="house_number"
                        value={personalInfo.house_number}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            house_number: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subdivision">
                        Subdivision{" "}
                        <span className="text-muted-foreground">
                          (Optional)
                        </span>
                      </Label>
                      <Input
                        id="subdivision"
                        value={personalInfo.subdivision}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            subdivision: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal_code">Postal Code</Label>
                      <Input
                        id="postal_code"
                        value={personalInfo.postal_code}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            postal_code: e.target.value,
                          })
                        }
                      />
                    </div>
                    <SelectCityMunicipality
                      value={personalInfo.city_municipality}
                      onValueChange={(value) =>
                        setPersonalInfo({
                          ...personalInfo,
                          city_municipality: value,
                        })
                      }
                    />
                    <SelectBarangay
                      value={personalInfo.barangay}
                      onValueChange={(value) =>
                        setPersonalInfo({
                          ...personalInfo,
                          barangay: value,
                        })
                      }
                      selected_city_municipality={
                        personalInfo.city_municipality
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleUpdatePersonalInfo}>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Upload or change your profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profilePicturePreview && (
                  <div className="relative w-32 h-32">
                    <Image
                      src={profilePicturePreview}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="profile_picture">Choose Image</Label>
                  <Input
                    id="profile_picture"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleProfilePictureChange}
                  />
                </div>
                <Button
                  onClick={handleUpdateProfilePicture}
                  disabled={!profilePicture}
                >
                  Upload Picture
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Address</CardTitle>
                <CardDescription>
                  Your email address (view only)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input 
                  value={settings?.email || ""} 
                  readOnly 
                  className="bg-muted cursor-not-allowed"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Birthdate</CardTitle>
                <CardDescription>
                  Your birthdate (view only)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input 
                  value={settings?.birthdate ? format(new Date(settings.birthdate), "MMMM dd, yyyy") : ""} 
                  readOnly 
                  className="bg-muted cursor-not-allowed"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {settings?.has_password
                    ? "Change Password"
                    : "Create Password"}
                </CardTitle>
                <CardDescription>
                  {settings?.has_password
                    ? "Update your password"
                    : "Set a password for your account"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings?.has_password && (
                  <div className="space-y-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input
                      id="current_password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <Button onClick={handleUpdatePassword}>
                  {settings?.has_password
                    ? "Update Password"
                    : "Create Password"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resume</CardTitle>
                <CardDescription>
                  Upload or replace your resume (PDF only)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings?.resume_path && (
                  <div className="text-sm">
                    Current resume:{" "}
                    <a
                      href={settings.resume_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="resume">Choose Resume (PDF)</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                  />
                </div>
                <Button onClick={handleUpdateResume} disabled={!resume}>
                  Upload Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Availability */}
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>
                Set your preferred schedule and required hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="mb-3 block">
                  Preferred Schedule (Days of the Week)
                </Label>
                <div className="space-y-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={availability.preferred_schedule.includes(day)}
                        onCheckedChange={() => toggleDay(day)}
                      />
                      <Label htmlFor={day} className="cursor-pointer">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="required_hours">Required Hours</Label>
                <Input
                  id="required_hours"
                  type="number"
                  min="0"
                  value={availability.required_hours}
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      required_hours: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Total hours required for your OJT program
                </p>
              </div>

              <Button onClick={handleUpdateAvailability}>
                Save Availability
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Manage your skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchSkill
                selectedSkills={skills}
                onSkillsChange={setSkills}
                maxSkills={MAXIMUM_SKILLS}
                skillType="technical"
              />
              <p className="text-xs text-muted-foreground">
                Maximum of {MAXIMUM_SKILLS} skills. {skills.length}/{MAXIMUM_SKILLS}
              </p>

              <Button onClick={handleUpdateSkills}>Save Skills</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Details */}
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education Details</CardTitle>
              <CardDescription>
                Update your educational information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student_number">Student Number</Label>
                  <Input
                    id="student_number"
                    value={education.student_number}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        student_number: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College</Label>
                  <Input
                    id="college"
                    value={education.college}
                    onChange={(e) =>
                      setEducation({ ...education, college: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={education.course}
                    onChange={(e) =>
                      setEducation({ ...education, course: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year_level">Year Level</Label>
                  <select
                    id="year_level"
                    value={education.year_level}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        year_level: e.target.value as "3rd year" | "4th year",
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="3rd year">3rd Year</option>
                    <option value="4th year">4th Year</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduation_year">
                    Expected Graduation Year
                  </Label>
                  <Input
                    id="graduation_year"
                    type="number"
                    min={new Date().getFullYear()}
                    value={education.expected_graduation_year}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        expected_graduation_year: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleUpdateEducation}>
                Save Education Details
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
