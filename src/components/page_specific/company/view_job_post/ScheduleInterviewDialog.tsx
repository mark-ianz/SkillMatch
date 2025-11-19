"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Video, MapPin } from "lucide-react";
import { format } from "date-fns";

interface ScheduleInterviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InterviewData) => void;
  applicantName: string;
}

interface InterviewData {
  type: "virtual" | "in-person";
  date: Date;
  time: string;
  meetLink?: string;
  location?: string;
  notes?: string;
}

export function ScheduleInterviewDialog({
  open,
  onOpenChange,
  onSubmit,
  applicantName,
}: ScheduleInterviewDialogProps) {
  const [interviewType, setInterviewType] = useState<"virtual" | "in-person">(
    "virtual"
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!selectedDate || !time) {
      return;
    }

    const data: InterviewData = {
      type: interviewType,
      date: selectedDate,
      time,
      notes,
    };

    if (interviewType === "virtual") {
      data.meetLink = meetLink || "https://meet.google.com/new";
    } else {
      data.location = location;
    }

    onSubmit(data);

    // Reset form
    setInterviewType("virtual");
    setSelectedDate(undefined);
    setTime("");
    setMeetLink("");
    setLocation("");
    setNotes("");
  };

  const generateMeetLink = () => {
    // In a real application, this would call Google Meet API
    const randomId = Math.random().toString(36).substring(2, 15);
    setMeetLink(
      `https://meet.google.com/${randomId.slice(0, 3)}-${randomId.slice(
        3,
        7
      )}-${randomId.slice(7, 10)}`
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            Schedule an interview with {applicantName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Interview Type */}
          <div className="space-y-3">
            <Label>Interview Type</Label>
            <RadioGroup
              value={interviewType}
              onValueChange={(value) =>
                setInterviewType(value as "virtual" | "in-person")
              }
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="virtual" id="virtual" />
                <Label
                  htmlFor="virtual"
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    <Video className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">Virtual Meeting</p>
                    <p className="text-sm text-muted-foreground">
                      Google Meet video call
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label
                  htmlFor="in-person"
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">In-Person Meeting</p>
                    <p className="text-sm text-muted-foreground">
                      Face-to-face interview
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Interview Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? format(selectedDate, "MMM dd, yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date: Date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Virtual Meeting Link */}
          {interviewType === "virtual" && (
            <div className="space-y-2">
              <Label htmlFor="meet-link">Google Meet Link</Label>
              <div className="flex gap-2">
                <Input
                  id="meet-link"
                  placeholder="https://meet.google.com/..."
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateMeetLink}
                >
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                A meeting link will be sent to the applicant
              </p>
            </div>
          )}

          {/* In-Person Location */}
          {interviewType === "in-person" && (
            <div className="space-y-2">
              <Label htmlFor="location">Interview Location</Label>
              <Input
                id="location"
                placeholder="Enter office address or meeting location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          )}

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special instructions or preparation needed..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !selectedDate ||
              !time ||
              (interviewType === "virtual" && !meetLink) ||
              (interviewType === "in-person" && !location)
            }
            className="bg-green-600 hover:bg-green-700"
          >
            Schedule Interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
