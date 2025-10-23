import { create } from "zustand";

export type OnboardingStoreState = {
  type: "ojt" | "employer";
  MAX_STEP: number;
  currentStep: number;
  farthestStep: number;
  error: string[] | null;
  password: string;
  confirm_password: string;
  setCurrentStep: (step: number) => void;
  setFarthestStep: (step: number) => void;
  setError: (error: string[] | null) => void;
  nextStep: () => void;
  goToStep: (step: number) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirm_password: string) => void;
};

const useOnboardingStore = create<OnboardingStoreState>((set, get) => ({
  currentStep: 1,
  farthestStep: 1,
  error: null,
  password: "",
  confirm_password: "",
  type: "ojt",
  MAX_STEP: get().type === "ojt" ? 6 : 3,

  // Setter
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirm_password) => set({ confirm_password }),
  setCurrentStep: (step) =>
    set((state) => ({
      currentStep: Math.min(
        state.farthestStep,
        Math.max(1, Math.min(get().MAX_STEP, step))
      ),
    })),
  setFarthestStep: (step) =>
    set((state) => ({
      farthestStep: Math.max(
        state.farthestStep,
        Math.max(1, Math.min(get().MAX_STEP, step))
      ),
    })),
  setError: (error) => set({ error }),
  nextStep: () => {
    const { currentStep, farthestStep } = get();
    const newStep = Math.min(get().MAX_STEP, currentStep + 1);
    set({
      currentStep: newStep,
      farthestStep: Math.max(farthestStep, newStep),
    });
  },
  goToStep: (step) => {
    const clampedStep = Math.max(1, Math.min(get().MAX_STEP, step));
    const { farthestStep } = get();
    if (clampedStep <= farthestStep) {
      set({ currentStep: clampedStep });
    }
  },
}));

export default useOnboardingStore;
