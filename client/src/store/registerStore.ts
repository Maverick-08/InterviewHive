import {create} from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User{
    username: string;
    email:string;
    password:string;
    courseId: string;
    yearOfPassingOut: number|null;
}

interface Register extends User{
    getUserDetails: () => User
    updateUserDetails: (value: Partial<User>) => void
}

export const useRegisterUserStore = create<Register>()(
    devtools(
        persist(
            (set,get) => ({
                username: "",
                email: "",
                password: "",
                courseId: "",
                yearOfPassingOut: null,
                getUserDetails: () => {
                    return {
                        username: get().username,
                        email: get().email,
                        password: get().password,
                        courseId: get().courseId,
                        yearOfPassingOut: get().yearOfPassingOut
                    }
                },
                updateUserDetails: (value:Partial<User>) => {
                    set({...value});
                }
            }),
            {name:"RegistrationDetails"}
        ),
        {name:"RegisterStore"}
    )
)