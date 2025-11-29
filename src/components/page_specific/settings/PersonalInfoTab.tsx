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
import Image from "next/image";
import SelectCityMunicipality from "@/components/common/input/SelectCityMunicipality";
import SelectBarangay from "@/components/common/input/SelectBarangay";
import useSettingsStore from "@/store/SettingsStore";
import { toast } from "sonner";
import { useUpdatePersonalInfo, useUpdateProfilePicture } from "@/hooks/query/useUserSettings";

export default function PersonalInfoTab() {
  const personalInfo = useSettingsStore((state) => state.personalInfo);
  const setPersonalInfo = useSettingsStore((state) => state.setPersonalInfo);
  const profilePicturePreview = useSettingsStore((state) => state.profilePicturePreview);
  const profilePicture = useSettingsStore((state) => state.profilePicture);
  const setProfilePicture = useSettingsStore((state) => state.setProfilePicture);
  const setProfilePicturePreview = useSettingsStore((state) => state.setProfilePicturePreview);

  const updatePersonalInfoMutation = useUpdatePersonalInfo();
  const updateProfilePictureMutation = useUpdateProfilePicture();

  const handleUpdatePersonalInfo = () => {
    updatePersonalInfoMutation.mutate(personalInfo);
  };

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

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  return (
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

            <Button 
              onClick={handleUpdatePersonalInfo}
              disabled={updatePersonalInfoMutation.isPending}
            >
              {updatePersonalInfoMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
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
              disabled={!profilePicture || updateProfilePictureMutation.isPending}
            >
              {updateProfilePictureMutation.isPending ? "Uploading..." : "Upload Picture"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
