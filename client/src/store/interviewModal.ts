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
    viewCount: 0,
    bookmarkCount: 0,
    role: "",
    difficultyLevel:"",
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
      set({
        id: value.id,
        authorId: value.authorId,
        companyName: value.companyName,
        yearOfInterview: value.yearOfInterview,
        viewCount: value.viewCount,
        bookmarkCount: value.bookmarkCount,
        role: value.role,
        CTCOffered: value.CTCOffered,
        user: {
          userId: value.user.userId,
          username: value.user.username,
          yearOfPassingOut: value.user.yearOfPassingOut,
          courseId: value.user.courseId,
        },
        interviewStatus: value.interviewStatus,
        tags: value.tags,
        interviewRounds: value.interviewRounds,
        setSelectedInterview: get().setSelectedInterview,
        getSelectedInterviewData: get().getSelectedInterviewData,
      });
    },
    getSelectedInterviewData: () => {
      return {
        id: get().id,
        authorId: get().authorId,
        companyName: get().companyName,
        yearOfInterview: get().yearOfInterview,
        viewCount: get().viewCount,
        bookmarkCount: get().bookmarkCount,
        role: get().role,
        difficultyLevel: get().difficultyLevel,
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
