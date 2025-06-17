import type { FetchUserInterviews } from "@/types";
import axios from "axios"
import { handleError } from "../dashboard/utils";
const BASE_URL = import.meta.env.VITE_API_ENDPOINT


export const fetchUserInterviews = async (userId:string):Promise<FetchUserInterviews> => {
    try{
        const response = await axios.get(`${BASE_URL}/api/interview/user?userId=${userId}`,{withCredentials:true});

        return {
            success:true,
            isAuthenticated:true,
            isServerDown:false,
            data:response.data.data,
            showEditOptions:response.data.showEditOptions
        }
    }
    catch(err){
        return handleError(err);
    }
}