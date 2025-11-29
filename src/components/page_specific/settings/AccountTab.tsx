"use client";

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
import { TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { toast } from "sonner";
import useSettingsStore from "@/store/SettingsStore";
import { useUserSettings, useUpdatePassword, useUpdateResume } from "@/hooks/query/useUserSettings";

export default function AccountTab() {
  const { data: settings } = useUserSettings();
  const passwordData = useSettingsStore((state) => state.passwordData);
  const setPasswordData = useSettingsStore((state) => state.setPasswordData);
  const resetPasswordData = useSettingsStore((state) => state.resetPasswordData);
  const resume = useSettingsStore((state) => state.resume);
  const setResume = useSettingsStore((state) => state.setResume);

  const updatePasswordMutation = useUpdatePassword();
  const updateResumeMutation = useUpdateResume();

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
          resetPasswordData();
        },
      }
    );
  };

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
  return (
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
  );
}
