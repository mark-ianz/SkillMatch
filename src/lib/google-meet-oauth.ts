// src/lib/google-meet-oauth.ts
import { OAuth2Client } from "google-auth-library";
import fs from "fs/promises";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/meetings.space.created"];
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const MEET_API_ENDPOINT = "https://meet.googleapis.com/v2/spaces";

async function getOAuth2Client() {
  const content = await fs.readFile(CREDENTIALS_PATH, "utf-8");
  const credentials = JSON.parse(content);
  const { client_id, client_secret, redirect_uris } = credentials.web;

  // Find the google-meet callback URI, or use the last one
  const meetCallbackUri = redirect_uris.find((uri: string) => 
    uri.includes('/api/auth/google-meet/callback')
  ) || redirect_uris[redirect_uris.length - 1];

  return new OAuth2Client(client_id, client_secret, meetCallbackUri);
}

export async function getAuthUrl() {
  const oauth2Client = await getOAuth2Client();
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent", // Force consent screen to get refresh token
    response_type: "code", // This was missing!
  });

  return authUrl;
}

export async function handleCallback(code: string) {
  const oauth2Client = await getOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  
  // Save tokens
  await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
  
  return tokens;
}

async function getValidToken() {
  try {
    const tokenData = await fs.readFile(TOKEN_PATH, "utf-8");
    const tokens = JSON.parse(tokenData);
    
    const oauth2Client = await getOAuth2Client();
    oauth2Client.setCredentials(tokens);
    
    // Check if token is expired and refresh if needed
    const tokenInfo = await oauth2Client.getTokenInfo(tokens.access_token!);
    
    if (tokenInfo.expiry_date && tokenInfo.expiry_date < Date.now()) {
      // Token expired, refresh it
      const { credentials } = await oauth2Client.refreshAccessToken();
      await fs.writeFile(TOKEN_PATH, JSON.stringify(credentials));
      return credentials.access_token;
    }
    
    return tokens.access_token;
  } catch (error) {
    throw new Error("NO_TOKEN");
  }
}

export async function createMeetSpace() {
  try {
    const accessToken = await getValidToken();

    if (!accessToken) {
      throw new Error("NO_TOKEN");
    }

    const response = await fetch(MEET_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      
      if (response.status === 401) {
        throw new Error("TOKEN_EXPIRED");
      }
      
      throw new Error(
        `API returned ${response.status}: ${JSON.stringify(errorData)}`
      );
    }

    const space = await response.json();

    console.log(`✅ Meet URL created: ${space.meetingUri}`);

    return {
      meetingUri: space.meetingUri,
      meetingCode: space.meetingCode,
      name: space.name,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "NO_TOKEN") {
      throw new Error("NOT_AUTHENTICATED");
    }
    throw error;
  }
}