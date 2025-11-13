import { create } from "zustand";

export type SessionStoreState = {
  email: string | null;
  name: string | null;
  image: string | null;
  user_id: number | undefined;
  company_id: string | undefined;
  role_id: number | undefined;
  role_name: string | null;
  status_id: number | undefined;

  setSession: (session: {
    email: string | null;
    name: string | null;
    image: string | null;
    user_id: number | undefined;
    company_id: string | undefined;
    role_id: number | undefined;
    role_name: string | null;
    status_id: number | undefined;
  }) => void;
  clearSession: () => void;
};

const useSessionStore = create<SessionStoreState>((set) => ({
  email: null,
  name: null,
  image: null,
  user_id: undefined,
  company_id: undefined,
  role_id: undefined,
  role_name: null,
  status_id: undefined,

  setSession: (session) => set(session),
  clearSession: () =>
    set({
      email: null,
      name: null,
      image: null,
      user_id: undefined,
      company_id: undefined,
      role_id: undefined,
      role_name: null,
      status_id: undefined,
    }),
}));

export default useSessionStore;
