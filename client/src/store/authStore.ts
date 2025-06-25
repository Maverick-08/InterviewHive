import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface AuthState {
  authState: boolean;
  setAuthState: (x: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        authState: true,

        setAuthState: (value: boolean) => set({ authState: value }),
      }),
      { name: "authState" }
    ),
    { name: "authStore" }
  )
);
