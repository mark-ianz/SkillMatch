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
import { toast } from "sonner";
import useCompanySettingsStore from "@/store/CompanySettingsStore";
import { useUpdateCompanyContact } from "@/hooks/query/useCompanySettings";
import { Mail, Phone, Globe, Facebook, Instagram, Twitter } from "lucide-react";

export default function CompanyContactTab() {
  const contactInfo = useCompanySettingsStore((state) => state.contactInfo);
  const updateContactInfoField = useCompanySettingsStore(
    (state) => state.updateContactInfoField
  );

  const updateContactMutation = useUpdateCompanyContact();

  const handleUpdateContact = () => {
    // Validate required fields
    if (!contactInfo.phone_number) {
      toast.error("Phone number is required");
      return;
    }

    // Validate URL formats for social media and website
    const urlFields = [
      { field: "website", value: contactInfo.website, label: "Website" },
      { field: "facebook_page", value: contactInfo.facebook_page, label: "Facebook" },
      { field: "instagram_page", value: contactInfo.instagram_page, label: "Instagram" },
      { field: "twitter_page", value: contactInfo.twitter_page, label: "Twitter" },
    ];

    for (const { value, label } of urlFields) {
      if (value && !isValidUrl(value)) {
        toast.error(`Invalid ${label} URL format`);
        return;
      }
    }

    updateContactMutation.mutate(contactInfo);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <TabsContent value="contact" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update your company&apos;s contact details and social media links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="company_email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Company Email
            </Label>
            <Input
              id="company_email"
              type="email"
              value={contactInfo.company_email}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed here. Contact support to update.
            </p>
          </div>

          {/* Phone Numbers */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone_number" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone_number"
                type="tel"
                placeholder="+63 912 345 6789"
                value={contactInfo.phone_number}
                onChange={(e) => updateContactInfoField("phone_number", e.target.value)}
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone_number" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telephone Number
              </Label>
              <Input
                id="telephone_number"
                type="tel"
                placeholder="(02) 8123 4567"
                value={contactInfo.telephone_number}
                onChange={(e) => updateContactInfoField("telephone_number", e.target.value)}
                maxLength={20}
              />
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Company Website
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://www.example.com"
              value={contactInfo.website}
              onChange={(e) => updateContactInfoField("website", e.target.value)}
            />
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Social Media</Label>
            
            <div className="space-y-4">
              {/* Facebook */}
              <div className="space-y-2">
                <Label htmlFor="facebook_page" className="flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook Page
                </Label>
                <Input
                  id="facebook_page"
                  type="url"
                  placeholder="https://facebook.com/yourcompany"
                  value={contactInfo.facebook_page}
                  onChange={(e) => updateContactInfoField("facebook_page", e.target.value)}
                />
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <Label htmlFor="instagram_page" className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram Page
                </Label>
                <Input
                  id="instagram_page"
                  type="url"
                  placeholder="https://instagram.com/yourcompany"
                  value={contactInfo.instagram_page}
                  onChange={(e) => updateContactInfoField("instagram_page", e.target.value)}
                />
              </div>

              {/* Twitter */}
              <div className="space-y-2">
                <Label htmlFor="twitter_page" className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter/X Page
                </Label>
                <Input
                  id="twitter_page"
                  type="url"
                  placeholder="https://twitter.com/yourcompany"
                  value={contactInfo.twitter_page}
                  onChange={(e) => updateContactInfoField("twitter_page", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleUpdateContact}
              disabled={updateContactMutation.isPending}
              className="min-w-32"
            >
              {updateContactMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
