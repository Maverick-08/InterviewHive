import {create} from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Access{
    isAccessible:boolean;
    setContentAccessibility: (x:boolean) => void
}

export const useContentAccessStore = create<Access>()(
    devtools(
        persist(
            (set) => ({
                isAccessible: false,
                setContentAccessibility: (x: boolean) => set({ isAccessible: x }),
            }),
            {
                name: "content-access-store",
            }
        ),
        {name: "content-store"}
    )
)