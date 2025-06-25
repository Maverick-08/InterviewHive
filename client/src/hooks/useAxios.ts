import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { toast } from "sonner";
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

const useAxios = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    try {
      await axios.get(`${BASE_URL}/api/refresh`, {
        withCredentials: true,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // The request was made made and the server responded with a status code outside 2XX range
          if (err.status == 401) {
            toast.error(`${err.response.data.msg}`);
            setTimeout(() => {
              setAuthState(false);
            }, 1000);
          }
        } else if (err.request) {
          // The request was made but no response was received
          toast.warning("Server Down");
        } else {
          // Something else happened
          toast.error("Network Error");
        }
      }
    }

    return config;
  });

  return axiosInstance;
};

export default useAxios;
