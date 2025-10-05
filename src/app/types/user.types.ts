export type User = {
  user_id: number;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  gender: "male" | "female" | "prefer not to say";
  birthdate: Date;
  street_address?: string | null;
  barangay?: string | null;
  city?: string | null;
  municipality?: string | null;
  phone_number: string;
  role_id: number;
  status_id: number;
  created_at: Date;
};
