"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export default function YourComponent() {
  const [meetingUri, setMeetingUri] = useState<string>("");
  const [meetingCode, setMeetingCode] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);

  // Listen for messages from the popup window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: verify origin
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "GOOGLE_MEET_SUCCESS") {
        setMeetingUri(event.data.meetingUri);
        setMeetingCode(event.data.meetingCode);
        setIsCreating(false);

        // Show success message
        alert(
          `Meeting Created!\n\nLink: ${event.data.meetingUri}\nCode: ${event.data.meetingCode}`
        );
      }

      if (event.data.type === "GOOGLE_MEET_ERROR") {
        setIsCreating(false);
        alert("Failed to create meeting. Please try again.");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  async function handleGenerateGoogleMeet() {
    setIsCreating(true);

    try {
      const response = await api.get("/virtual-meeting");

      // If needs authentication, open popup
      if (
        response.data.error === "NOT_AUTHENTICATED" ||
        response.status === 401 ||
        response.data.authUrl
      ) {
        const authResponse = await api.get("/auth/google-meet");

        // Open popup window
        const popup = window.open(
          authResponse.data.authUrl,
          "Google Meet Authorization",
          "width=500,height=600,scrollbars=yes"
        );

        // Check if popup was blocked
        if (!popup) {
          alert(
            "Please allow popups for this site to authenticate with Google."
          );
          setIsCreating(false);
          return;
        }

        // The popup will close itself and send a message back
        return;
      }

      // If meeting created directly (already authenticated)
      if (response.data.meetingUri) {
        setMeetingUri(response.data.meetingUri);
        setMeetingCode(response.data.meetingCode);
        setIsCreating(false);
        alert(
          `✅ Meeting Created!\n\nLink: ${response.data.meetingUri}\nCode: ${response.data.meetingCode}`
        );
      }
    } catch (error: AxiosError | unknown) {
      console.error("Error:", error);
      setIsCreating(false);

      // Handle 401 authentication error
      if (error instanceof AxiosError && error.response?.status === 401) {
        const authResponse = await api.get("/auth/google-meet");

        window.open(
          authResponse.data.authUrl,
          "Google Meet Authorization",
          "width=500,height=600,scrollbars=yes"
        );
        return;
      }

      alert("Failed to create meeting. Please try again.");
    }
  }

  return (
    <div>
      <Button onClick={handleGenerateGoogleMeet} disabled={isCreating}>
        {isCreating ? "Creating..." : "Generate Google Meet Link"}
      </Button>

      {/* Display the meeting link if created */}
      {meetingUri && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-bold">Meeting Created!</h3>
          <p className="mt-2">
            <strong>Link:</strong>{" "}
            <a
              href={meetingUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {meetingUri}
            </a>
          </p>
          <p className="mt-1">
            <strong>Code:</strong> {meetingCode}
          </p>
        </div>
      )}
    </div>
  );
}
