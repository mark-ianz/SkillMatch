"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import useCompanySettingsStore from "@/store/CompanySettingsStore";
import { useUpdateLocation } from "@/hooks/query/useCompanySettings";
import { MapPin } from "lucide-react";
import { useMemo } from "react";
import cityMunicipalityData from "@/data/city_municipality.json";

type CityMunicipalityData = {
  [key: string]: {
    barangay_list: string[];
  };
};

const locationData = cityMunicipalityData as CityMunicipalityData;

export default function CompanyLocationTab() {
  const location = useCompanySettingsStore((state) => state.location);
  const updateLocationField = useCompanySettingsStore(
    (state) => state.updateLocationField
  );

  const updateLocationMutation = useUpdateLocation();

  // Get list of cities/municipalities
  const cities = useMemo(() => Object.keys(locationData).sort(), []);

  // Get barangays for selected city
  const barangays = useMemo(() => {
    if (!location.city_municipality || !locationData[location.city_municipality]) {
      return [];
    }
    return locationData[location.city_municipality].barangay_list;
  }, [location.city_municipality]);

  const handleCityChange = (value: string) => {
    updateLocationField("city_municipality", value);
    // Reset barangay when city changes
    updateLocationField("barangay", "");
  };

  const handleUpdateLocation = () => {
    // Validate required fields
    if (!location.city_municipality) {
      toast.error("City/Municipality is required");
      return;
    }

    if (!location.barangay) {
      toast.error("Barangay is required");
      return;
    }

    updateLocationMutation.mutate({
      city_municipality: location.city_municipality,
      barangay: location.barangay,
    });
  };

  return (
    <TabsContent value="location" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Location Information</CardTitle>
          <CardDescription>
            Update your company&apos;s address and location details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* City/Municipality */}
          <div className="space-y-2">
            <Label htmlFor="city_municipality" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              City/Municipality <span className="text-destructive">*</span>
            </Label>
            <Select
              value={location.city_municipality}
              onValueChange={handleCityChange}
            >
              <SelectTrigger id="city_municipality">
                <SelectValue placeholder="Select city or municipality" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Barangay */}
          <div className="space-y-2">
            <Label htmlFor="barangay" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Barangay <span className="text-destructive">*</span>
            </Label>
            <Select
              value={location.barangay}
              onValueChange={(value) => updateLocationField("barangay", value)}
              disabled={!location.city_municipality || barangays.length === 0}
            >
              <SelectTrigger id="barangay">
                <SelectValue placeholder="Select barangay" />
              </SelectTrigger>
              <SelectContent>
                {barangays.map((barangay) => (
                  <SelectItem key={barangay} value={barangay}>
                    {barangay}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!location.city_municipality && (
              <p className="text-xs text-muted-foreground">
                Please select a city/municipality first
              </p>
            )}
          </div>

          {/* Location Summary */}
          {location.city_municipality && location.barangay && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Current Location:</p>
              <p className="text-sm text-muted-foreground">
                {location.barangay}, {location.city_municipality}
              </p>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleUpdateLocation}
              disabled={updateLocationMutation.isPending}
              className="min-w-32"
            >
              {updateLocationMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
