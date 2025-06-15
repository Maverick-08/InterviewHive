import {create} from "zustand"

interface ModalState{
    // state
    isInterviewModalOpen:boolean;

    // action
    setIsInterviewModalOpen: (value:boolean) => void
}

export const useInterviewModalStore = create<ModalState>((set) => ({
    isInterviewModalOpen: false,

    setIsInterviewModalOpen: (value:boolean) => set({isInterviewModalOpen:value})
}))