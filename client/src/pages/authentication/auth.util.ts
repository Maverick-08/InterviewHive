import { BASE_URL } from "@/config";
import axios from "axios";


export const userAuth = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth`,
      { email, password },
      { withCredentials: true }
    );

    return {success:true,status:response.status,data:response.data};
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if(err.response){
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx (e.g., 400, 401, 403, 404, 500)
        return {success:false,status:err.response.status,data:err.response.data.msg}
      }
      else if(err.request){
        // The request was made but no response was received (e.g., network error, server down, CORS issues)
        return {success:false,status:503,data:"Poor Network Connectivity or Server Unavailable."}
      }
      else{
        return {success:false,status:400,data:"Failed to send request"}
      }
    }
   return {success:false,status:500,data:"Unknown error occurred"}
  }
};
