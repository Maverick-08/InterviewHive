import type {
  AxiosReturnType,
} from "@/types";
import { getFunction } from "@/utils/axiosRequest";


export const fetchAllInterviews = async (page:number,limit:number,companyName:string,tags:string[]) => {
  let url = `/api/interview?page=${page}&limit=${limit}`;

  if(companyName && companyName.trim() !== ""){
    url += `&companyName=${companyName.trim()}`
  }

  if(tags && tags.length > 0){
    for(const tag of tags){
      url +=`&tags=${tag}`
    }
  }

  const response:AxiosReturnType = await getFunction(url);
  return response;
}

export const fetchSavedInterviews = async (page:number,limit:number,userId:string) => {
  const url = `/api/interview/user/save?userId=${userId}&page=${page}&limit=${limit}`;


  const response:AxiosReturnType = await getFunction(url);
  return response;
}

export const fetchInterviewTopicTags = async () => {
  const response:AxiosReturnType =  await getFunction("/api/interview/tags");
  return response;
}