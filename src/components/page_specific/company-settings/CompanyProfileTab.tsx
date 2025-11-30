"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { toast } from "sonner";
import useCompanySettingsStore from "@/store/CompanySettingsStore";
import {
  useUpdateCompanyProfile,
  useUpdateCompanyLogo,
} from "@/hooks/query/useCompanySettings";
import { getAllIndustry } from "@/lib/utils";
import { format } from "date-fns";

const INDUSTRIES = getAllIndustry() as string[];

export default function CompanyProfileTab() {
  const companyProfile = useCompanySettingsStore(
    (state) => state.companyProfile
  );
  const updateCompanyProfileField = useCompanySettingsStore(
    (state) => state.updateCompanyProfileField
  );

  const companyLogo = useCompanySettingsStore((state) => state.companyLogo);
  const setCompanyLogo = useCompanySettingsStore(
    (state) => state.setCompanyLogo
  );
  const companyLogoPreview = useCompanySettingsStore(
    (state) => state.companyLogoPreview
  );
  const setCompanyLogoPreview = useCompanySettingsStore(
    (state) => state.setCompanyLogoPreview
  );

  const updateCompanyProfileMutation = useUpdateCompanyProfile();
  const updateCompanyLogoMutation = useUpdateCompanyLogo();

  const handleIndustryChange = (industry: string) => {
    const currentIndustries = [...companyProfile.industry];
    const index = currentIndustries.indexOf(industry);

    if (index > -1) {
      currentIndustries.splice(index, 1);
    } else {
      currentIndustries.push(industry);
    }

    updateCompanyProfileField("industry", currentIndustries);
  };

  const handleUpdateProfile = () => {
    if (!companyProfile.company_name || !companyProfile.description) {
      toast.error("Company name and description are required");
      return;
    }

    if (companyProfile.industry.length === 0) {
      toast.error("Please select at least one industry");
      return;
    }

    updateCompanyProfileMutation.mutate(companyProfile);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateLogo = () => {
    if (!companyLogo) {
      toast.error("Please select a logo");
      return;
    }

    updateCompanyLogoMutation.mutate(companyLogo, {
      onSuccess: (data) => {
        setCompanyLogoPreview(data.company_image);
        setCompanyLogo(null);
      },
    });
  };

  return (
    <TabsContent value="profile">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>
              Update your company&apos;s core information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company_name"
                value={companyProfile.company_name}
                onChange={(e) =>
                  updateCompanyProfileField("company_name", e.target.value)
                }
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={companyProfile.description}
                onChange={(e) =>
                  updateCompanyProfileField("description", e.target.value)
                }
                placeholder="Tell us about your company, what you do, and what makes you unique..."
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_founded">Date Founded</Label>
              <Input
                id="date_founded"
                type="date"
                value={
                  companyProfile.date_founded
                    ? format(
                        new Date(companyProfile.date_founded),
                        "yyyy-MM-dd"
                      )
                    : ""
                }
                onChange={(e) =>
                  updateCompanyProfileField("date_founded", e.target.value)
                }
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Industry <span className="text-red-500">*</span>
              </Label>
              <Card className="p-4">
                <ScrollArea className="h-[200px]">
                  <div className="space-y-3">
                    {INDUSTRIES.map((ind) => (
                      <div key={ind} className="flex items-center space-x-2">
                        <Checkbox
                          id={`industry-${ind}`}
                          checked={companyProfile.industry.includes(ind)}
                          onCheckedChange={() => handleIndustryChange(ind)}
                        />
                        <label
                          htmlFor={`industry-${ind}`}
                          className="text-sm font-normal leading-none cursor-pointer"
                        >
                          {ind}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
              <p className="text-xs text-muted-foreground">
                Selected: {companyProfile.industry.length} industries
              </p>
            </div>

            <Button
              onClick={handleUpdateProfile}
              disabled={updateCompanyProfileMutation.isPending}
            >
              {updateCompanyProfileMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
            <CardDescription>Upload your company logo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {companyLogoPreview && (
              <div className="flex items-center space-x-4">
                <Image
                  src={companyLogoPreview}
                  alt="Company Logo"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="company_logo">Choose Logo</Label>
              <Input
                id="company_logo"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleLogoChange}
              />
            </div>
            <Button
              onClick={handleUpdateLogo}
              disabled={!companyLogo || updateCompanyLogoMutation.isPending}
            >
              {updateCompanyLogoMutation.isPending
                ? "Uploading..."
                : "Upload Logo"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
