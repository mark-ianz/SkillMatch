import { create } from "zustand";

type PersonalInfo = {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  street_name: string;
  house_number: string;
  subdivision: string;
  postal_code: string;
  barangay: string;
  city_municipality: string;
};

type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Availability = {
  preferred_schedule: string[];
  required_hours: number;
};

type Education = {
  student_number: string;
  college: string;
  course: string;
  year_level: "3rd year" | "4th year";
  expected_graduation_year: string;
};

type SettingsStoreState = {
  // Personal Info
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
  updatePersonalInfoField: (field: keyof PersonalInfo, value: string) => void;

  // Password
  passwordData: PasswordData;
  setPasswordData: (data: PasswordData) => void;
  updatePasswordField: (field: keyof PasswordData, value: string) => void;
  resetPasswordData: () => void;

  // Profile Picture
  profilePicture: File | null;
  profilePicturePreview: string | null;
  setProfilePicture: (file: File | null) => void;
  setProfilePicturePreview: (preview: string | null) => void;

  // Resume
  resume: File | null;
  setResume: (file: File | null) => void;

  // Availability
  availability: Availability;
  setAvailability: (availability: Availability) => void;
  toggleDay: (day: string) => void;
  setRequiredHours: (hours: number) => void;

  // Skills
  skills: string[];
  setSkills: (skills: string[]) => void;

  // Education
  education: Education;
  setEducation: (education: Education) => void;
  updateEducationField: (field: keyof Education, value: string) => void;
};

const useSettingsStore = create<SettingsStoreState>((set) => ({
  // Personal Info
  personalInfo: {
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    street_name: "",
    house_number: "",
    subdivision: "",
    postal_code: "",
    barangay: "",
    city_municipality: "",
  },
  setPersonalInfo: (info) => set({ personalInfo: info }),
  updatePersonalInfoField: (field, value) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, [field]: value },
    })),

  // Password
  passwordData: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  setPasswordData: (data) => set({ passwordData: data }),
  updatePasswordField: (field, value) =>
    set((state) => ({
      passwordData: { ...state.passwordData, [field]: value },
    })),
  resetPasswordData: () =>
    set({
      passwordData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    }),

  // Profile Picture
  profilePicture: null,
  profilePicturePreview: null,
  setProfilePicture: (file) => set({ profilePicture: file }),
  setProfilePicturePreview: (preview) => set({ profilePicturePreview: preview }),

  // Resume
  resume: null,
  setResume: (file) => set({ resume: file }),

  // Availability
  availability: {
    preferred_schedule: [],
    required_hours: 0,
  },
  setAvailability: (availability) => set({ availability }),
  toggleDay: (day) =>
    set((state) => ({
      availability: {
        ...state.availability,
        preferred_schedule: state.availability.preferred_schedule.includes(day)
          ? state.availability.preferred_schedule.filter((d) => d !== day)
          : [...state.availability.preferred_schedule, day],
      },
    })),
  setRequiredHours: (hours) =>
    set((state) => ({
      availability: {
        ...state.availability,
        required_hours: hours,
      },
    })),

  // Skills
  skills: [],
  setSkills: (skills) => set({ skills }),

  // Education
  education: {
    student_number: "",
    college: "",
    course: "",
    year_level: "3rd year",
    expected_graduation_year: new Date().getFullYear().toString(),
  },
  setEducation: (education) => set({ education }),
  updateEducationField: (field, value) =>
    set((state) => ({
      education: { ...state.education, [field]: value },
    })),
}));

export default useSettingsStore;
