// src/app/api/auth/google-meet/callback/route.ts
import { handleCallback, createMeetSpace } from "@/lib/google-meet-oauth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    // Send error message and close popup
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head><title>Error</title></head>
        <body>
          <script>
            window.opener.postMessage({ 
              type: 'GOOGLE_MEET_ERROR', 
              error: 'No code provided' 
            }, window.location.origin);
            window.close();
          </script>
          <p>Authentication failed. This window should close automatically.</p>
        </body>
      </html>
      `,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  try {
    // Save the token
    await handleCallback(code);
    
    // Create the meeting
    const meeting = await createMeetSpace();
    
    // Send success message to parent window and close popup
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head><title>Success</title></head>
        <body>
          <script>
            window.opener.postMessage({ 
              type: 'GOOGLE_MEET_SUCCESS',
              meetingUri: '${meeting.meetingUri}',
              meetingCode: '${meeting.meetingCode}'
            }, window.location.origin);
            window.close();
          </script>
          <p>✅ Meeting created successfully! This window should close automatically.</p>
        </body>
      </html>
      `,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error("OAuth callback error:", error);
    
    // Send error message and close popup
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head><title>Error</title></head>
        <body>
          <script>
            window.opener.postMessage({ 
              type: 'GOOGLE_MEET_ERROR',
              error: 'Failed to create meeting'
            }, window.location.origin);
            window.close();
          </script>
          <p>❌ Failed to create meeting. This window should close automatically.</p>
        </body>
      </html>
      `,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}