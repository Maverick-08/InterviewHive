import { create } from "zustand";

interface Sidebar {
  isSidebarActive: boolean;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<Sidebar>((set, get) => ({
  isSidebarActive: false,
  toggleSidebar: () => {
    if (get().isSidebarActive) set({ isSidebarActive: false });
    else set({ isSidebarActive: true });
  },
}));
