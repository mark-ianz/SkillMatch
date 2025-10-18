// Step is the part of signup process
// 1 - personal details
// 2 - address
// 3 - academic details
// 4 - skills
// 5 - resume / certifications
// 6 - setup password

import { Skill } from "../skill.types";

// Step 1: Personal Details
export type PersonalDetailsStore = {
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email?: string;
  phone_number: string;
  gender: "male" | "female" | "prefer not to say";
  birthdate: Date | null | string;

  setFirstName: (first_name: string) => void;
  setLastName: (last_name: string) => void;
  setMiddleName: (middle_name: string | null) => void;
  setEmail: (email: string) => void;
  setPhoneNumber: (phone_number: string) => void;
  setGender: (gender: "male" | "female" | "prefer not to say") => void;
  setBirthdate: (birthdate: Date | null | string) => void;
};

// Step 2: Address
export type AddressStore = {
  street_name: string;
  house_number: string;
  subdivision: string | null;
  barangay: string;
  postal_code: string;
  city_municipality: string;

  setStreetName: (street_name: string) => void;
  setHouseNumber: (house_number: string) => void;
  setSubdivision: (subdivision: string | null) => void;
  setBarangay: (barangay: string) => void;
  setPostalCode: (postal_code: string) => void;
  setCityMunicipality: (city_municipality: string) => void;
};

// Step 3: Academic
export type AcademicDetailsStore = {
  college: string;
  course: string;
  year_level: "3rd year" | "4th year";
  expected_graduation_year: string;

  setCollege: (college: string) => void;
  setCourse: (course: string) => void;
  setYearLevel: (year_level: "3rd year" | "4th year") => void;
  setExpectedGraduationYear: (expected_graduation_year: string) => void;
};

// Step 4: Skills
export type SkillsStore = {
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  removeSkill: (skill_id: number) => void;
  clearSkills: () => void;
  setSkills: (skills: Skill[]) => void;

};

// Step 5: Resume
export type ResumeStore = {
  resume_path: string | null;
  setResumePath: (path: string | null) => void;
  clearResume: () => void;
};

// Step 6: Password
export type PasswordStore = {
  password: string;
  confirm_password: string;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirm_password: string) => void;
};

// General Signup Store
export type GeneralSignupStore = {
  /*   
  
  prevStep: () => void;*/
  
  goToStep: (s: number) => void;
  setError: (e: string[] | null) => void;
  error: string[] | null;
  currentStep: number;
  farthestStep: number;

  nextStep: () => void;
  setCurrentStep: (s: number) => void;
  setFarthestStep: (s: number) => void;

  collectData: () => {
    personal: PersonalDetailsStore;
    address: AddressStore;
    academic: AcademicDetailsStore;
    skills: SkillsStore;
    resume: ResumeStore;
  };
};

export type SignupStore = PersonalDetailsStore &
  AddressStore &
  AcademicDetailsStore &
  SkillsStore &
  ResumeStore &
  PasswordStore &
  GeneralSignupStore;
