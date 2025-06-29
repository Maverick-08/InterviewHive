import {
  AllInterviews,
  createInterviewExperience,
  deleteUserInterviewExperience,
  fetchInterviewById,
  fetchInterviewsSharedByUser,
  fetchSavedInterviewExperience,
  updateUserInterviewExperience,
} from "../utils/utils.Interview";

export interface InterviewDetails {
  authorId: string;
  companyName: string;
  yearOfInterview: number;
  role: string;
  CTCOffered?: number;
  interviewStatus: string;
  difficultyLevel: string;
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
    tagInitials: string;
    tagName: string;
  }[];
}

export class Interview {
  public static async getAllInterviews(
    page: number,
    limit: number,
    tags: string[],
    companyName: string | undefined
  ) {
    return await AllInterviews(tags, companyName, page, limit);
  }

  public static async getUserInterviews(userId: string) {
    return await fetchInterviewsSharedByUser(userId);
  }

  public static async geSavedInterviewExperience(
    userId: string,
    page: number,
    limit: number
  ) {
    return await fetchSavedInterviewExperience(userId, page, limit);
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
