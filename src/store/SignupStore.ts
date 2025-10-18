import { create } from "zustand";
import { SignupStore } from "@/types/store_types/SignupStore.types";

const MAX_STEP = 6;

const useSignupStore = create<SignupStore>((set, get) => ({
  // Step 1: Personal
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  gender: "prefer not to say",
  birthdate: null,
  setFirstName: (first_name) => set({ first_name }),
  setLastName: (last_name) => set({ last_name }),
  setMiddleName: (middle_name) => set({ middle_name }),
  setEmail: (email) => set({ email }),
  setPhoneNumber: (phone_number) => set({ phone_number }),
  setGender: (gender) => set({ gender }),
  setBirthdate: (birthdate) => set({ birthdate }),

  // Step 2: Address
  street_name: "",
  house_number: "",
  subdivision: null,
  barangay: "",
  city_municipality: "",
  postal_code: "",
  setPostalCode: (postal_code) => set({ postal_code }),
  setStreetName: (street_name) => set({ street_name }),
  setHouseNumber: (house_number) => set({ house_number }),
  setSubdivision: (subdivision) => set({ subdivision }),
  setBarangay: (barangay) => set({ barangay }),
  setCityMunicipality: (city_municipality) => set({ city_municipality }),

  // Step 3: Academic
  college: "",
  course: "",
  year_level: "4th year",
  expected_graduation_year: "",
  setCollege: (college) => set({ college }),
  setCourse: (course) => set({ course }),
  setYearLevel: (year_level) => set({ year_level }),
  setExpectedGraduationYear: (expected_graduation_year) =>
    set({ expected_graduation_year }),

  // Step 4: Skills
  skills: [],
  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  setSkills: (skills) => set({ skills }),
  removeSkill: (skill_id) =>
    set((state) => ({
      skills: state.skills.filter((s) => s.skill_id !== skill_id),
    })),
  clearSkills: () => set({ skills: [] }),

  // Step 5: Resume
  resume_path: null,
  setResumePath: (resume_path) => set({ resume_path }),
  clearResume: () => set({ resume_path: null }),

  // Step 6: Password
  password: "",
  confirm_password: "",
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirm_password) => set({ confirm_password }),

  // General Signup flow
  currentStep: 1,
  farthestStep: 1,
  error: null,

  /* 
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) set({ currentStep: currentStep - 1 });
    }, */

  goToStep: (step: number) => {
    const clampedStep = Math.max(1, Math.min(MAX_STEP, step));
    const { farthestStep } = get();
    if (clampedStep <= farthestStep) {
      set({ currentStep: clampedStep });
    }
  },
  nextStep: () => {
    const { currentStep, farthestStep } = get();
    const newStep = Math.min(MAX_STEP, currentStep + 1);
    set({
      currentStep: newStep,
      farthestStep: Math.max(farthestStep, newStep),
    });
  },

  // setCurrentStep is to jump steps but not exceed farthestStep
  setCurrentStep: (step) =>
    set((state) => ({
      currentStep: Math.min(
        state.farthestStep,
        Math.max(1, Math.min(MAX_STEP, step))
      ),
    })),

  // setFarthestStep is to set the farthest step reached
  setFarthestStep: (step) =>
    set((state) => ({
      farthestStep: Math.max(
        state.farthestStep,
        Math.max(1, Math.min(MAX_STEP, step))
      ),
    })),
  setError: (e: string[] | null) => set({ error: e }),

  // Collect everything into one payload
  collectData: () => {
    const state = get();
    return {
      personal: {
        first_name: state.first_name,
        middle_name: state.middle_name,
        last_name: state.last_name,
        email: state.email,
        phone_number: state.phone_number,
        gender: state.gender,
        birthdate: state.birthdate,
        setFirstName: state.setFirstName,
        setMiddleName: state.setMiddleName,
        setLastName: state.setLastName,
        setEmail: state.setEmail,
        setPhoneNumber: state.setPhoneNumber,
        setGender: state.setGender,
        setBirthdate: state.setBirthdate,
      },
      address: {
        street_name: state.street_name,
        house_number: state.house_number,
        subdivision: state.subdivision,
        barangay: state.barangay,
        postal_code: state.postal_code,
        city_municipality: state.city_municipality,
        setPostalCode: state.setPostalCode,
        setStreetName: state.setStreetName,
        setHouseNumber: state.setHouseNumber,
        setSubdivision: state.setSubdivision,
        setBarangay: state.setBarangay,
        setCityMunicipality: state.setCityMunicipality,
      },
      academic: {
        college: state.college,
        course: state.course,
        year_level: state.year_level,
        expected_graduation_year: state.expected_graduation_year,
        setCollege: state.setCollege,
        setCourse: state.setCourse,
        setYearLevel: state.setYearLevel,
        setExpectedGraduationYear: state.setExpectedGraduationYear,
      },
      skills: {
        skills: state.skills,
        addSkill: state.addSkill,
        removeSkill: state.removeSkill,
        clearSkills: state.clearSkills,
        setSkills: state.setSkills,
      },
      resume: {
        resume_path: state.resume_path,
        setResumePath: state.setResumePath,
        clearResume: state.clearResume,
      },
    };
  },
}));

export default useSignupStore;
