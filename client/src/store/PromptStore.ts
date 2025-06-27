import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Message {
  message: string;
  sentBy: "user" | "llm";
}

interface Chat {
  messages: Message[];
  addPrompt: (x: Message) => void;
  clearPrompt: () => void;
}

export const usePromptStore = create<Chat>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        addPrompt(x: Message) {
          set((state) => ({
            messages: [...state.messages, x],
          }));
        },
        clearPrompt() {
          set({ messages: [] });
        },
      }),
      { name: "Prompt" }
    ),
    { name: "PromptStore" }
  )
);

interface LoadResponse {
  isResponseLoading: boolean;
  loadResponse: (x: boolean) => void;
}

export const useLoadResponseStore = create<LoadResponse>((set) => ({
  isResponseLoading: false,
  loadResponse: (x: boolean) => {
    set({ isResponseLoading: x });
  },
}));
