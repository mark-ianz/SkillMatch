import { create } from "zustand";
import { Account, User } from "@/types/user.types";

export type UserStoreState = Partial<User> &
  Partial<Account> & {
    email: string | undefined;
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
  };

const useUserStore = create<UserStoreState>((set) => ({
  // Personal Information
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

  // Personal Information Setters
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

  // General
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
}));

export default useUserStore;
