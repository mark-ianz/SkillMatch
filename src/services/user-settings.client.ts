import { api } from "@/lib/axios";

export type UserSettings = {
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  phone_number: string | null;
  street_name: string | null;
  house_number: string | null;
  subdivision: string | null;
  postal_code: string | null;
  barangay: string | null;
  city_municipality: string | null;
  email: string;
  has_password: boolean;
  applicant_id: number;
  applicant_image_path: string | null;
  resume_path: string | null;
  student_number: string | null;
  college: string | null;
  course: string | null;
  year_level: string | null;
  expected_graduation_year: string | null;
  skills: string[];
  preferred_schedule: string | null;
  required_hours: number | null;
  birthdate: string | null;
};

export type UpdatePersonalInfoPayload = {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  phone_number?: string;
  street_name?: string;
  house_number?: string;
  subdivision?: string;
  postal_code?: string;
  barangay?: string;
  city_municipality?: string;
};

export type UpdatePasswordPayload = {
  currentPassword?: string;
  newPassword: string;
};

export type UpdateAvailabilityPayload = {
  preferred_schedule: string;
  required_hours: number;
};

export type UpdateSkillsPayload = {
  skills: string[];
};

export type UpdateEducationPayload = {
  student_number?: string;
  college?: string;
  course?: string;
  year_level?: string;
  expected_graduation_year?: string;
};

// Get user settings
export async function getUserSettings(): Promise<UserSettings> {
  const { data } = await api.get<UserSettings>("/user/settings");
  return data;
}

// Update personal information
export async function updatePersonalInfo(payload: UpdatePersonalInfoPayload): Promise<{ message: string; data: UserSettings }> {
  const { data } = await api.patch<{ message: string; data: UserSettings }>(
    "/user/settings/profile",
    payload
  );
  return data;
}

// Update profile picture
export async function updateProfilePicture(file: File): Promise<{ message: string; data: UserSettings }> {
  const formData = new FormData();
  formData.append("image", file);
  
  const { data } = await api.post<{ message: string; data: UserSettings }>(
    "/user/settings/picture",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

// Update password
export async function updatePassword(payload: UpdatePasswordPayload): Promise<{ message: string }> {
  const { data } = await api.patch<{ message: string }>(
    "/user/settings/password",
    payload
  );
  return data;
}

// Update resume
export async function updateResume(file: File): Promise<{ message: string; data: UserSettings }> {
  const formData = new FormData();
  formData.append("resume", file);
  
  const { data } = await api.post<{ message: string; data: UserSettings }>(
    "/user/settings/resume",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

// Update availability
export async function updateAvailability(payload: UpdateAvailabilityPayload): Promise<{ message: string; data: UserSettings }> {
  const { data } = await api.patch<{ message: string; data: UserSettings }>(
    "/user/settings/availability",
    payload
  );
  return data;
}

// Update skills
export async function updateSkills(payload: UpdateSkillsPayload): Promise<{ message: string; data: UserSettings }> {
  const { data } = await api.patch<{ message: string; data: UserSettings }>(
    "/user/settings/skills",
    payload
  );
  return data;
}

// Update education details
export async function updateEducation(payload: UpdateEducationPayload): Promise<{ message: string; data: UserSettings }> {
  const { data } = await api.patch<{ message: string; data: UserSettings }>(
    "/user/settings/education",
    payload
  );
  return data;
}
