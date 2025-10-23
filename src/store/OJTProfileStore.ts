import { create } from "zustand";
import { OJTProfile } from "@/types/ojt_profile.types";
import { AcademicDetails } from "@/types/user.types";
import { Skill } from "@/types/skill.types";

export type OJTProfileStoreState = Partial<OJTProfile> &
  Partial<AcademicDetails> & {
    skills: Skill[];
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

const useOJTProfileStore = create<OJTProfileStoreState>((set, get) => ({
  // Academic Details
  ojt_id: undefined,
  user_id: undefined,
  college: "",
  course: "",
  year_level: "4th year",
  expected_graduation_year: "",
  resume_path: null,
  visibility: "private",
  created_at: undefined,

  setCollege: (college) => set({ college }),
  setCourse: (course) => set({ course }),
  setYearLevel: (year_level) => set({ year_level }),
  setExpectedGraduationYear: (expected_graduation_year) =>
    set({ expected_graduation_year }),

  // Skills
  skills: [],
  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  setSkills: (skills) => set({ skills }),
  removeSkill: (skill_id) =>
    set((state) => ({
      skills: state.skills.filter((s) => s.skill_id !== skill_id),
    })),
  clearSkills: () => set({ skills: [] }),

  // Resume
  setResumePath: (resume_path) => set({ resume_path }),
  clearResume: () => set({ resume_path: null }),

  // General
  setOJTProfile: (profile) => set(profile),
  setAcademicDetails: (details) => set(details),
  clearOJTProfile: () =>
    set({
      ojt_id: undefined,
      user_id: undefined,
      college: "",
      course: "",
      year_level: "4th year",
      expected_graduation_year: "",
      resume_path: null,
      visibility: "private",
      created_at: undefined,
      skills: [],
    }),
}));

export default useOJTProfileStore;
