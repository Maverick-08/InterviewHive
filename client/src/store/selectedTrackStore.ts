import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SelectedTrack {
  selectedTrack: string | null;
  setSelectedTrack: (x: string) => void;
}

export const useSelectedTrack = create<SelectedTrack>()(
  devtools(
    persist(
      (set) => ({
        selectedTrack: null,
        setSelectedTrack: (x: string) => set({ selectedTrack: x }),
      }),
      { name: "selectedTrack" }
    ),
    { name: "SelectedTrack" }
  )
);
