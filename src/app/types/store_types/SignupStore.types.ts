// Step is the part of signup process
// 0 - initial (continue with google)
// 1 - personal details
// 2 - address
// 3 - academic details
// 4 - skills
// 5 - certifications
// 6 - review & submit

type Skill = {
  skill_id: number;
  skill_name: string;
};

// Step 1: Personal Details
export type PersonalDetailsStore = {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  gender: "male" | "female" | "prefer not to say";
  birthdate: Date | null;

  setFirstName: (first_name: string) => void;
  setLastName: (last_name: string) => void;
  setEmailAddress: (email_address: string) => void;
  setPhoneNumber: (phone_number: string) => void;
  setGender: (gender: "male" | "female" | "prefer not to say") => void;
  setBirthdate: (birthdate: Date) => void;
};

// Step 2: Address
export type AddressStore = {
  street_address: string;
  barangay: string;
  city: string;
  municipality: string;

  setStreetAddress: (street_address: string) => void;
  setBarangay: (barangay: string) => void;
  setCity: (city: string) => void;
  setMunicipality: (municipality: string) => void;
};

// Step 3: Academic
export type AcademicDetailsStore = {
  college: string;
  course: string;
  year_level: "3rd Year" | "4th Year";
  expected_graduation_year: string;

  setCollege: (college: string) => void;
  setCourse: (course: string) => void;
  setYearLevel: (year_level: "3rd Year" | "4th Year") => void;
  setExpectedGraduationYear: (expected_graduation_year: string) => void;
};

// Step 4: Skills
export type SkillsStore = {
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  removeSkill: (skill_id: number) => void;
  clearSkills: () => void;
};

// Step 5: Certifications
export type CertificationsStore = {
  certifications: { title: string; file: File }[];
  addCertification: (cert: { title: string; file: File }) => void;
  removeCertification: (index: number) => void;
  clearCertifications: () => void;
};

// General Signup Store
export type GeneralSignupStore = {
  currentStep: number;
  farthestStep: number;
  error: { title: string; description: string } | null;

  nextStep: () => void;
  prevStep: () => void;
  goToStep: (s: number) => void;
  setCurrentStep: (s: number) => void;
  setFarthestStep: (s: number) => void;
  setError: (e: { title: string; description: string }) => void;

  collectData: () => {
    personal: PersonalDetailsStore;
    address: AddressStore;
    academic: AcademicDetailsStore;
    skills: SkillsStore;
    certifications: CertificationsStore;
  };
};

export type SignupStore = PersonalDetailsStore &
  AddressStore &
  AcademicDetailsStore &
  SkillsStore &
  CertificationsStore &
  GeneralSignupStore;
