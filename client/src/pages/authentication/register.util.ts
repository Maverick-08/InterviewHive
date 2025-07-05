import axios from "axios"; // Import AxiosError type
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export const courseOptions = [
  { value: "BTECH-CSE", label: "BTECH-CSE" },
  { value: "BTECH-EE", label: "BTECH-EE" },
  { value: "MDS", label: "MDS" },
  { value: "MCA", label: "MCA" },
  { value: "MTECH-CSE", label: "MTECH-CSE" },
];

export const getYearList = () => {
  const yearList = [];
  const limit = new Date().getFullYear() + 5;
  for (let i = limit; i >= 2000; --i) {
    yearList.push({ value: `${i}`, label: `${i}` });
  }
  return yearList;
};

export interface UserRegistrationData {
  username: string | null;
  email: string | null;
  password: string | null;
  courseId: string | null;
  yearOfPassingOut: number | null;
}

export const checkRegistrationDetails = ({
  username,
  email,
  password,
  courseId,
  yearOfPassingOut,
}: UserRegistrationData) => {
  if (username && email && password && courseId && yearOfPassingOut)
    return true;
  return false;
};

export const submitRegistrationData = async ({
  username,
  email,
  password,
  courseId,
  yearOfPassingOut,
}: UserRegistrationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, {
      username,
      yearOfPassingOut,
      email,
      password,
      courseId,
    });
    return { status: response.status, data: response.data.msg };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status as number,
        data: err.response?.data,
      };
    }
    return { status: 500, data: "Internal server error" };
  }
};
