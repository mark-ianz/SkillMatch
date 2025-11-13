import { create } from "zustand";
import { OJTProfile } from "@/types/ojt_profile.types";
import { AcademicDetails, Account, User } from "@/types/user.types";
import { Skill } from "@/types/skill.types";

export type OJTProfileStoreState = Partial<OJTProfile> &
  Partial<User> &
  Partial<Account> &
  AcademicDetails & {
    email: string | undefined;
    skills: Skill[];
    
    // User methods
    setUser: (user: Partial<User> & Partial<Account>) => void;
    clearUser: () => void;
    setFirstName: (first_name: string) => void;
    setLastName: (last_name: string) => void;
    setMiddleName: (middle_name: string | null) => void;
    setPhoneNumber: (phone_number: string) => void;
    setGender: (gender: "male" | "female" | "prefer not to say") => void;
    setBirthdate: (birthdate: Date | null | string) => void;
    setEmail: (email: string) => void;
    setStreetName: (street_name: string) => void;
    setHouseNumber: (house_number: string) => void;
    setSubdivision: (subdivision: string | null) => void;
    setBarangay: (barangay: string) => void;
    setPostalCode: (postal_code: string) => void;
    setCityMunicipality: (city_municipality: string) => void;
    
    // OJT Profile methods
    setOJTProfile: (profile: Partial<OJTProfile>) => void;
    setAcademicDetails: (details: Partial<AcademicDetails>) => void;
    setSkills: (skills: Skill[]) => void;
    addSkill: (skill: Skill) => void;
    removeSkill: (skill_id: number) => void;
    clearOJTProfile: () => void;
    setResumePath: (resume_path: string) => void;
    clearResume: () => void;
    setCollege: (college: string) => void;
    setCourse: (course: string) => void;
    setYearLevel: (year_level: "3rd year" | "4th year") => void;
    setExpectedGraduationYear: (expected_graduation_year: string) => void;
  };

const useOJTProfileStore = create<OJTProfileStoreState>((set) => ({
  // User Information
  user_id: undefined,
  first_name: "",
  middle_name: null,
  last_name: "",
  gender: "prefer not to say",
  birthdate: null,
  phone_number: "",
  role_id: undefined,
  status_id: undefined,
  created_at: undefined,
  house_number: "",
  street_name: "",
  subdivision: null,
  postal_code: "",
  barangay: "",
  city_municipality: "",
  email: undefined,

  // Academic Details
  ojt_id: undefined,
  college: null,
  course: "",
  year_level: "4th year",
  expected_graduation_year: null,
  resume_path: null,
  visibility: "private",

  // Skills
  skills: [],

  // User Information Setters
  setFirstName: (first_name: string) => set({ first_name }),
  setLastName: (last_name: string) => set({ last_name }),
  setMiddleName: (middle_name: string | null) => set({ middle_name }),
  setPhoneNumber: (phone_number: string) => set({ phone_number }),
  setGender: (gender: "male" | "female" | "prefer not to say") =>
    set({ gender }),
  setBirthdate: (birthdate: Date | null | string) => set({ birthdate }),
  setEmail: (email: string) => set({ email }),

  // Address Setters
  setPostalCode: (postal_code) => set({ postal_code }),
  setStreetName: (street_name) => set({ street_name }),
  setHouseNumber: (house_number) => set({ house_number }),
  setSubdivision: (subdivision) => set({ subdivision }),
  setBarangay: (barangay) => set({ barangay }),
  setCityMunicipality: (city_municipality) => set({ city_municipality }),

  // Academic Details Setters
  setCollege: (college) => set({ college }),
  setCourse: (course) => set({ course }),
  setYearLevel: (year_level) => set({ year_level }),
  setExpectedGraduationYear: (expected_graduation_year) =>
    set({ expected_graduation_year }),

  // Skills Methods
  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  setSkills: (skills) => set({ skills }),
  removeSkill: (skill_id) =>
    set((state) => ({
      skills: state.skills.filter((s) => s.skill_id !== skill_id),
    })),

  // Resume Methods
  setResumePath: (resume_path) => set({ resume_path }),
  clearResume: () => set({ resume_path: null }),

  // General Methods
  setUser: (user) => set(user),
  clearUser: () =>
    set({
      user_id: undefined,
      first_name: "",
      middle_name: null,
      last_name: "",
      gender: "prefer not to say",
      birthdate: null,
      phone_number: "",
      role_id: undefined,
      status_id: undefined,
      created_at: undefined,
      house_number: "",
      street_name: "",
      subdivision: null,
      postal_code: "",
      barangay: "",
      city_municipality: "",
    }),
  setOJTProfile: (profile) => set(profile),
  setAcademicDetails: (details) => set(details),
  clearOJTProfile: () =>
    set({
      user_id: undefined,
      first_name: "",
      middle_name: null,
      last_name: "",
      gender: "prefer not to say",
      birthdate: null,
      phone_number: "",
      role_id: undefined,
      status_id: undefined,
      created_at: undefined,
      house_number: "",
      street_name: "",
      subdivision: null,
      postal_code: "",
      barangay: "",
      city_municipality: "",
      email: undefined,
      ojt_id: undefined,
      college: null,
      course: "",
      year_level: "4th year",
      expected_graduation_year: null,
      resume_path: null,
      visibility: "private",
      skills: [],
    }),
}));

export default useOJTProfileStore;
