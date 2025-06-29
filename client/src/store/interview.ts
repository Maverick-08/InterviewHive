import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { useUserStore } from "./userStore";
// const userId = useUserStore.getState().id;

interface Question {
  id: string;
  title: string;
  description?: string | null;
  link?: string | null;
}

interface InterviewRound {
  id: string;
  roundType: string;
  note?: string | null;
  questions: Question[];
}

export interface InterviewTag {
  tagInitials: string;
  tagName: string;
}

interface Interview {
  // state
  authorId: string;
  companyName: string;
  yearOfInterview: number;
  role: string;
  difficultyLevel:string;
  CTCOffered: number | null;
  interviewStatus: string;
  interviewRounds: InterviewRound[];
  tags: InterviewTag[];

  // --------- Interview Actions
  // 1. to update the interview
  updateInterview: (value: Partial<Interview>) => void;

  // 2. to reset it back to original state
  clearInterview: (value: Interview) => void;

  // 3. Interview payload
  getInterviewPayload: () => {
    authorId: string;
    companyName: string;
    yearOfInterview: number;
    role: string;
    difficultyLevel: string;
    CTCOffered: number | undefined | null;
    interviewStatus: string;
    interviewRounds: InterviewRound[];
    tags: InterviewTag[];
  };

  // -------- Interview Round Actions
  // 1. add interview round
  addInterviewRound: () => void;

  // 2. update interview round
  updateInterviewRound: (
    interviewRoundId: string,
    updatedState: Partial<InterviewRound>
  ) => void;
  // 3. delete interview round
  deleteInterviewRound: (interviewRoundId: string) => void;

  // 4. Set interview round info
  setInterviewRoundInfo: (
    interviewRoundId: string,
    roundType: string,
    roundNote?: string | null
  ) => void;

  // 5. Get interview round info
  getInterviewRoundInfo: (interviewRoundId: string) => {
    roundType: string;
    roundNote: string | null | undefined;
  };

  // -------- Questions Actions
  // 1. Add questions to round
  addInterviewQuestion: (interviewRoundId: string) => void;

  // 2. Update Question
  updateInterviewQuestion: (
    interviewRoundId: string,
    questionId: string,
    updatedState: Partial<Question>
  ) => void;

  // 3. Delete Question
  deleteInterviewQuestion: (
    interviewRoundId: string,
    questionId: string
  ) => void;

  // 4. get interview question info
  getInterviewQuestionInfo: (
    interviewRoundId: string,
    questionId: string
  ) => {
    title: string;
    description: string | null | undefined;
    link: string | null | undefined;
  };

  // --------- Interview Tags
  // 1. Add interview tags
  addInterviewTag: (x: { tagInitials:string; tagName: string }) => void;
}

const InitialInterviewSate = {
  authorId: "",
  companyName: "",
  yearOfInterview: new Date().getFullYear(),
  role: "",
  difficultyLevel:"",
  CTCOffered: null,
  interviewStatus: "",
  interviewRounds: [],
  tags: [],
};

const getInitialInterviewRoundState = () => {
  const id = "R-" + crypto.randomUUID();
  return { id, roundType: "", note: "", questions: [] };
};

const getInitialInterviewQuestionState = () => {
  const id = "R-" + crypto.randomUUID();
  return { id, title: "", description: "", link: "" };
};

// Interview Store
export const useInterviewStore = create<Interview>()(
  devtools(
    persist(
      (set, get) => ({
        ...InitialInterviewSate,

        // ------- Interview Actions
        // 1. Interview updation
        updateInterview: (updatedState: Partial<Interview>) =>
          set((state) => ({ ...state, ...updatedState })),

        // 2. Reset Interview Details
        clearInterview: () => set({ ...InitialInterviewSate }),

        // 3. Post interview
        getInterviewPayload: () => {
          return {
            authorId: get().authorId,
            companyName: get().companyName,
            yearOfInterview: get().yearOfInterview,
            role: get().role,
            difficultyLevel: get().difficultyLevel,
            CTCOffered: get().CTCOffered,
            interviewStatus: get().interviewStatus,
            interviewRounds: get().interviewRounds,
            tags: get().tags,
          };
        },

        // -------- Interview Round Action
        // 1. Add Interview Round
        addInterviewRound: () => {
          const previousInterviewRounds = get().interviewRounds;
          const updatedInterviewRounds = [
            ...previousInterviewRounds,
            getInitialInterviewRoundState(),
          ];
          set({
            interviewRounds: updatedInterviewRounds,
          });
        },

        // 2. Update Interview Round
        updateInterviewRound: (
          interviewRoundId: string,
          updatedState: Partial<InterviewRound>
        ) => {
          const previousInterviewRounds = get().interviewRounds;
          const updatedInterviewRounds = previousInterviewRounds.map((round) =>
            round.id == interviewRoundId ? { ...round, ...updatedState } : round
          );
          set({
            interviewRounds: updatedInterviewRounds,
          });
        },

        // 3. Delete Interview Round
        deleteInterviewRound: (interviewRoundId: string) => {
          const previousInterviewRounds = get().interviewRounds;
          const updatedInterviewRounds = previousInterviewRounds.filter(
            (round) => round.id !== interviewRoundId
          );
          set({
            interviewRounds: updatedInterviewRounds,
          });
        },

        // 4. Set interview round info
        setInterviewRoundInfo: (
          interviewRoundId: string,
          roundType: string,
          roundNote?: string | null
        ) => {
          // Find the interview round whose round type and round note has to be updated
          const interviewRound = get().interviewRounds.find(
            (round) => round.id == interviewRoundId
          ) as InterviewRound;

          // Update the details
          const updatedInterviewRound = {
            ...interviewRound,
            roundType,
            roundNote,
          };

          // Update the state
          set((state) => ({
            interviewRounds: state.interviewRounds.map((round) =>
              round.id == interviewRoundId ? updatedInterviewRound : round
            ),
          }));
        },

        // 5. Get interview round info
        getInterviewRoundInfo: (interviewRoundId: string) => {
          const interviewRound = get().interviewRounds.find(
            (round) => round.id == interviewRoundId
          ) as InterviewRound;

          return {
            roundType: interviewRound.roundType,
            roundNote: interviewRound.note,
          };
        },

        // ------------ Question Actions
        // 1. Add interview question
        addInterviewQuestion: (interviewRoundId: string) => {
          // Find the interview round
          const interviewRound = get().interviewRounds.find(
            (round) => round.id == interviewRoundId
          ) as InterviewRound;

          // Add the question to the list of existing questions
          const interviewRoundQuestions = interviewRound.questions;
          const updatedInteviewRoundQuestion = [
            ...interviewRoundQuestions,
            getInitialInterviewQuestionState(),
          ];

          // Update the interview round
          const updatedInterviewRound = {
            ...interviewRound,
            questions: updatedInteviewRoundQuestion,
          };

          // Update the state
          set((state) => ({
            interviewRounds: state.interviewRounds.map((round) =>
              round.id == interviewRoundId ? updatedInterviewRound : round
            ),
          }));
        },

        // 2. Update interview question
        updateInterviewQuestion: (
          interviewRoundId: string,
          questionId: string,
          updatedState: Partial<Question>
        ) => {
          // Find the interview round
          const interviewRound = get().interviewRounds.find(
            (round) => round.id == interviewRoundId
          ) as InterviewRound;

          // Update the question in the interview roud
          const interviewRoundQuestions = interviewRound.questions;
          const updatedInteviewRoundQuestion = interviewRoundQuestions.map(
            (question) =>
              question.id == questionId
                ? { ...question, ...updatedState }
                : question
          );

          // Update the interview round
          const updatedInterviewRound = {
            ...interviewRound,
            questions: updatedInteviewRoundQuestion,
          };

          // Update the state
          set((state) => ({
            interviewRounds: state.interviewRounds.map((round) =>
              round.id == interviewRoundId ? updatedInterviewRound : round
            ),
          }));
        },

        // 3. Delete interview question
        deleteInterviewQuestion: (
          interviewRoundId: string,
          questionId: string
        ) => {
          // Find the interview round
          const interviewRound = get().interviewRounds.find(
            (round) => round.id == interviewRoundId
          ) as InterviewRound;

          // Update the question in the interview roud
          const interviewRoundQuestions = interviewRound.questions;
          const updatedInteviewRoundQuestion = interviewRoundQuestions.filter(
            (question) => question.id !== questionId
          );

          // Update the interview round
          const updatedInterviewRound = {
            ...interviewRound,
            questions: updatedInteviewRoundQuestion,
          };

          // Update the state
          set((state) => ({
            interviewRounds: state.interviewRounds.map((round) =>
              round.id == interviewRoundId ? updatedInterviewRound : round
            ),
          }));
        },

        // 4. Get interview round questions info
        getInterviewQuestionInfo: (
          interviewRoundId: string,
          questionId: string
        ) => {
          // Find interview round
          const interviewRound = get().interviewRounds.find(
            (round) => round.id == interviewRoundId
          );

          // Find question from the question array of interiview round
          const question = interviewRound?.questions.find(
            (question) => question.id == questionId
          );

          // Return question info
          return {
            title: question?.title as string,
            description: question?.description,
            link: question?.link,
          };
        },

        // ------------- Interview Tag Actions
        addInterviewTag: (value: { tagInitials:string; tagName: string }) => {
          const interviewTags = get().tags;
          if (!interviewTags.includes(value)) {
            if (interviewTags.length === 6) {
              const updatedInterviewTags = [
                value,
                interviewTags[0],
                interviewTags[1],
                interviewTags[2],
                interviewTags[3],
                interviewTags[4],
              ];
              set({
                tags: updatedInterviewTags,
              });
            } else {
              const updatedInterviewTags = [...interviewTags, value];
              set({
                tags: updatedInterviewTags,
              });
            }
          }
        },
      }),
      { name: "InterviewDetails" }
    ),
    { name: "InterviewStore" }
  )
);
