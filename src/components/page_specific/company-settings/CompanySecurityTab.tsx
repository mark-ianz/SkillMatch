"use client";

import { useState } from "react";
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
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useCompanySettingsStore from "@/store/CompanySettingsStore";
import { useUpdateCompanyPassword, useCompanySettings } from "@/hooks/query/useCompanySettings";

export default function CompanySecurityTab() {
  const { data: settings } = useCompanySettings();
  const passwordData = useCompanySettingsStore((state) => state.passwordData);
  const updatePasswordField = useCompanySettingsStore(
    (state) => state.updatePasswordField
  );
  const resetPasswordData = useCompanySettingsStore(
    (state) => state.resetPasswordData
  );

  const updatePasswordMutation = useUpdateCompanyPassword();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasPassword = settings?.has_password || false;

  const handleUpdatePassword = () => {
    // Validate new password
    if (!passwordData.newPassword) {
      toast.error("New password is required");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // If company has existing password, current password is required
    if (hasPassword && !passwordData.currentPassword) {
      toast.error("Current password is required");
      return;
    }

    // Prepare payload
    const payload = hasPassword
      ? {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      : {
          newPassword: passwordData.newPassword,
        };

    updatePasswordMutation.mutate(payload, {
      onSuccess: () => {
        resetPasswordData();
      },
    });
  };

  return (
    <TabsContent value="security" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            {hasPassword
              ? "Update your company account password"
              : "Set up a password for your company account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {hasPassword && (
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                Current Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    updatePasswordField("currentPassword", e.target.value)
                  }
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="newPassword">
              {hasPassword ? "New Password" : "Password"}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  updatePasswordField("newPassword", e.target.value)
                }
                placeholder="Enter new password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Must be at least 8 characters long
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  updatePasswordField("confirmPassword", e.target.value)
                }
                placeholder="Confirm new password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={handleUpdatePassword}
            disabled={updatePasswordMutation.isPending}
            className="w-full sm:w-auto"
          >
            {updatePasswordMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {hasPassword ? "Update Password" : "Set Password"}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
