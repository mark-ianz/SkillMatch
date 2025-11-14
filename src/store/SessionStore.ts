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
  loading: boolean;
};

export type SessionStoreActions = {
  setSession: (session: SessionStoreState) => void;
  clearSession: () => void;
};

const useSessionStore = create<SessionStoreState & SessionStoreActions>((set) => ({
  email: null,
  name: null,
  image: null,
  user_id: undefined,
  company_id: undefined,
  role_id: undefined,
  role_name: null,
  status_id: undefined,
  loading: true,

  setSession: (session: SessionStoreState) => set(session),
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
      loading: false,
    }),
}));

export default useSessionStore;
