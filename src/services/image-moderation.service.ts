import axios from "axios";
import FormData from "form-data";
import { ServiceError } from "@/lib/errors";

const SIGHTENGINE_API_USER = process.env.SIGHTENGINE_API_USER;
const SIGHTENGINE_API_SECRET = process.env.SIGHTENGINE_API_SECRET;

// Models to check: nudity, weapons, drugs, medical, gore, violence, self-harm
const MODERATION_MODELS =
  "nudity-2.1,weapon,recreational_drug,medical,gore-2.0,violence,self-harm";

// Threshold for rejection (0-1 scale, 0.5 = 50% confidence)
const NUDITY_THRESHOLD = {
  sexual_activity: 0.02,
  sexual_display: 0.02,
  erotica: 0.02,
  very_suggestive: 0.2,
  suggestive: 0.5,
  mildly_suggestive: 0.4,
};

const WEAPONS_THRESHOLD = {
  firearm: 0.3,
  knife: 0.3,
};

const OTHERS_THRESHOLD = 0.5;

interface ModerationResponse {
  status: string;
  request: {
    id: string;
    timestamp: number;
    operations: number;
  };
  nudity?: {
    sexual_activity?: number;
    sexual_display?: number;
    erotica?: number;
    sextoy?: number;
    none?: number;
    suggestive?: number;
    mildly_suggestive?: number;
    very_suggestive?: number;
  };
  weapon?: number;
  recreational_drug?: {
    prob?: number;
  };
  medical?: {
    prob?: number;
  };
  gore?: {
    prob?: number;
  };
  violence?: {
    prob?: number;
  };
  self_harm?: {
    prob?: number;
  };
}

interface ModerationResult {
  safe: boolean;
  reason?: string;
  details?: string;
}

/**
 * Moderates an image using Sightengine API
 * @param imageFile - The image file to moderate
 * @returns ModerationResult with safe status and reason if rejected
 */
export async function moderateImage(
  imageFile: File
): Promise<ModerationResult> {
  if (!SIGHTENGINE_API_USER || !SIGHTENGINE_API_SECRET) {
    console.warn(
      "Sightengine API credentials not configured, skipping moderation"
    );
    return { safe: true };
  }

  try {
    // Convert File to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create FormData
    const formData = new FormData();
    formData.append("media", buffer, {
      filename: imageFile.name,
      contentType: imageFile.type,
    });
    formData.append("models", MODERATION_MODELS);
    formData.append("api_user", SIGHTENGINE_API_USER);
    formData.append("api_secret", SIGHTENGINE_API_SECRET);

    // Make request to Sightengine API
    const response = await axios.post<ModerationResponse>(
      "https://api.sightengine.com/1.0/check.json",
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 10000, // 10 second timeout
      }
    );

    const data = response.data;

    // Check each category and reject if above threshold
    const violations: string[] = [];

    // Check nudity categories
    if (data.nudity) {
      if ((data.nudity.sexual_activity || 0) > NUDITY_THRESHOLD.sexual_activity) {
        violations.push("inappropriate sexual content");
      }
      if ((data.nudity.sexual_display || 0) > NUDITY_THRESHOLD.sexual_display) {
        violations.push("explicit nudity");
      }
      if ((data.nudity.erotica || 0) > NUDITY_THRESHOLD.erotica) {
        violations.push("erotic content");
      }
      if ((data.nudity.suggestive || 0) > NUDITY_THRESHOLD.suggestive) {
        violations.push("suggestive content");
      }
      if ((data.nudity.very_suggestive || 0) > NUDITY_THRESHOLD.very_suggestive) {
        violations.push("very suggestive content");
      }
      if ((data.nudity.mildly_suggestive || 0) > NUDITY_THRESHOLD.mildly_suggestive) {
        violations.push("mildly suggestive content");
      }
    }

    // Check weapon
    if ((data.weapon || 0) > WEAPONS_THRESHOLD.firearm) {
      violations.push("weapons");
    }

    // Check drugs
    if ((data.recreational_drug?.prob || 0) > OTHERS_THRESHOLD) {
      violations.push("drug-related content");
    }

    // Check medical
    if ((data.medical?.prob || 0) > OTHERS_THRESHOLD) {
      violations.push("medical content");
    }

    // Check gore
    if ((data.gore?.prob || 0) > OTHERS_THRESHOLD) {
      violations.push("graphic violence or gore");
    }

    // Check violence
    if ((data.violence?.prob || 0) > OTHERS_THRESHOLD) {
      violations.push("violent content");
    }

    // Check self-harm
    if ((data.self_harm?.prob || 0) > OTHERS_THRESHOLD) {
      violations.push("self-harm content");
    }

    // If any violations found, reject the image
    if (violations.length > 0) {
      const reason =
        violations.length === 1
          ? `Image contains ${violations[0]}`
          : `Image contains: ${violations.join(", ")}`;

      return {
        safe: false,
        reason,
        details: JSON.stringify(data, null, 2),
      };
    }

    return { safe: true };
  } catch (error) {
    console.error("Error during image moderation:", error);

    // If moderation API fails, we can choose to:
    // 1. Allow the image (more permissive)
    // 2. Block the image (more restrictive)
    // For now, we'll log the error and allow the image
    // but in production you might want to block it

    if (axios.isAxiosError(error)) {
      console.error("Sightengine API error:", error.response?.data);
    }

    // Throw error to let caller decide how to handle
    throw new ServiceError(
      "Unable to verify image safety. Please try again later.",
      503
    );
  }
}

/**
 * Validates image before moderation (file type, size, etc.)
 */
export function validateImageFile(file: File): void {
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new ServiceError(
      "Invalid image type. Only JPEG, PNG, WebP, and GIF are allowed.",
      400
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new ServiceError("Image too large. Maximum size is 5MB.", 413);
  }
}
