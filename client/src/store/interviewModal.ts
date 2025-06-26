import type { Interview } from "@/types";
import { create } from "zustand";

interface ModalState {
  // state
  isInterviewModalOpen: boolean;

  // action
  setIsInterviewModalOpen: (value: boolean) => void;
}

export const useInterviewModalStore = create<ModalState>((set) => ({
  isInterviewModalOpen: false,

  setIsInterviewModalOpen: (value: boolean) =>
    set({ isInterviewModalOpen: value }),
}));

interface SelectedInterview extends Interview {
  setSelectedInterview: (x: Interview) => void;
  getSelectedInterviewData: () => Interview;
}

export const useSelectedInterviewStore = create<SelectedInterview>(
  (set, get) => ({
    id: "",
    authorId: "",
    companyName: "",
    yearOfInterview: new Date().getFullYear(),
    role: "",
    CTCOffered: 0,
    user: {
      userId: "",
      username: "",
      yearOfPassingOut: 2026,
      courseId: "",
    },
    interviewStatus: "",
    tags: [],
    interviewRounds: [],
    setSelectedInterview: (value: Interview) => {
      set({ ...value });
    },
    getSelectedInterviewData: () => {
      return {
        id: get().id,
        authorId: get().authorId,
        companyName: get().companyName,
        yearOfInterview: get().yearOfInterview,
        role: get().role,
        CTCOffered: get().CTCOffered,
        user: {
          userId: get().user.userId,
          username: get().user.username,
          yearOfPassingOut: get().user.yearOfPassingOut,
          courseId: get().user.courseId,
        },
        interviewStatus: get().interviewStatus,
        tags: get().tags,
        interviewRounds: get().interviewRounds,
      };
    },
  })
);
