import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 1. Define the User interface, making nullable fields explicit
interface UserState {
  // Core user info - non-nullable fields initially
  userId: string | null; // Allow null for initial state until user logs in
  username: string | null;
  degree: string | null;
  branch: string | null;
  yearOfPassingOut: number | null;
  avatar: string; // Has a default value, so can be string

  // Optional fields, allowing string or null
  xHandle?: string | null;
  linkedIn?: string | null;

  // Authentication status
  isAuthenticated: boolean; // Should be boolean, initial false

  // Actions to manipulate the state
  setUserState: (user: Partial<UserState>) => void; // Use Partial to allow setting only some fields
  clearUserState: () => void; // Action to clear user state (e.g., on logout)
  setIsAuthenticated: (status: boolean) => void;
}

type UserStateData = Omit<UserState, 'setUserState' | 'clearUserState' | 'setIsAuthenticated'>;

const initialUserState: UserStateData = {
  userId: null,
  username: null,
  degree: null,
  branch: null,
  yearOfPassingOut: null,
  avatar: 'Doodle', // Default value
  xHandle: null,
  linkedIn: null,
  isAuthenticated: false, // Default to false
};


export const useUserStore = create<UserState>()( // Use UserState directly
  devtools(
    persist(
      (set) => ({
        ...initialUserState, // Spread initial state to avoid repetition

        // Action to set (update) the user state
        // Use Partial<UserState> as the argument type to allow setting only specific fields
        setUserState: (userUpdates: Partial<UserState>) => set((state) => ({
          ...state, // Keep existing state
          ...userUpdates, // Apply updates from the payload
        })),

        // Action to clear user state (e.g., on logout)
        clearUserState: () => set({ ...initialUserState }),

        // Example setters for individual flags if needed
        setIsAuthenticated: (status: boolean) => set({ isAuthenticated: status })
      }),
      {
        name: "userInfo", // Name for localStorage persistence
        // Optionally, define which parts of the state to persist
        // partialize: (state) => ({
        //   id: state.id,
        //   username: state.username,
        //   avatar: state.avatar,
        //   isAuthenticated: state.isAuthenticated,
        //   // Only persist the necessary fields to avoid storing sensitive data or large objects
        // }),
      }
    ),
    { name: "UserStore" } // Name for DevTools
  )
);