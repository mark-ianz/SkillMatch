export type Roles = "Applicant" | "Company" | "Admin" | "Spards";

export type Role = {
  role_id: number;
  role_name: Roles;
};