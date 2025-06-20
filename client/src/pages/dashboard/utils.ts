import type {
  AddRound,
  DeleteRound,
  AddRoundQuestion,
  DeleteRoundQuestion,
  FetchInterviews,
  FetchInterviewTags,
} from "@/types";
import axios from "axios";
import { v4 as uuid } from "uuid";
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export const addRound = ({ roundIds, setRoundIds }: AddRound) => {
  const newRoundId = "" + uuid();
  setRoundIds([...roundIds, newRoundId]);
};

export const deleteRound = ({
  roundId,
  roundIds,
  setRoundIds,
}: DeleteRound) => {
  const newRoundIds = roundIds.filter(
    (currentRound) => currentRound != roundId
  );
  setRoundIds(newRoundIds);
};

export const addQuestion = ({
  questionIds,
  setQuestionIds,
}: AddRoundQuestion) => {
  const newQuestionId = "" + uuid();
  setQuestionIds([...questionIds, newQuestionId]);
};

export const deleteQuestion = ({
  questionId,
  questionIds,
  setQuestionIds,
}: DeleteRoundQuestion) => {
  const newRoundIds = questionIds.filter(
    (currentRound) => currentRound != questionId
  );
  setQuestionIds(newRoundIds);
};

export const handleError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (err.response) {
      if (err.status == 401)
        return {
          success: false,
          isAuthenticated: false,
          isServerDown: false,
          errMsg: "Session Expired",
        };

      return {
        success: false,
        isAuthenticated: true,
        isServerDown: false,
        errMsg: err.response.data.msg,
      };
    }

    // The request was made but no response was received
    if (err.request) {
      if (err.code === "ERR_NETWORK") {
        return {
          success: false,
          isAuthenticated: true,
          isServerDown: false,
          errMsg: "Network Error",
        };
      }

      if (err.code == "ECONNABORTED") {
        // network time out
        return {
          success: false,
          isAuthenticated: true,
          isServerDown: false,
          errMsg: "Server is experiencing load at the moment.",
        };
      }

      return {
        success: false,
        isAuthenticated: true,
        isServerDown: true,
        errMsg: "Server Down. We are fixing the issue !",
      };
    }
  }

  return {
    success: false,
    isAuthenticated: true,
    isServerDown: true,
    errMsg: "Server Down. We are fixing the issue !",
  };
};

export const fetchInterviews = async (
  page: number,
  limit: number,
  companyName?: string,
  filters?: string[]
): Promise<FetchInterviews> => {
  try {
    let url = `${BASE_URL}/api/interview?page=${page}&limit=${limit}&companyName=${
      companyName ? companyName : ""
    }`;

    if (filters && filters.length > 0) {
      if (filters.includes("All")) {
        url = `${BASE_URL}/api/interview?page=${page}&limit=${limit}${
          companyName ? `&companyName=${companyName}` : ""
        }`;
      }

      if (!filters.includes("All")) {
        url = `${BASE_URL}/api/interview/filter?page=${page}&limit=${limit}${
          companyName ? `&companyName=${companyName}` : ""
        }`;
        for (const tag of filters) {
          url += `&tags=${tag}`;
        }
      }
    }

    const response = await axios.get(url, { withCredentials: true });

    return {
      success: true,
      isAuthenticated: true,
      isServerDown: false,
      data: response.data.data,
      totalCount: response.data.totalCount,
    };
  } catch (err) {
    return handleError(err);
  }
};

export const fetchSavedInterviews = async (
  userId: string,
  page: number,
  limit: number
): Promise<FetchInterviews> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/interview/user/save?userId=${userId}&page=${page}&limit=${limit}`,
      { withCredentials: true }
    );

    return {
      success: true,
      isAuthenticated: true,
      isServerDown: false,
      data: response.data.data,
      totalCount: response.data.totalCount,
    };
  } catch (err) {
    return handleError(err);
  }
};

export const fetchInterviewTags = async ():Promise<FetchInterviewTags> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/interview/tags`, {
      withCredentials: true,
    });

    return {
      success: true,
      isAuthenticated: true,
      isServerDown: false,
      data: response.data.data,
    };
  } catch (err) {
    return handleError(err);
  }
};
