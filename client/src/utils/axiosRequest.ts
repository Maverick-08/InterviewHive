import type { AxiosReturnType } from "@/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});


const handleError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    // The request was made and the server responded with a status code not in 2XX range
    if (err.response) {
      return {
        success: false,
        statusCode: err.status ?? -1,
        errMsg: err.response.data.msg as string,
      };
    }

    // The request was made but no response received - Server Down / Network Error / Request timed out
    else if (err.request) {
      return { success: false, statusCode: -1, errMsg: err.message };
    }
    // Something went wrong
    else {
      console.log(err);
      return { success: false, statusCode: -1, errMsg: "Something went wrong" };
    }
  } else {
    console.log(err);
    return { success: false, statusCode: -1, errMsg: "Something went wrong" };
  }
};

const getNewTokens = async () => {
  try {
    await axiosInstance.get("/api/refresh", {
      withCredentials: true,
    });
    return { success: true, statusCode: 200 };
  } catch (err) {
    return handleError(err);
  }
};

const getData = async (url: string) => {
  try {
    const response = await axiosInstance.get(url, { withCredentials: true });
    return { success: true, statusCode: 200, data: response.data };
  } catch (err) {
    return handleError(err);
  }
};

const postData = async (url:string,payload:unknown) => {
  try{
    
    const response = await axiosInstance.post(url,payload,{withCredentials:true});
    return {success:true,statusCode:200,isAuthenticated:true,data:response.data}
  }
  catch(err){
    return handleError(err);
  }
}

export const getFunction = async (url: string): Promise<AxiosReturnType> => {
  do {
    // 1. Fetch Data
    const response = await getData(url);

    // 2. If data is fetched successfully - return
    if (response.success) {
      return { ...response, isAuthenticated: true };
    }
    // 3. If failed to fetch data
    else {
      // A. Token Expired - get new tokens
      if (response.statusCode == 401) {
        const tokensResponse = await getNewTokens();
        if(!tokensResponse.success) break;
      }
      else{
        // B. Something else happend
        return { ...response, isAuthenticated: true };
      }
    }
    // eslint-disable-next-line no-constant-condition
  } while (1);

  return {success:false, isAuthenticated:false,errMsg:"Session Expired"};
};

export const postFunction = async (
  url: string,
  payload: unknown
): Promise<AxiosReturnType> => {
  do {
    // 1. Fetch Data
    const response = await postData(url,payload);

    // 2. If data is fetched successfully - return
    if (response.success) {
      return { ...response, isAuthenticated: true };
    }
    // 3. If failed to fetch data
    else {
      // A. Token Expired - get new tokens
      if (response.statusCode == 401) {
        const tokensResponse = await getNewTokens();
        if(tokensResponse.statusCode == 401) break;
        else{
          return {...tokensResponse,isAuthenticated:true};
        }
      }
      else{
        // B. Something else happend
        return { ...response, isAuthenticated: true };
      }
    }
    // eslint-disable-next-line no-constant-condition
  } while (1);

  return {success:false, isAuthenticated:false};
};
