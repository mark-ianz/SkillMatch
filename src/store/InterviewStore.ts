import { create } from "zustand";

interface InterviewData {
  type: "virtual" | "in-person";
  date: Date | undefined;
  time: string;
  meetLink: string;
  meetingCode: string;
  location: string;
  notes: string;
  isCreatingMeeting: boolean;
}

interface InterviewStore extends InterviewData {
  setType: (type: "virtual" | "in-person") => void;
  setDate: (date: Date | undefined) => void;
  setTime: (time: string) => void;
  setMeetLink: (meetLink: string) => void;
  setMeetingCode: (meetingCode: string) => void;
  setLocation: (location: string) => void;
  setNotes: (notes: string) => void;
  setIsCreatingMeeting: (isCreating: boolean) => void;
  setMeetingDetails: (meetingUri: string, meetingCode: string) => void;
  resetForm: () => void;
}

const initialState: InterviewData = {
  type: "virtual",
  date: undefined,
  time: "",
  meetLink: "",
  meetingCode: "",
  location: "",
  notes: "",
  isCreatingMeeting: false,
};

export const useInterviewStore = create<InterviewStore>((set) => ({
  ...initialState,

  setType: (type) => set({ type }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setMeetLink: (meetLink) => set({ meetLink }),
  setMeetingCode: (meetingCode) => set({ meetingCode }),
  setLocation: (location) => set({ location }),
  setNotes: (notes) => set({ notes }),
  setIsCreatingMeeting: (isCreatingMeeting) => set({ isCreatingMeeting }),
  
  setMeetingDetails: (meetingUri, meetingCode) =>
    set({ meetLink: meetingUri, meetingCode }),

  resetForm: () => set(initialState),
}));
