import {create} from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ResendCounter{
    value: number;
    getTimersValue: () => number;
    startCounter: () => void ;
    setCounterValue: (value:number) =>void
}

export const useTimerStore = create<ResendCounter>()(
    devtools(
        persist(
            (set,get) => ({
                value: 60,
                getTimersValue: () => get().value,
                startCounter: () => {
                    if(get().value > 0){
                        set({value:get().value-1})
                    }
                },
                setCounterValue: (value:number) => set({value})
            }),

            {name:"ResedTimerStore"}
        ),

        {name:"Resend"}
    )
)