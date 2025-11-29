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
import { Checkbox } from "@/components/ui/checkbox";
import SearchSkill from "@/components/common/input/SearchSkill";
import { toast } from "sonner";
import useSettingsStore from "@/store/SettingsStore";
import { useUpdateAvailability, useUpdateSkills } from "@/hooks/query/useUserSettings";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MAXIMUM_SKILLS = 8;

export default function AvailabilityTab() {
  const availability = useSettingsStore((state) => state.availability);
  const setAvailability = useSettingsStore((state) => state.setAvailability);
  const toggleDay = useSettingsStore((state) => state.toggleDay);
  const skills = useSettingsStore((state) => state.skills);
  const setSkills = useSettingsStore((state) => state.setSkills);

  const updateAvailabilityMutation = useUpdateAvailability();
  const updateSkillsMutation = useUpdateSkills();

  const handleUpdateAvailability = () => {
    if (availability.preferred_schedule.length === 0) {
      toast.error("Please select at least one day");
      return;
    }

    updateAvailabilityMutation.mutate({
      preferred_schedule: availability.preferred_schedule.join(","),
      required_hours: availability.required_hours,
    });
  };

  const handleUpdateSkills = () => {
    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

    updateSkillsMutation.mutate({ skills });
  };
  return (
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

          <Button 
            onClick={handleUpdateAvailability}
            disabled={updateAvailabilityMutation.isPending}
          >
            {updateAvailabilityMutation.isPending ? "Saving..." : "Save Availability"}
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

          <Button 
            onClick={handleUpdateSkills}
            disabled={updateSkillsMutation.isPending}
          >
            {updateSkillsMutation.isPending ? "Saving..." : "Save Skills"}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
