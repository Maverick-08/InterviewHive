import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_ENDPOINT

export const userAuth = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const innerWidth = window.innerWidth;
  const platform = innerWidth < 640 ? "Mobile" : innerWidth > 640 && innerWidth < 1024 ? "Tablet" : "Laptop";
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth`,
      { email, password,platform },
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
