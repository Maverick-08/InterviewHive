import {
  createInterviewExperience,
  deleteUserInterviewExperience,
  fetchAllInterviews,
  fetchFilteredInterviews,
  fetchInterviewById,
  fetchInterviewsSharedByUser,
  updateUserInterviewExperience,
} from "../utils/utils.Interview";

export interface InterviewDetails {
  authorId: string;
  companyName: string;
  yearOfInterview: number;
  role: string;
  CTCOffered?: number;
  interviewStatus: string;
  interviewRounds: {
    roundType: string;
    note?: string;
    questions: {
      title: string;
      description?: string;
      link?: string;
    }[];
  }[];
  tags: {
    tagName: string;
  }[];
}

export class Interview {
  public static async getAllInterviews(page: number, limit: number,companyName:string|undefined) {
    return await fetchAllInterviews(page, limit,companyName);
  }

  public static async getFilteredInterviews(
    tags: string[],
    companyName: string|undefined,
    page: number,
    limit: number
  ) {
    return await fetchFilteredInterviews(tags, companyName, page, limit);
  }

  public static async getUserInterviews(userId: string) {
    return await fetchInterviewsSharedByUser(userId);
  }

  public static async getInterviewById(interviewId: string) {
    return await fetchInterviewById(interviewId);
  }

  public static async addInterviewExperience(interviewData: InterviewDetails) {
    const result = await createInterviewExperience(interviewData);
    return result;
  }

  public static async deleteInterviewExperience(interviewId: string) {
    return await deleteUserInterviewExperience(interviewId);
  }

  public static async updateInterviewExperience(
    interviewId: string,
    interviewData: InterviewDetails
  ) {
    const result = await updateUserInterviewExperience(
      interviewId,
      interviewData
    );

    return result;
  }
}
