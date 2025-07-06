import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Track{
  key:string,
  value:string
}

interface SelectedTrack {
  selectedTrack: Track | null;
  setSelectedTrack: (x: Track) => void;
}

export const useSelectedTrack = create<SelectedTrack>()(
  devtools(
    
      (set) => ({
        selectedTrack: null,
        setSelectedTrack: (x: Track) => set({ selectedTrack: x }),
      }),
    { name: "SelectedTrack" }
  )
);
